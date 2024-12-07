import { useCallback, useMemo } from 'react'

import { MessageTypeEnum } from '@/store/slices/conversations/types'

import { EditForm } from './form'
import { useChat } from '../use-chat'

export const EditMode = () => {
  const { newMessage, messages, setIsEditMode } = useChat()
  const lastMessage = useMemo(() => messages[messages.length - 1], [messages])
  const editModeButtonCallback = useCallback(
    ({ isApproved }: { isApproved: boolean }) => {
      void newMessage({
        type: MessageTypeEnum.STATUS,
        isApproved,
        name: 'Recommendation',
      })
      setIsEditMode(false)
    },
    [newMessage, setIsEditMode],
  )
  const doesLastMessageHasAction =
    lastMessage?.type === MessageTypeEnum.AI && lastMessage.hasRecommendation
  return (
    <div
      className={`
        size-full bg-grey-900 text-brand-color-white shadow-main
        md:rounded-md
      `}
    >
      {doesLastMessageHasAction && (
        <EditForm
          lastMessage={lastMessage}
          onSaveButtonClick={() => {
            editModeButtonCallback({ isApproved: true })
          }}
          onDeleteButtonClick={() =>
            editModeButtonCallback({ isApproved: false })
          }
        />
      )}
    </div>
  )
}
