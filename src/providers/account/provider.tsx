import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'

import apiClient, { setAxiosInterceptors } from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { clearTokens, getTokens, setTokens } from '@/api/token'
import { useNavigate } from '@/hooks/use-navigate'
import { Routes } from '@/routes'

import { AccountContext, type IAccount } from './context'
import { accountMapper, type BackendAccount } from './mapper'

interface AccountApiResponse {
  result: BackendAccount
}

export const AccountProvider = ({ children }: PropsWithChildren) => {
  const [hasToken, setHasToken] = useState<boolean>(!!getTokens().accessToken)
  const [account, setAccount] = useState<IAccount | null>(null)
  const isAccountLoading = useRef<boolean>(false)

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const logout = useCallback(
    async (reason?: string) => {
      clearTokens()
      setHasToken(false)
      setAccount(null)
      isAccountLoading.current = false
      if (reason) navigate(Routes.LOGIN, `?reason=${reason}`)
      else navigate(Routes.LOGIN)
      // invalidating all queries on logout
      await queryClient.invalidateQueries()
    },
    [navigate, queryClient],
  )

  const getUserAccount = useCallback(async () => {
    if (isAccountLoading.current) return
    isAccountLoading.current = true
    setHasToken(true)
    setAxiosInterceptors(logout)
    try {
      const { data } = await apiClient.get<AccountApiResponse>(
        ApiEndpoints.GET_ACCOUNT_INFO,
      )
      setAccount(accountMapper(data.result))
    } catch (error) {
      console.error(error)
    } finally {
      isAccountLoading.current = false
    }
  }, [isAccountLoading, logout])

  useEffect(() => {
    if (hasToken) {
      void getUserAccount()
    } else {
      // for impersonation feature from panel,
      // panel has an iframe which will send the accessToken
      // as a message via `postMessage` browser API
      // docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
      window.addEventListener('message', (message) => {
        // only listen for messages if the sender is the panel app.
        if (message.origin === import.meta.env.VITE_PANEL_APP_URL) {
          const accessToken = message.data as string
          if (accessToken) {
            setTokens({ accessToken, refreshToken: '' })
            void getUserAccount()
          }
        }
      })
    }
    // just need this on the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({
      account,
      isLoading: isAccountLoading.current,
      getUserAccount,
      hasToken,
      logout,
    }),
    [account, getUserAccount, hasToken, logout],
  )
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}
