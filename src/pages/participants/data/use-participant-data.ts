import { useContext } from 'react'

import { ParticipantDataContext } from './context'

export const useParticipantData = () => {
  const context = useContext(ParticipantDataContext)
  if (context === null)
    throw new Error(
      '`useParticipantData()` hook must be used whitin `<ParticipantDataContext.Provider />`',
    )
  return context
}
