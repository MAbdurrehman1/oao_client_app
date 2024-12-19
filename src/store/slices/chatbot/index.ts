import { createSlice } from '@reduxjs/toolkit'

import { type ChatbotState } from './types'

const initialState: ChatbotState = {
  fullDisplay: false,
}

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    toggleChatbotFullDisplay: (state) => {
      state.fullDisplay = !state.fullDisplay
      return state
    },
  },
})

export const { toggleChatbotFullDisplay } = chatbotSlice.actions
