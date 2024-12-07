import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const InnovationDetailModalLoader = lazy(() =>
  import(/* webpackChunkName: "innovation-idea-modal" */ '.').then((m) => ({
    default: m.InnovationDetailModal,
  })),
)
