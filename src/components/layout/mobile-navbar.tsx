import { useLayoutContext } from '@/hooks/use-layout-context'
import { useTailwindBreakpoint } from '@/hooks/use-tailwind-breakpoint'

import { type Section } from './types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const MobileNavbar = ({
  sections,
  onClick,
}: {
  sections: Section[]
  onClick: (slug: string) => void
}) => {
  const isVisible = useTailwindBreakpoint({ breakpoint: 'md', mode: 'max' })
  const { activeSection } = useLayoutContext()
  if (!isVisible) return null
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="h-[2.3125rem] w-full justify-between">
        {sections.find(({ title }) => title === activeSection)?.title ??
          sections[0].title}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {sections.map((section) => (
          <DropdownMenuItem
            className="w-full"
            key={section.slug}
            onClick={() => onClick(section.slug)}
          >
            {section.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
