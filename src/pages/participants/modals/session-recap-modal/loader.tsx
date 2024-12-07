import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const SessionRecapModalLoader = lazy(() =>
  import(/* webpackChunkName: "session-recap-modal" */ '.').then((m) => ({
    default: m.SessionRecapModal,
  })),
)
