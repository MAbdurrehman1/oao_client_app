import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Image } from '@/components/ui/image'
import { Typography } from '@/components/ui/typography'
import { typographyVariants } from '@/components/ui/typography/variants'
import { type ISession } from '@/pages/participants/types'
import { cn } from '@/utils/styles'

import { useContentSummaries } from './use-content-summaries'

export const ContentSummary = (session: ISession) => {
  const { data: learningOutcomes } = useContentSummaries(session.id)
  return (
    <div
      className={`
        flex min-h-screen flex-col space-y-s24 rounded-md bg-grey-50 p-s24
        md:space-y-s32
        lg:space-y-s64
      `}
    >
      <Typography size="s24" weight="bold">
        Recap & Reflect
      </Typography>
      <Typography size="s20">{session.description}</Typography>
      <div className="border-t pt-s24">
        <Typography size="s24" className="text-grey-500">
          Key Learnings
        </Typography>
        <Image
          src={session.thumbnailImg}
          className={`
            my-s24 w-full rounded-md
            md:my-s32
            lg:my-s64
          `}
        />
        <Accordion type="multiple">
          {learningOutcomes.map((learningOutcome) => (
            <AccordionItem
              key={learningOutcome.title}
              value={learningOutcome.title}
              className={cn(
                typographyVariants({
                  size: 's20',
                }),
                'text-grey-600',
              )}
            >
              <AccordionTrigger className="py-s8">
                {learningOutcome.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="py-s16 text-brand-color-black">
                  <Typography
                    size="s16"
                    className="whitespace-pre-line"
                    asComp="p"
                  >
                    {learningOutcome.description}
                  </Typography>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
