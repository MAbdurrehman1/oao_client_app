import { Icon } from '@/components/ui/icon'
import { type KPI } from '@/types'
import { cn } from '@/utils/styles'

import { useKpiColors } from '../hooks/use-kpi-colors'

export const KpiIcon = ({
  kpi,
  className,
}: {
  kpi: KPI
  className?: string
}) => {
  const { bgColor } = useKpiColors({ kpi })
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-md p-s4',
        className,
        bgColor,
      )}
    >
      <Icon
        name={kpi}
        className={`
          fill-brand-color-white text-4xl
          md:text-5xl
        `}
      />
    </div>
  )
}
