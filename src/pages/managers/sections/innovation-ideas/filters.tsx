import { useCallback } from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Typography } from '@/components/ui/typography'

import { CategoryButton } from './category-button'
import { type InnovationIdeaListFilters } from '../../types'

export const Filters = ({
  categories,
  onChange,
  filterValues,
}: {
  filterValues: InnovationIdeaListFilters
  onChange: (f: Partial<InnovationIdeaListFilters>) => void
  categories: string[]
}) => {
  const ratings = [1, 2, 3]
  const handleCategoryChange = useCallback(
    (category: string | null) => {
      onChange({ category })
    },
    [onChange],
  )
  return (
    <div
      className={`
        mt-s32 flex w-full flex-col
        md:flex-row md:items-center md:justify-between
      `}
    >
      <div
        className={`
          mb-s32 flex-1 space-x-s8 text-left
          md:mb-0
        `}
      >
        {/* FIXME: since there are no categories in this current phase,
           this title is moved here for better alignment of elements.
        */}
        <Typography weight="bold" size="s24" className="block">
          Explore innovations
        </Typography>
        {categories.length > 0 && (
          <CategoryButton
            value="View All"
            selected={!filterValues.category}
            onClickCb={() => handleCategoryChange(null)}
          />
        )}
        {categories.map((category) => (
          <CategoryButton
            key={category}
            selected={filterValues.category === category}
            value={category}
            onClickCb={handleCategoryChange}
          />
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>Filter by rating</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuCheckboxItem
            className="cursor-pointer"
            checked={!filterValues.rating}
            onCheckedChange={() => onChange({ rating: null })}
          >
            View all
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className="cursor-pointer"
            checked={filterValues.rating === 'unrated'}
            onCheckedChange={() => onChange({ rating: 'unrated' })}
          >
            Unrated
          </DropdownMenuCheckboxItem>
          {ratings.map((rating) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer"
              key={rating}
              checked={rating === filterValues.rating}
              onCheckedChange={() => onChange({ rating })}
            >
              {rating}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
