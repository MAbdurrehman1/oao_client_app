import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useResizeObserver } from 'usehooks-ts'
import { z } from 'zod'

import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { useAppDispatch } from '@/store/hooks'
import { removeChatId } from '@/store/slices/conversations'
import {
  type AiInnovationIdea,
  type AiRecommendation,
} from '@/store/slices/conversations/types'
import { generateTestId } from '@/utils/test'

import { InlineInput } from './inline-input'
import { useChat } from '../use-chat'

const FormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

type FormType = z.infer<typeof FormSchema>

interface EditFormProps {
  lastMessage: AiRecommendation | AiInnovationIdea
  onSaveButtonClick: () => void
  onDeleteButtonClick: () => void
}

export const EditForm = ({
  lastMessage,
  onSaveButtonClick,
  onDeleteButtonClick,
}: EditFormProps) => {
  const { onApproveButtonCallback, isEditMode, chatBotId } = useChat()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { register, handleSubmit, setFocus } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: lastMessage.title,
      description: lastMessage.content,
    },
  })
  const dispatch = useAppDispatch()
  const submit = async (data: FormType) => {
    try {
      setIsSubmitting(true)
      await onApproveButtonCallback?.(data)
      // this line makes the conversation starts over
      dispatch(removeChatId({ chatBotId }))
      onSaveButtonClick()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const actionButtonsWrapperRef = useRef<HTMLDivElement>(null)
  const { height: buttonsWrapperRefHeight = 0 } = useResizeObserver({
    ref: actionButtonsWrapperRef,
    box: 'border-box',
  })
  useEffect(() => {
    if (isEditMode) setFocus('description')
  }, [setFocus, isEditMode])
  return (
    <form
      onSubmit={(e) => void handleSubmit(submit)(e)}
      className="relative flex size-full flex-col justify-between"
      style={{ paddingBottom: buttonsWrapperRefHeight }}
    >
      <div className="h-full overflow-y-auto px-12 pb-s32 pt-10">
        <Typography
          size="s16"
          className={`
            mb-s24 block text-grey-400
            md:mb-s64
          `}
        >
          Editing Mode
        </Typography>
        <InlineInput
          {...register('title')}
          size="s32"
          weight="bold"
          placeHolder="Recommendation title"
        />
        <InlineInput
          {...register('description')}
          size="s24"
          weight="default"
          placeHolder="Recommendation title"
        />
      </div>
      <div
        ref={actionButtonsWrapperRef}
        className={`
          absolute bottom-0 flex w-full shrink-0 grow-0 flex-row pb-s32 pt-s4
        `}
      >
        <div
          className={`
            pointer-events-none absolute inset-x-0 bottom-full h-s64
            bg-gradient-to-t from-grey-900
          `}
        />
        <div className="flex w-full items-center justify-center space-x-s16">
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="light"
            className="space-x-s8"
            {...generateTestId('submit-recommendation-btn')}
          >
            <Icon name="download" />
            <span>Save to your library</span>
            {isSubmitting && <Loading inline />}
          </Button>
          <Button
            disabled={isSubmitting}
            type="button"
            variant="light"
            className="space-x-s8"
            onClick={() => onDeleteButtonClick()}
          >
            <Icon name="delete" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
