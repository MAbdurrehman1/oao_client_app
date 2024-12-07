import { useContext } from 'react'

import { LayoutContext } from '../components/layout/context'

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)
  if (!context)
    throw new Error(
      'useLayoutContext must be used within `LayoutContextProvider`',
    )
  return context
}
