import rawSiteConfig from '../../site.config'
import { SiteConfig } from './site-config'

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.ts`)
}

// allow environment variables to override site.config.ts
let siteConfigOverrides: SiteConfig

const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  ...siteConfigOverrides
}

export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  const value = siteConfig[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`Config error: missing required site config value "${key}"`)
}
