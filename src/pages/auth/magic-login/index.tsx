import LogoWhite from '@/assets/images/logo-white.png'
import { Loading } from '@/components/loading'
import { Image } from '@/components/ui/image'
import { Typography } from '@/components/ui/typography'
import { useMagicLogin } from '@/hooks/use-magic-login'
import { useNavigate } from '@/hooks/use-navigate'
import { Routes } from '@/routes'

export default function MagicLogin() {
  const navigate = useNavigate()
  useMagicLogin({
    onSuccessCallback: () => navigate(Routes.PARTICIPANTS_INDEX),
  })
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
          <Typography size="s40" asComp="h1" weight="bold">
            Magic Login
          </Typography>
          <div className="flex flex-row items-center space-x-s16 text-grey-500">
            <Loading inline />
            <p>Processing your login...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
