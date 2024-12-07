import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const NotFoundPageLoader = lazy(() =>
  import(/* webpackChunkName: "not-found" */ '.').then((m) => ({
    default: m.NotFoundPage,
  })),
)
