import { cn } from '@/utils/styles'
import { generateTestId } from '@/utils/test'

import { Circle } from './circle'
import { circles } from './common'
import { GradientWrapper } from './gradient-wrapper'
import { MainSvg } from './main-svg'

export const AiAvatar = ({
  isLoading,
  withoutAnimations,
  className,
  onClick,
}: {
  isLoading: boolean
  withoutAnimations?: boolean
  className?: string
  onClick?: () => void
}) => {
  return (
    <div
      {...generateTestId('loading-indicator')}
      onClick={() => onClick?.()}
      className={cn(
        `
          absolute flex size-s24 items-center justify-center
          transition-all
        `,
        className,
      )}
    >
      <div
        className="absolute size-full bg-white transition-all"
        key={`loading-${isLoading}-${withoutAnimations}`}
      >
        <MainSvg
          motionProps={
            withoutAnimations ? { initial: 'visible' } : { animate: 'visible' }
          }
        >
          <GradientWrapper />
          {circles.map((path, index) => (
            <Circle
              key={`${index}${isLoading ? 'l' : 'n'}`}
              path={path}
              isLoading={isLoading}
            />
          ))}
        </MainSvg>
      </div>
    </div>
  )
}
