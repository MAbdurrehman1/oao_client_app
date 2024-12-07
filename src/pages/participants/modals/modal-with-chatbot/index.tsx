import { type ReactNode, useRef } from 'react'

import { RouteDialog } from '@/components/route-dialog'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Routes } from '@/routes'
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
  return (
    <RouteDialog navigationFallbackRoute={Routes.PARTICIPANTS_INDEX}>
      <DialogContent
        ref={dialogRef}
        header={
          <DialogTitle
            className={`
              md:text-s32
              lg:text-s40
            `}
          >
            {title}
          </DialogTitle>
        }
      >
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
            {rightSection ?? (
              <ChatBotSection
                chatBotId={chatBotId}
                conversationGoal={chatBotGoal}
                onGoalAcheivedCallback={() => {
                  onGoalAcheivedCallback?.()
                  dialogRef.current?.scrollTo({ top: 1 })
                }}
              />
            )}
          </div>
        </TypewritterWithGradient>
      </DialogContent>
    </RouteDialog>
  )
}
