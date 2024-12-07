import { differenceInDays } from 'date-fns'

import { HeroSection } from '@/components/layout/hero-section'
import { Link } from '@/components/link'
import { Button } from '@/components/ui/button'
import { useAccount } from '@/hooks/use-account'
import { useStaticText } from '@/hooks/use-static-text'
import { Routes } from '@/routes'
import { toCapitalize } from '@/utils/string'
import { generateTestId } from '@/utils/test'

import { useParticipantData } from '../../data/use-participant-data'

export const NeedToCreateInnovationIdeaHero = () => {
  const lymanId = 'participant-need-to-create-innovation-idea'
  const { account } = useAccount()
  const {
    sessions: { data },
    campaignEndDate,
  } = useParticipantData()
  const difference =
    campaignEndDate && differenceInDays(campaignEndDate, new Date())
  const postfix = difference === 1 ? ' day.' : ' days.'
  const allSessionsCompletedText = useStaticText(
    'training_portal_page.hero_text.need_to_create_innovation_idea',
    {
      name: toCapitalize(account?.firstName),
      campaignEndDateRelativeDays: campaignEndDate
        ? differenceInDays(campaignEndDate, new Date())
        : undefined,
    },
  )
  return (
    <HeroSection
      text={allSessionsCompletedText + postfix}
      lymanId={lymanId}
      hasNavbar={false}
    >
      <Button className={'mt-s64'} asChild>
        <Link
          to={Routes.SESSION_RECAP_MODAL}
          params={{ id: data[data.length - 1].id }}
          {...generateTestId('create-innovation-idea-modal-btn')}
        >
          Let’s go! →
        </Link>
      </Button>
    </HeroSection>
  )
}
