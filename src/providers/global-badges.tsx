import { Chip } from '@/components/ui/chip'
import { isPreviewReport } from '@/utils/preview-report'
import { detectSubdomain } from '@/utils/url'

const subdomain = detectSubdomain()

export const GlobalBadges = () => {
  return (
    (!subdomain || isPreviewReport) && (
      <div
        className={`
          fixed inset-x-0 top-4 z-50 mx-auto flex flex-col items-center
          space-y-s8
          md:left-40 md:right-auto md:items-start
        `}
      >
        {!subdomain && (
          <Chip
            className={`
              w-32 border-red-500 bg-white font-bold
              [&>*]:text-red-500
            `}
            label="STAGING MODE"
          />
        )}
        {isPreviewReport && (
          <Chip
            className={`
              w-32 border-blue-600 bg-white font-bold
              [&>*]:text-blue-600
            `}
            label="PREVIEW MDOE"
          />
        )}
      </div>
    )
  )
}
