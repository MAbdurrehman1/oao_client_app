import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Typography } from '@/components/ui/typography'
import { KpiIcon } from '@/pages/managers/components/kpi-icon'
import { cn } from '@/utils/styles'

import { type WrapperProps } from './common'
import { RecommendationListTrigger } from './trigger'

export const RecommendationListDesktopWrapper = (props: WrapperProps) => {
  const {
    children,
    shouldSheetBeVisible,
    setSheetOpenedByUser,
    sheetOpenedByUser,
    isSheetOpen,
    kpi,
    itemsLength,
  } = props
  return (
    <Sheet
      modal={false}
      open={shouldSheetBeVisible}
      onOpenChange={() => {
        // ignore sheet component state, use the local state
        setSheetOpenedByUser(sheetOpenedByUser)
      }}
    >
      <SheetContent
        onPointerDownOutside={(e) => e.preventDefault()}
        forceMount
        hasOverlay={false}
        hasClose={false}
        className={cn(
          '-bottom-80 h-80 border-brand-color-black transition-all',
          !isSheetOpen &&
            `
              group cursor-pointer
              hover:-bottom-40
            `,
          isSheetOpen && 'bottom-0',
        )}
        onClick={() => !sheetOpenedByUser && setSheetOpenedByUser(true)}
      >
        {/* the faded gradient effect */}
        <div
          className={cn(
            `
              pointer-events-none absolute size-full bg-gradient-to-b
              from-white/10 via-white via-50% to-white opacity-100
              transition-all
            `,
            isSheetOpen && 'opacity-0',
          )}
        />
        <div
          className={cn(
            `absolute inset-x-0 bottom-full`,
            !shouldSheetBeVisible && 'pointer-events-none',
          )}
        >
          {kpi && (
            <RecommendationListTrigger
              kpi={kpi}
              shouldSheetBeVisible={shouldSheetBeVisible}
              count={itemsLength}
              isSheetOpen={isSheetOpen}
              onClick={() => setSheetOpenedByUser((o) => !o)}
            />
          )}
        </div>
        <div
          className={`
          flex flex-1 flex-nowrap space-x-s32 overflow-x-auto py-s32
        `}
        >
          <SheetHeader className="block w-80 shrink-0 grow-0 space-y-s16 px-s16">
            {kpi && <KpiIcon kpi={kpi} className="size-14" />}
            <SheetTitle className="mb-s64">
              <Typography size="s24" weight="bold">
                Recommendations
              </Typography>
            </SheetTitle>
            <SheetDescription className="hidden">
              {kpi} recommendations
            </SheetDescription>
          </SheetHeader>
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
