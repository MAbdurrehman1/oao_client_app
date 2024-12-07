import Markdown, { type Options } from 'react-markdown'

import { cn } from '@/utils/styles'

import { Typography } from './typography'

export const MarkdownParser = ({
  children,
  compact,
  ...options
}: Readonly<Options> & { compact?: boolean }) => {
  return (
    <Markdown
      components={{
        hr: () => <></>,
        h1: (props) => (
          <Typography
            weight="bold"
            size="s24"
            className={cn('mb-s8 mt-s16 block w-full', compact && 'mt-0')}
          >
            {props.children}
          </Typography>
        ),
        h2: (props) => (
          <Typography
            weight="bold"
            size="s20"
            className={cn('mb-s8 mt-s16 block w-full', compact && 'mt-0')}
          >
            {props.children}
          </Typography>
        ),
      }}
      {...options}
    >
      {children}
    </Markdown>
  )
}
