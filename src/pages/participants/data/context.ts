import { createContext } from 'react'

import {
  type InnovationIdea,
  type LoadableData,
  type PaginatedData,
} from '@/types'

import {
  type IDeepDive,
  type ISession,
  type SessionSelectedDate,
} from '../types'

export enum SessionsProgressEnum {
  NOT_SCHEDULED_YET = 'NOT_SCHEDULED_YET',
  NOT_COMPLETED_YET = 'NOT_COMPLETED_YET',
  NO_INNOVATION_IDEA_YET = 'NO_INNOVATION_IDEA_YET',
  COMPLETED = 'COMPLETED',
}

export interface IParticipantDataContext {
  progress: SessionsProgressEnum
  sessions: LoadableData<ISession>
  selectedDates: LoadableData<SessionSelectedDate>
  viewedOaoContents: LoadableData<number> & {
    setOaoContentViewed: (id: number) => Promise<void>
  }
  innovationIdea: {
    isLoading: boolean
    data: InnovationIdea | null
    refetch: () => Promise<void>
  }
  refetchSessionUrls: () => Promise<void>
  deepDives: PaginatedData<IDeepDive>
  campaignEndDate: Date | null
  autoReschedule: number | null
}

export const ParticipantDataContext =
  createContext<IParticipantDataContext | null>(null)
