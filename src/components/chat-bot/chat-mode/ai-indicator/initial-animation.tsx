import { useEffect, useState } from 'react'

import { cn } from '@/utils/styles'

import { Circle } from './circle'
import { circles } from './common'
import { GradientWrapper } from './gradient-wrapper'
import { MainSvg } from './main-svg'
import { useChat } from '../../use-chat'

export const AiIndicatorInitialAnimation = ({
  onAnimationEndCallback,
}: {
  onAnimationEndCallback: () => void
}) => {
  const { messages } = useChat()
  const [isAnimationFinished, setAnimationFinished] = useState<boolean>(
    messages.length > 0,
  )
  useEffect(() => {
    if (isAnimationFinished) onAnimationEndCallback()
    // onAnimationEndCallback will make this infinite loop error
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimationFinished])
  return (
    <div className="relative w-full">
      <div
        className={cn(
          `
            absolute left-0 flex w-full flex-col items-center justify-center
            transition-all
          `,
          isAnimationFinished && 'left-0 w-s24',
        )}
      >
        <MainSvg
          className={cn('size-[5.625rem]', isAnimationFinished && 'size-s24')}
          onAnimationEndCallback={() => setAnimationFinished(true)}
          motionProps={{
            whileInView: 'visible',
            viewport: { once: true },
          }}
        >
          <GradientWrapper />
          {circles.map((path, index) => (
            <Circle path={path} key={index} />
          ))}
        </MainSvg>
      </div>
    </div>
  )
}
