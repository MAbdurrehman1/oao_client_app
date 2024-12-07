import { useState } from 'react'

import { SectionContainer } from '@/components/layout/section-container'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { useAccount } from '@/hooks/use-account'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { useStaticText } from '@/hooks/use-static-text'
import { SectionsEnum } from '@/pages/participants/types'
import { toCapitalize } from '@/utils/string'

import { DeepDiveAccordions } from './accordions'

export const DeepDives = () => {
  const [revealButtonClicked, setRevealButtonClicked] = useState<boolean>(false)
  const { activeSection } = useLayoutContext()
  const { account } = useAccount()
  const lymanId = 'deep-dives'
  const text = useStaticText(`training_portal_page.deep_dives.intro_text`, {
    name: toCapitalize(account?.firstName),
    companyName: toCapitalize(account?.organizationName),
  })
  return (
    <SectionContainer>
      <TypewritterWithGradient
        shouldStart={activeSection === SectionsEnum.DEEP_DIVES}
        className="py-s64 pl-2.5"
        lymanId={lymanId}
        text={text}
        revealableProps={{
          withButton: true,
          onButtonClickCallback: () => setRevealButtonClicked(true),
        }}
      >
        <DeepDiveAccordions forceOpen={revealButtonClicked} />
      </TypewritterWithGradient>
    </SectionContainer>
  )
}
