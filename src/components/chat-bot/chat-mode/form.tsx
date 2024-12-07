import { type KeyboardEventHandler, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useScrollToBottom } from 'react-scroll-to-bottom'
import TextareaAutosize from 'react-textarea-autosize'
import { zodResolver } from '@hookform/resolvers/zod'
import { Square } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useTailwindBreakpoint } from '@/hooks/use-tailwind-breakpoint'
import { MessageTypeEnum } from '@/store/slices/conversations/types'
import { generateTestId } from '@/utils/test'

import { useChat } from '../use-chat'

const MessageSchema = z.object({
  content: z.string().min(1),
})

type FormType = z.infer<typeof MessageSchema>

export const ChatBotForm = () => {
  const {
    messages,
    newMessage,
    isCreatingInnovationIdea,
    isStreaming,
    cancelStream,
  } = useChat()
  const { handleSubmit, register, reset } = useForm<FormType>({
    resolver: zodResolver(MessageSchema),
  })
  // this needs to be used atleast 1 level down into dom than `ReactScrollToBottom`
  // if you move this hook to the parent file, it won't be working.
  const scrollToBottom = useScrollToBottom()
  const newMessageFormSubmittion = useCallback(
    (formData: FormType) => {
      if (isCreatingInnovationIdea) return
      void newMessage({
        type: MessageTypeEnum.USER,
        content: formData.content,
      })
      scrollToBottom({ behavior: 'auto' })
      reset()
    },
    [isCreatingInnovationIdea, newMessage, reset, scrollToBottom],
  )
  const onEnterPress: KeyboardEventHandler = useCallback(
    (e) => {
      // for UX purposes, submit form on enter key, but
      // create a new line on enter+shift unless it's already streaming
      if (e.key === 'Enter' && e.shiftKey == false && !isStreaming) {
        e.preventDefault()
        void handleSubmit(newMessageFormSubmittion)()
      }
    },
    [handleSubmit, isStreaming, newMessageFormSubmittion],
  )
  const isMobile = useTailwindBreakpoint({ mode: 'max', breakpoint: 'md' })
  return (
    <form
      onSubmit={(e) => void handleSubmit(newMessageFormSubmittion)(e)}
      className="relative flex w-full"
    >
      <TextareaAutosize
        {...register('content')}
        autoComplete="off"
        disabled={messages.length === 0}
        placeholder="Write here"
        onKeyDown={onEnterPress}
        className={`
          box-border flex min-h-[3.125rem] w-full resize-none appearance-none
          flex-col justify-center rounded-[8rem] border border-brand-color-black
          bg-transparent py-3 pl-s32 pr-s64 text-base font-normal
          tracking-normal outline-none transition-colors
          hover:bg-grey-50
          focus:bg-grey-50
        `}
        maxRows={isMobile ? 1 : 2}
      />
      <Button
        {...generateTestId('chatbot-send-btn')}
        type={isStreaming ? 'button' : 'submit'}
        onClick={(e) => {
          if (isStreaming) {
            e.preventDefault()
            cancelStream()
            return false
          }
        }}
        className={`
          absolute right-s24 top-1/2 size-7 -translate-y-1/2 rounded-full !p-1.5
          text-base
          hover:bg-brand-color-white hover:text-brand-color-black
          hover:opacity-75
        `}
      >
        {isStreaming ? (
          <Square className="text-sm" />
        ) : (
          <Icon name="arrow-up" className="text-lg" />
        )}
      </Button>
    </form>
  )
}
