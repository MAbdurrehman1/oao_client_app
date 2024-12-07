import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const ManagersPageLoader = lazy(() =>
  import(/* webpackChunkName: "managers-index" */ '.').then((m) => ({
    default: m.ManagersPage,
  })),
)
