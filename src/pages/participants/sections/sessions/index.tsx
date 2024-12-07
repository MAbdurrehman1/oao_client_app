import { SectionContainer } from '@/components/layout/section-container'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { useAccount } from '@/hooks/use-account'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { useStaticText } from '@/hooks/use-static-text'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'
import { SectionsEnum } from '@/pages/participants/types'
import { toCapitalize } from '@/utils/string'

import { SessionCard } from './card'

export const Sessions = () => {
  const { activeSection } = useLayoutContext()
  const { account } = useAccount()
  const { sessions } = useParticipantData()
  const text = useStaticText('training_portal_page.your_sessions.intro_text', {
    companyName: toCapitalize(account?.organizationName),
  })
  return (
    <SectionContainer>
      <TypewritterWithGradient
        shouldStart={activeSection === SectionsEnum.YOUR_SESSIONS}
        className="py-s64 pl-2.5"
        lymanId="sessions"
        text={text}
        revealableProps={{
          className: `
          -mx-s24 flex flex-row flex-nowrap overflow-x-auto pb-s24 pl-s16
          md:pl-s24
          lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-s32 lg:pb-0 lg:pl-0 lg:pt-s64
        `,
        }}
      >
        {sessions.data.map((c, index) => (
          <SessionCard key={index} {...c} />
        ))}
      </TypewritterWithGradient>
    </SectionContainer>
  )
}
