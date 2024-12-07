import { useMemo, useState } from 'react'
import { Circle, CircleCheck, CircleDashed } from 'lucide-react'

import { RouteDialog } from '@/components/route-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogSidebar,
  DialogTitle,
} from '@/components/ui/dialog'
import { Typography } from '@/components/ui/typography'
import { useNavigate } from '@/hooks/use-navigate'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'
import { type SessionSelectedDate } from '@/pages/participants/types'
import { Routes } from '@/routes'
import { cn } from '@/utils/styles'

import { SubtitleLanguage } from './steps/language-step'
import { Review } from './steps/review-step'
import { SessionDatePicker } from './steps/session-date-picker-step'
import { type LanguageIds, type Step } from './types'

export const ScheduleSessionsModal = () => {
  const [selectedDates, setSelectedDates] = useState<SessionSelectedDate[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageIds>('EN')
  const { sessions } = useParticipantData()
  const steps: Step[] = useMemo(
    () => [
      ...sessions.data.map((session) => ({
        id: session.id,
        title: `Session ${session.order}`,
        subtitle: session.title,
        Component: SessionDatePicker,
        props: {
          selectedDates,
          session,
          onSubmit: (selectedDate: Date) => {
            let previousValue = Array.from(selectedDates)
            const existingItem = previousValue.find(
              (i) => i.sessionId === session.id,
            )
            if (existingItem) {
              previousValue = previousValue.map((sd) =>
                sd.sessionId === existingItem.sessionId
                  ? { ...existingItem, selectedDate }
                  : sd,
              )
            } else previousValue.push({ sessionId: session.id, selectedDate })
            if (session.order === 3) {
              const sortedDateTimes = previousValue
                .map((i) => i.selectedDate)
                .sort((a, b) => (a < b ? -1 : 1))
              const newValue: SessionSelectedDate[] = sortedDateTimes.map(
                (sd, index) => ({
                  selectedDate: sd,
                  sessionId: sessions.data.sort((a, b) => a.order - b.order)[
                    index
                  ].id,
                }),
              )
              setSelectedDates(newValue)
            } else setSelectedDates(previousValue)
          },
        },
      })),
      {
        id: 'preferred-lang',
        title: 'Subtitle Language',
        Component: SubtitleLanguage,
        props: { selectedLanguage, selectLanguage: setSelectedLanguage },
      },
      {
        id: 'finalize',
        title: 'Review and Submit',
        Component: Review,
        props: { selectedDates, selectedLanguage },
      },
    ],
    [selectedDates, selectedLanguage, sessions.data],
  )
  const [activeStepId, setActiveStepId] = useState<string | number>(steps[0].id)
  const activeStepIndex = useMemo(
    () => steps.findIndex((s) => s.id === activeStepId),
    [activeStepId, steps],
  )
  const [lastCompletedStepId, setLastCompletedStepId] = useState<
    string | number | null
  >(null)
  const lastCompletedStepIndex = useMemo(
    () => steps.findIndex((s) => s.id === lastCompletedStepId),
    [lastCompletedStepId, steps],
  )
  const currentStepIndex = useMemo(
    () => lastCompletedStepIndex + 1,
    [lastCompletedStepIndex],
  )
  const currentItem = steps.find((s) => s.id === activeStepId)!
  const navigate = useNavigate()
  return (
    <RouteDialog routeAfterClose={Routes.PARTICIPANTS_INDEX}>
      <DialogContent
        header={<DialogTitle>Schedule Sessions</DialogTitle>}
        scrollBehaviour="smooth"
      >
        <div
          className={`
            flex flex-col
            md:flex-row
          `}
        >
          <DialogSidebar
            className={`
              flex flex-row justify-between
              md:flex-col md:justify-start md:space-y-s24
            `}
          >
            {steps.map((step, index) => (
              <div
                className={cn(
                  `
                    relative flex flex-1 cursor-pointer flex-row items-start
                    space-x-s4 text-grey-600 transition-all
                    last-of-type:grow-0
                  `,
                  activeStepId === step.id && 'text-brand-color-black',
                  index > currentStepIndex &&
                    `cursor-not-allowed text-grey-400`,
                )}
                onClick={() => {
                  if (index <= currentStepIndex) {
                    setActiveStepId(step.id)
                    navigate(Routes.SCHEDULE_SESSIONS_MODAL_STEP, undefined, {
                      step: step.id,
                    })
                  }
                }}
                key={step.id}
              >
                <span className="mt-[3px]">
                  {index === currentStepIndex ? (
                    <Circle size={16} />
                  ) : index < currentStepIndex ? (
                    <CircleCheck size={16} />
                  ) : (
                    <CircleDashed size={16} />
                  )}
                </span>
                <div
                  className={`
                    absolute left-4 right-1 top-[9px] h-[2px] flex-1 bg-border
                    md:hidden
                  `}
                />
                <div
                  className={`
                    hidden flex-col space-y-s4
                    md:flex
                  `}
                >
                  <Typography weight="bold">{step.title}</Typography>
                </div>
              </div>
            ))}
          </DialogSidebar>
          <div
            className={`
              w-full pl-0
              md:pl-s24
              lg:pl-s64
            `}
          >
            <DialogDescription className="hidden">
              Schedule your sessions
            </DialogDescription>
            <div className="flex w-full flex-col pb-20" key={currentItem.id}>
              <currentItem.Component
                {...currentItem.props}
                onNextButtonClick={() => {
                  setLastCompletedStepId(activeStepId)
                  const nextStep = steps[activeStepIndex + 1]
                  if (nextStep) {
                    setActiveStepId(nextStep.id)
                    navigate(Routes.SCHEDULE_SESSIONS_MODAL_STEP, undefined, {
                      step: nextStep.id,
                    })
                  } else {
                    navigate(Routes.PARTICIPANTS_INDEX)
                  }
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </RouteDialog>
  )
}
