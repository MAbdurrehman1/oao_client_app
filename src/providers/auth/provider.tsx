import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'

import { useAccount } from '@/hooks/use-account'
import { useNavigate } from '@/hooks/use-navigate'
import { setIsPreviewReport } from '@/utils/preview-report'
import { type ValidAppRouteConfig } from '@/utils/url'

import { AuthProviderModes } from './common'

export default function AuthProvider({
  validatorMode,
  fallbackUrl,
}: {
  validatorMode: AuthProviderModes
  fallbackUrl: ValidAppRouteConfig
}) {
  const { hasToken } = useAccount()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const hasMagicLoginToken = searchParams.has('token')
    const isPreviewReport = searchParams.has('previewReportId')
    if (
      (validatorMode === AuthProviderModes.UNAUTHENTICATED && hasToken) ||
      (validatorMode === AuthProviderModes.MANAGER &&
        !isPreviewReport &&
        !hasToken) ||
      (validatorMode === AuthProviderModes.PARTICIPANT &&
        !hasToken &&
        !hasMagicLoginToken)
    ) {
      navigate(fallbackUrl)
    }
    // we need this hook if only hasToken changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken])
  useEffect(() => {
    try {
      const isRunningInAnIframe = window.location !== window.parent.location
      if (searchParams.has('previewReportId') && isRunningInAnIframe) {
        setIsPreviewReport(searchParams.get('previewReportId'))
      }
    } catch (error) {
      console.error(error)
    }
    // we only need to check this hook in the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Outlet />
}
