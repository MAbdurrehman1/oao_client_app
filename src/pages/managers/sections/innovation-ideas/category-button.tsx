import { Button } from '@/components/ui/button'
import { cn } from '@/utils/styles'

export const CategoryButton = ({
  selected,
  onClickCb,
  value,
}: {
  selected: boolean
  value: string
  onClickCb: (v: string) => void
}) => (
  <Button
    className={cn(
      `
        rounded-full
        hover:bg-gray-900
      `,
      selected && 'bg-brand-color-black text-brand-color-white',
    )}
    onClick={() => onClickCb(value)}
  >
    {value}
  </Button>
)
