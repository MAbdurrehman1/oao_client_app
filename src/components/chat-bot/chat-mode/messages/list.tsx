import {
  type Message,
  MessageTypeEnum,
  type UserMessage as UserMessageType,
} from '@/store/slices/conversations/types'

import { AiMessage } from './ai-message'
import { ErrorMessage } from './error-message'
import { LoadingMessage } from './loading-message'
import { StatusMessage } from './status-message'
import { UserMessage } from './user-message'

export const MessagesList = ({ messages }: { messages: Message[] }) => {
  return messages.map((message, index) => {
    const isLastItem = index === messages.length - 1
    switch (message.type) {
      case MessageTypeEnum.USER: {
        return (
          <UserMessage
            key={message.id}
            message={message}
            nextMessage={messages[index + 1]}
          />
        )
      }
      case MessageTypeEnum.AI: {
        return (
          <AiMessage
            key={message.id}
            message={message}
            isLastItem={isLastItem}
          />
        )
      }
      case MessageTypeEnum.ERROR: {
        return (
          <ErrorMessage
            key={message.id}
            message={message}
            originalMessage={
              messages.find(
                (m) => m.id === message.originalMessageId,
              )! as UserMessageType
            }
            isLastItem={isLastItem}
          />
        )
      }
      case MessageTypeEnum.LOADING: {
        return (
          <LoadingMessage
            key={message.id}
            message={message}
            isLastItem={isLastItem}
          />
        )
      }
      case MessageTypeEnum.STATUS: {
        return <StatusMessage key={message.id} message={message} />
      }
    }
  })
}
