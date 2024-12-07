import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const InnovationGuidePageLoader = lazy(() =>
  import(/* webpackChunkName: "innovation-guide-page" */ './index').then(
    (m) => ({
      default: m.InnovationGuidePage,
    }),
  ),
)
