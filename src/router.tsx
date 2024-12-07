import { Navigate } from 'react-router-dom'

import { WithSuspense } from '@/components/with-suspense'
import { NotFoundPageLoader } from '@/pages/404/loader'
import { AuthLoading } from '@/pages/auth/loading'
import { LoginLoader } from '@/pages/auth/login/loader'
import { LogoutLoader } from '@/pages/auth/logout/loader'
import { MagicLoginLoader } from '@/pages/auth/magic-login/loader'
import { ChatbotDemoPageLoader } from '@/pages/demo/chatbot/loader'
import { InnovationGuidePageLoader } from '@/pages/innovation-guide/loader'
import { ManagersPageLoader } from '@/pages/managers/loader'
import { InnovationDetailModalLoader } from '@/pages/managers/modals/innovation-idea-details/loader'
import {
  KpiDeepDiveModalFirstLevelLoader,
  KpiDeepDiveModalLoader,
  KpiDeepDiveModalOverviewLoader,
  KpiDeepDiveModalSecondLevelLoader,
} from '@/pages/managers/modals/kpi-deep-dive/loader'
import { RecommendationDetailModalLoader } from '@/pages/managers/modals/recommendation-details/loader'
import { ParticipantsPageLoader } from '@/pages/participants/loader'
import { LearningLibraryModalLoader } from '@/pages/participants/modals/learning-library-modal/loader'
import { OaoContentModalLoader } from '@/pages/participants/modals/oao-content-modal/loader'
import { ScheduleSessionsModalLoader } from '@/pages/participants/modals/schedule-sessions-modal/loader'
import { SessionRecapModalLoader } from '@/pages/participants/modals/session-recap-modal/loader'
import { AuthProviderModes } from '@/providers/auth/common'
import AuthProvider from '@/providers/auth/provider'
import { RootProvider } from '@/providers/root'
import { Routes } from '@/routes'

import { FullscreenLoading } from './components/fullscreen-loading'
import { detectSubdomain, generateSubdomainAwareUrl } from './utils/url'
import { AppEnv, getAppEnv } from './config'
import { SUBDOMAINS } from './constants'
import { sentryCreateBrowserRouter } from './sentry'

const subdomain = detectSubdomain()

export const router = sentryCreateBrowserRouter([
  {
    element: <RootProvider />,
    children: [
      subdomain !== SUBDOMAINS.PARTICIPANTS && {
        // wrapper for managers routes
        element: (
          <AuthProvider
            validatorMode={AuthProviderModes.MANAGER}
            fallbackUrl={Routes.LOGIN}
          />
        ),
        children: [
          {
            path: generateSubdomainAwareUrl(Routes.MANAGERS_INDEX),
            element: WithSuspense(ManagersPageLoader, <FullscreenLoading />),
            children: [
              {
                path: generateSubdomainAwareUrl(Routes.INNOVATION_DETAIL_MODAL),
                element: WithSuspense(InnovationDetailModalLoader),
              },
              {
                path: generateSubdomainAwareUrl(Routes.KPI_DEEP_DIVE_MODAL),
                element: WithSuspense(KpiDeepDiveModalLoader),
                children: [
                  {
                    index: true,
                    element: WithSuspense(KpiDeepDiveModalOverviewLoader),
                  },
                  {
                    path: generateSubdomainAwareUrl(
                      Routes.KPI_DEEP_DIVE_MODAL_FIRST_LEVEL,
                    ),
                    element: WithSuspense(KpiDeepDiveModalFirstLevelLoader),
                  },
                  {
                    path: generateSubdomainAwareUrl(
                      Routes.KPI_DEEP_DIVE_MODAL_SECOND_LEVEL,
                    ),
                    element: WithSuspense(KpiDeepDiveModalSecondLevelLoader),
                  },
                ],
              },
              {
                path: generateSubdomainAwareUrl(
                  Routes.RECOMMENDATION_DETAIL_MODAL,
                ),
                element: WithSuspense(RecommendationDetailModalLoader),
              },
            ],
          },
        ],
      },
      subdomain !== SUBDOMAINS.MANAGERS && {
        // wrapper for participants routes
        element: (
          <AuthProvider
            validatorMode={AuthProviderModes.PARTICIPANT}
            fallbackUrl={Routes.LOGIN}
          />
        ),
        children: [
          {
            path: generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX),
            element: WithSuspense(
              ParticipantsPageLoader,
              <FullscreenLoading />,
            ),
            children: [
              {
                path: generateSubdomainAwareUrl(Routes.SESSION_RECAP_MODAL),
                element: WithSuspense(SessionRecapModalLoader),
              },
              {
                path: generateSubdomainAwareUrl(
                  Routes.SCHEDULE_SESSIONS_MODAL_STEP,
                ),
                element: WithSuspense(ScheduleSessionsModalLoader),
              },
              {
                path: generateSubdomainAwareUrl(Routes.LEARNING_LIBRARY_MODAL),
                element: WithSuspense(LearningLibraryModalLoader),
              },
              {
                path: generateSubdomainAwareUrl(Routes.OAO_CONTENT_MODAL),
                element: WithSuspense(OaoContentModalLoader),
              },
            ],
          },
          {
            path: generateSubdomainAwareUrl(Routes.CHATBOT_DEMO),
            element:
              getAppEnv() !== AppEnv.PRODUCTION
                ? WithSuspense(ChatbotDemoPageLoader, <FullscreenLoading />)
                : WithSuspense(NotFoundPageLoader, <AuthLoading />),
          },
        ],
      },
      // redirect to participants if there's no subdomain
      subdomain === null && {
        index: true,
        path: '/',
        element: (
          <Navigate to={generateSubdomainAwareUrl(Routes.PARTICIPANTS_INDEX)} />
        ),
      },
      {
        // wrapper for unauthenticated routes
        element: (
          <AuthProvider
            validatorMode={AuthProviderModes.UNAUTHENTICATED}
            fallbackUrl={Routes.PARTICIPANTS_INDEX}
          />
        ),
        children: [
          {
            path: generateSubdomainAwareUrl(Routes.MAGIC_LOGIN),
            element: WithSuspense(MagicLoginLoader, <AuthLoading />),
          },
          {
            path: generateSubdomainAwareUrl(Routes.LOGIN),
            element: WithSuspense(LoginLoader, <AuthLoading />),
          },
          {
            path: generateSubdomainAwareUrl(Routes.LOGOUT),
            element: WithSuspense(LogoutLoader, <AuthLoading />),
          },
        ],
      },
      {
        path: generateSubdomainAwareUrl(Routes.INNOVATION_GUIDE),
        element: WithSuspense(InnovationGuidePageLoader, <FullscreenLoading />),
      },
      {
        path: '*',
        element: WithSuspense(NotFoundPageLoader, <AuthLoading />),
      },
    ].filter((c) => !!c),
  },
])
