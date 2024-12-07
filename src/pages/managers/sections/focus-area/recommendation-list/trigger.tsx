import { m } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { useKpiColors } from '@/pages/managers/hooks/use-kpi-colors'
import { type KPI } from '@/types'
import { cn } from '@/utils/styles'

import MobileTriggerWrapper from './mobile-trigger-wrapper.svg?react'

interface Props {
  kpi: KPI
  shouldSheetBeVisible: boolean
  count: number
  isSheetOpen: boolean
  onClick: () => void
}

export const RecommendationListTrigger = ({
  shouldSheetBeVisible,
  isSheetOpen,
  kpi,
  onClick,
  count,
}: Props) => {
  const colors = useKpiColors({ kpi })

  return (
    <div className={`relative flex w-full items-center justify-center`}>
      <svg
        viewBox="0 0 1440 35"
        fill="none"
        width="100%"
        height="100%"
        className={`
          absolute hidden
          md:block
        `}
      >
        <path
          d="M1446.5 36.8753V543.5H-5.5V36.8753H648.655C658.76 36.8753 667.817 31.9253 676.377 25.6734C680.038 22.9996 683.624 20.0751 687.169 17.1844C687.771 16.6936 688.371 16.2038 688.971 15.7164C693.108 12.3528 697.199 9.10001 701.328 6.38211C706.976 2.66358 713.737 0.5 721.005 0.5C728.273 0.5 735.034 2.66357 740.682 6.3821C744.811 9.1 748.902 12.3528 753.039 15.7163C753.639 16.2041 754.24 16.6942 754.842 17.1852C758.387 20.0756 761.972 22.9998 765.633 25.6734C774.193 31.9253 783.25 36.8753 793.355 36.8753H1446.5Z"
          fill="white"
          strokeWidth="1.5"
          stroke="black"
        />
      </svg>
      <div className="md:hidden">
        <MobileTriggerWrapper
          width="100%"
          height="100%"
          className="absolute inset-x-0 top-0 h-28 w-full"
        />
      </div>
      <Button
        onClick={() => onClick()}
        size="icon"
        className={cn(
          `
            pointer-events-none relative top-px h-10 w-[6.25rem] rounded-none
            border-0 border-b-white !p-0 opacity-0
            hover:bg-transparent
            md:h-7 md:border-b
          `,
          shouldSheetBeVisible &&
            `
              group pointer-events-auto opacity-100
              hover:fill-inherit
            `,
        )}
      >
        <m.div
          key={`counter${count}`}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className={cn(
            `
              absolute -top-1 right-5 flex size-5 items-center justify-center
              rounded-full text-brand-color-black transition-colors
            `,
            colors.bgColor,
          )}
        >
          <Typography size="s12">{count}</Typography>
        </m.div>
        <Icon
          name="arrow-up"
          className={cn(
            `
              relative top-2 size-7 rotate-0 p-1 transition-transform
              md:top-1 md:size-6 md:group-hover:-mb-2
              md:group-hover:animate-bounce
            `,
            isSheetOpen &&
              `
                -mb-1 rotate-180
                md:group-hover:animate-rotated-bounce
              `,
          )}
        />
      </Button>
    </div>
  )
}
