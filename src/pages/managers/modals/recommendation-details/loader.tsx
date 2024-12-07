import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const RecommendationDetailModalLoader = lazy(() =>
  import(/* webpackChunkName: "recommendation-modal" */ '.').then((m) => ({
    default: m.RecommendationDetailModal,
  })),
)
