import { m } from 'framer-motion'

import { Typography } from '@/components/ui/typography'

const AnimatedTypography = m(Typography)

export const SectionTitle = ({
  children,
  enableAnimations,
}: React.PropsWithChildren<{ enableAnimations: boolean }>) => (
  <div
    className={`
      container px-s16 pt-2.5
      md:px-s24
    `}
  >
    <AnimatedTypography
      initial={enableAnimations ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { opacity: 1, scale: 1, marginTop: 0 },
        hidden: { opacity: 0, scale: 0.9, marginTop: -10 },
      }}
      transition={{ duration: 0.2, delay: 0.2 }}
      size="s16"
    >
      {children}
    </AnimatedTypography>
  </div>
)
