import { useContext } from 'react'

import { ManagementPositionsContext } from '../management-positions/context'

export const useManagementPositions = () => {
  const context = useContext(ManagementPositionsContext)
  if (!context)
    throw new Error(
      'useManagementPositions must be used within `ManagementPositionsContextProvider`',
    )
  return context
}
