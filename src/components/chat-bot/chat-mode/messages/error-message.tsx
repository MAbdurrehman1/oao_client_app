import { RefreshCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/hooks'
import { removeConversationMessage } from '@/store/slices/conversations'
import {
  type ErrorMessage as ErrorMessageType,
  type UserMessage,
} from '@/store/slices/conversations/types'
import { generateTestId } from '@/utils/test'

import { type MessageRenderer } from './types'
import { useChat } from '../../use-chat'

export const ErrorMessage = ({
  isLastItem,
  message,
  originalMessage,
}: MessageRenderer<ErrorMessageType> & {
  isLastItem: boolean
  originalMessage: UserMessage
}) => {
  const { chatBotId, sendUserMessage } = useChat()
  const dispatch = useAppDispatch()
  return (
    <div className={`mb-s24 flex flex-col pl-s32 pt-px`}>
      <span className="text-sm text-grey-600">{message.content}</span>
      {message.retriable && isLastItem && (
        <Button
          className="w-32 px-s8 text-sm"
          onClick={() => {
            void sendUserMessage(originalMessage)
            dispatch(removeConversationMessage({ id: message.id, chatBotId }))
          }}
          variant="ghost"
          {...generateTestId('error-message-btn')}
        >
          <RefreshCcw size={14} className="mr-s8" />
          Try again
        </Button>
      )}
    </div>
  )
}
