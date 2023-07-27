import { ExtendedRecordMap } from 'notion-types'
import { parsePageId } from 'notion-utils'

import { pageUrlAdditions, pageUrlOverrides } from './config'
import { getPage } from './notion'

export async function resolveNotionPage(domain: string, rawPageId?: string) {
  let pageId: string
  let recordMap: ExtendedRecordMap

  if (rawPageId && rawPageId !== 'index') {
    pageId = parsePageId(rawPageId)
    if (!pageId) {
      // check if the site configuration provides an override or a fallback for
      // the page's URI
      const override =
        pageUrlOverrides[rawPageId] || pageUrlAdditions[rawPageId]
      if (override) {
        pageId = parsePageId(override)
      }
    }
    recordMap = await getPage(pageId)
  }
  recordMap = await getPage(pageId)
  const props = { recordMap, pageId }
  return { ...props }
}
