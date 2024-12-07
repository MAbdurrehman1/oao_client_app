import { type ReactNode, Suspense } from 'react'
import { type PreloadableComponent } from 'react-lazy-with-preload'

export const WithSuspense = (
  Comp: PreloadableComponent<() => JSX.Element>,
  fallback?: ReactNode,
) => (
  <Suspense fallback={fallback ?? <></>}>
    <Comp />
  </Suspense>
)
