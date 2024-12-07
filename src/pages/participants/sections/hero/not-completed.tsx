import { useState } from 'react'
import { format } from 'date-fns'

import { HeroSection } from '@/components/layout/hero-section'
import { Button } from '@/components/ui/button'
import { useAccount } from '@/hooks/use-account'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { useStaticText } from '@/hooks/use-static-text'
import { useAppSelector } from '@/store/hooks'
import { selectLymanAnimationsVisited } from '@/store/slices/animations/selectors'
import { getSectionSlugFromTitle, toCapitalize } from '@/utils/string'
import { cn } from '@/utils/styles'

import { useParticipantData } from '../../data/use-participant-data'
import { SectionsEnum, SessionStatusEnum } from '../../types'

export const NotCompletedHero = () => {
  const lymanId = 'participant-not-completed'
  const isAnimationShown = useAppSelector((state) =>
    selectLymanAnimationsVisited(state, lymanId),
  )
  const [isButtonDismissed, setIsButtonDismissed] =
    useState<boolean>(isAnimationShown)
  const { scrollToSection } = useLayoutContext()

  const { selectedDates, sessions } = useParticipantData()
  const { account } = useAccount()
  const inProgressSession = sessions.data.find(
    (s) => s.status === SessionStatusEnum.IN_PROGRESS,
  )
  const nextSessionDateTime = selectedDates.data.find(
    (s) => s.sessionId === inProgressSession?.id,
  )?.selectedDate
  const hasNotCompletedYetText = useStaticText(
    'training_portal_page.hero_text.core_modules_unfinished',
    {
      name: toCapitalize(account?.firstName),
      sessionDateTime:
        nextSessionDateTime && format(nextSessionDateTime, 'LLL dd'),
    },
  )
  if (!nextSessionDateTime) return null
  return (
    <HeroSection
      text={hasNotCompletedYetText}
      lymanId={lymanId}
      hasNavbar={false}
    >
      <Button
        className={cn(
          'mt-s64',
          isButtonDismissed && 'pointer-events-none !mt-0 opacity-0',
        )}
        onClick={() => {
          setIsButtonDismissed(true)
          scrollToSection(getSectionSlugFromTitle(SectionsEnum.YOUR_SESSIONS))
        }}
      >
        Got it →
      </Button>
    </HeroSection>
  )
}
