import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const LearningLibraryModalLoader = lazy(() =>
  import(/* webpackChunkName: "learning-library-modal" */ './index').then(
    (m) => ({ default: m.LearningLibraryModal }),
  ),
)
