import { Image } from '@/components/ui/image'
import { cn } from '@/utils/styles'

export const SessionThumbnail = ({
  gif,
  img,
  active,
}: {
  gif: string
  img: string
  active: boolean
}) => {
  return (
    <Image
      src={active ? gif : img}
      className={cn('w-full rounded-md', !active && 'blur-sm')}
    />
  )
}
