import { useContext } from 'react'

import { ChatBotContext, type IChatBotContext } from './context'

export const useChat = () => {
  const context = useContext<IChatBotContext | null>(ChatBotContext)
  if (!context)
    throw new Error(`useChat must be used within <ChatbotProvider />`)
  return context
}
