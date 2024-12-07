import { createSelector } from '@reduxjs/toolkit'

import { type RootState } from '@/store'
import { isPreviewReport } from '@/utils/preview-report'
import { isCypressTesting } from '@/utils/test'
import { type ValidAppRouteConfig } from '@/utils/url'

import { AnimationTypes, type LymanAnimation } from './types'

const disableAnimations = isCypressTesting || isPreviewReport

export const selectRouteAnimationsVisited = createSelector(
  [
    (state: RootState) => state.shownAnimations,
    (_state: RootState, route: ValidAppRouteConfig) => route,
  ],
  (shownAnimations, route) => {
    return disableAnimations
      ? true
      : !!shownAnimations.find(
          (r) =>
            r.type === AnimationTypes.ROUTE &&
            r.route === route.route &&
            r.prefix === route.prefix,
        )
  },
)

export const selectLymanAnimationsVisited = createSelector(
  [
    (state: RootState) => state.shownAnimations,
    (_state: RootState, route: LymanAnimation['id']) => route,
  ],
  (animations, lymanId) => {
    return disableAnimations
      ? true
      : !!animations.find(
          (r) => r.type === AnimationTypes.LYMAN && r.id === lymanId,
        )
  },
)
