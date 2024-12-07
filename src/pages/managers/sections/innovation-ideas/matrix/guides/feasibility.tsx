import { Typography } from '@/components/ui/typography'

export const FeasibilityGuide = () => (
  <div
    className={`
      absolute inset-x-0 bottom-0 flex w-full select-none items-center
      justify-center
    `}
  >
    <Typography className="md:text-s20" weight="bold" size="s12">
      Feasibility
    </Typography>
  </div>
)
