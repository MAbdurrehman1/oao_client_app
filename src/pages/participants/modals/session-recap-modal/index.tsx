import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from '@/components/loading'
import { Typography } from '@/components/ui/typography'
import { useAccount } from '@/hooks/use-account'
import { useStaticText } from '@/hooks/use-static-text'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'
import { ConversationGoals } from '@/store/slices/conversations/types'

import { ContentSummary } from './content-summary'
import { InnovationIdeaDetails } from './innovation-idea-details'
import { ModalWithChatbot } from '../modal-with-chatbot'

export const SessionRecapModal = () => {
  const { id } = useParams()
  if (!id) throw `SessionRecapModal: "id" must be provided`
  const { sessions, innovationIdea } = useParticipantData()
  const session = sessions.data.find((s) => s.id === parseInt(id))
  const isInnovationIdea = useMemo(
    () => session?.order === sessions.data.length && !!innovationIdea.data,
    [session?.order, innovationIdea, sessions.data.length],
  )
  const { account } = useAccount()
  const textParams = {
    firstName: account!.firstName,
    companyName: account!.organizationName,
  }
  const sessionOrder = session?.order ?? 1
  const text = useStaticText(
    sessionOrder === 3
      ? `training_portal_page.recap-session-3`
      : 'training_portal_page.recap-session-1-2-deep-dives',
    textParams,
  )
  const lymanId = `session-recap-${id}`
  return (
    <ModalWithChatbot
      chatBotId={`session-${id}`}
      chatBotGoal={
        sessionOrder === 3
          ? ConversationGoals.INNOVATION_IDEA
          : ConversationGoals.GENERAL
      }
      onGoalAcheivedCallback={
        sessionOrder === 3 ? () => void innovationIdea.refetch() : () => null
      }
      title={
        <div className="flex flex-row space-x-s16">
          <Typography
            size="s20"
            className={`
              md:text-s32
              lg:text-s40
            `}
          >
            <b>Session {session?.order}:</b> {session?.title}
          </Typography>
        </div>
      }
      topSection={{
        text,
        lymanId,
      }}
      leftSection={session ? <ContentSummary {...session} /> : <Loading />}
      rightSection={
        innovationIdea.isLoading ? (
          <Loading />
        ) : isInnovationIdea && session ? (
          <InnovationIdeaDetails />
        ) : null
      }
    />
  )
}
