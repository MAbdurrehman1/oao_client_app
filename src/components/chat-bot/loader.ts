import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const ChatBotLoader = lazy(
  () => import(/* webpackChunkName: "chatbot" */ '.'),
)
