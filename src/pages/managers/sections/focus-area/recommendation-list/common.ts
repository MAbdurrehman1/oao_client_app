import { type ReactNode } from 'react'

import { type KPI } from '@/types'

export interface WrapperProps {
  kpi: KPI | null
  shouldSheetBeVisible: boolean
  sheetOpenedByUser: boolean
  isSheetOpen: boolean
  setSheetOpenedByUser: React.Dispatch<React.SetStateAction<boolean>>
  itemsLength: number
  children: ReactNode
}
