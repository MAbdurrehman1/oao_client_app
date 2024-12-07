import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const LogoutLoader = lazy(
  () => import(/* webpackChunkName: "logout" */ '.'),
)
