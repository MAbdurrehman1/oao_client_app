import { type PropsWithChildren } from 'react'
import { m, type SVGMotionProps } from 'framer-motion'

import { cn } from '@/utils/styles'

import { CIRCLE_ANIMATION_DELAY, CIRCLE_ANIMATION_STAGGER } from './common'

export const MainSvg = ({
  className,
  children,
  onAnimationEndCallback,
  motionProps,
}: PropsWithChildren<{
  className?: string
  onAnimationEndCallback?: () => void
  motionProps: Partial<SVGMotionProps<SVGSVGElement>>
}>) => (
  <m.svg
    className={cn('transition-all', className)}
    viewBox="0 0 90 90"
    width="100%"
    height="100%"
    preserveAspectRatio="none"
    onAnimationComplete={() => onAnimationEndCallback?.()}
    variants={{
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    }}
    transition={{
      delay: 0.2,
      delayChildren: CIRCLE_ANIMATION_DELAY,
      staggerChildren: CIRCLE_ANIMATION_STAGGER,
    }}
    initial="hidden"
    {...motionProps}
  >
    {children}
  </m.svg>
)
