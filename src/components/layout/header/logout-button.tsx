import { Link } from '@/components/link'
import { buttonVariants } from '@/components/ui/button/variants'
import { Icon } from '@/components/ui/icon'
import { Routes } from '@/routes'

export const UserSectionLogoutButton = () => {
  return (
    <Link
      className={buttonVariants({ className: 'space-x-s4' })}
      to={Routes.LOGOUT}
    >
      <Icon name="logout" />
      <span>Log-out</span>
    </Link>
  )
}
