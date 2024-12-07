import { useContext } from 'react'

import {
  AccountContext,
  type IAccountContext,
} from '@/providers/account/context'

export const useAccount = () => {
  const context = useContext<IAccountContext | null>(AccountContext)
  if (!context)
    throw new Error(`useAccount must be used within <AccountProvider />`)
  return context
}
