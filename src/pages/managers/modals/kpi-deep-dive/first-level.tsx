import { useParams } from 'react-router'

import { DiveDeeper } from './components/dive-deeper'
import { IntroText } from './components/intro-text'
import { ModalPageHeader } from './components/page-header'
import { ScoreAndComparison } from './components/score-and-comparison'

export const KpiDeepDiveModalFirstLevel = () => {
  const { level } = useParams<{
    level: string
  }>()
  return (
    <>
      <ModalPageHeader>{level?.split('-').join(' ')}</ModalPageHeader>
      <IntroText />
      <ScoreAndComparison />
      <DiveDeeper />
    </>
  )
}
