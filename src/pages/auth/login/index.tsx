import React, { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { AnimatePresence, m } from 'framer-motion'
import { InfoIcon } from 'lucide-react'
import { z } from 'zod'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import LogoWhite from '@/assets/images/logo-white.png'
import { Loading } from '@/components/loading'
import { fadeInDownVariant } from '@/components/motion-variants'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

import { LogoutReasons } from '../common'
interface ErrorResponse {
  error: string
}

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
})

type FormInputs = z.infer<typeof loginSchema>

export default function Login() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [apiError, setApiError] = React.useState<string | null>(null)
  const [info, setInfo] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<boolean>(false)
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const reason = searchParams.get('reason')
    if (reason) {
      const reaseonMap: Record<LogoutReasons, string> = {
        [LogoutReasons.ExpiredToken]: 'Your token is expired',
        [LogoutReasons.InvalidMagicToken]: 'Invalid magic token',
        [LogoutReasons.InvalidToken]: 'Invalid token',
      }
      setInfo(reaseonMap[reason as LogoutReasons] ?? reason)
    }
  }, [searchParams])

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true)
    setApiError(null)
    setSuccess(false)
    try {
      await apiClient.post(ApiEndpoints.MAGIC_LOGIN_LINK_REQUEST, data)
      setSuccess(true)
      reset()
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const data = (err?.response?.data || {}) as ErrorResponse
        setApiError(
          data.error ?? 'Something went wrong, please try again later',
        )
      } else setApiError(String(err))
    } finally {
      setIsLoading(false)
    }
  }
  const error = errors.email?.message ?? apiError
  const emailValue = watch('email')
  useEffect(() => {
    setApiError(null)
  }, [emailValue])
  return (
    <div
      className={`
        flex h-screen w-full items-center justify-center bg-brand-color-black
        px-s24
      `}
    >
      <div className="w-full max-w-md">
        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <div className="flex flex-col items-center justify-center">
            {success ? (
              <m.div className="mt-s4 h-2" {...fadeInDownVariant}>
                <Typography className="text-grey-500" size="s12">
                  Check your inbox for your magic login link
                </Typography>
              </m.div>
            ) : (
              <div className="flex w-full flex-col items-center">
                <Image src={LogoWhite} className="mb-s16 h-5" />
                {info && (
                  <Alert variant="inverted" className="my-s32 border-grey-300">
                    <InfoIcon className="size-4 fill-white" />
                    <AlertTitle>You've been logged out!</AlertTitle>
                    <AlertDescription>
                      {info}, please log-in again.
                    </AlertDescription>
                  </Alert>
                )}
                <Typography className="w-full text-left text-grey-300">
                  Enter your email address*
                </Typography>
                <div className="relative mt-s4 flex w-full">
                  <Input
                    className={`
                      h-[2.375rem] rounded-md border-grey-500 bg-transparent
                      px-s16 text-center text-lg text-brand-color-white
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
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
