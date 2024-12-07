import { cn } from '@/utils/styles'

/**
 * This function has its own file to make sure fast-refresh works in dev mode.
 */
export const linkCardDefaultClassName = cn(
  `
    flex h-full shrink-0 grow-0 flex-col justify-between rounded-md px-s24
    py-s32 shadow-main transition-all
    hover:rounded-lg
  `,
)
