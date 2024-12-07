import { useState } from 'react'

import { HeroSection } from '@/components/layout/hero-section'
import { Button } from '@/components/ui/button'
import { useAccount } from '@/hooks/use-account'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { useStaticText } from '@/hooks/use-static-text'
import { useAppSelector } from '@/store/hooks'
import { selectLymanAnimationsVisited } from '@/store/slices/animations/selectors'
import { getSectionSlugFromTitle, toCapitalize } from '@/utils/string'
import { cn } from '@/utils/styles'

import { SectionsEnum } from '../../types'

export const AllSessionsCompletedHero = () => {
  const lymanId = 'participant-completed'
  const isAnimationShown = useAppSelector((state) =>
    selectLymanAnimationsVisited(state, lymanId),
  )
  const [isButtonDismissed, setIsButtonDismissed] =
    useState<boolean>(isAnimationShown)
  const { scrollToSection } = useLayoutContext()

  const { account } = useAccount()
  const allSessionsCompletedText = useStaticText(
    'training_portal_page.hero_text.core_modules_finished',
    {
      name: toCapitalize(account?.firstName),
    },
  )
  return (
    <HeroSection
      text={allSessionsCompletedText}
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
          scrollToSection(getSectionSlugFromTitle(SectionsEnum.DEEP_DIVES))
        }}
      >
        Let’s look at the deep dives! →
      </Button>
    </HeroSection>
  )
}
