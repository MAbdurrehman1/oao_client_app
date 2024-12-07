import { CountUp } from '@/components/count-up'
import { Link } from '@/components/link'
import { buttonVariants } from '@/components/ui/button/variants'
import { Icon } from '@/components/ui/icon'
import { linkCardDefaultClassName } from '@/components/ui/link-card-default-classname'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'
import { useAccount } from '@/hooks/use-account'
import { KpiIcon } from '@/pages/managers/components/kpi-icon'
import { ScoreComparisonChart } from '@/pages/managers/components/score-comparison-chart'
import { ScoreComparisonChartWrapper } from '@/pages/managers/components/score-comparison-chart-wrapper'
import { type ScoreAndKpiCardType } from '@/pages/managers/types'
import { cn } from '@/utils/styles'
import { generateTestId } from '@/utils/test'

import { useKpiColors } from '../../hooks/use-kpi-colors'

export const ScoreAndKpiCard = ({
  title,
  kpi,
  minScore,
  maxScore,
  score,
  catAScore,
  catBScore,
  description,
  buttonLink,
  startAnimations,
}: ScoreAndKpiCardType) => {
  const { account } = useAccount()
  const colors = useKpiColors({ kpi })
  return (
    <div
      className={cn(linkCardDefaultClassName, 'py-s24')}
      {...generateTestId(`kpi-${kpi}`)}
    >
      <div className="flex w-full items-start justify-between">
        <Typography size="s24" weight="bold" className="capitalize">
          {title}
        </Typography>
        <KpiIcon kpi={kpi} />
      </div>
      <Separator className="mb-s24 mt-s32" />
      <Typography>Overall {kpi} score</Typography>
      <div className="flex flex-row">
        <Typography size="s48" weight="bold">
          <CountUp end={score} shouldStart={startAnimations} />
        </Typography>
        <Typography size="s48" weight="bold" className="text-grey-600">
          /100
        </Typography>
      </div>
      <ScoreComparisonChartWrapper>
        <ScoreComparisonChart
          title="You"
          variance={{
            min: minScore,
            max: maxScore,
          }}
          colors={colors}
          score={score}
          chartClassName="h-[3.2rem]"
          startAnimations={startAnimations}
        />
        <ScoreComparisonChart
          title={`All of ${account?.organizationName}`}
          score={catAScore}
          chartClassName="h-[1.125rem]"
          startAnimations={startAnimations}
        />
        <ScoreComparisonChart
          title="Industry"
          score={catBScore}
          chartClassName="h-[1.125rem]"
          startAnimations={startAnimations}
        />
      </ScoreComparisonChartWrapper>
      <Typography>{description}</Typography>
      <div className="mt-s24 flex w-full items-center justify-center">
        <Link
          to={buttonLink.url}
          params={buttonLink.params}
          className={cn(buttonVariants(), 'space-x-s4')}
        >
          <Icon name="external-link" />
          <span>deep dive</span>
        </Link>
      </div>
    </div>
  )
}
