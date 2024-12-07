import { createContext } from 'react'

export interface IAccount {
  firstName: string
  lastName: string
  email: string
  userId: number
  location: string
  roleTitle: string
  employeeId: number
  organizationName: string
  organizationId: number
  organizationLogoUrl: string
  participationId: string
}
export interface IAccountContext {
  hasToken: boolean
  account: IAccount | null
  isLoading: boolean
  getUserAccount: () => Promise<void>
  logout: () => void
}

export const AccountContext = createContext<IAccountContext | null>(null)
