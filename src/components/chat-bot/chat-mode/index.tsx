import { memo } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import { cn } from '@/utils/styles'
import { generateTestId } from '@/utils/test'

import { AiAvatar } from './ai-indicator/avatar'
import { AiIndicatorInitialAnimation } from './ai-indicator/initial-animation'
import { MessagesList } from './messages/list'
import { ChatBotForm } from './form'
import { useChat } from '../use-chat'

export const ChatMode = memo(() => {
  const { messages, startConversation, conversationEnded } = useChat()
  return (
    <div
      {...generateTestId(
        messages.length ? 'chatbot-ready' : 'chatbot-initializing',
      )}
      className={cn(
        `
          flex h-full flex-col items-start justify-between pb-s24
          md:rounded-md md:border md:border-brand-color-black md:pb-s32
          lg:pb-s64
        `,
        conversationEnded &&
          `
            !pb-0
            md:!pb-0
            lg:!pb-0
          `,
      )}
    >
      <ScrollToBottom
        className={cn('size-full px-s8', !conversationEnded && 'pb-[3.125rem]')}
        followButtonClassName="hidden"
        checkInterval={17}
      >
        <div
          className={`
            relative size-full flex-1 p-s32
            lg:p-s64
          `}
        >
          {messages.length === 0 ? (
            <AiIndicatorInitialAnimation
              onAnimationEndCallback={startConversation}
            />
          ) : (
            <AiAvatar withoutAnimations isLoading={false} />
          )}
          <MessagesList messages={messages} />
          {conversationEnded && (
            <div
              className={`
                mb-s32 flex w-full items-center justify-center text-xs
                text-grey-600
              `}
            >
              This conversation has ended.
            </div>
          )}
          <div
            className={`
              h-s24
              md:h-s32
              lg:h-s64
            `}
          />
        </div>
        {!conversationEnded && (
          <div
            className={`
              absolute inset-x-0 bottom-0 w-full px-s24
              md:px-s32
              lg:px-s64
            `}
          >
            <ChatBotForm />
          </div>
        )}
      </ScrollToBottom>
    </div>
  )
})
