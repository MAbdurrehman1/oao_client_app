import { HeroSection } from '@/components/layout/hero-section'
import { Link } from '@/components/link'
import { Button } from '@/components/ui/button'
import { useAccount } from '@/hooks/use-account'
import { useStaticText } from '@/hooks/use-static-text'
import { Routes } from '@/routes'
import { toCapitalize } from '@/utils/string'
import { generateTestId } from '@/utils/test'

export const NotScheduledHero = () => {
  const { account } = useAccount()
  const hasNotScheduledYetText = useStaticText(
    'training_portal_page.hero_text.no_sessions_scheduled_yet',
    {
      name: toCapitalize(account?.firstName),
      companyName: toCapitalize(account?.organizationName),
    },
  )
  return (
    <HeroSection
      text={hasNotScheduledYetText}
      lymanId="participant-not-scheduled"
      hasNavbar={false}
    >
      <Button asChild className="mt-s64" {...generateTestId('schedule-cta')}>
        <Link
          to={Routes.SCHEDULE_SESSIONS_MODAL_STEP}
          params={{
            step: '1',
          }}
        >
          Let's Schedule →
        </Link>
      </Button>
    </HeroSection>
  )
}
