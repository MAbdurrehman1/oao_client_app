import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { lazyWithPreload as lazy } from 'react-lazy-with-preload'
import { type VariantProps } from 'class-variance-authority'
import { useResizeObserver } from 'usehooks-ts'

import { RichText } from '@/components/ui/rich-text'
import { Typewritter } from '@/components/ui/typewritter'
import { Typography } from '@/components/ui/typography'
import { type typographyVariants } from '@/components/ui/typography/variants'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { turnOffAnimationsForLyman } from '@/store/slices/animations'
import { selectLymanAnimationsVisited } from '@/store/slices/animations/selectors'
import { cn } from '@/utils/styles'

import { type RevealableProps } from './revealable'

const Revealable = lazy(() =>
  import(/** webpackChunkName: "revealable" */ './revealable').then((m) => ({
    default: m.Revealable,
  })),
)

/**
 * Figma design docs:
 *
 * Text animates in a type writer effect.
 * Bold text style is applied to key outtakes and points.
 *
 * As the text appears,
 * the gradient bar grows in height top down to match the height of the text.
 * The gradient should then animate within the line.
 *
 */
export const TypewritterWithGradient = ({
  text,
  children,
  className,
  typographyClassName = 'md:text-s20 lg:text-s24',
  size = 's16',
  shouldStart,
  onAnimationEndCallback,
  delay = 12,
  lymanId,
  revealableProps,
}: PropsWithChildren<
  VariantProps<typeof typographyVariants> & {
    text: string
    children: ReactNode
    className?: string
    typographyClassName?: string
    shouldStart: boolean
    onAnimationEndCallback?: () => void
    // the delay between each char, the lower the faster
    delay?: number
    lymanId: string
    revealableProps?: Omit<
      RevealableProps,
      'enableAnimations' | 'children' | 'reveal'
    >
  }
>) => {
  const isAnimationsShownBefore = useAppSelector((state) =>
    selectLymanAnimationsVisited(state, lymanId),
  )
  const isAnimationsShownBeforeInitialValueWhenRender = useRef<boolean>(
    isAnimationsShownBefore,
  )
  // state to check wether animation is finished or not
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(
    isAnimationsShownBefore ?? false,
  )
  // keeping start state locally, once the condition is true we no longer care
  // if the condition turns false in future.
  const [start, setStart] = useState<boolean>(
    isAnimationsShownBefore ?? shouldStart,
  )
  useEffect(() => {
    if (shouldStart && !isAnimationsShownBefore && !start) setStart(true)
  }, [isAnimationsShownBefore, shouldStart, start])
  // animating height of the gradient-line
  const textWrapperRef = useRef<HTMLDivElement>(null)
  const { height = 0 } = useResizeObserver({
    ref: textWrapperRef,
    box: 'border-box',
  })
  useEffect(() => {
    if (isAnimationsShownBefore && shouldStart) onAnimationEndCallback?.()
    // we only care about if `shouldStart` is changed from outside
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldStart])
  const dispatch = useAppDispatch()
  return (
    <>
      <div
        className={cn(
          `
            relative flex w-full flex-col justify-center pl-s16
            md:pl-2.5
          `,
          className,
        )}
      >
        <div
          className={cn(
            `
              absolute left-0 h-full w-1 rounded-xl bg-gradient-to-b
              from-brand-color-green via-brand-color-pink to-brand-color-green
              transition-all duration-500
            `,
          )}
          style={{
            // since the effect needs to be from middle to top and down
            // we need to leverage padding instead of height
            paddingTop: height / 2,
            paddingBottom: height / 2,
            // hack to achieve gradient animation
            // `cn` couldn't handle these custom classes, that's why they're inline styles
            backgroundPosition: isAnimationFinished ? '100% 100%' : '0 0',
            backgroundSize: '200% 200%',
          }}
        />
        {/* a hack to avoid content layout shift */}
        <div className="relative">
          <Typography
            size={size}
            className={cn('opacity-0', typographyClassName)}
          >
            {text}
          </Typography>
          <div
            ref={textWrapperRef}
            className={`
              absolute top-1/2 flex w-full -translate-y-1/2 items-center
              justify-start
            `}
          >
            <Typography size={size} className={typographyClassName}>
              {isAnimationsShownBeforeInitialValueWhenRender.current ? (
                <RichText size={size} className={typographyClassName}>
                  {`${text} ↓`}
                </RichText>
              ) : (
                start && (
                  <Typewritter
                    delay={delay}
                    onAnimationEndCallback={() => {
                      setIsAnimationFinished(true)
                      dispatch(turnOffAnimationsForLyman(lymanId))
                      // if the parent wants to know when this animation finishes
                      onAnimationEndCallback?.()
                    }}
                  >
                    {text}
                  </Typewritter>
                )
              )}
            </Typography>
          </div>
        </div>
      </div>
      <Revealable
        enableAnimations={!isAnimationsShownBefore}
        reveal={isAnimationFinished}
        {...revealableProps}
      >
        {children}
      </Revealable>
    </>
  )
}
