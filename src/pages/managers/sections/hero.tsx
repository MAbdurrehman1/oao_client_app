import { HeroSection as HeroSectionComponent } from '@/components/layout/hero-section'
import { useAccount } from '@/hooks/use-account'
import { useStaticText } from '@/hooks/use-static-text'
import { toCapitalize } from '@/utils/string'

export const HeroSection = () => {
  const { account } = useAccount()
  const heroText = useStaticText('report_page.hero_text', {
    firstName: toCapitalize(account?.firstName),
  })
  return <HeroSectionComponent text={heroText} lymanId="managers" />
}
