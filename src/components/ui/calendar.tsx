import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button/variants'
import { cn } from '@/utils/styles'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        tbody: 'w-full',
        months:
          'w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'w-full space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          `
            size-7 bg-transparent !p-0 opacity-50
            hover:opacity-100
          `,
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'w-full flex',
        head_cell:
          'text-grey-300 rounded-md w-[14.285%] font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-[14.285%] text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          `
            size-9 p-0 font-normal
            aria-selected:opacity-100
          `,
        ),
        day_range_end: 'day-range-end',
        day_today: cn('ring-2 ring-grey-100'),
        day_selected: cn(`
          bg-brand-color-black text-white
          hover:bg-grey-800 hover:text-white
        `),
        day_outside:
          'day-outside text-grey-300 opacity-50 aria-selected:bg-accent/50 aria-selected:text-grey-300 aria-selected:opacity-30',
        day_disabled: 'text-grey-300 opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="size-4" />,
        IconRight: () => <ChevronRight className="size-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
