import { Suspense, useMemo, useState } from 'react'

import { type ChatBotModel } from '@/components/chat-bot/context'
import { ChatBotLoader } from '@/components/chat-bot/loader'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppDispatch } from '@/store/hooks'
import { removeConversation } from '@/store/slices/conversations'
import { ConversationGoals } from '@/store/slices/conversations/types'
import { generateTestId } from '@/utils/test'

import { CustomPromptForm } from './custom-prompt-form'

void ChatBotLoader.preload()

export const ChatbotDemoPage = () => {
  const dispatch = useAppDispatch()
  const [selectedModel, setSelectedModel] = useState<ChatBotModel>('chatgpt')
  const [conversationGoal, setConversationGoal] = useState<ConversationGoals>(
    ConversationGoals.GENERAL,
  )
  const chatBotId = useMemo(
    () => `demo-${conversationGoal}`,
    [conversationGoal],
  )
  const [customPromptReady, setCustomPromptReady] = useState<boolean>(false)
  const shouldShowPromptForm = useMemo(
    () => conversationGoal === ConversationGoals.CUSTOM && !customPromptReady,
    [conversationGoal, customPromptReady],
  )
  return (
    <div
      className={`
        flex flex-col
        md:flex-row
      `}
    >
      <div className="w-80 flex-col space-y-8 p-8">
        <h3 className="">Chatbot demo</h3>
        <Button
          onClick={() => {
            if (conversationGoal === ConversationGoals.CUSTOM) {
              setCustomPromptReady(false)
            }
            dispatch(removeConversation({ chatBotId }))
          }}
        >
          Reset chat history
        </Button>
        <Select
          defaultValue={selectedModel}
          onValueChange={(value: ChatBotModel) => setSelectedModel(value)}
        >
          <SelectTrigger
            className={`
              h-9
              focus:bg-grey-50
            `}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chatgpt">Chat-GPT</SelectItem>
            <SelectItem value="claude">Claude</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={conversationGoal}
          onValueChange={(value: ConversationGoals) =>
            setConversationGoal(value)
          }
        >
          <SelectTrigger
            {...generateTestId('conversation-goal')}
            className={`
              h-9
              focus:bg-grey-50
            `}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ConversationGoals.GENERAL}>General</SelectItem>
            <SelectItem value={ConversationGoals.INNOVATION_IDEA}>
              Innovation Idea
            </SelectItem>
            <SelectItem value={ConversationGoals.RECOMMENDATION}>
              Recommendation
            </SelectItem>
            <SelectItem value="custom">Custom Prompt</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex-1">
        {shouldShowPromptForm ? (
          <CustomPromptForm
            onSubmitCallback={() => setCustomPromptReady(true)}
          />
        ) : (
          <Suspense fallback={<Loading className="h-full" />}>
            <ChatBotLoader
              chatBotId={chatBotId}
              goal={conversationGoal}
              model={selectedModel}
              onApproveButtonCallback={({ title, description }) => {
                console.log({ title, description })
                return Promise.resolve()
              }}
              shouldMobileButtonBeVisible={true}
              wrappers={{
                desktop: ({ children }) => (
                  <div className="h-screen p-8">{children}</div>
                ),
                mobile: ({ children }) => (
                  <div className="h-screen border">{children}</div>
                ),
              }}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}
