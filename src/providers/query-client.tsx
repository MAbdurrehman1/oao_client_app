import { type PropsWithChildren } from 'react'
import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 20_000,
      retry: (failureCount, error) => {
        if (failureCount >= 4) return false
        const typedError = error as unknown as { statusCode: number }
        // don't retry 4xx and 5xx errors
        if (typedError.statusCode && typedError.statusCode >= 400) return false
        return true
      },
    },
  },
})

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <Provider client={queryClient}>{children}</Provider>
)
