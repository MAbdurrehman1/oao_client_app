import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { toast } from 'sonner'

import { getLogoutReason, LogoutReasons } from '@/pages/auth/common'

import { apiBaseUrls } from './config'
import { ApiEndpoints } from './endpoints'
import { getTokens, setTokens } from './token'

interface RefreshTokenApiResponse {
  access_token: string
  refresh_token: string
}

export type HandledApiError = {
  message: string
  statusCode: number
}

const apiClient = axios.create({
  baseURL: apiBaseUrls.backend,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshingToken = false
const silentedErrors = [
  'Authorization Header must be provided.',
  'Token is invalid.',
]

export const setAxiosInterceptors = (
  logout: (reason: string) => Promise<void>,
) => {
  apiClient.interceptors.request.use(
    (request) =>
      new Promise((resolve) => {
        const resolveRequest = () => {
          const { accessToken } = getTokens()
          if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`
          }
          resolve(request)
        }
        if (isRefreshingToken && request.url !== ApiEndpoints.REFRESH_TOKEN) {
          // NASTY code here to make sure concurrent endpoints don't fire
          // multiple refresh_token calls.
          const id = setInterval(() => {
            if (!isRefreshingToken) {
              clearInterval(id)
              resolveRequest()
            }
          }, 1000)
        } else {
          resolveRequest()
        }
      }),
  ),
    apiClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean
          _silentErrors?: boolean
        }
        if (
          error.response?.status === 401 &&
          !originalRequest?._retry &&
          !isRefreshingToken
        ) {
          isRefreshingToken = true
          originalRequest._retry = true
          const { accessToken, refreshToken } = getTokens()
          if (accessToken && refreshToken) {
            try {
              const { data } = await apiClient.post<RefreshTokenApiResponse>(
                ApiEndpoints.REFRESH_TOKEN,
                {
                  access_token: accessToken,
                  refresh_token: refreshToken,
                },
              )
              setTokens({
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
              })
              originalRequest.headers.Authorization = `Bearer ${data.access_token}`
              return apiClient.request(originalRequest)
            } catch (err) {
              console.error(err)
              await logout(getLogoutReason(err))
              return Promise.reject(err)
            } finally {
              isRefreshingToken = false
            }
          }
        } else {
          if (error.response) {
            if (error.response.status !== 401) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('[AXIOS RESPONSE ERROR]', {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
              })
              const errorMessage = (
                (error.response.data || {}) as {
                  error: string
                }
              ).error
              if (errorMessage) {
                if (
                  !originalRequest._silentErrors &&
                  !silentedErrors.includes(errorMessage)
                )
                  toast.error('Error', {
                    description: errorMessage,
                    duration: 10_000,
                  })
                if (errorMessage === 'Token is invalid.')
                  await logout(LogoutReasons.InvalidToken)
                return Promise.reject({
                  message: errorMessage,
                  statusCode: error.response.status,
                } as HandledApiError)
              }
            }
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error('[AXIOS REQUEST ERROR]', error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('[AXIOS ERROR]', error)
          }
        }
        return Promise.reject(error)
      },
    )
}

export default apiClient
