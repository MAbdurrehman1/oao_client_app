import TypewriterEffect from 'typewriter-effect'

export const Typewritter = ({
  children,
  onAnimationEndCallback,
  delay = 5,
}: {
  children: string
  delay?: number
  onAnimationEndCallback?: () => void
}) => (
  <TypewriterEffect
    onInit={(typewriter) => {
      typewriter
        .typeString(children.toString())
        .stop()
        .pauseFor(100)
        .callFunction((state) => {
          // for removing the cursor after finishing animating
          state.elements.cursor.remove()
        })
        .callFunction(() => {
          // if the parent wants to know when this animation finishes
          onAnimationEndCallback?.()
        })
        .start()
    }}
    options={{
      delay,
    }}
  />
)
