import { useCallback } from 'react'

import apiClient from '@/api/client'
import { apiBaseUrls } from '@/api/config'
import { LlmApiEndpoints } from '@/api/endpoints'
import LogoBlack from '@/assets/images/logo-black.png'
import { ChatBotLoader } from '@/components/chat-bot/loader'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { Image } from '@/components/ui/image'
import { Typography } from '@/components/ui/typography'
import { useStaticText } from '@/hooks/use-static-text'
import { useAppDispatch } from '@/store/hooks'
import { removeConversation } from '@/store/slices/conversations'
import {
  type AiInnovationIdea,
  type Conversation,
  ConversationGoals,
} from '@/store/slices/conversations/types'
import { type InnovationIdea, type LoadableData } from '@/types'
import { toCapitalize } from '@/utils/string'

import { InnovationIdeaDetails } from './innovation-idea-details'

export const InnovationGuidePageChatbot = ({
  email,
  innovationIdea,
  onSuccess,
}: {
  email: string
  innovationIdea: LoadableData<InnovationIdea>
  onSuccess: () => void
}) => {
  const info = useStaticText('innovation_guide_page.innovation-guide', {
    firstName: toCapitalize(email.split('.')[0]),
  })
  const createInnovationIdea = useCallback(
    async (message: AiInnovationIdea, conversation: Conversation) => {
      await apiClient.post(
        LlmApiEndpoints.CREATE_INNOVATION_IDEA,
        {
          title: message.title,
          description: message.content,
          feasibility_score: message.scores.feasibility,
          confidence_score: message.scores.confidence,
          impact_score: message.scores.impact,
          user_email: email,
          conversation_id: conversation.id,
        },
        {
          baseURL: apiBaseUrls.llm,
        },
      )
      return Promise.resolve()
    },
    [email],
  )
  const chatBotId = 'distinct-innovation-idea-' + email
  const dispatch = useAppDispatch()
  return (
    <>
      <header className="fixed top-0 z-20 w-full border-b bg-background">
        <div
          className={`
            container flex w-full flex-row items-center justify-between px-s24
            py-s16
          `}
        >
          <div
            className="flex cursor-pointer flex-row items-center space-x-s16"
            onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
          >
            <Image src={LogoBlack} className="h-s24" />
          </div>
        </div>
      </header>
      {!innovationIdea.isLoading && innovationIdea.data.length ? (
        <InnovationIdeaDetails innovationIdea={innovationIdea.data[0]} />
      ) : (
        <div className="container h-screen w-full space-y-s24 pt-s128">
          <Typography
            weight="bold"
            size="s24"
            className={`
              md:text-s32
              lg:text-s40
            `}
          >
            Create an Innovation Idea
          </Typography>
          <TypewritterWithGradient
            lymanId={chatBotId}
            className="mt-s24"
            text={info}
            shouldStart={true}
          >
            <ChatBotLoader
              chatBotId={chatBotId}
              goal={ConversationGoals.INNOVATION_IDEA}
              shouldMobileButtonBeVisible={false}
              onGoalAcheivedCallback={() => {
                onSuccess()
                dispatch(removeConversation({ chatBotId }))
              }}
              createInnovationIdeaFn={createInnovationIdea}
              newMessageApiConfig={{
                requestUrl:
                  LlmApiEndpoints.DISTINCT_INNOVATION_IDEA_CHAT_SEND_MESSAGE,
                requestBodyExtras: { user_email: email },
              }}
              wrappers={{
                desktop: ({ children }) => (
                  <div className="h-[90dvh] w-full py-s24">
                    <div className="mb-s64 size-full transition-all">
                      {children}
                    </div>
                  </div>
                ),
                mobile: ({ children }) => (
                  <div className="h-[90dvh] w-full py-s24">
                    <div className="size-full rounded-md border border-brand-color-black transition-all">
                      {children}
                    </div>
                  </div>
                ),
              }}
            />
          </TypewritterWithGradient>
        </div>
      )}
    </>
  )
}
