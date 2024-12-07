import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Typography } from '@/components/ui/typography'
import { typographyVariants } from '@/components/ui/typography/variants'
import { cn } from '@/utils/styles'

import { type FocusAreaProps } from './mock-data'

export const FocusAreaInsights = ({ item }: { item: FocusAreaProps }) => (
  <div>
    <div className="mb-s64">
      <Typography size="s20" className="whitespace-pre-line" asComp="p">
        {item.content}
      </Typography>
    </div>
    <div className="space-y-s64">
      {item.subAreas.map((subArea) => (
        <div key={subArea.title}>
          <div className="mb-s64">
            <Typography size="s24" weight="bold" asComp="h3">
              {subArea.title}
            </Typography>
          </div>
          {subArea.description && (
            <div className="mb-s64">
              <Typography size="s16" asComp="p">
                {subArea.description}
              </Typography>
            </div>
          )}
          <Accordion
            type="single"
            collapsible
            onAnimationEnd={(event) => {
              // prevent the parent `onAnimationEnd` call
              event.stopPropagation()
            }}
          >
            {subArea.items.map((subAreaItem) => (
              <AccordionItem
                key={subAreaItem.name}
                value={subAreaItem.name}
                className={cn(
                  typographyVariants({
                    size: 's20',
                  }),
                  'text-grey-600',
                )}
              >
                <AccordionTrigger className="py-s8">
                  {subAreaItem.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-s16">
                    <Typography
                      size="s16"
                      className="whitespace-pre-line"
                      asComp="p"
                    >
                      {subAreaItem.content}
                    </Typography>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  </div>
)
