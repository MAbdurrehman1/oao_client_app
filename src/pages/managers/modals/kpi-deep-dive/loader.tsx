import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const KpiDeepDiveModalLoader = lazy(() =>
  import(/* webpackChunkName: "kpi-deep-dive-modal" */ './entry').then((m) => ({
    default: m.KpiDeepDiveModalEntry,
  })),
)

export const KpiDeepDiveModalOverviewLoader = lazy(() =>
  import(
    /* webpackChunkName: "kpi-deep-dive-overview-modal" */ './overview'
  ).then((m) => ({
    default: m.KpiDeepDiveModalOverview,
  })),
)

export const KpiDeepDiveModalFirstLevelLoader = lazy(() =>
  import(
    /* webpackChunkName: "kpi-deep-dive-first-level-modal" */ './first-level'
  ).then((m) => ({
    default: m.KpiDeepDiveModalFirstLevel,
  })),
)

export const KpiDeepDiveModalSecondLevelLoader = lazy(() =>
  import(
    /* webpackChunkName: "kpi-deep-dive-second-level-modal" */ './second-level'
  ).then((m) => ({
    default: m.KpiDeepDiveModalSecondLevel,
  })),
)
