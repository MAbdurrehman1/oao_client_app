import {
  type ISession,
  type SessionSelectedDate,
} from '@/pages/participants/types'

export type LanguageIds = 'EN' | 'FR'

export type Step = {
  id: string | number
  title: string
  props: {
    onNextButtonClick?: () => void
    session?: ISession
    onSubmit?: (date: SessionSelectedDate['selectedDate']) => void
    selectedDates?: SessionSelectedDate[]
    selectedLanguage?: LanguageIds
    selectLanguage?: (id: LanguageIds) => void
  }
  Component: (props: Step['props']) => JSX.Element
}
