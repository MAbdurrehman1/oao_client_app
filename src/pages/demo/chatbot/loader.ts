import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const ChatbotDemoPageLoader = lazy(() =>
  import(/* webpackChunkName: "chat-bot-demo" */ '.').then((m) => ({
    default: m.ChatbotDemoPage,
  })),
)
