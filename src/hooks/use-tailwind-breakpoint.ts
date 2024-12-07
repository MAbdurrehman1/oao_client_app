import { useMediaQuery } from 'usehooks-ts'

import { tailwindConfig } from '@/utils/tailwind'

export type Breakpoint = keyof typeof tailwindConfig.theme.screens

const breakpoints: Record<Breakpoint, string> = {
  ...tailwindConfig.theme.screens,
}

const maxBreakpoints: Record<Breakpoint, string> = Object.entries(
  breakpoints,
).reduce(
  (tot, [key, val]) => {
    const maxBp = `${parseInt(val.split('px')[0]) - 1}px`
    tot[key as Breakpoint] = maxBp
    return tot
  },
  {} as Record<Breakpoint, string>,
)

export const useTailwindBreakpoint = ({
  breakpoint,
  mode,
}: {
  breakpoint: Breakpoint
  mode: 'max' | 'min'
}) => {
  const breakpointString =
    mode === 'max' ? maxBreakpoints[breakpoint] : breakpoints[breakpoint]
  return useMediaQuery(`(${mode}-width: ${breakpointString})`)
}
