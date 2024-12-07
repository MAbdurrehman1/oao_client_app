import { m } from 'framer-motion'

import {
  CIRCLE_ANIMATION_DELAY,
  CIRCLE_ANIMATION_STAGGER,
  circles,
} from './common'

export const Circle = ({
  path,
  isLoading,
}: {
  path: string
  isLoading?: boolean
}) => (
  <m.path
    d={path}
    variants={{
      hidden: {
        scale: 0.1,
        opacity: 0,
      },
      visible: {
        scale: 1,
        opacity: 1,
      },
    }}
    transition={{
      duration: 0.2,
      ...(isLoading
        ? {
            repeat: Infinity,
            repeatDelay:
              CIRCLE_ANIMATION_STAGGER * circles.length +
              CIRCLE_ANIMATION_DELAY,
            repeatType: 'mirror',
          }
        : {}),
    }}
  />
)
