import { toDate } from 'date-fns'

import { type InnovationIdea } from '@/types'
import { type IBackendInnovationIdea } from '@/types/backend'

export const innovationIdeaMapper = (
  item: IBackendInnovationIdea,
): InnovationIdea => ({
  id: item.id,
  title: item.title,
  description: item.description,
  metadata: {
    feasibility: item.feasibility_score,
    confidence: item.confidence_score,
    impact: item.impact_score,
  },
  createdAt: toDate(item.created_at),
  participationId: item.participation_id,
  participant: {
    email: item.participant_email ?? item.user_email,
    name: `${item.participant_first_name ?? ''} ${item.participant_last_name ?? ''}`,
  },
  rate: item.rate ?? 0,
  // FIXME: change these when data was in the API response
  category: null,
})
