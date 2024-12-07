import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfigFile from '@/../tailwind.config.ts'
export const tailwindConfig = resolveConfig(tailwindConfigFile)
