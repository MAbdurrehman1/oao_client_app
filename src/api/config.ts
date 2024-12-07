export const apiBaseUrls = {
  backend: import.meta.env.VITE_API_URL,
  llm: import.meta.env.VITE_LLM_API_URL,
} as const
