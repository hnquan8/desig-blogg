import { siteConfig } from 'providers/notion/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '677f0fd492ed4884af268db31eebb0ec',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Next.js Desig Blog Notion',
  domain: 'blog.desig.io',
  author: 'Desig Labs',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  navigationStyle: 'default'
})
