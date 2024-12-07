import { ApiEndpoints } from '@/api/endpoints'
import { SUBDOMAINS } from '@/constants'
import { Routes } from '@/routes'

const validAppPaths = Object.values(Routes)
// NOTE: this type is dynamically typed intentionally.
// this way, we could simply define new paths in the Routes object
// and also make sure the dynamic hrefs are valid
export type ValidAppRouteConfig = (typeof validAppPaths)[number]

const validApiPaths = Object.values(ApiEndpoints)
export type ValidApiType = (typeof validApiPaths)[number]

const validPaths = [...validApiPaths, ...validAppPaths.map((r) => r.route)]

type ValidRouteType = (typeof validPaths)[number]

export type RouteParams = Record<string, string | number>

export const generateUrl = (
  path: ValidRouteType,
  params: RouteParams,
): string => {
  let s: string = path
  for (const param in params) {
    if (!path.includes(`:${param}`)) throw `Bad param ${param} for url: ${path}`
    s = s.replace(new RegExp(':' + param, 'g'), params[param].toString())
  }
  if (s.includes(':')) throw `Provide all params for url: ${path}`
  return s
}

const getSubdomain = () => {
  let domain = window.location.hostname
  if (domain.includes('://')) {
    domain = domain.split('://')[1]
  }
  const subdomain = domain.split('.')[0]
  return subdomain
}

export const getSubdomainUrl = (subdomain: SUBDOMAINS) => {
  let domain = window.location.hostname
  if (domain.includes('://')) {
    domain = domain.split('://')[1]
  }
  const domainParts = domain.split('.')
  domainParts[0] == (subdomain as string)
  return `https://${domainParts.join('.')}`
}

export const detectSubdomain = (): SUBDOMAINS | null => {
  const subdomain = getSubdomain() as SUBDOMAINS
  if (Object.values(SUBDOMAINS).includes(subdomain)) return subdomain
  return null
}

export const generateSubdomainAwareUrl = (
  config: ValidAppRouteConfig,
  params?: RouteParams,
) => {
  const { route, prefix } = config
  const currentSubdomain = detectSubdomain()
  const baseUrl = currentSubdomain ? route : `${prefix}${route}`
  return params ? generateUrl(baseUrl as ValidRouteType, params) : baseUrl
}
