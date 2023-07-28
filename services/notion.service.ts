import { Client } from '@notionhq/client'

export default class NotionService {
  client: Client
  constructor() {
    this.client = new Client({
      auth: process.env.NOTION_API_KEY
    })
  }
  async getAllBlogPosts(): Promise<BlogPost[]> {
    const database = process.env.NOTION_BLOG_DATABASE_ID
    // list blog posts
    const response = await this.client.databases.query({
      database_id: database
    })

    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res)
    })
  }

  async getNewBlogPosts(): Promise<BlogPost[]> {
    const database = process.env.NOTION_BLOG_DATABASE_ID
    // list blog posts
    const response = await this.client.databases.query({
      database_id: database,
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ]
    })
    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res)
    })
  }

  async getBlogPost(pageId: string): Promise<BlogPost> {
    const response = await this.client.pages.retrieve({ page_id: pageId })
    if (!response) {
      return null
    }
    return NotionService.pageToPostTransformer(response)
  }

  private static pageToPostTransformer(page: any): BlogPost {
    const path = page.url
    const slug = path ? path.split('/').slice(-1)[0] : ''

    return {
      id: page.id,
      title: page.properties.Name?.title[0].plain_text,
      tags: page.properties.Tags?.multi_select,
      cover: page.cover?.file?.url || '',
      description: page.properties.Description?.rich_text[0]?.plain_text || '',
      date: page.properties.Date?.date.start,
      slug: slug
    }
  }
}
