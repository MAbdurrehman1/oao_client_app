import { UserSectionLogoutButton } from './logout-button'
import { UserSectionAvatar } from './user-avatar'

export const UserSection = () => {
  return (
    <div className="flex w-[10.25rem] items-center justify-between">
      <UserSectionLogoutButton />
      <UserSectionAvatar />
    </div>
  )
}
