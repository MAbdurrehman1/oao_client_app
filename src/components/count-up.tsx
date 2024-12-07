import { useEffect, useRef, useState } from 'react'
import { useCountUp } from 'react-countup'
import { useIntersectionObserver } from 'usehooks-ts'

type CountUpType = {
  shouldStart?: boolean
  end: number
  delay?: number // in seconds
  duration?: number // in seconds
  start?: number
}

export const CountUp = ({ end, shouldStart = true, ...props }: CountUpType) => {
  const [isEnded, setIsEnded] = useState<boolean>(false)
  const ref = useRef<HTMLSpanElement>(null)
  const { ref: wrapperRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.8,
  })
  const { start } = useCountUp({
    duration: props.duration ?? 1,
    delay: props.delay ?? 0,
    ref,
    end,
    startOnMount: false,
    onEnd: () => setIsEnded(true),
  })
  useEffect(() => {
    if (isIntersecting && !isEnded) start()
  }, [isEnded, isIntersecting, start])
  if (!shouldStart) return props.start
  return (
    <span ref={wrapperRef}>
      <span ref={ref} />
    </span>
  )
}
