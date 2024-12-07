import { createContext } from 'react'

import { type Position } from '@/types'

export type IManagementPositionsContext = {
  isLoading: boolean
  managementPositions: Position[]
  setSelectedManagementPosition: (p: Position) => void
  selectedManagementPosition: Position | null
}

export const ManagementPositionsContext =
  createContext<IManagementPositionsContext | null>(null)
