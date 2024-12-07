import { useParams } from 'react-router'

import { RichText } from '@/components/ui/rich-text'

import { IntroText } from './components/intro-text'
import { ModalPageHeader } from './components/page-header'
import { ScoreAndComparison } from './components/score-and-comparison'
import { SectionTitle } from './components/section-title'

export const KpiDeepDiveModalSecondLevel = () => {
  const { subLevel } = useParams<{
    subLevel: string
    // TODO: we might not even need id and level here
    // level: string
    // id: string
  }>()
  return (
    <>
      <ModalPageHeader>{subLevel?.split('-').join(' ')}</ModalPageHeader>
      <IntroText />
      <ScoreAndComparison />
      <SectionTitle>What's driving this score</SectionTitle>
      <div className="my-s64">
        <RichText>
          {`
          <h4>External Orientation</h4>
          <p>Your team shows a [level] awareness of external
          threats and opportunities. This [aligns/contrasts] with overall company
          trends.</p>
          <br />
          <h4>Priority of Data and AI</h4> 
          <p>There's a [level] priority placed on
          data and AI initiatives within your team. This [matches/differs from]
          what we're seeing across the industry.</p>
          <br />
          <h4>Extra Effort</h4> 
          <p>The willingness to
          go the extra mile for transformation is [level]. This [is/isn't]
          consistent with what we're observing in other high-performing units.
          </p>
        `}
        </RichText>
      </div>
    </>
  )
}
