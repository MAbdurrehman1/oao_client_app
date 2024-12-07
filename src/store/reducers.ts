import { combineSlices } from '@reduxjs/toolkit'

import { shownAnimationsSlice } from './slices/animations'
import { conversationsSlice } from './slices/conversations'

export const rootReducer = combineSlices(
  conversationsSlice,
  shownAnimationsSlice,
)
