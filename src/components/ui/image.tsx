import React from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    return (
      <img
        {...props}
        alt={alt ?? ''}
        ref={ref}
        src={src}
        className={className}
      />
    )
  },
)
