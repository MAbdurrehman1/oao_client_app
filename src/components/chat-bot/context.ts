import { createContext } from 'react'

import {
  type Message,
  type UserMessage,
} from '@/store/slices/conversations/types'
import { type UnionOmit } from '@/types/helpers'

export const ChatBotModels = ['chatgpt', 'claude'] as const
export type ChatBotModel = (typeof ChatBotModels)[number]

export interface IChatBotContext {
  isStreaming: boolean
  chatBotId: string
  startConversation: () => void
  messages: Message[]
  newMessage: (message: UnionOmit<Message, 'id'>) => Promise<void>
  sendUserMessage: (message: UserMessage) => Promise<void>
  onApproveButtonCallback?: ({
    title,
    description,
  }: {
    title: string
    description: string
  }) => Promise<void>
  isEditMode: boolean
  isCreatingInnovationIdea: boolean
  shouldMobileButtonBeVisible: boolean
  conversationEnded: boolean
  setIsEditMode: (editMode: boolean) => void
  cancelStream: () => void
  submitInnovationIdea: () => Promise<void>
}

export const ChatBotContext = createContext<IChatBotContext | null>(null)
