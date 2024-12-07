import { type RouteParams, type ValidAppRouteConfig } from '@/utils/url'

type SidebarLink = {
  title: string
  slug: string
  link: {
    url: ValidAppRouteConfig
    params?: RouteParams
  }
}

export type SidebarLinksType = SidebarLink & {
  children?: SidebarLinksType[]
}

export type ModalContentProps = {
  sidebarLinks: SidebarLinksType
  activeLink: string
  isLoading: boolean
}
