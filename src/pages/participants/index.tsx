import { FullscreenLoading } from '@/components/fullscreen-loading'
import { useAccount } from '@/hooks/use-account'

import { ParticipantDataProvider } from './data/provider'
import { ParticipantSections } from './sections'

export const ParticipantsPage = () => {
  const { account } = useAccount()
  return (
    <ParticipantDataProvider>
      {(isLoading) =>
        isLoading || !account ? <FullscreenLoading /> : <ParticipantSections />
      }
    </ParticipantDataProvider>
  )
}
