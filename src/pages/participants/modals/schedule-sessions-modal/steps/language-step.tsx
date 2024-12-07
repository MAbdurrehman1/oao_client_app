import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Typography } from '@/components/ui/typography'
import { generateTestId } from '@/utils/test'

import { type LanguageIds, type Step } from '../types'

const languages: Array<{ id: LanguageIds; title: string }> = [
  {
    id: 'EN',
    title: 'English',
  },
  {
    id: 'FR',
    title: 'French',
  },
] as const

export const SubtitleLanguage = ({
  onNextButtonClick,
  selectLanguage,
  selectedLanguage,
}: Step['props']) => {
  return (
    <div className="flex flex-col space-y-s16">
      <Typography size="s24" className="md:text-s32">
        Subtitle Language
      </Typography>
      <Typography>
        Please choose your preferred language for session subtitles
      </Typography>
      <div
        className={`
          mb-s24 flex flex-col space-y-s4
          md:flex-row md:items-center md:space-x-s8 md:space-y-0
        `}
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="!p-2 !py-1 text-sm">
            {selectedLanguage}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages.map((l) => (
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                key={l.id}
                checked={selectedLanguage === l.id}
                onClick={() => selectLanguage?.(l.id)}
              >
                {l.title}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-row justify-end">
        <Button
          {...generateTestId('confirm-lang')}
          onClick={() => {
            onNextButtonClick?.()
          }}
          className="space-x-s8"
        >
          <span>Confirm Language</span>
        </Button>
      </div>
    </div>
  )
}
