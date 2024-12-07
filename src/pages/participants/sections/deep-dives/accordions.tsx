import { useEffect, useState } from 'react'

import { Loading } from '@/components/loading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  PrimaryAccordionTrigger,
} from '@/components/ui/accordion'
import { Typography } from '@/components/ui/typography'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'

import { DeepDiveContent } from './content'

export const DeepDiveAccordions = ({ forceOpen }: { forceOpen: boolean }) => {
  const {
    deepDives: { data: deepDives, isLoading },
  } = useParticipantData()
  const [accordionValue, setAccordionValue] = useState<string[]>([])
  useEffect(() => {
    if (forceOpen && accordionValue.length === 0 && deepDives.length) {
      setAccordionValue([deepDives[0].id.toString()])
    }
    // we only care if `forceOpen` is set to true from outside
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceOpen])
  if (isLoading && deepDives.length === 0) return <Loading className="w-full" />
  return (
    <Accordion
      type="multiple"
      className="-mx-s24 px-s24 pt-s64"
      onValueChange={setAccordionValue}
      value={accordionValue}
    >
      {deepDives.map((item, index) => (
        <AccordionItem key={index} value={item.id.toString()}>
          <PrimaryAccordionTrigger>
            <Typography
              weight="bold"
              size="s20"
              className={`
                md:text-s32
                lg:text-s40
              `}
            >
              {item.title}
            </Typography>
          </PrimaryAccordionTrigger>
          <AccordionContent className="-mx-s24 px-s24">
            <DeepDiveContent {...item} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
