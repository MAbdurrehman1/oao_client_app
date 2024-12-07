import { Fragment } from 'react/jsx-runtime'
import { Outlet, useParams } from 'react-router-dom'

import { RouteDialog } from '@/components/route-dialog'
import {
  DialogContent,
  DialogSidebar,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarSectionContent,
  SidebarSectionHeader,
  SidebarSectionItem,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { KpiIcon } from '@/pages/managers/components/kpi-icon'
import { Routes } from '@/routes'
import { type KPI } from '@/types'

import { type ModalContentProps } from './types'

export const KpiDeepDiveModalContent = ({
  sidebarLinks,
  activeLink,
  isLoading,
}: ModalContentProps) => {
  const { kpi } = useParams<{
    id: string
    kpi: KPI
    level?: string
    subLevel?: string
  }>()
  return (
    <RouteDialog routeAfterClose={Routes.MANAGERS_INDEX}>
      <DialogContent
        header={
          <div className="flex flex-row space-x-s24">
            {kpi && <KpiIcon kpi={kpi} />}
            <DialogTitle className="capitalize">{kpi}</DialogTitle>
          </div>
        }
      >
        <div
          className={`
            flex flex-col
            md:flex-row
          `}
        >
          <DialogSidebar>
            <Sidebar>
              <SidebarItem
                href={sidebarLinks.link.url}
                params={sidebarLinks.link.params}
                isActive={activeLink === sidebarLinks.title}
              >
                {sidebarLinks.title}
              </SidebarItem>
              <SidebarSection>
                {isLoading && (
                  <div className="mt-s24 space-y-s24">
                    <Skeleton className="h-6 w-24" />
                    <div className="space-y-4 border-l pl-s24">
                      <Skeleton className="h-6 w-28" />
                      <Skeleton className="h-6 w-28" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                    <div className="space-y-4 border-l pl-s24">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-28" />
                    </div>
                  </div>
                )}
                {sidebarLinks.children?.map((firstLevel) => (
                  <Fragment key={firstLevel.title}>
                    <SidebarSectionHeader
                      title={firstLevel.title}
                      href={firstLevel.link.url}
                      params={firstLevel.link.params}
                      isActive={activeLink === firstLevel.title}
                    >
                      {firstLevel.title}
                    </SidebarSectionHeader>
                    <SidebarSectionContent>
                      {firstLevel.children?.map((secondLevel) => (
                        <SidebarSectionItem
                          key={secondLevel.title}
                          href={secondLevel.link.url}
                          params={secondLevel.link.params}
                          isActive={activeLink === secondLevel.title}
                        >
                          {secondLevel.title}
                        </SidebarSectionItem>
                      ))}
                    </SidebarSectionContent>
                  </Fragment>
                ))}
              </SidebarSection>
            </Sidebar>
          </DialogSidebar>
          <div className="flex min-h-screen w-full flex-col">
            <Outlet />
          </div>
        </div>
      </DialogContent>
    </RouteDialog>
  )
}
