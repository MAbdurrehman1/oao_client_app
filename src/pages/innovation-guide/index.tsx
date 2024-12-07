import { useState } from 'react'

import { cn } from '@/utils/styles'

import { InnovationGuidePageChatbot } from './chatbot'
import { EmailForm } from './email-form'
import { useInnovationIdea } from './use-innovation-idea'

export const InnovationGuidePage = () => {
  const [email, setEmail] = useState<string | null>(null)
  const innovationIdea = useInnovationIdea({ email })
  return (
    <div
      className={cn(
        `
          flex min-h-screen w-full items-center justify-center px-s24
          transition-all duration-1000
        `,
        email && !innovationIdea.isLoading
          ? 'bg-brand-color-white'
          : `bg-brand-color-black`,
      )}
    >
      {email && !innovationIdea.isLoading ? (
        <InnovationGuidePageChatbot
          email={email}
          innovationIdea={innovationIdea}
          onSuccess={() => void innovationIdea.refetch!()}
        />
      ) : (
        <EmailForm
          isLoading={innovationIdea.isLoading}
          error={innovationIdea.error ? (innovationIdea.error as string) : null}
          onSuccess={(email) => {
            setEmail(email)
          }}
        />
      )}
    </div>
  )
}
