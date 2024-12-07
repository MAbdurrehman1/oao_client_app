import { type ReactNode, useRef } from 'react'
import { m, useSpring } from 'framer-motion'

//Spring animation parameters
const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
}

interface Props {
  isFlipped: boolean
  children: [ReactNode, ReactNode]
}

export const Flippable = (props: Props) => {
  const { isFlipped, children } = props
  const [FronSide, BackSide] = children
  const ref = useRef<HTMLDivElement>(null)
  const dx = useSpring(0, spring)
  const dy = useSpring(0, spring)
  return (
    <m.div
      transition={spring}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%',
      }}
    >
      <m.div
        ref={ref}
        transition={spring}
        style={{
          width: '100%',
          height: '100%',
          rotateX: dx,
          rotateY: dy,
        }}
      >
        <div
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
          }}
        >
          <m.div
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={spring}
            style={{
              width: '100%',
              height: '100%',
              zIndex: isFlipped ? 0 : 1,
              backfaceVisibility: 'hidden',
              position: 'absolute',
            }}
          >
            {FronSide}
          </m.div>
          <m.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: isFlipped ? 0 : 180 }}
            transition={spring}
            style={{
              width: '100%',
              height: '100%',
              zIndex: isFlipped ? 1 : 0,
              backfaceVisibility: 'hidden',
              position: 'absolute',
            }}
          >
            {BackSide}
          </m.div>
        </div>
      </m.div>
    </m.div>
  )
}
