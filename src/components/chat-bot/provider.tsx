import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'

import apiClient from '@/api/client'
import { apiBaseUrls } from '@/api/config'
import { ApiEndpoints, LlmApiEndpoints } from '@/api/endpoints'
import { getTokens } from '@/api/token'
import { useAccount } from '@/hooks/use-account'
import { useKeyPress } from '@/hooks/use-key-press'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  abortStreamingMessage,
  endConversation,
  newConversation,
  newConversationMessage,
  removeConversationMessage,
  setConversationStreamId,
} from '@/store/slices/conversations'
import {
  selectConversation,
  selectConversationEnded,
  selectConversationId,
  selectConversationMessages,
} from '@/store/slices/conversations/selectors'
import {
  type AiInnovationIdea,
  AiMessageStatusEnum,
  type Conversation,
  type ConversationGoals,
  type Message,
  MessageTypeEnum,
  type UserMessage,
} from '@/store/slices/conversations/types'
import { generateUrl } from '@/utils/url'

import { aiResponseHandler } from './utils/ai-response-handler'
import {
  ChatBotContext,
  type ChatBotModel,
  type IChatBotContext,
} from './context'

export interface ChatBotProviderProps {
  chatBotId: string
  goal: ConversationGoals
  model?: ChatBotModel
  children: ({ isEditMode }: { isEditMode: boolean }) => ReactNode
  onApproveButtonCallback?: IChatBotContext['onApproveButtonCallback']
  shouldMobileButtonBeVisible: boolean
  onGoalAcheivedCallback?: () => void
  createInnovationIdeaFn?: (
    message: AiInnovationIdea,
    conversation: Conversation,
  ) => Promise<void>
  newMessageApiConfig?: {
    requestUrl?: string
    requestBodyExtras?: Record<string, string>
  }
}

interface ConversationMessageRequestPayload {
  message: string
  conversation_id: string
  conversation_type: ConversationGoals
  model?: ChatBotModel
}

