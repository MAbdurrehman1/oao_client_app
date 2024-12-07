import { type RouteParams, type ValidAppRouteConfig } from '@/utils/url'

export enum SectionsEnum {
  YOUR_SESSIONS = 'Your Sessions',
  DEEP_DIVES = 'Deep Dives',
}

export enum SessionStatusEnum {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in-progress',
  LOCKED = 'locked',
}

export type DeepDiveLearningLibraryItem = {
  id: number
  tag: string
  title: string
  description: string
  supertitle?: string
  date?: Date
  onClick?: () => void
  linkProps:
    | {
        external: true
        url: string
        params?: never
      }
    | {
        external: false
        url: ValidAppRouteConfig
        params?: RouteParams
      }
}

export type LearningOutcome = {
  sessionId: number
  title: string
  description: string
}

export interface ISession {
  id: number
  title: string
  description: string
  thumbnailImg: string
  thumbnailGif: string
  order: 1 | 2 | 3
  duration: number
  status: SessionStatusEnum
  url?: string
}

export type SessionSelectedDate = {
  selectedDate: Date
  sessionId: number
}

export type Library = {
  id: number
  title: string
  shortDescription: string
  longDescription: string
  organizationId: number
  deepDiveId: number
}

export type OaoContent = {
  id: number
  title: string
  shortDescription: string
  longDescription: string
  contentUrl: string
  thumbnailUrl: string
  deepDiveId: number
}

export interface IDeepDive {
  id: number
  title: string
  description: string
  url: string
}

export type LibraryContent = {
  id: number
  image: string
  title: string
  description: string
  url: string
}

export type OaoContentOutcome = {
  id: number
  title: string
  description: string
  oaoContentId: number
}
