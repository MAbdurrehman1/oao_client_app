import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { type ValidAppRouteConfig } from '@/utils/url'

import {
  AnimationTypes,
  type LymanAnimation,
  type ShownAnimation,
} from './types'

const initialState: ShownAnimation[] = []

export const shownAnimationsSlice = createSlice({
  name: 'shownAnimations',
  initialState,
  reducers: {
    turnOffAnimationsForRoute: (
      state,
      action: PayloadAction<ValidAppRouteConfig>,
    ) => {
      if (
        !state.find(
          (s) =>
            s.type === AnimationTypes.ROUTE &&
            s.route === action.payload.route &&
            s.prefix === action.payload.prefix,
        )
      )
        state.push({
          route: action.payload.route,
          prefix: action.payload.prefix,
          type: AnimationTypes.ROUTE,
        })
      return state
    },
    turnOffAnimationsForLyman: (
      state,
      action: PayloadAction<LymanAnimation['id']>,
    ) => {
      if (
        !state.find(
          (s) => s.type === AnimationTypes.LYMAN && s.id === action.payload,
        )
      )
        state.push({ id: action.payload, type: AnimationTypes.LYMAN })
      return state
    },
  },
})

export const { turnOffAnimationsForRoute, turnOffAnimationsForLyman } =
  shownAnimationsSlice.actions
