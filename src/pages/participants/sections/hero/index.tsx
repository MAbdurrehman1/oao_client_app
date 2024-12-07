import { FullscreenLoading } from '@/components/fullscreen-loading'

import { AllSessionsCompletedHero } from './completed'
import { NeedToCreateInnovationIdeaHero } from './no-innovation-idea'
import { NotCompletedHero } from './not-completed'
import { NotScheduledHero } from './not-scheduled'
import { SessionsProgressEnum } from '../../data/context'
import { useParticipantData } from '../../data/use-participant-data'

export const ParticipantsHeroSection = () => {
  const { sessions, progress } = useParticipantData()
  return sessions.data.length > 0 ? (
    progress === SessionsProgressEnum.NOT_SCHEDULED_YET ? (
      <NotScheduledHero />
    ) : progress === SessionsProgressEnum.NOT_COMPLETED_YET ? (
      <NotCompletedHero />
    ) : progress === SessionsProgressEnum.NO_INNOVATION_IDEA_YET ? (
      <NeedToCreateInnovationIdeaHero />
    ) : (
      <AllSessionsCompletedHero />
    )
  ) : (
    <FullscreenLoading />
  )
}
