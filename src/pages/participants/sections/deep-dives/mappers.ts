import {
  type DeepDiveLearningLibraryItem,
  type Library,
  type OaoContent,
} from '@/pages/participants/types'
import { Routes } from '@/routes'
import { type IBackendLibrary, type IBackendOaoContent } from '@/types/backend'
import { tryParse } from '@/utils/string'

export const oaoContentsMapper = (item: IBackendOaoContent): OaoContent => ({
  id: item.id,
  title: item.title,
  shortDescription: item.short_description,
  longDescription: item.long_description,
  contentUrl: item.content_url,
  deepDiveId: item.deep_dive_id,
  thumbnailUrl: item.thumbnail_url,
})

export const librariesMapper = (
  item: IBackendLibrary,
  variables: Record<string, string>,
): Library => ({
  id: item.id,
  title: item.title,
  shortDescription: tryParse(item.short_description, variables),
  longDescription: item.long_description,
  deepDiveId: item.deep_dive_id,
  organizationId: item.organization_id,
})

export const oaoContentToCard = (
  item: OaoContent,
  forceExternal?: boolean,
  onClick?: () => void,
): DeepDiveLearningLibraryItem => ({
  id: item.id,
  title: item.title,
  description: item.shortDescription,
  tag: 'Learning Resource',
  linkProps: forceExternal
    ? {
        url: item.contentUrl,
        external: true,
      }
    : {
        url: Routes.OAO_CONTENT_MODAL,
        external: false,
        params: {
          id: item.id,
          deepDiveId: item.deepDiveId,
        },
      },
  onClick: forceExternal ? () => onClick?.() : undefined,
})

export const libToCard = (item: Library): DeepDiveLearningLibraryItem => ({
  id: item.id,
  title: item.title,
  description: item.shortDescription,
  tag: 'Learning Resource',
  linkProps: {
    external: false,
    url: Routes.LEARNING_LIBRARY_MODAL,
    params: {
      id: item.id,
      deepDiveId: item.deepDiveId,
    },
  },
})
