import { type PropsWithChildren } from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'

import { useNavigate } from '@/hooks/use-navigate'
import { type ValidAppRouteConfig } from '@/utils/url'

import { Dialog } from './ui/dialog'

type OptionalFallbackMode =
  | {
      routeAfterClose: ValidAppRouteConfig
      navigationFallbackRoute?: never
    }
  | {
      routeAfterClose?: never
      navigationFallbackRoute: ValidAppRouteConfig
    }

export const RouteDialog = ({
  routeAfterClose,
  navigationFallbackRoute,
  ...props
}: PropsWithChildren<DialogProps & OptionalFallbackMode>) => {
  const navigate = useNavigate()
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          if (routeAfterClose) navigate(routeAfterClose)
          else if (navigationFallbackRoute) {
            // a hack to check if we can go back or not
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (window.history.state.idx !== 0) navigate(-1)
            else navigate(navigationFallbackRoute)
          }
        }
      }}
      {...props}
    />
  )
}
