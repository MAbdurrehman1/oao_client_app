import { useMemo } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Rocket } from 'lucide-react'

import { Loading } from '@/components/loading'
import { fadeInUpVariant } from '@/components/motion-variants'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { MarkdownParser } from '@/components/ui/markdown-parser'
import { Typography } from '@/components/ui/typography'
import {
  AiMessageStatusEnum,
  type AllAiMessageTypes,
} from '@/store/slices/conversations/types'
import { generateTestId } from '@/utils/test'

import { type MessageRenderer } from './types'
import { useChat } from '../../use-chat'

const AnimatedButton = m(Button)

export const AiMessage = ({
  isLastItem,
  message,
}: MessageRenderer<AllAiMessageTypes> & {
  isLastItem: boolean
}) => {
  const {
    setIsEditMode,
    submitInnovationIdea,
    isCreatingInnovationIdea,
    conversationEnded,
  } = useChat()

  const doesLastMessageHasRecommendation = useMemo(() => {
    if (!isLastItem) return false
    return message.hasRecommendation
  }, [isLastItem, message.hasRecommendation])

  const doesLastMessageHasInnovationIdea = useMemo(() => {
    if (!isLastItem) return false
    return message.hasInnovationIdea
  }, [isLastItem, message.hasInnovationIdea])

  const renderMessageContent = useMemo(
    () => () => {
      const hasTitle = message.hasRecommendation || message.hasInnovationIdea
      return (
        <>
          {hasTitle && (
            <Typography weight="bold" size="s24" className="mb-s24">
              {message.title}
            </Typography>
          )}
          <Typography weight="default" size="s16">
            <MarkdownParser>{message.content}</MarkdownParser>
            {message.status === AiMessageStatusEnum.ABORTED && (
              <Typography size="s12" className="relative -top-px text-grey-600">
                - Aborted
              </Typography>
            )}
          </Typography>
        </>
      )
    },
    [message],
  )

  const renderRecommendationSaveButton = useMemo(
    () => () => {
      if (!doesLastMessageHasRecommendation) return null
      return (
        <div className="flex w-full items-center justify-center">
          <AnimatedButton
            {...fadeInUpVariant}
            onClick={() => setIsEditMode(true)}
            {...generateTestId('edit-recommendation-btn')}
            className={`
              mx-auto h-28 min-w-52 shrink-0 flex-col items-start
              justify-between space-y-s16 border-grey-200 px-3 py-s16 text-sm
              tracking-normal text-grey-600
              lg:w-2/3
            `}
          >
            <Icon name="download" className="size-5" />
            <span>Edit and Save to library</span>
          </AnimatedButton>
        </div>
      )
    },
    [doesLastMessageHasRecommendation, setIsEditMode],
  )

  const renderInnovationIdeaSaveInfo = useMemo(
    () => () => {
      if (!doesLastMessageHasInnovationIdea || conversationEnded) return null
      return (
        <AnimatePresence>
          <div className="mt-s24 flex w-full items-center justify-center">
            <AnimatedButton
              {...fadeInUpVariant}
              onClick={() => void submitInnovationIdea()}
              className={`
                mx-auto min-w-52 shrink-0 flex-row items-center space-x-s8
                border-grey-200 px-3 py-s16 text-sm tracking-normal
                text-grey-600
                lg:w-2/3
              `}
            >
              {isCreatingInnovationIdea ? (
                <Loading inline />
              ) : (
                <Rocket size={16} />
              )}
              <span>Submit Innovation Idea</span>
            </AnimatedButton>
          </div>
        </AnimatePresence>
      )
    },
    [
      conversationEnded,
      doesLastMessageHasInnovationIdea,
      isCreatingInnovationIdea,
      submitInnovationIdea,
    ],
  )

  return (
    <>
      <div className="mb-s24 flex flex-col justify-start pl-s32">
        {renderMessageContent()}
        {renderInnovationIdeaSaveInfo()}
      </div>
      {renderRecommendationSaveButton()}
    </>
  )
}
