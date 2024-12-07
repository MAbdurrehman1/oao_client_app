import { Typography } from '@/components/ui/typography'
import { toCapitalize } from '@/utils/string'

import { MatrixCircle } from '../circle'

const confidenceConfig = [
  {
    title: 'low',
    score: 0,
  },
  {
    title: 'medium',
    score: 50,
  },
  {
    title: 'high',
    score: 100,
  },
]

export const ConfidenceGuide = () => {
  return (
    <div className={`flex flex-row items-center justify-between`}>
      <div className="lg:hidden">
        <Typography weight="bold">Confidence Level:</Typography>
      </div>
      <div className="flex flex-row items-center">
        {confidenceConfig.map((c) => (
          <div
            key={c.title}
            className={`
              flex select-none flex-row items-center
              lg:mr-s16
            `}
          >
            <MatrixCircle
              confidence={c.score}
              clickable={false}
              className="mx-s8"
            />
            <Typography
              className={`
                flex flex-row space-x-s4
                lg:pl-s4
              `}
            >
              <span>{toCapitalize(c.title)}</span>
              <span
                className={`
                  hidden
                  lg:block
                `}
              >
                Confidence
              </span>
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
