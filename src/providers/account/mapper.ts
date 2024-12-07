import { type IAccount } from './context'

export type BackendAccount = {
  first_name: string
  last_name: string
  email: string
  user_id: number
  location: string
  role_title: string
  employee_id: number
  organization_name: string
  organization_id: number
  organization_logo_url: string
  participation_id: string
}

export const accountMapper = (account: BackendAccount): IAccount => {
  const {
    first_name,
    last_name,
    email,
    user_id,
    location,
    role_title,
    employee_id,
    organization_name,
    organization_id,
    organization_logo_url,
    participation_id,
  } = account
  return {
    firstName: first_name,
    lastName: last_name,
    email,
    userId: user_id,
    location,
    roleTitle: role_title,
    employeeId: employee_id,
    organizationName: organization_name,
    organizationId: organization_id,
    organizationLogoUrl: organization_logo_url,
    participationId: participation_id,
  }
}
