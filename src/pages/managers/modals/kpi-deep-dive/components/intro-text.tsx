import { useParams } from 'react-router'

import { Typography } from '@/components/ui/typography'

export const IntroText = () => {
  const { kpi } = useParams()
  return (
    <div
      className={`
        space-y-s24
        md:space-y-s32
      `}
    >
      <Typography size="s20" asComp="p">
        The {kpi} score suggests how well you lead your teams through the change
        of a data & AI transformation. It is driven by 2 factors: (1) Your data
        & AI vision for your your domain, and (2) your leadership guiding the
        change with it.
      </Typography>
      <Typography size="s20" asComp="p" className="mb-s32">
        In a nutshell: A score of 25 is weak, within your company and relative
        to the industry benchmark. The main problem seems to be your data & AI
        vision: More than half of your people are not aware of the vision, and
        those you are don’t like it – it does not impact their decision-making.
        Your leadership is considered strong, but seems to lack expertise with
        AI to drive the change.
      </Typography>
      <Typography size="s20" asComp="p" className="mb-s32">
        Have a look at your scores in detail below.
      </Typography>
    </div>
  )
}
