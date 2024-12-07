import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, m } from 'framer-motion'
import { z } from 'zod'

import LogoWhite from '@/assets/images/logo-white.png'
import { Loading } from '@/components/loading'
import { fadeInDownVariant } from '@/components/motion-variants'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

const emailSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
})

type FormInputs = z.infer<typeof emailSchema>

export const EmailForm = ({
  isLoading,
  error: apiError,
  onSuccess,
}: {
  isLoading: boolean
  error: string | null
  onSuccess: (email: string) => void
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    onSuccess(data.email.toLowerCase())
  }
  const error = errors.email?.message ?? apiError
  return (
    <div className="w-full max-w-md">
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center">
            <Image src={LogoWhite} className="mb-s16 h-5" />
            <Typography className="w-full text-left text-grey-300">
              Enter your email address*
            </Typography>
            <div className="relative mt-s4 flex w-full">
              <Input
                className={`
                  h-[2.375rem] rounded-md border-grey-500 bg-transparent px-s16
                  text-center text-lg text-brand-color-white
                  selection:bg-grey-500 selection:text-brand-color-white
                  hover:bg-grey-900
                  focus:bg-brand-color-black focus:text-brand-color-white
                `}
                placeholder="Email address"
                {...register('email')}
              />
              {isLoading && (
                <Loading
                  inline
                  className={`
                    absolute right-3 top-1/2 -translate-y-1/2 text-grey-500
                  `}
                />
              )}
            </div>
            <AnimatePresence>
              {error && (
                <m.div
                  className="mt-s4 h-2 w-full"
                  {...fadeInDownVariant}
                  exit={{
                    scale: 0.95,
                    opacity: 0,
                    marginTop: 0,
                    transition: { duration: 0.1 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Typography className="w-full text-left text-red-400">
                    {error}
                  </Typography>
                </m.div>
              )}
            </AnimatePresence>
            <div className="flex w-full flex-row justify-end">
              <Button
                type="submit"
                className="my-s24"
                variant="light"
                disabled={isLoading}
              >
                LOG-IN
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
