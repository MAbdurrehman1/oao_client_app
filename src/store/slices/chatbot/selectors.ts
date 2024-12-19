import { createSelector } from '@reduxjs/toolkit'

import { type RootState } from '@/store'

export const selectChatbotFullDisplay = createSelector(
  [(state: RootState) => state.chatbot],
  (chatbot) => {
    return chatbot.fullDisplay
  },
)
