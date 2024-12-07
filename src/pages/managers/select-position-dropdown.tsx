import { Loading } from '@/components/loading'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { isPreviewReport } from '@/utils/preview-report'

import { useManagementPositions } from './hooks/use-management-positions'

export const SelectPositionDropdown = () => {
  const {
    isLoading,
    managementPositions: positions,
    selectedManagementPosition: selectedPosition,
    setSelectedManagementPosition: setSelectedPosition,
  } = useManagementPositions()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`
          h-9 w-full justify-between space-x-s8
          md:w-[10.25rem]
        `}
        disabled={isLoading}
      >
        {isLoading && <Loading inline />}
        <span>Select position</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {(isPreviewReport && selectedPosition
          ? [selectedPosition]
          : positions
        ).map((position) => (
          <DropdownMenuCheckboxItem
            checked={selectedPosition?.id === position.id}
            onCheckedChange={() => setSelectedPosition(position)}
            className="cursor-pointer capitalize"
            key={position.id}
            disabled={isPreviewReport}
          >
            {position.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
