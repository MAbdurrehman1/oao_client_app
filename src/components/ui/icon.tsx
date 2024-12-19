import ArrowUpIcon from '@/assets/icons/arrow-up.svg?react'
import BadgeIcon from '@/assets/icons/badge.svg?react'
import CalendarIcon from '@/assets/icons/calendar.svg?react'
import AddToCalendarIcon from '@/assets/icons/calendar-add.svg?react'
import CheckboxIcon from '@/assets/icons/checkbox.svg?react'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react'
import CompressAlticon from '@/assets/icons/compress-alt.svg?react'
import DeleteIcon from '@/assets/icons/delete.svg?react'
import DownloadIcon from '@/assets/icons/download.svg?react'
import ExecutionIcon from '@/assets/icons/execution.svg?react'
import ExpandArrowsIcon from '@/assets/icons/expand-arrows.svg?react'
import ExternalLinkIcon from '@/assets/icons/external-link.svg?react'
import GuidanceIcon from '@/assets/icons/guidance.svg?react'
import LockIcon from '@/assets/icons/lock.svg?react'
import LogoutIcon from '@/assets/icons/logout.svg?react'
import MaximizeIcon from '@/assets/icons/maximize.svg?react'
import MediaLinkIcon from '@/assets/icons/media-link.svg?react'
import MenuIcon from '@/assets/icons/menu.svg?react'
import MinimizeIcon from '@/assets/icons/minimize.svg?react'
import PlayIcon from '@/assets/icons/play.svg?react'
import ReadinessIcon from '@/assets/icons/readiness.svg?react'
import StarIcon from '@/assets/icons/star.svg?react'
import StarFilledIcon from '@/assets/icons/star-filled.svg?react'
import SubtractIcon from '@/assets/icons/subtract.svg?react'
import TimerIcon from '@/assets/icons/timer.svg?react'
import TrophyIcon from '@/assets/icons/trophy.svg?react'

const iconMap = {
  'external-link': ExternalLinkIcon,
  execution: ExecutionIcon,
  guidance: GuidanceIcon,
  readiness: ReadinessIcon,
  checkbox: CheckboxIcon,
  logout: LogoutIcon,
  star: StarIcon,
  download: DownloadIcon,
  'star-filled': StarFilledIcon,
  'chevron-down': ChevronDownIcon,
  'arrow-up': ArrowUpIcon,
  delete: DeleteIcon,
  calendar: CalendarIcon,
  'calendar-add': AddToCalendarIcon,
  trophy: TrophyIcon,
  'expand-arrows': ExpandArrowsIcon,
  'compress-alt': CompressAlticon,
  timer: TimerIcon,
  play: PlayIcon,
  badge: BadgeIcon,
  lock: LockIcon,
  'media-link': MediaLinkIcon,
  minimize: MinimizeIcon,
  maximize: MaximizeIcon,
  subtract: SubtractIcon,
  menu: MenuIcon,
}

export type IconType = keyof typeof iconMap

export const Icon = ({
  name,
  className,
}: {
  className?: string
  name: IconType
}) => {
  const Comp = iconMap[name]
  return <Comp fill="current" className={className ?? ''} />
}
