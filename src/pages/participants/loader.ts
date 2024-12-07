import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const ParticipantsPageLoader = lazy(() =>
  import(/* webpackChunkName: "participants-index" */ '.').then((m) => ({
    default: m.ParticipantsPage,
  })),
)
