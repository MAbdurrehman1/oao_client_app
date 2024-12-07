import { type AiRecommendation } from '@/store/slices/conversations/types'
import { type Recommendation } from '@/types'

/**
 * IMPORTANT NOTE:
 * these function is highly coupled with the result of ai_service
 * if they change, these MUST be changed too.
 */

export const extractRecommendationFromMessage = (
  message: AiRecommendation['content'],
): Pick<Recommendation, 'title' | 'description'> => {
  try {
    const contentParts = message.split('\n\n')
    const title =
      contentParts.find((c) => c.includes('# Title:'))?.split('# Title: ')[1] ??
      ''
    return {
      title,
      description: contentParts.slice(2, contentParts.length - 1).join('\n\n'),
    }
  } catch (error) {
    console.error('extractRecommendationFromMessage: ', error)
    return {
      title: 'Recommendation',
      description: message,
    }
  }
}
