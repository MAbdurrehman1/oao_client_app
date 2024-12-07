import { Typography } from '@/components/ui/typography'

export const LowsAndHighs = () => (
  <>
    <Typography
      size="s12"
      className={`
        absolute -bottom-6 left-0 select-none text-grey-500
        md:-bottom-8 md:text-s20
      `}
    >
      Low
    </Typography>
    <Typography
      size="s12"
      className={`
        absolute -top-6 left-0 select-none text-grey-500
        md:-top-8 md:text-s20
      `}
    >
      High
    </Typography>
    <Typography
      size="s12"
      className={`
        absolute -bottom-6 right-0 select-none text-grey-500
        md:-bottom-8 md:text-s20
      `}
    >
      High
    </Typography>
  </>
)
