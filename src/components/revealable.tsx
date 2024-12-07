import { type PropsWithChildren, useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

import { cn } from '@/utils/styles'

import { buttonVariants } from './ui/button/variants'
import { fadeInDownVariant } from './motion-variants'

export type RevealableProps = PropsWithChildren<{
  className?: string
  reveal: boolean
  enableAnimations: boolean
  withButton?: boolean
  buttonText?: string
  onButtonClickCallback?: () => void
}>

export const Revealable = ({
  children,
  className,
  reveal,
  withButton,
  buttonText = "Let's start",
  enableAnimations,
  onButtonClickCallback,
}: RevealableProps) => {
  const [showing, setShowing] = useState<boolean>(!enableAnimations)
  useEffect(() => {
    if (reveal && !withButton) setShowing(true)
  }, [reveal, withButton])
  return (
    <>
      {!showing && (
        <div className={cn(withButton && 'flex items-center justify-center')}>
          <AnimatePresence>
            {reveal && withButton && (
              <m.button
                {...fadeInDownVariant}
                exit={fadeInDownVariant.initial}
                transition={{ duration: 0.2 }}
                className={buttonVariants({ className: 'absolute' })}
                onClick={() => {
                  setShowing(true)
                  onButtonClickCallback?.()
                }}
              >
                {buttonText}
              </m.button>
            )}
          </AnimatePresence>
        </div>
      )}
      <div
        className={cn(
          'transition-all duration-500',
          className,
          !showing && 'pointer-events-none blur-md',
        )}
      >
        {children}
      </div>
    </>
  )
}
