import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Typography } from '@/components/ui/typography'
import { useAccount } from '@/hooks/use-account'

import { UserSectionLogoutButton } from './logout-button'
import { UserSectionAvatar } from './user-avatar'

export const MobileUserSection = () => {
  const { account } = useAccount()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={`
            border-0 !px-0
            hover:bg-brand-color-white
          `}
        >
          <Icon name="menu" className="size-7 stroke-brand-color-black" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="space-y-s24 p-s24">
        <div className="flex flex-row items-center space-x-s16">
          <UserSectionAvatar />
          {account && (
            <Typography>
              {account.firstName} {account.lastName}
            </Typography>
          )}
        </div>
        <UserSectionLogoutButton />
        <SheetTitle className="hidden">mobile menu title</SheetTitle>
        <SheetDescription className="hidden">
          mobile menu description
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
