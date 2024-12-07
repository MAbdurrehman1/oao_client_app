import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { type VariantProps } from 'class-variance-authority'

import { typographyVariants } from '@/components/ui/typography/variants'
import { cn } from '@/utils/styles'

interface InlineInputProps
  // style is not assignable to type `TextareaAutosize.style`
  extends Omit<React.HTMLAttributes<HTMLTextAreaElement>, 'style'>,
    VariantProps<typeof typographyVariants> {
  placeHolder?: string
}

export const InlineInput = React.forwardRef<
  React.ElementRef<'textarea'>,
  InlineInputProps
>(({ className, size, weight, placeHolder, ...props }, ref) => (
  <TextareaAutosize
    placeholder={placeHolder}
    ref={ref}
    className={cn(
      typographyVariants({
        size,
        weight,
        className: cn(
          `
            box-border inline-flex w-full resize-none appearance-none
            bg-transparent pb-2 outline-none transition-colors
          `,
          className ?? '',
        ),
      }),
    )}
    {...props}
  />
))

InlineInput.displayName = 'InlineInput'
