import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import istanbul from 'vite-plugin-istanbul'
import svgr from 'vite-plugin-svgr'
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'
import tsconfigPaths from 'vite-tsconfig-paths'

const isCypressTest =
  process.env.CYPRESS === 'true' || process.env.VITE_CYPRESS_E2E === 'true'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      svgr({ svgrOptions: { icon: true } }),
      react(),
      tsconfigPaths(),
      ValidateEnv({
        configFile: 'src/env',
      }),
      !isCypressTest && manualChunksPlugin(),
      isCypressTest &&
        istanbul({
          cypress: true,
          requireEnv: false,
          exclude: ['node_modules', 'cypress', 'dist'],
          forceBuildInstrument: true,
        }),
      !isCypressTest &&
        sentryVitePlugin({
          authToken: env.SENTRY_AUTH_TOKEN,
          org: 'oao3',
          project: 'oao-frontend',
          release: {
            name: env.SENTRY_RELEASE_NAME,
            inject: true,
            deploy: {
              env: env.VITE_APP_ENV ?? 'development',
            },
          },
          sourcemaps: {
            filesToDeleteAfterUpload: '**/*.js.map',
          },
        }),
    ],
    server: {
      port: 3000, // development port
      host: true,
      watch: {
        usePolling: true,
        ignored: ['**/coverage/**', '**/.nyc_output/**', '**/cypress/**'],
      },
    },
    preview: {
      port: 3000, // preview port
      host: true,
    },
    build: {
      sourcemap: true,
    },
  }
})
