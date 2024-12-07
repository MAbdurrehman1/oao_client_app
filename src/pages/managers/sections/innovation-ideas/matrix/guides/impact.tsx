import { Typography } from '@/components/ui/typography'

export const ImpactGuide = () => (
  <div
    className={`
      absolute inset-y-0 left-0 flex h-full select-none items-center
      justify-center
    `}
  >
    <Typography
      className={`
        -rotate-90
        md:text-s20
      `}
      weight="bold"
      size="s12"
    >
      Impact
    </Typography>
  </div>
)
