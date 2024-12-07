/* eslint-disable @typescript-eslint/consistent-type-imports */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
declare module 'react-html-renderer'

type ImportMetaEnvAugmented =
  import('@julr/vite-plugin-validate-env').ImportMetaEnvAugmented<
    typeof import('./env').default
  >

interface ImportMetaEnv extends ImportMetaEnvAugmented {}
