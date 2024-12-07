export enum RoutePrefixes {
  MANAGERS = '/managers',
  PARTICIPANTS = '/participants',
  EMPTY = '',
}

export const Routes = {
  // manager routes
  MANAGERS_INDEX: { route: '/', prefix: RoutePrefixes.MANAGERS },
  INNOVATION_DETAIL_MODAL: {
    route: '/innovation-ideas/:innovationId',
    prefix: RoutePrefixes.MANAGERS,
  },
  KPI_DEEP_DIVE_MODAL: {
    route: '/kpis/:id/:kpi',
    prefix: RoutePrefixes.MANAGERS,
  },
  KPI_DEEP_DIVE_MODAL_FIRST_LEVEL: {
    route: '/kpis/:id/:kpi/:level',
    prefix: RoutePrefixes.MANAGERS,
  },
  KPI_DEEP_DIVE_MODAL_SECOND_LEVEL: {
    route: '/kpis/:id/:kpi/:level/:subLevel',
    prefix: RoutePrefixes.MANAGERS,
  },
  RECOMMENDATION_DETAIL_MODAL: {
    route: '/recommendations/:recommendationId',
    prefix: RoutePrefixes.MANAGERS,
  },
  // participant routes
  PARTICIPANTS_INDEX: {
    route: '/',
    prefix: RoutePrefixes.PARTICIPANTS,
  },
  SESSION_RECAP_MODAL: {
    route: '/sessions/:id',
    prefix: RoutePrefixes.PARTICIPANTS,
  },
  LEARNING_LIBRARY_MODAL: {
    route: '/deep-dives/:deepDiveId/learning-library/:id',
    prefix: RoutePrefixes.PARTICIPANTS,
  },
  OAO_CONTENT_MODAL: {
    route: '/deep-dives/:deepDiveId/content/:id',
    prefix: RoutePrefixes.PARTICIPANTS,
  },
  SCHEDULE_SESSIONS_MODAL_STEP: {
    route: '/schedule-sessions/:step',
    prefix: RoutePrefixes.PARTICIPANTS,
  },
  // auth
  MAGIC_LOGIN: {
    route: '/auth/magic-login/',
    prefix: RoutePrefixes.EMPTY,
  },
  LOGIN: {
    route: '/auth/login',
    prefix: RoutePrefixes.EMPTY,
  },
  LOGOUT: {
    route: '/auth/logout',
    prefix: RoutePrefixes.EMPTY,
  },
  // distinct innovation idea chatbot
  INNOVATION_GUIDE: {
    route: '/innovation-guide',
    prefix: RoutePrefixes.EMPTY,
  },
  // demo
  CHATBOT_DEMO: {
    route: '/demo/chatbot',
    prefix: RoutePrefixes.EMPTY,
  },
} as const
