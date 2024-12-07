import { lazyWithPreload as lazy } from 'react-lazy-with-preload'

export const LoginLoader = lazy(
  () => import(/* webpackChunkName: "login" */ './'),
)
