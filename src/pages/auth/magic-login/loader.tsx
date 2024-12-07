import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const MagicLoginLoader = lazy(
  () => import(/* webpackChunkName: "magic-login" */ '.'),
)
