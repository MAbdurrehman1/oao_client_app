import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom'
import * as Sentry from '@sentry/react'

import { AppEnv, getAppEnv } from './config'

const appEnv = getAppEnv()

Sentry.init({
  dsn:
    appEnv === AppEnv.PRODUCTION || appEnv === AppEnv.STAGING
      ? 'https://ef33dfb038d08bf51c36f248190126fd@o4507577228787712.ingest.de.sentry.io/4508086696083536'
      : undefined,
  environment: import.meta.env.VITE_APP_ENV,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

export const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter)
