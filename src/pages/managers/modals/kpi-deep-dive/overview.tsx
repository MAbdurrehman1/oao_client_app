import { DiveDeeper } from './components/dive-deeper'
import { IntroText } from './components/intro-text'
import { ModalPageHeader } from './components/page-header'
import { ScoreAndComparison } from './components/score-and-comparison'

export const KpiDeepDiveModalOverview = () => {
  return (
    <>
      <ModalPageHeader>overview</ModalPageHeader>
      <IntroText />
      <ScoreAndComparison />
      <DiveDeeper />
    </>
  )
}
