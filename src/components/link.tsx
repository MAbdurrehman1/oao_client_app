import { forwardRef } from 'react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'

import {
  generateSubdomainAwareUrl,
  type RouteParams,
  type ValidAppRouteConfig,
} from '@/utils/url'

type Props = Omit<LinkProps, 'to'> & {
  to: ValidAppRouteConfig
  params?: RouteParams
}

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ to, params, ...props }, ref) => {
    const subdomainAwareUrl = generateSubdomainAwareUrl(to, params)
    return <RouterLink ref={ref} to={subdomainAwareUrl} {...props} />
  },
)
