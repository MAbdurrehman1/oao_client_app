import { createSelector } from '@reduxjs/toolkit'

import { type RootState } from '@/store'

export const selectConversationMessages = createSelector(
  [
    (state: RootState) => state.conversations,
    (_state: RootState, chatBotId: string) => chatBotId,
  ],
  (conversations, chatBotId) => {
    return conversations.find((c) => c.chatBotId === chatBotId)?.messages ?? []
  },
)

export const selectConversationId = createSelector(
  [
    (state: RootState) => state.conversations,
    (_state: RootState, chatBotId: string) => chatBotId,
  ],
  (conversations, chatBotId) => {
    return conversations.find((c) => c.chatBotId === chatBotId)?.id ?? ''
  },
)

export const selectConversationEnded = createSelector(
  [
    (state: RootState) => state.conversations,
    (_state: RootState, chatBotId: string) => chatBotId,
  ],
  (conversations, chatBotId) => {
    return conversations.find((c) => c.chatBotId === chatBotId)?.ended ?? false
  },
)

export const selectConversation = createSelector(
  [
    (state: RootState) => state.conversations,
    (_state: RootState, chatBotId: string) => chatBotId,
  ],
  (conversations, chatBotId) => {
    return conversations.find((c) => c.chatBotId === chatBotId) ?? null
  },
)
