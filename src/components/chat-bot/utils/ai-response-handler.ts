import { type AppDispatch } from '@/store'
import {
  newConversationMessage,
  setConversationStreamId,
  updateAiResponse,
} from '@/store/slices/conversations'
import {
  AiMessageStatusEnum,
  ConversationGoals,
  MessageTypeEnum,
} from '@/store/slices/conversations/types'

import {
  INNOVATION_IDEA_END_TEXT,
  INNOVATION_IDEA_START_TEXT,
  INNOVATION_IDEA_SUBMITTED_TEXT,
  RECOMMENDATION_END_TEXT,
  RECOMMENDATION_START_TEXT,
} from './common'
import { extractInnovationIdeaFromMessage } from './extract-innovation-idea-from-message'
import { extractRecommendationFromMessage } from './extract-recommendation-from-message'

export const aiResponseHandler = async ({
  response,
  dispatch,
  lastMessageId,
  createNewId,
  goal,
  chatBotId,
  submitInnovationIdea,
}: {
  dispatch: AppDispatch
  lastMessageId: number
  createNewId: () => number
  response: Response
  goal: ConversationGoals
  chatBotId: string
  submitInnovationIdea: () => Promise<void>
}) => {
  let responseMessageId = lastMessageId
  let result = ''
  let theresMore = true
  const reader = response.body!.getReader()
  const decoder = new TextDecoder('utf-8')

  const createNewReduxMessage = () => {
    // this part is for the second message
    // empty out the result to avoid showing duplicated content
    result = ''
    // since we want to create a new message, a new id should be assigned
    // this function is passed from the caller, bc the message id is a React.RefObject
    responseMessageId = createNewId()
    // finally create a new message in the redux
    dispatch(
      setConversationStreamId({ chatBotId, streamId: responseMessageId }),
    )
    dispatch(
      newConversationMessage({
        chatBotId,
        id: responseMessageId,
        type: MessageTypeEnum.AI,
        content: '',
        hasRecommendation: false,
        hasInnovationIdea: false,
        conversationId: response.headers.get('conversation_id') ?? undefined,
        status: AiMessageStatusEnum.STREAMING,
      }),
    )
  }

  while (theresMore) {
    const { done, value } = await reader.read()
    if (done) {
      dispatch(
        updateAiResponse({
          id: responseMessageId,
          content: result,
          chatBotId,
          status: AiMessageStatusEnum.DONE,
        }),
      )
      theresMore = false
      break
    }
    const chunk = decoder.decode(value, { stream: true })
    for (const line of chunk.split('\n\n')) {
      const partialString = line.split('data: ')[1]
      if (partialString) {
        const json = JSON.parse(partialString) as { token: string }
        const token = json.token ?? ''
        result += token
        if (
          result.includes(INNOVATION_IDEA_START_TEXT) &&
          goal === ConversationGoals.INNOVATION_IDEA
        ) {
          // split the response into two messages, first one just to be shown,
          // the other one to be edited as the innovation idea
          result = result.replace(INNOVATION_IDEA_START_TEXT, '')
          if (result) {
            dispatch(
              updateAiResponse({
                id: responseMessageId,
                content: result,
                chatBotId,
              }),
            )
            createNewReduxMessage()
          }
        } else if (
          result.includes(RECOMMENDATION_START_TEXT) &&
          goal === ConversationGoals.RECOMMENDATION
        ) {
          // split the response into two messages, first one just to be shown,
          // the other one to be edited as the recommendation later
          result = result.replace(RECOMMENDATION_START_TEXT, '')
          if (result) {
            dispatch(
              updateAiResponse({
                id: responseMessageId,
                content: result,
                chatBotId,
              }),
            )
            createNewReduxMessage()
          }
        } else if (
          result.includes(INNOVATION_IDEA_END_TEXT) &&
          goal === ConversationGoals.INNOVATION_IDEA
        ) {
          // we want to show the save phrase instead of INNOVATION_IDEA_END_TEXT
          result = result.replace(INNOVATION_IDEA_END_TEXT, '')
          const innovationIdea = extractInnovationIdeaFromMessage(result)
          dispatch(
            updateAiResponse({
              id: responseMessageId,
              content: innovationIdea.description,
              scores: innovationIdea.metadata,
              chatBotId,
              hasInnovationIdea: true,
              title: innovationIdea.title,
              status: AiMessageStatusEnum.DONE,
            }),
          )
          theresMore = false
          break
        } else if (
          result.includes(RECOMMENDATION_END_TEXT) &&
          goal === ConversationGoals.RECOMMENDATION
        ) {
          // we want to show the save button instead of RECOMMENDATION_END_TEXT
          result = result.replace(RECOMMENDATION_END_TEXT, '')
          const recommendation = extractRecommendationFromMessage(result)
          dispatch(
            updateAiResponse({
              id: responseMessageId,
              content: recommendation.description,
              chatBotId,
              hasRecommendation: true,
              title: recommendation.title,
              status: AiMessageStatusEnum.DONE,
            }),
          )
          theresMore = false
          break
        } else if (
          result.includes(INNOVATION_IDEA_SUBMITTED_TEXT) &&
          goal === ConversationGoals.INNOVATION_IDEA
        ) {
          // we want to show the save button instead of RECOMMENDATION_END_TEXT
          result = result.replace(INNOVATION_IDEA_SUBMITTED_TEXT, '')
          dispatch(
            updateAiResponse({
              id: responseMessageId,
              content: result,
              chatBotId,
            }),
          )
          void submitInnovationIdea()
        } else {
          // ignore if result is empty
          if (result)
            dispatch(
              updateAiResponse({
                id: responseMessageId,
                content: result,
                chatBotId,
              }),
            )
        }
      }
    }
  }
}
