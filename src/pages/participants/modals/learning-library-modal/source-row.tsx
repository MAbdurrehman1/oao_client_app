import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { Typography } from '@/components/ui/typography'
import { type LibraryContent } from '@/pages/participants/types'

export const SourceRow = (source: LibraryContent) => (
  <div
    className={`
      flex flex-col space-y-s24 border-t py-s24
      lg:flex-row lg:space-x-s64 lg:space-y-0
    `}
  >
    <div
      className={`
        w-[12.5rem] shrink-0 grow-0
        lg:mt-s32
      `}
    >
      <Image src={source.image} className="w-full" />
    </div>
    <div className="flex flex-1 flex-col space-y-s32">
      <Typography size="s24" weight="bold">
        {source.title}
      </Typography>
      <Typography>{source.description}</Typography>
    </div>
    <div>
      <Button asChild>
        <a
          href={source.url}
          rel="noopener noreferer"
          target="_blank"
          className="flex flex-row space-x-s8"
        >
          <Icon name="media-link" />
          <span>Open Media</span>
        </a>
      </Button>
    </div>
  </div>
)
