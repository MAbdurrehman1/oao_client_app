import { type Section } from '@/components/layout/types'

export const toCapitalize = (text?: string): string | undefined =>
  text && text[0].toUpperCase() + text.slice(1)

export const getSectionSlugFromTitle = (
  title: Section['title'],
): Section['slug'] => title.toLowerCase().replace(/ /g, '-')

export const tryParse = (
  str: string,
  variables: Record<string, string>,
): string => {
  if (!str.includes('%{')) return str
  let message = str
  for (const [key, val] of Object.entries(variables)) {
    message = message.replace(new RegExp(`%{${key}}`, 'g'), String(val))
  }
  return message
}
