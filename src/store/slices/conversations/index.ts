import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { type InnovationIdea } from '@/types'

import {
  type AiInnovationIdea,
  type AiMessage,
  AiMessageStatusEnum,
  type AiRecommendation,
  type ConversationGoals,
  type ConversationsState,
  type Message,
} from './types'

const initialState: ConversationsState = [] satisfies ConversationsState

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    newConversation: (state, action: PayloadAction<{ chatBotId: string }>) => {
      const { chatBotId } = action.payload
      const stateConversation = state.find((c) => c.chatBotId === chatBotId)
      if (!stateConversation) {
        state.push({
          chatBotId,
          id: null,
          messages: [],
        })
      }
      return state
    },
    newConversationMessage: (
      state,
      action: PayloadAction<
        Message & {
          chatBotId: string
          conversationId?: string
          conversationGoal?: ConversationGoals
        }
      >,
    ) => {
      const { chatBotId, ...message } = action.payload
      const stateConversation = state.find(
        (conversation) => conversation.chatBotId === chatBotId,
      )!
      if (!stateConversation.id && !!action.payload.conversationId)
        stateConversation.id = action.payload.conversationId
      stateConversation.messages.push(message)
      return state
    },
    removeConversationMessage: (
      state,
      action: PayloadAction<{ id: Message['id']; chatBotId: string }>,
    ) => {
      const { chatBotId, id: messageId } = action.payload
      const conversation = state.find(
        (conversation) => conversation.chatBotId === chatBotId,
      )!
      conversation.messages = conversation.messages.filter(
        (msg) => msg.id !== messageId,
      )
      return state
    },
    updateAiResponse: (
      state,
      action: PayloadAction<{
        id: AiMessage['id']
        content: string
        chatBotId: string
        hasInnovationIdea?: boolean
        hasRecommendation?: boolean
        title?: string
        scores?: InnovationIdea['metadata']
        status?: AiMessageStatusEnum
      }>,
    ) => {
      const {
        chatBotId,
        id,
        content,
        hasRecommendation,
        hasInnovationIdea,
        title,
        scores,
        status,
      } = action.payload
      const conversation = state.find(
        (conversation) => conversation.chatBotId === chatBotId,
      )!
      const message = conversation.messages.find(
        (msg) => msg.id === id,
      ) as AiMessage
      message.content = content
      if (hasInnovationIdea) {
        message.hasInnovationIdea = true
        const innovationIdeaMessage = message as AiInnovationIdea
        if (title) innovationIdeaMessage.title = title
        if (scores) innovationIdeaMessage.scores = scores
      }
      if (hasRecommendation) {
        message.hasRecommendation = true
        const recommendationMessage = message as AiRecommendation
        if (title) recommendationMessage.title = title
      }
      if (status) {
        message.status = status
        if (status === AiMessageStatusEnum.DONE)
          conversation.streamId = undefined
      }
      return state
    },
    removeConversation: (
      state,
      action: PayloadAction<{
        chatBotId: string
      }>,
    ) => {
      const { chatBotId } = action.payload
      state = state.filter(
        (conversation) => conversation.chatBotId !== chatBotId,
      )
      return state
    },
    endConversation: (
      state,
      action: PayloadAction<{
        chatBotId: string
      }>,
    ) => {
      const { chatBotId } = action.payload
      state.find(
        (conversation) => conversation.chatBotId === chatBotId,
      )!.ended = true
      return state
    },
    setConversationStreamId: (
      state,
      action: PayloadAction<{
        chatBotId: string
        streamId: number
      }>,
    ) => {
      const { chatBotId, streamId } = action.payload
      state.find(
        (conversation) => conversation.chatBotId === chatBotId,
      )!.streamId = streamId
      return state
    },
    removeChatId: (
      state,
      action: PayloadAction<{
        chatBotId: string
      }>,
    ) => {
      const { chatBotId } = action.payload
      state.find((conversation) => conversation.chatBotId === chatBotId)!.id =
        null
      return state
    },
    abortStreamingMessage: (
      state,
      action: PayloadAction<{
        chatBotId: string
      }>,
    ) => {
      const { chatBotId } = action.payload
      const conversation = state.find(
        (conversation) => conversation.chatBotId === chatBotId,
      )!
      const message = conversation.messages.find(
        (m) => m.id === conversation.streamId,
      ) as AiMessage
      if (message && message.status === AiMessageStatusEnum.STREAMING)
        message.status = AiMessageStatusEnum.ABORTED
      return state
    },
    setChatId: (
      state,
      action: PayloadAction<{
        chatBotId: string
        conversationId: string
      }>,
    ) => {
      const { chatBotId, conversationId } = action.payload
      const conversation = state.find(
        (conversation) => conversation.chatBotId === chatBotId,
      )
      if (!conversation)
        state.push({
          chatBotId,
          id: conversationId,
          messages: [],
        })
      else
        state.find((conversation) => conversation.chatBotId === chatBotId)!.id =
          conversationId
      return state
    },
  },
})

export const {
  newConversation,
  newConversationMessage,
  removeConversationMessage,
  updateAiResponse,
  removeConversation,
  endConversation,
  setConversationStreamId,
  abortStreamingMessage,
  removeChatId,
  setChatId,
} = conversationsSlice.actions
