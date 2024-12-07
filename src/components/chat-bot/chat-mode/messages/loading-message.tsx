import { type LoadingMessage as LoadingMessageType } from '@/store/slices/conversations/types'

import { type MessageRenderer } from './types'
import { AiAvatar } from '../ai-indicator/avatar'

export const LoadingMessage = ({
  isLastItem,
}: MessageRenderer<LoadingMessageType> & { isLastItem: boolean }) => {
  return <AiAvatar withoutAnimations={!isLastItem} isLoading={isLastItem} />
}
