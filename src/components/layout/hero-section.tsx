import { type PropsWithChildren } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { cn } from '@/utils/styles'

export const HeroSection = ({
  text,
  className,
  lymanId,
  children,
  hasNavbar = true,
}: PropsWithChildren<{
  text: string
  lymanId: string
  className?: string
  hasNavbar?: boolean
}>) => {
  const { navbarHeight, headerHeight, activeSection } = useLayoutContext()
  const { height: windowHeight } = useWindowSize()
  return (
    <div
      className="container"
      style={{ marginTop: (hasNavbar ? navbarHeight : 0) + headerHeight }}
    >
      <div
        className={cn(
          `
            flex w-full flex-col items-center justify-center p-s24 px-s32
            md:px-s24
            xl:px-s128
          `,
          className,
        )}
        style={{
          minHeight:
            windowHeight - headerHeight - (hasNavbar ? navbarHeight : 0),
        }}
      >
        <TypewritterWithGradient
          shouldStart={activeSection === null}
          typographyClassName={cn(`
            md:text-s24
            lg:text-s40
          `)}
          size="s20"
          className="md:pl-6"
          lymanId={lymanId}
          text={text}
        >
          {children && children}
        </TypewritterWithGradient>
      </div>
    </div>
  )
}
