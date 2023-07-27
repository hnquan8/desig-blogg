import { ExtendedRecordMap } from 'notion-types'

export * from 'notion-types'

export type NavigationStyle = 'default' | 'custom'

export interface PageError {
  message?: string
  statusCode: number
}

export interface PageProps {
  recordMap?: ExtendedRecordMap
  pageId?: string
  error?: PageError
}

export interface PageUrlOverridesMap {
  // maps from a URL path to the notion page id the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pagePath: string]: string
}

export interface PageUrlOverridesInverseMap {
  // maps from a notion page id to the URL path the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pageId: string]: string
}
