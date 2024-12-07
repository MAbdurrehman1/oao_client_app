import { Fragment } from 'react/jsx-runtime'
import { Outlet, useParams } from 'react-router-dom'

import { Link } from '@/components/link'
import { Loading } from '@/components/loading'
import { RouteDialog } from '@/components/route-dialog'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogSidebar,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { KpiIcon } from '@/pages/managers/components/kpi-icon'
import { Routes } from '@/routes'
import { type KPI, KpiKeys } from '@/types'
import { cn } from '@/utils/styles'

import { type ModalContentProps } from './types'

export const KpiDeepDiveModalMobileContent = ({
  sidebarLinks,
  activeLink,
  isLoading,
}: ModalContentProps) => {
  const { id, kpi } = useParams<{
    id: string
    kpi: KPI
  }>()
  const otherKpis = KpiKeys.filter((i) => i !== kpi)
  return (
    <RouteDialog routeAfterClose={Routes.MANAGERS_INDEX}>
      <DialogContent
        className="h-screen w-screen bg-transparent shadow-none"
        headerClassName={cn(
          `
            relative mx-[2.5%] mb-0 mt-[2.5%] w-[95%] overflow-hidden
            rounded-t-md bg-white
            [&>div]:!px-0
          `,
        )}
        contentClassName={cn('!p-0')}
        header={
          <div className="flex flex-row items-center space-x-s24">
            {kpi && <KpiIcon kpi={kpi} />}
            <DialogTitle className="capitalize">{kpi}</DialogTitle>
          </div>
        }
      >
        <>
          <div
            className={`
              mx-[2.5%] flex flex-col rounded-b-md bg-white p-s24 pt-10
              shadow-main
              md:flex-row
            `}
          >
            <DialogSidebar className="mb-s32">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full justify-between">
                  {activeLink}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem asChild>
                    <Link
                      className="block w-full cursor-pointer"
                      to={sidebarLinks.link.url}
                      params={sidebarLinks.link.params}
                    >
                      {sidebarLinks.title}
                    </Link>
                  </DropdownMenuItem>
                  {isLoading && <Loading className="w-full" />}
                  {sidebarLinks.children?.map((firstLevel) => (
                    <Fragment key={firstLevel.title}>
                      <DropdownMenuItem asChild>
                        <Link
                          className="block w-full cursor-pointer"
                          to={firstLevel.link.url}
                          params={firstLevel.link.params}
                        >
                          {firstLevel.title}
                        </Link>
                      </DropdownMenuItem>
                      {firstLevel.children?.map((secondLevel) => (
                        <DropdownMenuItem asChild key={secondLevel.title} inset>
                          <Link
                            className="block w-full cursor-pointer"
                            to={secondLevel.link.url}
                            params={secondLevel.link.params}
                          >
                            {secondLevel.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </DialogSidebar>
            <div className="flex min-h-screen w-full flex-col">
              <Outlet />
            </div>
          </div>
          <div className="mx-[2.5%] my-s24 w-[95%]">
            {otherKpis.map((otherKpi) => (
              <Link
                to={Routes.KPI_DEEP_DIVE_MODAL}
                params={{
                  id: id!,
                  kpi: otherKpi,
                }}
                key={otherKpi}
                className={`
                  mb-s32 flex flex-row items-center justify-between rounded-md
                  bg-brand-color-white p-s24 shadow-main
                `}
              >
                <div className="flex flex-row items-center space-x-s24">
                  <KpiIcon kpi={otherKpi} />
                  <Typography className="capitalize" weight="bold" size="s24">
                    {otherKpi}
                  </Typography>
                </div>
                <Button size="icon">
                  <Icon name="external-link" />
                </Button>
              </Link>
            ))}
          </div>
        </>
      </DialogContent>
    </RouteDialog>
  )
}
