import { Suspense } from 'react'

import { ChatBotLoader } from '@/components/chat-bot/loader'
import { DIALOG_CONTENT_HEIGHT_CSS_VAR } from '@/components/ui/dialog/content'
import { useTailwindBreakpoint } from '@/hooks/use-tailwind-breakpoint'
import { type ConversationGoals } from '@/store/slices/conversations/types'

void ChatBotLoader.preload()

export const ChatBotSection = ({
  chatBotId,
  conversationGoal,
  onGoalAcheivedCallback,
}: {
  chatBotId: string
  conversationGoal: ConversationGoals
  onGoalAcheivedCallback?: () => void
}) => {
  const isTablet = useTailwindBreakpoint({ mode: 'max', breakpoint: 'lg' })
  const margins = {
    md: 24,
    lg: 64,
  }
  return (
    <Suspense fallback={null}>
      <ChatBotLoader
        chatBotId={chatBotId}
        goal={conversationGoal}
        onGoalAcheivedCallback={onGoalAcheivedCallback}
        shouldMobileButtonBeVisible={true}
        wrappers={{
          desktop: ({ children }) => (
            <div
              className="sticky top-0 w-full transition-all"
              style={{
                height: `calc(var(${DIALOG_CONTENT_HEIGHT_CSS_VAR}) - ${
                  (isTablet ? margins.md : margins.lg) * 2
                }px)`,
              }}
            >
              {children}
            </div>
          ),
        }}
      />
    </Suspense>
  )
}
