import { forwardRef, Suspense } from 'react'
import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

import LogoBlack from '@/assets/images/logo-black.png'
import { Loading } from '@/components/loading'
import { Image } from '@/components/ui/image'
import { Separator } from '@/components/ui/separator'
import { useAccount } from '@/hooks/use-account'
import { useTailwindBreakpoint } from '@/hooks/use-tailwind-breakpoint'

const UserSectionLoader = lazy(() =>
  import('./user-section').then((m) => ({ default: m.UserSection })),
)

const MobileUserSectionLoader = lazy(() =>
  import('./mobile-user-section').then((m) => ({
    default: m.MobileUserSection,
  })),
)

type HeaderProps = React.HTMLAttributes<HTMLDivElement>

export const Header = forwardRef<HTMLDivElement, HeaderProps>((_, ref) => {
  if (!ref) throw new Error('[index-page]: Header ref MUST be set')
  const { account } = useAccount()
  const isMobile = useTailwindBreakpoint({ mode: 'max', breakpoint: 'sm' })
  return (
    <header
      ref={ref}
      className="fixed top-0 z-20 w-full border-b bg-background"
    >
      <div
        className={`
          container flex w-full flex-row items-center justify-between px-s24
          py-s16
        `}
      >
        <div
          className="flex cursor-pointer flex-row items-center space-x-s16"
          onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
        >
          <Image src={account?.organizationLogoUrl} className="h-[2.375rem]" />
          <Separator orientation="vertical" className="h-[2.125rem]" />
          <Image src={LogoBlack} className="h-s24" />
        </div>
        <Suspense fallback={<Loading inline />}>
          {!isMobile ? <UserSectionLoader /> : <MobileUserSectionLoader />}
        </Suspense>
      </div>
    </header>
  )
})

Header.displayName = 'Header'
