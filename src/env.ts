import { defineConfig } from '@julr/vite-plugin-validate-env'
import { z } from 'zod'

import { AppEnv } from './config'

export default defineConfig({
  validator: 'zod',
  schema: {
    VITE_API_URL: z.string().url(),
    VITE_CYPRESS_E2E: z.string().optional().default('false'),
    VITE_LLM_API_URL: z.string().url(),
    VITE_PANEL_APP_URL: z.string().url(),
    VITE_APP_ENV: z.nativeEnum(AppEnv).optional().default(AppEnv.DEVELOPMENT),
  },
})
