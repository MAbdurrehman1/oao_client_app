import React, { type PropsWithChildren } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from '@/utils/styles'

import { buttonVariants } from './button/variants'
import { Icon } from './icon'

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={className} {...props} />
))

Accordion.displayName = AccordionPrimitive.Root.displayName

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-t border-grey-300', className)}
    {...props}
  />
))

AccordionItem.displayName = AccordionPrimitive.Item.displayName

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    chevronWrapperClassName?: string
  }
>(
  (
    { children, className, chevronWrapperClassName, ...props },
    forwardedRef,
  ) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          `
            group flex flex-1 cursor-pointer items-center justify-between py-s24
            text-left
          `,
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <div className="flex items-center gap-s24">{children}</div>
        <div className={cn('p-s8', chevronWrapperClassName)}>
          <Icon
            name="chevron-down"
            className={`
              transition-transform duration-300
              group-data-[state=open]:rotate-180
            `}
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
)

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      `
        data-[state=closed]:animate-accordion-up
        data-[state=open]:animate-accordion-down
      `,
      className,
    )}
    // NOTE: this line is a HACK to achieve stickiness in the children of AccordionContent
    // DO NOT replace this line with tailwind `overflow-clip` as it resolves to `text-overflow: clip`
    // tested in Google Chrome, Firefox Mozilla and Apple Safari. all working as expected.
    style={{ overflow: 'clip' }}
    {...props}
  />
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export const PrimaryAccordionTrigger = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <AccordionTrigger
    chevronWrapperClassName={buttonVariants({
      size: 'icon',
      className: cn(
        `
          size-[2.375rem]
          group-hover:bg-brand-color-black group-hover:fill-brand-color-white
          md:size-10
        `,
      ),
    })}
    className={className}
  >
    {children}
  </AccordionTrigger>
)
PrimaryAccordionTrigger.displayName = 'PrimaryAccordionTrigger'
