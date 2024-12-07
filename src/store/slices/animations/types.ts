import { type ValidAppRouteConfig } from '@/utils/url'

export enum AnimationTypes {
  ROUTE = 'ROUTE',
  LYMAN = 'LYMAN',
}

export type RouteAnimation = {
  type: AnimationTypes.ROUTE
  route: ValidAppRouteConfig['route']
  prefix: ValidAppRouteConfig['prefix']
}

export type LymanAnimation = {
  type: AnimationTypes.LYMAN
  id: string
}

export type ShownAnimation = RouteAnimation | LymanAnimation
