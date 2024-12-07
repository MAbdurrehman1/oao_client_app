import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const ScheduleSessionsModalLoader = lazy(() =>
  import(/* webpackChunkName: "schedule-sessions-modal" */ '.').then((m) => ({
    default: m.ScheduleSessionsModal,
  })),
)
