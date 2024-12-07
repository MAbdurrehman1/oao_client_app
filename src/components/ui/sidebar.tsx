import { type ReactNode } from 'react'

import { cn } from '@/utils/styles'
import { generateTestId } from '@/utils/test'
import { type RouteParams, type ValidAppRouteConfig } from '@/utils/url'

import { buttonVariants } from './button/variants'
import { Typography } from './typography'
import { Link } from '../link'

const Sidebar = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => <div className={className}>{children}</div>

const SidebarItem = ({
  className,
  children,
  href,
  params,
  isActive,
}: {
  className?: string
  href: ValidAppRouteConfig
  params?: RouteParams
  children: ReactNode
  isActive?: boolean
}) => (
  <Link
    to={href}
    params={params}
    className={cn(
      buttonVariants({ variant: 'secondary' }),
      className,
      isActive && 'border-brand-color-black',
    )}
  >
    <Typography weight="bold">{children}</Typography>
  </Link>
)

const SidebarSection = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => <div className={cn('pl-s16', className)}>{children}</div>

const SidebarSectionHeader = ({
  className,
  children,
  href,
  title,
  params,
  isActive,
}: {
  className?: string
  children: ReactNode
  href: ValidAppRouteConfig
  params?: RouteParams
  title: string
  isActive?: boolean
}) => (
  <Link
    to={href}
    params={params}
    className={cn(
      buttonVariants({ variant: 'secondary' }),
      'my-s24',
      isActive && 'border-brand-color-black',
      className,
    )}
    {...generateTestId(`kpi-dialog-${title}`)}
  >
    <Typography weight="bold">{children}</Typography>
  </Link>
)

const SidebarSectionContent = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => (
  <div className={cn('space-y-s16 border-l border-grey-600 pl-s16', className)}>
    {children}
  </div>
)

const SidebarSectionItem = ({
  className,
  children,
  href,
  params,
  isActive,
}: {
  className?: string
  href: ValidAppRouteConfig
  children: ReactNode
  params?: RouteParams
  isActive?: boolean
}) => (
  // NOTE: this div is here to make sure this is showing up as a block
  // then the link will be w-auto
  <div>
    <Link
      to={href}
      params={params}
      className={cn(
        buttonVariants({ variant: 'secondary' }),
        'text-grey-600',
        className,
        isActive && 'border-grey-600',
      )}
    >
      <Typography>{children}</Typography>
    </Link>
  </div>
)

export {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarSectionHeader,
  SidebarSectionContent,
  SidebarSectionItem,
}
