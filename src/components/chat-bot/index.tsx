import { useMemo } from 'react'

import { useTailwindBreakpoint } from '@/hooks/use-tailwind-breakpoint'

import { ChatMode } from './chat-mode'
import { EditMode } from './edit-mode'
import { Flippable } from './flippable'
import { MobileWrapper } from './mobile-wrapper'
import { ChatBotProvider, type ChatBotProviderProps } from './provider'
import { Wrapper } from './wrapper'

export default function ChatBot({
  wrappers,
  ...props
}: Omit<ChatBotProviderProps, 'children'> & {
  wrappers?: {
    desktop?: ({ children }: React.PropsWithChildren) => JSX.Element
    mobile?: ({ children }: React.PropsWithChildren) => JSX.Element
  }
}) {
  const isMobile = useTailwindBreakpoint({ mode: 'max', breakpoint: 'md' })
  const WrapperComponent = useMemo(
    () =>
      isMobile
        ? wrappers?.mobile ?? MobileWrapper
        : wrappers?.desktop ?? Wrapper,
    [isMobile, wrappers?.desktop, wrappers?.mobile],
  )
  return (
    <ChatBotProvider {...props}>
      {({ isEditMode }) => (
        <WrapperComponent>
          {/* accepts children as tuple, first child is the front side, second child is the back side */}
          <Flippable isFlipped={isEditMode}>
            <ChatMode />
            <EditMode />
          </Flippable>
        </WrapperComponent>
      )}
    </ChatBotProvider>
  )
}
