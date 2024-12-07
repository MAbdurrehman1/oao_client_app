import { useParams } from 'react-router-dom'

import { Loading } from '@/components/loading'
import { Typography } from '@/components/ui/typography'
import { useAccount } from '@/hooks/use-account'
import { useStaticText } from '@/hooks/use-static-text'
import { ConversationGoals } from '@/store/slices/conversations/types'

import { OaoContentDetails } from './details'
import { useDeepDiveInformation } from '../../hooks/use-deep-dive-information'
import { ModalWithChatbot } from '../modal-with-chatbot'

export const OaoContentModal = () => {
  const { id, deepDiveId } = useParams()
  if (!id || !deepDiveId)
    throw `OaoContentModal: "id" and "deepDiveId" must be provided`
  const { oaoContents } = useDeepDiveInformation(deepDiveId)
  const info = oaoContents.data.find(
    (o) => o.deepDiveId === parseInt(deepDiveId),
  )
  const { account } = useAccount()
  const text = useStaticText(
    'training_portal_page.recap-session-1-2-deep-dives',
    {
      firstName: account!.firstName,
    },
  )
  const lymanId = `deep-dives-${deepDiveId}-${id}`
  return (
    <ModalWithChatbot
      chatBotId={`oao-content-${id}`}
      chatBotGoal={ConversationGoals.GENERAL}
      title={
        <div className="flex flex-row space-x-s16">
          <Typography
            size="s20"
            className={`
              md:text-s32
              lg:text-s40
            `}
          >
            <b>Deep-Dive:</b> {info?.title}
          </Typography>
        </div>
      }
      topSection={{
        text,
        lymanId,
      }}
      leftSection={info ? <OaoContentDetails {...info} /> : <Loading />}
      rightSection={info ? null : <></>}
    />
  )
}
