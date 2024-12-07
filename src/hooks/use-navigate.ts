import { useNavigate as useRouterNaviagte } from 'react-router-dom'

import {
  generateSubdomainAwareUrl,
  type RouteParams,
  type ValidAppRouteConfig,
} from '@/utils/url'

export const useNavigate = () => {
  const routeNavigate = useRouterNaviagte()
  const navigate = (
    route: ValidAppRouteConfig | number,
    extra?: string,
    params?: RouteParams,
  ) => {
    if (typeof route === 'number') return routeNavigate(route)
    const url = generateSubdomainAwareUrl(route, params)
    return routeNavigate(url + (extra ?? ''))
  }
  return navigate
}
