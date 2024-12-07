export const fadeInUpVariant = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 40,
  },
}

export const fadeInDownVariant = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 40,
  },
}
