import { forwardRef, type ReactNode } from 'react'
import { type LinkProps } from 'react-router-dom'

import { Link } from '@/components/link'
import { cn } from '@/utils/styles'
import { type RouteParams, type ValidAppRouteConfig } from '@/utils/url'

import { linkCardDefaultClassName } from './link-card-default-classname'

type LinkCardProps = Omit<LinkProps, 'to'> & {
  className?: string
  children: ReactNode
} & (
    | {
        to: ValidAppRouteConfig
        params?: RouteParams
        externalUrl?: never
      }
    | {
        to?: never
        params?: never
        externalUrl: string
      }
  )

export const LinkCard = forwardRef<HTMLAnchorElement, LinkCardProps>(
  ({ className, children, to, externalUrl, params, ...props }, ref) => {
    const wrapperclassName = cn(linkCardDefaultClassName, className)
    return externalUrl ? (
      <a ref={ref} href={externalUrl} className={wrapperclassName} {...props}>
        {children}
      </a>
    ) : (
      <Link
        to={to!}
        params={params}
        ref={ref}
        className={wrapperclassName}
        {...props}
      >
        {children}
      </Link>
    )
  },
)
