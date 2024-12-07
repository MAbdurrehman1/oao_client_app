import { isAxiosError } from 'axios'

export enum LogoutReasons {
  InvalidMagicToken = 'invalid-magic-token',
  InvalidToken = 'invalid-token',
  ExpiredToken = 'expired-token',
}

export const getLogoutReason = (err: unknown) => {
  const errorMessage = isAxiosError(err)
    ? (
        (err.response?.data || {}) as {
          error: string
        }
      ).error
    : String(err)
  return errorMessage === 'Token is no longer valid.'
    ? LogoutReasons.ExpiredToken
    : errorMessage === 'Token is invalid.'
      ? LogoutReasons.InvalidToken
      : errorMessage
}
