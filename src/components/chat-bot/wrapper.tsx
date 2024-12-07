import { useMemo } from 'react'
import { type PropsWithChildren } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { useLayoutContext } from '@/hooks/use-layout-context'

export const Wrapper = ({ children }: PropsWithChildren) => {
  const CHAT_BOX_Y_MARGIN = 20 // in px
  const { occupiedHeight } = useLayoutContext()
  const { height: windowHeight } = useWindowSize()
  const { height, top } = useMemo(
    () => ({
      height: windowHeight - occupiedHeight - 2 * CHAT_BOX_Y_MARGIN, // one for the top, one for the bottom
      top: CHAT_BOX_Y_MARGIN + occupiedHeight,
    }),
    [occupiedHeight, windowHeight],
  )
  return (
    <div
      className="sticky w-full transition-all"
      style={{
        height,
        top,
      }}
    >
      {children}
    </div>
  )
}
