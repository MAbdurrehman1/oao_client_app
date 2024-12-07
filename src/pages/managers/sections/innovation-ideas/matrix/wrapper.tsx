import { type PropsWithChildren, useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'

import { useLayoutContext } from '@/hooks/use-layout-context'
import { useTailwindBreakpoint } from '@/hooks/use-tailwind-breakpoint'

export const MatrixWrapper = ({ children }: PropsWithChildren) => {
  const matrixRef = useRef<HTMLDivElement>(null)
  const { headerHeight } = useLayoutContext()
  const { width: matrixWidth = 0 } = useResizeObserver({
    ref: matrixRef,
    box: 'border-box',
  })
  const isMobile = useTailwindBreakpoint({ mode: 'max', breakpoint: 'lg' })
  return (
    <div className="mt-s16 rounded-md bg-grey-50 pb-s32" ref={matrixRef}>
      <div
        className={`
          relative w-full p-s32 transition-all
          md:p-s64
        `}
        style={{
          height: isMobile ? matrixWidth : matrixWidth / 2,
          maxHeight: `calc(${isMobile ? 100 : 90}dvh - ${2 * headerHeight}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
