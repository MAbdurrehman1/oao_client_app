import { Provider as ReduxProvider } from 'react-redux'
import { Outlet } from 'react-router'
import { domAnimation, LazyMotion } from 'framer-motion'
import { PersistGate } from 'redux-persist/integration/react'

import { Toaster } from '@/components/ui/sonner'
import { persistor, store } from '@/store'

import { AccountProvider } from './account/provider'
import { GlobalBadges } from './global-badges'
import { QueryClientProvider } from './query-client'

export const RootProvider = () => (
  <LazyMotion features={domAnimation}>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider>
          <AccountProvider>
            <GlobalBadges />
            <Outlet />
            <Toaster />
          </AccountProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  </LazyMotion>
)
