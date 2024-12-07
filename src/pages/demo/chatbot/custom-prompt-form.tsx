import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import apiClient from '@/api/client'
import { apiBaseUrls } from '@/api/config'
import { LlmApiEndpoints } from '@/api/endpoints'
import { InlineInput } from '@/components/chat-bot/edit-mode/inline-input'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useAppDispatch } from '@/store/hooks'
import { setChatId } from '@/store/slices/conversations'

const formSchema = z.object({
  prompt: z.string({ required_error: 'required' }),
})

type FormType = z.infer<typeof formSchema>

export const CustomPromptForm = ({
  onSubmitCallback,
}: {
  onSubmitCallback: () => void
}) => {
  const { register, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await apiClient.post<{ conversation_id: string }>(
        LlmApiEndpoints.CREATE_CUSTOM_CHAT,
        {
          prompt: data.prompt,
        },
        {
          baseURL: apiBaseUrls.llm,
        },
      )
      dispatch(
        setChatId({
          chatBotId: 'demo-custom',
          conversationId: response.data.conversation_id,
        }),
      )
      onSubmitCallback()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="h-screen p-8">
      <form
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        className="space-y-s16 pb-s32"
      >
        <Typography weight="bold" size="s24">
          Enter your custom prompt to initialize the chatbot
        </Typography>
        <InlineInput
          {...register('prompt')}
          size="s20"
          className="h-full rounded-md border p-4"
          weight="default"
          placeHolder="Custom Prompt"
        />
        <div className="flex w-full justify-end">
          <Button type="submit" disabled={isSubmitting} className="space-x-s8">
            {isSubmitting && <Loading inline />}
            <span>Initialize chatbot</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
