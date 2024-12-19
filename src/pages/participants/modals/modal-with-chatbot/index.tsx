import { type ReactNode, useRef } from 'react'

import { RouteDialog } from '@/components/route-dialog'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Routes } from '@/routes'
import { useAppSelector } from '@/store/hooks'
import { selectChatbotFullDisplay } from '@/store/slices/chatbot/selectors'
import { type ConversationGoals } from '@/store/slices/conversations/types'

import { ChatBotSection } from '../modal-with-chatbot/chat-bot-section'

export const ModalWithChatbot = ({
  chatBotId,
  chatBotGoal,
  topSection,
  leftSection,
  rightSection,
  title,
  onGoalAcheivedCallback,
}: {
  chatBotId: string
  chatBotGoal: ConversationGoals
  title: ReactNode
  topSection: {
    text: string
    lymanId: string
  }
  leftSection: ReactNode
  rightSection?: ReactNode
  onGoalAcheivedCallback?: () => void
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  const chatbotFullDisplay = useAppSelector((state) =>
    selectChatbotFullDisplay(state),
  )

  const getChatBotSection = () => {
    return (
      <ChatBotSection
        chatBotId={chatBotId}
        conversationGoal={chatBotGoal}
        onGoalAcheivedCallback={() => {
          onGoalAcheivedCallback?.()
          dialogRef.current?.scrollTo({ top: 1 })
        }}
      />
    )
  }

  return (
    <RouteDialog navigationFallbackRoute={Routes.PARTICIPANTS_INDEX}>
      <DialogContent
        ref={dialogRef}
        header={
          !chatbotFullDisplay && (
            <DialogTitle
              className={`
                md:text-s32
                lg:text-s40
              `}
            >
              {title}
            </DialogTitle>
          )
        }
      >
        {chatbotFullDisplay && getChatBotSection()}
        {!chatbotFullDisplay && (
          <TypewritterWithGradient
            shouldStart={true}
            className="md:pl-6"
            lymanId={topSection.lymanId}
            text={topSection.text}
          >
            <div
              className={`
                relative mt-s24 grid grid-cols-1 gap-s24
                md:grid-cols-2
                lg:mt-s64 lg:gap-s64
              `}
            >
              {leftSection}
              {rightSection ?? getChatBotSection()}
            </div>
          </TypewritterWithGradient>
        )}
      </DialogContent>
    </RouteDialog>
  )
}
