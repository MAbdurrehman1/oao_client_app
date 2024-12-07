import { useState } from 'react'

import { Link } from '@/components/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Routes } from '@/routes'
import { type InnovationIdeaMatrix } from '@/types'

import { MatrixCircle } from './circle'

export const MatrixItem = (idea: InnovationIdeaMatrix) => {
  const [isItemActive, setIsItemActive] = useState<boolean>(false)
  return (
    <div
      className="absolute"
      style={{
        left: `${idea.metadata.feasibility}%`,
        bottom: `${idea.metadata.impact}%`,
      }}
    >
      <Popover open={isItemActive} onOpenChange={(o) => setIsItemActive(o)}>
        <PopoverTrigger>
          <MatrixCircle
            confidence={idea.metadata.confidence}
            active={isItemActive}
            className="-mb-5"
          />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          className={`
            mx-4 mt-5 flex h-10 w-auto max-w-96 flex-row items-center
            justify-center px-s16 py-0
          `}
        >
          <Link
            to={Routes.INNOVATION_DETAIL_MODAL}
            params={{ innovationId: idea.id }}
            className="line-clamp-1"
          >
            <span>{idea.title}</span>
          </Link>
        </PopoverContent>
      </Popover>
    </div>
  )
}
