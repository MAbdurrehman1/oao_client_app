import { SectionContainer } from '@/components/layout/section-container'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { useAccount } from '@/hooks/use-account'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { useStaticText } from '@/hooks/use-static-text'
import { SectionsEnum } from '@/pages/managers/types'
import { toCapitalize } from '@/utils/string'

import { ExploreInnovations } from './explore-innovations'
import { InnovationIdeasMatrix } from './matrix'

export const InnovationIdeasSection = () => {
  const { activeSection } = useLayoutContext()
  const { account } = useAccount()
  const introText = useStaticText('report_page.innovation_ideas.intro_text', {
    firstName: toCapitalize(account?.firstName),
  })
  return (
    <SectionContainer
      className={`
        !px-s16
        md:!px-s24
        xl:!px-s128
      `}
    >
      <TypewritterWithGradient
        shouldStart={activeSection === SectionsEnum.INNOVATION_IDEAS}
        className="my-s64 pl-2.5"
        lymanId="innovation-ideas-matrix"
        text={introText}
        revealableProps={{
          withButton: true,
        }}
      >
        <InnovationIdeasMatrix />
      </TypewritterWithGradient>
      <TypewritterWithGradient
        shouldStart={activeSection === SectionsEnum.INNOVATION_IDEAS}
        className="my-s64 pl-2.5"
        lymanId="innovation-ideas"
        text={introText}
        revealableProps={{
          withButton: true,
        }}
      >
        <ExploreInnovations />
      </TypewritterWithGradient>
    </SectionContainer>
  )
}
