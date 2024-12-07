import STATIC_TEXTS from '@/assets/static-texts.json'
import STATIC_TEXTS_MAP from '@/assets/static-texts-map.json'
import { type DotNestedKeys, type GetFieldType } from '@/types/helpers'

type StaticTextsType = typeof STATIC_TEXTS_MAP
export type StaticTextsKey = DotNestedKeys<StaticTextsType>
function get<
  TData,
  TPath extends string,
  TDefault = GetFieldType<TData, TPath>,
>(
  data: TData,
  path: TPath,
  defaultValue?: TDefault,
): GetFieldType<TData, TPath> | TDefault {
  const value = path
    .split(/[.[\]]/)
    .filter(Boolean)
    .reduce<GetFieldType<TData, TPath>>(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (value, key) => (value as any)?.[key],
      data as GetFieldType<TData, TPath>,
    )

  return value !== undefined ? value : (defaultValue as TDefault)
}

// simple getter function to use outside react
export const getStaticText = (
  key: StaticTextsKey,
  variables?: Record<string, string | number | undefined>,
) => {
  const messageKey = (get(STATIC_TEXTS_MAP, key) ??
    key) as keyof typeof STATIC_TEXTS
  let message = STATIC_TEXTS[messageKey] ?? messageKey
  if (!variables) return message
  Object.entries(variables).forEach(([key, val]) => {
    if (message.includes(`%{${key}}`))
      message = message.replace(new RegExp(`%{${key}}`, 'g'), String(val))
  })
  return message
}

// hook to use in react components
export const useStaticText = (
  key: StaticTextsKey,
  variables?: Record<string, string | number | undefined>,
) => {
  return getStaticText(key, variables)
}
