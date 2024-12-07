import { useEffect, useRef } from 'react'
import { lazyWithPreload as lazy } from 'react-lazy-with-preload'
import { type SheetRef } from 'react-modal-sheet'

import { Typography } from '@/components/ui/typography'
import { cn } from '@/utils/styles'

import { type WrapperProps } from './common'
import { RecommendationListTrigger } from './trigger'

import './mobile-wrapper.css'

const Sheet = lazy(() =>
  import('react-modal-sheet').then((m) => ({ default: m.Sheet })),
)

enum SnapEnum {
  open = 0,
  close = 1,
}
const SNAP_POINTS = [465, 100]
const SNAP_MODES = [SnapEnum.open, SnapEnum.close]

export const RecommendationListMobileWrapper = (props: WrapperProps) => {
  const {
    children,
    kpi,
    itemsLength,
    shouldSheetBeVisible,
    isSheetOpen,
    setSheetOpenedByUser,
  } = props
  const ref = useRef<SheetRef>()
  const snapTo = (i: number) => ref.current?.snapTo(i)
  useEffect(() => {
    if (isSheetOpen) {
      snapTo(SnapEnum.open)
    } else {
      snapTo(SnapEnum.close)
    }
  }, [isSheetOpen])
  useEffect(() => {
    if (shouldSheetBeVisible && !isSheetOpen) snapTo(SnapEnum.close)
    // we only look for `shouldSheetBeVisible` changes here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSheetBeVisible])
  return (
    <>
      <div
        className={cn(
          `
            pointer-events-none fixed inset-0 z-20 opacity-0
            transition-all
          `,
          isSheetOpen && 'pointer-events-auto bg-black/50 opacity-70',
        )}
        onClick={() => setSheetOpenedByUser(false)}
      />
      <Sheet
        className="!z-20"
        ref={ref}
        detent="content-height"
        isOpen={shouldSheetBeVisible}
        snapPoints={SNAP_POINTS}
        initialSnap={SnapEnum.close}
        onClose={() => {
          setSheetOpenedByUser(false)
          snapTo(SnapEnum.close)
        }}
        onSnap={(snapIndex) => {
          const isOpen = snapIndex === (SnapEnum.open as number)
          if (isOpen !== isSheetOpen)
            setSheetOpenedByUser(!SNAP_MODES[snapIndex])
        }}
        disableScrollLocking
      >
        <Sheet.Container>
          <Sheet.Header>
            <div className="relative z-10">
              {kpi && (
                <RecommendationListTrigger
                  kpi={kpi}
                  shouldSheetBeVisible={true}
                  count={itemsLength}
                  isSheetOpen={isSheetOpen}
                  onClick={() => setSheetOpenedByUser((o) => !o)}
                />
              )}
              <div className={`relative z-20 px-s24 pb-0 pt-s16`}>
                <Typography weight="bold" size="s24">
                  Your Recommendations
                </Typography>
              </div>
            </div>
          </Sheet.Header>
          <Sheet.Content className="bg-white">
            <div
              className={`
                relative z-20 flex flex-1 flex-nowrap space-x-s32
                overflow-x-auto px-s24 pt-s16
              `}
            >
              {children}
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  )
}
