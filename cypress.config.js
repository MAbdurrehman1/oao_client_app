import codeCoverage from '@cypress/code-coverage/task'
import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'
import { config } from 'dotenv'

const localEnv = config({ path: 'example.env' })

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  viewportWidth: 1450,
  viewportHeight: 800,
  e2e: {
    defaultCommandTimeout: 5000,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      config.env = {
        ...localEnv,
        ...config.env,
      }
      on('file:preprocessor', vitePreprocessor())
      codeCoverage(on, config)
      return config
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      config.env = {
        ...localEnv,
        ...config.env,
      }
      codeCoverage(on, config)
      return config
    },
  },
})
