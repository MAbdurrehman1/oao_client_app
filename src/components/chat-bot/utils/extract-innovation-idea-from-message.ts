import { type AiInnovationIdea } from '@/store/slices/conversations/types'
import { type InnovationIdea } from '@/types'

/**
 * IMPORTANT NOTE:
 * these functions are highly coupled with the result of ai_service
 * if they change, these MUST be changed too.
 */

type MarkdownMetadataKeys = 'feasibility' | 'impact' | 'confidence'
const stringNumbers = new Array(10).fill(0).map((_, index) => `${index}`)
const extractScoreFromString = (scoreString: string): number => {
  let stringResult = '0'
  for (const char of scoreString.split('')) {
    if (char === ' ') continue
    if (stringNumbers.includes(char)) stringResult += char
    else break
  }
  return parseInt(stringResult)
}

const singleLineSeparator = '\n'
const doubleLineSeparator = '\n\n'

export const extractInnovationIdeaFromMessage = (
  message: AiInnovationIdea['content'],
): Pick<InnovationIdea, 'title' | 'description' | 'metadata'> => {
  try {
    const separator = message.includes(doubleLineSeparator)
      ? doubleLineSeparator
      : singleLineSeparator
    const contentParts = message
      .split(separator)
      .filter((l) => l !== '**')
      .filter((l) => !!l)
    const title =
      contentParts.find((c) => c.includes('Title:'))?.split('Title: ')[1] ?? ''
    const metadata: Partial<InnovationIdea['metadata']> = {}
    for (const key of ['Impact', 'Confidence', 'Feasibility'] as const) {
      const splittedByScoreKey = message.split(`${key}:`)
      const scoreString = splittedByScoreKey[1].trim()
      const score = extractScoreFromString(scoreString)
      metadata[key.toLowerCase() as MarkdownMetadataKeys] = score ?? 0
    }
    return {
      title,
      description: contentParts.slice(1).join(doubleLineSeparator),
      metadata: {
        impact: metadata.impact ?? 0,
        feasibility: metadata.feasibility ?? 0,
        confidence: metadata.confidence ?? 0,
      },
    }
  } catch (error) {
    console.error('extractInnovationIdeaFromMessage: ', error)
    return {
      title: 'Innovation Idea',
      description: message,
      metadata: {
        confidence: 0,
        feasibility: 0,
        impact: 0,
      },
    }
  }
}
