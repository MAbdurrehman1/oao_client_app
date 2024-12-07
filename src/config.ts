export enum AppEnv {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const getAppEnv = (): AppEnv => {
  return import.meta.env.VITE_APP_ENV
}
