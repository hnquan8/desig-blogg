import { ExtendedRecordMap } from 'notion-types'
import { parsePageId } from 'notion-utils'

import { pageUrlAdditions, pageUrlOverrides } from './config'
import { getPage } from './notion'

export async function resolveNotionPage(rawPageId?: string) {
  let pageId: string = parsePageId(rawPageId)
   
  if (!pageId) {
    const override = pageUrlOverrides[rawPageId] || pageUrlAdditions[rawPageId]
    if (!override) throw new Error(`No override for page "${rawPageId}"`)
    pageId = parsePageId(override)
  }
  const recordMap: ExtendedRecordMap = await getPage(pageId)
  return { recordMap, pageId }
}

