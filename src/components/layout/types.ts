import { type ReactNode, type RefObject } from 'react'

import { type ValidAppRouteConfig } from '@/utils/url'

export type Section = {
  title: string
  slug: string
  Component: () => ReactNode
  ref: RefObject<HTMLDivElement>
}

export type SectionCreator = Omit<Section, 'ref' | 'slug'>

export type ContextProviderProps = {
  children: ReactNode
  sections: SectionCreator[]
  navbarExtra?: ReactNode
  baseRoute: ValidAppRouteConfig
  hasNavbar?: boolean
}
