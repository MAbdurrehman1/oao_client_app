import { m } from 'framer-motion'

import { tailwindConfig } from '@/utils/tailwind'

export const GradientWrapper = () => (
  <>
    <m.path
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
        },
      }}
      d="M0 12.2034C0 5.46364 5.46364 0 12.2034 0H77.7966C84.5364 0 90 5.46364 90 12.2034V77.7966C90 84.5364 84.5364 90 77.7966 90H12.2034C5.46364 90 0 84.5364 0 77.7966V12.2034Z"
      fill="url(#paint0_linear_747_43126)"
    />
    <m.rect
      variants={{
        hidden: {
          scale: 0.2,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
        },
      }}
      x="4.57617"
      y="4.57617"
      width="80.8475"
      height="80.8475"
      rx="9.15254"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_747_43126"
        x1="83.8983"
        y1="45.7627"
        x2="6.86441"
        y2="45.7627"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0.355272"
          stopColor={tailwindConfig.theme.colors['brand-color-pink']}
        />
        <stop
          offset="1"
          stopColor={tailwindConfig.theme.colors['brand-color-green']}
        />
      </linearGradient>
    </defs>
  </>
)
