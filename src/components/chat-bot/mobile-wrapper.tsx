import { type ReactNode, useState } from 'react'

import { useLayoutContext } from '@/hooks/use-layout-context'
import { cn } from '@/utils/styles'

import { AiAvatar } from './chat-mode/ai-indicator/avatar'
import { useChat } from './use-chat'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'

export const MobileWrapper = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const { isEditMode, shouldMobileButtonBeVisible } = useChat()
  const { occupiedHeight } = useLayoutContext()
  return (
    <div
      className={cn(
        'pointer-events-none opacity-0 transition-all',
        shouldMobileButtonBeVisible && 'pointer-events-auto opacity-100',
      )}
    >
      {!isOpen && (
        <AiAvatar
          onClick={() => setIsOpen(true)}
          isLoading={false}
          withoutAnimations={true}
          className="fixed bottom-28 right-8 z-10 !size-20"
        />
      )}
      <div
        className={cn(
          `
            fixed bottom-28 right-8 z-20 bg-brand-color-white
            transition-all
          `,
          isOpen && `pointer-events-auto w-[calc(100%-4rem)]`,
          isFullScreen && 'bottom-0 right-0 z-30 h-screen w-screen',
          !isFullScreen && 'rounded-md border border-brand-color-black',
          !isOpen && `pointer-events-none size-20 overflow-hidden opacity-0`,
        )}
        style={{
          height:
            isOpen && !isFullScreen
              ? `calc(80% - ${occupiedHeight}px)`
              : undefined,
        }}
      >
        {!isEditMode && (
          <div
            className={`
              absolute inset-x-0 top-0 z-[51] flex w-full items-center
              justify-between p-2
            `}
          >
            <Button
              className="size-8 rounded-full !p-2"
              onClick={() => setIsFullScreen((f) => !f)}
            >
              <Icon name={isFullScreen ? 'minimize' : 'maximize'} />
            </Button>
            <Button
              className="size-8 rounded-full !p-2"
              onClick={() => {
                setIsOpen(false)
                setIsFullScreen(false)
              }}
            >
              <Icon name="subtract" />
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
