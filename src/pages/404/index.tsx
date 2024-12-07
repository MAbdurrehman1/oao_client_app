import LogoWhite from '@/assets/images/logo-white.png'
import { Link } from '@/components/link'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { Typography } from '@/components/ui/typography'
import { Routes } from '@/routes'

export const NotFoundPage = () => {
  return (
    <div
      className={`
        flex h-screen w-full items-center justify-center bg-brand-color-black
        px-s24
      `}
    >
      <div className="w-full max-w-md">
        <div
          className={`
            flex flex-col items-center justify-center space-y-s16 text-center
            text-brand-color-white
          `}
        >
          <Image src={LogoWhite} className="h-5" />
          <Typography size="s20">Requested page was not found.</Typography>
          <div className="flex flex-row items-center space-x-s16 text-grey-500">
            <Button asChild variant="light">
              <Link to={Routes.PARTICIPANTS_INDEX}>Return to home page</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
