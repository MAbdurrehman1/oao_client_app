import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { Typography } from '@/components/ui/typography'
import { useAccount } from '@/hooks/use-account'
import { useStaticText } from '@/hooks/use-static-text'
import { toCapitalize } from '@/utils/string'

import FooterLogoWhite from './footer-logo-white.svg'

export const Footer = () => {
  const { account } = useAccount()
  const text = useStaticText('common.footer_text', {
    companyName: toCapitalize(account?.organizationName),
  })
  return (
    <footer className="bg-brand-color-black text-brand-color-white">
      <div className="container p-s24">
        <div className="flex flex-row items-start justify-between">
          <Image src={account?.organizationLogoUrl} className="h-s64" />
          <Button
            variant="light"
            className={`
              rounded-none border-0 border-b !p-0 text-[0.875rem]
              hover:bg-brand-color-black hover:text-brand-color-white/80
            `}
            onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
          >
            Back to top
          </Button>
        </div>
        <Typography
          size="s20"
          className={`
            mb-12 mt-10
            lg:max-w-[33%]
          `}
          asComp="p"
        >
          {text}
        </Typography>
        <div
          className={`
            flex flex-col
            md:flex-row md:items-center md:justify-between
          `}
        >
          <div className="flex flex-col space-y-s16">
            <Typography weight="bold" size="s16">
              Contact
            </Typography>
            <a href="mailto:hi@oao.co">
              <Typography size="s16">hi@oao.co</Typography>
            </a>
          </div>
          <Image
            src={FooterLogoWhite}
            className={`
              mx-auto mb-s16 mt-s64 w-full max-w-80
              md:m-0 md:h-9 md:w-auto
            `}
          />
        </div>
      </div>
    </footer>
  )
}
