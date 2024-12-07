import { Suspense, useMemo } from 'react'
import { lazyWithPreload as lazy } from 'react-lazy-with-preload'
import { useParams } from 'react-router-dom'

import { Loading } from '@/components/loading'
import { RouteDialog } from '@/components/route-dialog'
import { useTailwindBreakpoint } from '@/hooks/use-tailwind-breakpoint'
import { Routes } from '@/routes'
import { type KPI } from '@/types'

import { useKpiDeepDiveContext } from './context/use-kpi-deep-dive-context'
import { type SidebarLinksType } from './types'

const KpiDeepDiveModalContentLoader = lazy(() =>
  import(/* webpackChunkName: "kpi-content" */ './content').then((m) => ({
    default: m.KpiDeepDiveModalContent,
  })),
)
const KpiDeepDiveModalMobileContentLoader = lazy(() =>
  import(/* webpackChunkName: "kpi-mobile-content" */ './mobile-content').then(
    (m) => ({
      default: m.KpiDeepDiveModalMobileContent,
    }),
  ),
)

export const KpiDeepDiveModal = () => {
  const { subKpis } = useKpiDeepDiveContext()
  const { id, kpi, level, subLevel } = useParams<{
    id: string
    level: string
    subLevel: string
    kpi: KPI
  }>()
  const sidebarLinks: SidebarLinksType = useMemo(
    () => ({
      title: 'overview',
      slug: 'overview',
      link: {
        url: Routes.KPI_DEEP_DIVE_MODAL,
        params: {
          id: id!,
          kpi: kpi!,
        },
      },
      children: subKpis.data.map((s) => ({
        title: s.title,
        slug: s.slug,
        link: {
          url: Routes.KPI_DEEP_DIVE_MODAL_FIRST_LEVEL,
          params: {
            id: id!,
            kpi: kpi!,
            level: s.slug,
          },
        },
        children: s.subKpis.map((ss) => ({
          title: ss.title,
          slug: ss.slug,
          link: {
            url: Routes.KPI_DEEP_DIVE_MODAL_SECOND_LEVEL,
            params: {
              id: id!,
              kpi: kpi!,
              level: s.slug,
              subLevel: ss.slug,
            },
          },
        })),
      })),
    }),
    [id, kpi, subKpis.data],
  )
  const isMobile = useTailwindBreakpoint({ mode: 'max', breakpoint: 'md' })
  const activeLink = useMemo(() => {
    const fallback = sidebarLinks.title
    if (subLevel) {
      return (
        sidebarLinks.children
          ?.find((l) => l.title === level!)
          ?.children?.find((l) => l.slug === subLevel)?.title ?? fallback
      )
    }
    if (level)
      return (
        sidebarLinks.children?.find((l) => l.slug === level)?.title ?? fallback
      )
    return fallback
  }, [level, sidebarLinks.children, sidebarLinks.title, subLevel])
  return (
    <RouteDialog routeAfterClose={Routes.MANAGERS_INDEX}>
      <Suspense fallback={<Loading />}>
        {isMobile ? (
          <KpiDeepDiveModalMobileContentLoader
            sidebarLinks={sidebarLinks}
            activeLink={activeLink}
            isLoading={subKpis.isLoading}
          />
        ) : (
          <KpiDeepDiveModalContentLoader
            sidebarLinks={sidebarLinks}
            activeLink={activeLink}
            isLoading={subKpis.isLoading}
          />
        )}
      </Suspense>
    </RouteDialog>
  )
}
