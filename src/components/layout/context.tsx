import { createContext } from 'react'

import { type ValidAppRouteConfig } from '@/utils/url'

import { type Section } from './types'

export interface ILayoutContext {
  enableAnimations: boolean
  isNavbarVisible: boolean
  navbarThreshold: number
  navbarHeight: number
  headerHeight: number
  occupiedHeight: number
  activeSection: string | null
  setIsNavbarVisible: (visible: boolean) => void
  scrollToSection: (slug: Section['slug']) => void
  calculateScrollTargetPostion: (element?: HTMLDivElement | null) => number
  baseRoute: ValidAppRouteConfig
}

export const LayoutContext = createContext<ILayoutContext | null>(null)
