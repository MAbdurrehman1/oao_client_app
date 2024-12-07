export const isCypressTesting = import.meta.env.VITE_CYPRESS_E2E === 'true'

export const generateTestId = (id: string) =>
  isCypressTesting ? { 'data-testid': id } : {}
