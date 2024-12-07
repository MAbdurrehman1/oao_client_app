import { type IReportDataContext } from '@/pages/managers/report-data/context'
import { type InnovationIdea } from '@/types'

export type OnSaveRecommendationInChatModeButtonClick = () => void
export type OnSaveRecommendationInEditModeButtonClick =
  IReportDataContext['createNewRecommendation']

export enum MessageTypeEnum {
  USER = 'user',
  AI = 'ai',
  LOADING = 'loading',
  STATUS = 'status',
  ERROR = 'error',
}

export interface ChatBotMessage {
  id: number
  type: MessageTypeEnum
}

export interface LoadingMessage extends ChatBotMessage {
  type: MessageTypeEnum.LOADING
}

export interface UserMessage extends ChatBotMessage {
  type: MessageTypeEnum.USER
  content: string
}

export enum AiMessageStatusEnum {
  STREAMING = 'streaming',
  DONE = 'done',
  ABORTED = 'aborted',
}
export interface AiMessage extends ChatBotMessage {
  type: MessageTypeEnum.AI
  content: string // rich text
  hasRecommendation: boolean
  hasInnovationIdea: boolean
  status: AiMessageStatusEnum
}
export interface AiNormalMessage extends AiMessage {
  hasRecommendation: false
  hasInnovationIdea: false
}

export interface AiRecommendation extends AiMessage {
  title: string
  hasRecommendation: true
}
export interface AiInnovationIdea extends AiMessage {
  title: string
  hasInnovationIdea: true
  scores: InnovationIdea['metadata']
}

export interface ErrorMessage extends ChatBotMessage {
  type: MessageTypeEnum.ERROR
  content: string
  retriable: boolean
  originalMessageId: number
}

export type AllAiMessageTypes =
  | AiNormalMessage
  | AiRecommendation
  | AiInnovationIdea

export interface Status extends ChatBotMessage {
  type: MessageTypeEnum.STATUS
  isApproved: boolean
  name: string
}

export type Message =
  | LoadingMessage
  | UserMessage
  | AllAiMessageTypes
  | Status
  | ErrorMessage

export enum ConversationGoals {
  INNOVATION_IDEA = 'innovation_idea',
  RECOMMENDATION = 'recommendation',
  GENERAL = 'general',
  CUSTOM = 'custom',
}

export type Conversation = {
  // frontend identifier
  chatBotId: string
  // llm id
  id: string | null
  streamId?: number
  messages: Message[]
  ended?: boolean
}

export type ConversationsState = Array<Conversation>
