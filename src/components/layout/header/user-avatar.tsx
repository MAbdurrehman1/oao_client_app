import { useMemo } from 'react'

import { Loading } from '@/components/loading'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAccount } from '@/hooks/use-account'

export const UserSectionAvatar = () => {
  const { account } = useAccount()
  const avatartFallback = useMemo(
    () =>
      account ? account.firstName.charAt(0) + account.lastName.charAt(0) : null,
    [account],
  )
  return (
    <Avatar className="flex items-center justify-center">
      {!account ? (
        <Loading />
      ) : (
        <AvatarFallback>{avatartFallback}</AvatarFallback>
      )}
    </Avatar>
  )
}