export const ChatBotProvider = ({
  goal,
  chatBotId,
  children,
  model,
  onApproveButtonCallback,
  onGoalAcheivedCallback,
  shouldMobileButtonBeVisible,
  createInnovationIdeaFn,
  newMessageApiConfig,
}: ChatBotProviderProps) => {
  // used to determine which side of the card to show, chat mode or edit mode.
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  // we have different chat bots in the app
  // we use redux to make sure all of their states are valid
  // we also use redux-persist to keep the data available between refreshes.
  const dispatch = useAppDispatch()
  const conversation = useAppSelector((state) =>
    selectConversation(state, chatBotId),
  )
  const conversationId = useAppSelector((state) =>
    selectConversationId(state, chatBotId),
  )
  const messages = useAppSelector((state) =>
    selectConversationMessages(state, chatBotId),
  )
  const conversationEnded = useAppSelector((state) =>
    selectConversationEnded(state, chatBotId),
  )
  // a local id to have a reference for messages
  // we use `useRef` here to make sure react won't race ids.
  const lastMessageId = useRef<number>(messages[messages.length - 1]?.id ?? 0)
  // util function to create a new message id
  const createMessageId = () => ++lastMessageId.current
  // for handling stream state and cancelling stream.
  const abortController = useRef<AbortController>(new AbortController())
  const [isStreaming, setIsStreaming] = useState<boolean>(false)
  const { account } = useAccount()

  const createInnovationIdea = useCallback(
    async ({ message }: { message: AiInnovationIdea }) => {
      try {
        if (createInnovationIdeaFn) {
          if (!conversation) throw 'conversation is null'
          await createInnovationIdeaFn(message, conversation)
        } else {
          if (!account)
            throw new Error(
              'account.participationId not provided, account is null',
            )
          await apiClient.post(
            generateUrl(ApiEndpoints.CREATE_INNOVATION_IDEA, {
              participationId: account.participationId,
            }),
            {
              title: message.title,
              description: message.content,
              feasibility_score: message.scores.feasibility,
              confidence_score: message.scores.confidence,
              impact_score: message.scores.impact,
            },
          )
        }
        toast.success('Innovation Idea Created Successfully', {
          duration: 5_000,
        })
        dispatch(endConversation({ chatBotId }))
        onGoalAcheivedCallback?.()
      } catch (error) {
        console.error('[ChatBotProvider] createInnovationIdea:', error)
      } finally {
        setIsCreatingInnovationIdea(false)
      }
    },
    [
      account,
      chatBotId,
      conversation,
      createInnovationIdeaFn,
      dispatch,
      onGoalAcheivedCallback,
    ],
  )

  // callback to submit innovation idea
  const submitInnovationIdea = useCallback(async () => {
    const innovationIdeaMessage = messages
      .filter((m) => m.type === MessageTypeEnum.AI && m.hasInnovationIdea)
      .sort((a, b) => (b.id > a.id ? 1 : -1))[0]
    if (innovationIdeaMessage && !conversationEnded) {
      setIsCreatingInnovationIdea(true)
      await createInnovationIdea({
        message: innovationIdeaMessage as AiInnovationIdea,
      })
    }
  }, [conversationEnded, createInnovationIdea, messages])

  // callback to send a new message
  const sendUserMessage = useCallback(
    async (message: UserMessage) => {
      try {
        abortController.current = new AbortController()
        const signal = abortController.current.signal
        const body: ConversationMessageRequestPayload = {
          message: message.content,
          conversation_id: conversationId,
          conversation_type: goal,
          ...(newMessageApiConfig?.requestBodyExtras ?? {}),
        }
        if (model) body.model = model ?? 'chatgpt'
        const response = await fetch(
          apiBaseUrls.llm +
            (newMessageApiConfig?.requestUrl ?? LlmApiEndpoints.SEND_MESSAGE),
          {
            method: 'post',
            headers: {
              Authorization: 'Bearer ' + getTokens().accessToken,
              Accept: 'text/event-stream',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            signal,
          },
        )
        if (response.ok && response.body) {
          const responseMessageId = createMessageId()
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
              status: AiMessageStatusEnum.STREAMING,
              conversationId:
                response.headers.get('conversation_id') ?? undefined,
            }),
          )
          await aiResponseHandler({
            dispatch,
            lastMessageId: responseMessageId,
            createNewId: () => createMessageId(),
            response,
            goal,
            chatBotId,
            submitInnovationIdea: async () => await submitInnovationIdea(),
          })
        } else {
          const typedError = (await response.json()) as {
            error?: string
            detail?: string
          }
          const errorMessage =
            typedError.error ?? typedError.detail ?? 'Something went wrong'
          dispatch(
            newConversationMessage({
              chatBotId,
              id: createMessageId(),
              type: MessageTypeEnum.ERROR,
              retriable: true,
              originalMessageId: message.id,
              content: errorMessage,
            }),
          )
          if (response.status === 401 || response.status === 403)
            await apiClient.get(ApiEndpoints.GET_ACCOUNT_INFO)
        }
        setIsStreaming(false)
      } catch (error) {
        // silently handle aborted calls
        const errorName = (error as { name: string }).name
        if (['AbortError', 'ManualAbort'].includes(errorName)) {
          setIsStreaming(false)
          return
        }

        console.error('fetchError', error)
        dispatch(
          newConversationMessage({
            chatBotId,
            id: createMessageId(),
            type: MessageTypeEnum.ERROR,
            retriable: true,
            originalMessageId: message.id,
            content: 'Something went wrong',
          }),
        )
        setIsStreaming(false)
      }
    },
    [
      conversationId,
      goal,
      newMessageApiConfig?.requestBodyExtras,
      newMessageApiConfig?.requestUrl,
      model,
      dispatch,
      chatBotId,
      submitInnovationIdea,
    ],
  )

  const [isCreatingInnovationIdea, setIsCreatingInnovationIdea] =
    useState<boolean>(false)

  const lastMessage: Message | undefined = useMemo(
    () => messages[messages.length - 1],
    [messages],
  )

  const cancelStream = useCallback(() => {
    abortController.current.abort({ name: 'ManualAbort' })
    dispatch(abortStreamingMessage({ chatBotId }))
    if (lastMessage?.type === MessageTypeEnum.LOADING && lastMessage?.id)
      dispatch(removeConversationMessage({ chatBotId, id: lastMessage.id }))
  }, [chatBotId, dispatch, lastMessage])

  // aborting on Escape key
  const onEscapePress = useKeyPress({
    key: 'Escape',
  })
  useEffect(() => {
    if (onEscapePress && isStreaming) {
      cancelStream()
    }
  }, [cancelStream, isStreaming, onEscapePress])

  const newMessage: IChatBotContext['newMessage'] = useCallback(
    async (message) => {
      const completeMessage = {
        chatBotId,
        id: createMessageId(),
        ...message,
      }
      dispatch(newConversationMessage(completeMessage))
      if (message.type === MessageTypeEnum.USER) {
        setIsStreaming(true)
        void newMessage({ type: MessageTypeEnum.LOADING })
        await sendUserMessage(completeMessage as UserMessage)
      }
    },
    [chatBotId, dispatch, sendUserMessage],
  )

  // This function is used to start an empty conversation.
  const startConversation = useCallback(() => {
    dispatch(newConversation({ chatBotId }))
    // we're NOT using newMessage here to avoid showing this message
    void sendUserMessage({
      id: createMessageId(),
      content: 'hey',
      type: MessageTypeEnum.USER,
    })
  }, [chatBotId, dispatch, sendUserMessage])

  const value: IChatBotContext = useMemo(
    () => ({
      isStreaming,
      chatBotId,
      isEditMode,
      messages,
      newMessage,
      startConversation,
      onApproveButtonCallback,
      setIsEditMode,
      sendUserMessage,
      cancelStream,
      shouldMobileButtonBeVisible,
      conversationEnded,
      isCreatingInnovationIdea,
      submitInnovationIdea,
    }),
    [
      isStreaming,
      chatBotId,
      isEditMode,
      messages,
      newMessage,
      startConversation,
      onApproveButtonCallback,
      sendUserMessage,
      cancelStream,
      shouldMobileButtonBeVisible,
      conversationEnded,
      isCreatingInnovationIdea,
      submitInnovationIdea,
    ],
  )
  return (
    <ChatBotContext.Provider value={value}>
      {children({ isEditMode })}
    </ChatBotContext.Provider>
  )
}
