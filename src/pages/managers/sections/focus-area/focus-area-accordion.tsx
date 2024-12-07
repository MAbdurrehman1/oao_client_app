import {
  createRef,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { ChatBotLoader } from '@/components/chat-bot/loader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  PrimaryAccordionTrigger,
} from '@/components/ui/accordion'
import { typographyVariants } from '@/components/ui/typography/variants'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { KpiIcon } from '@/pages/managers/components/kpi-icon'
import { useReportData } from '@/pages/managers/hooks/use-report-data'
import { SectionsEnum } from '@/pages/managers/types'
import { ConversationGoals } from '@/store/slices/conversations/types'
import { type KPI } from '@/types'

import { FocusAreaInsights } from './insights'
import { items } from './mock-data'
import { RecommendationList } from './recommendation-list'

export default function FocusAreaAccordion({
  forceFirstAccordionToBeOpened,
}: {
  forceFirstAccordionToBeOpened: boolean
}) {
  const { activeSection, enableAnimations } = useLayoutContext()
  const [skipScroll, setSkipScroll] = useState<boolean>(false)
  const [openedKpi, setOpenedKpi] = useState<KPI | null>(null)
  const { recommendations, createNewRecommendation } = useReportData()
  const { calculateScrollTargetPostion } = useLayoutContext()
  useEffect(() => {
    // don't change opened accordion item
    // we wanna opne the first item if nothings openned
    if (forceFirstAccordionToBeOpened && !openedKpi) {
      setOpenedKpi(items[0].name)
      // skip the scroll if animations are not enabled
      if (!enableAnimations) setSkipScroll(true)
    }
    // only run when isFirstAccordionOpen value is changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceFirstAccordionToBeOpened])
  const itemsWithRef = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        ref: createRef<HTMLDivElement>(),
      })),
    [],
  )
  const onAnimationEnd = useCallback(() => {
    if (openedKpi && !skipScroll) {
      const top = calculateScrollTargetPostion(
        itemsWithRef.find((i) => i.name === openedKpi)?.ref.current,
      )
      if (top) {
        window.scrollTo({
          top,
          behavior: 'smooth',
        })
      }
    } else if (skipScroll) {
      setSkipScroll(false)
    }
  }, [calculateScrollTargetPostion, itemsWithRef, openedKpi, skipScroll])
  return (
    <>
      <Accordion
        type="single"
        collapsible
        value={openedKpi ?? ''}
        onValueChange={(val: KPI) => setOpenedKpi(val)}
        onAnimationEnd={onAnimationEnd}
      >
        {itemsWithRef.map((item, index) => (
          <AccordionItem ref={item.ref} key={index} value={item.name}>
            <PrimaryAccordionTrigger
              className={typographyVariants({
                size: 's32',
                weight: 'bold',
                className: 'sm:text-s40 capitalize',
              })}
            >
              <KpiIcon kpi={item.name} /> {item.name}
            </PrimaryAccordionTrigger>
            <AccordionContent>
              <div className="md:grid md:grid-cols-2 md:gap-s64 md:py-s128">
                <FocusAreaInsights item={item} />
                <Suspense fallback={null}>
                  <ChatBotLoader
                    chatBotId={item.name}
                    goal={ConversationGoals.RECOMMENDATION}
                    shouldMobileButtonBeVisible={
                      activeSection === SectionsEnum.FOCUS_AREA
                    }
                    onApproveButtonCallback={({ title, description }) =>
                      createNewRecommendation({
                        kpi: item.name,
                        title,
                        description,
                      })
                    }
                  />
                </Suspense>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <RecommendationList
        kpi={openedKpi}
        items={openedKpi ? recommendations[openedKpi].data : []}
      />
    </>
  )
}
