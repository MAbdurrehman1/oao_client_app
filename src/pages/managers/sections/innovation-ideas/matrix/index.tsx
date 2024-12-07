import { InfoIcon } from 'lucide-react'

import { Loading } from '@/components/loading'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Typography } from '@/components/ui/typography'
import { useReportData } from '@/pages/managers/hooks/use-report-data'

import {
  ConfidenceGuide,
  FeasibilityGuide,
  ImpactGuide,
  LowsAndHighs,
  MiddleLines,
} from './guides'
import { MatrixItem } from './item'
import { MatrixWrapper } from './wrapper'

export const InnovationIdeasMatrix = () => {
  const { innovationIdeasMatrix } = useReportData()
  return (
    <div className="py-s32">
      <div
        className={`
          flex flex-col
          md:flex-row md:items-center md:justify-between
        `}
      >
        <Typography weight="bold" size="s24">
          Your opportunity space{' '}
          {innovationIdeasMatrix.isLoading && <Loading inline />}
        </Typography>
        <div
          className={`
            my-s32
            md:hidden
          `}
        >
          <Alert className="flex flex-col border-none bg-grey-50">
            <AlertDescription className="text-grey-600">
              <InfoIcon className="mb-s8 size-5 stroke-grey-600" />
              An interactive version of the graph below can be viewed on either
              a tablet or desktop.
            </AlertDescription>
          </Alert>
        </div>
        <ConfidenceGuide />
      </div>
      <MatrixWrapper>
        <ImpactGuide />
        <FeasibilityGuide />
        <div className="relative size-full rounded-md border">
          <LowsAndHighs />
          <MiddleLines />
          {innovationIdeasMatrix.data.map((i) => (
            <MatrixItem key={i.id} {...i} />
          ))}
        </div>
      </MatrixWrapper>
    </div>
  )
}
