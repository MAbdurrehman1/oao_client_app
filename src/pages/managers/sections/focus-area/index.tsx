import { useState } from 'react'

import { SectionContainer } from '@/components/layout/section-container'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { useAccount } from '@/hooks/use-account'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { useStaticText } from '@/hooks/use-static-text'
import { SectionsEnum } from '@/pages/managers/types'
import { toCapitalize } from '@/utils/string'

import FocusAreaAccordion from './focus-area-accordion'

export default function FocusArea() {
  const { activeSection, enableAnimations } = useLayoutContext()
  const [openFirstAccordion, setOpenFirstAccordion] =
    useState<boolean>(!enableAnimations)
  const { account } = useAccount()
  const introText = useStaticText('report_page.focus_area.intro_text', {
    firstName: toCapitalize(account?.firstName),
  })
  return (
    <SectionContainer>
      <TypewritterWithGradient
        shouldStart={activeSection === SectionsEnum.FOCUS_AREA}
        className="my-s64"
        lymanId="focus-area"
        text={introText}
        revealableProps={{
          className: 'py-s64',
          withButton: true,
          onButtonClickCallback: () => setOpenFirstAccordion(true),
        }}
      >
        <FocusAreaAccordion
          forceFirstAccordionToBeOpened={
            enableAnimations ? openFirstAccordion : true
          }
        />
      </TypewritterWithGradient>
    </SectionContainer>
  )
}
