import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { setTokens } from '@/api/token'
import { useAccount } from '@/hooks/use-account'
import { getLogoutReason, LogoutReasons } from '@/pages/auth/common'
import { Routes } from '@/routes'

import { useNavigate } from './use-navigate'

interface LoginResponse {
  access_token: string
  refresh_token: string
}

export const useMagicLogin = ({
  enabled = true,
  onSuccessCallback,
}: {
  enabled?: boolean
  onSuccessCallback: () => void
}) => {
  // We need to ensure that in dev mode, the token is sent to the server only once.
  const isFirstRender = useRef(true)
  const { getUserAccount } = useAccount()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (enabled) {
      const params = new URLSearchParams(searchParams)
      const token = params.get('token')
      const login = async () => {
        if (!token) {
          navigate(Routes.LOGIN, `?reason=${LogoutReasons.InvalidMagicToken}`)
          return
        }
        try {
          const { data } = await apiClient.post<LoginResponse>(
            ApiEndpoints.MAGIC_LOGIN,
            { token },
          )
          setTokens({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          })
          void getUserAccount()
          onSuccessCallback()
        } catch (err) {
          navigate(Routes.LOGIN, `?reason=${getLogoutReason(err)}`)
        }
      }
      if (isFirstRender.current) {
        void login()
        isFirstRender.current = false
      }
    }
  }, [enabled, getUserAccount, navigate, onSuccessCallback, searchParams])
}
