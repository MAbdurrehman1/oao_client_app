import { useEffect } from 'react'
import { Navigate } from 'react-router'

import { useAccount } from '@/hooks/use-account'
import { Routes } from '@/routes'

export default function Logout() {
  const { logout } = useAccount()
  useEffect(() => {
    logout()
  }, [logout])
  return <Navigate to={Routes.LOGIN.route} />
}
