import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const OaoContentModalLoader = lazy(() =>
  import(/* webpackChunkName: "oao-content-modal" */ '.').then((m) => ({
    default: m.OaoContentModal,
  })),
)
