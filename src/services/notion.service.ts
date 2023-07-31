import { Client } from '@notionhq/client'

const database = process.env.NOTION_BLOG_DATABASE_ID
export default class NotionService {
  client: Client
  constructor() {
    this.client = new Client({
      auth: process.env.NOTION_API_KEY
    })
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    if(!database) throw new Error('databaseId is not found')
    const blogs = await this.client.databases.query({
      database_id: database,
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ]
    })

    if(!blogs.results) throw new Error('Notion blogs is not found')

    return blogs.results.map((blog) => NotionService.convertToBlog(blog))
  }

  async getBlogDetails(pageId: string): Promise<BlogPost> {
    if(!pageId) throw new Error('pageId is not found')
    const blogDetails = await this.client.pages.retrieve({ page_id: pageId })
   
    if(!blogDetails) throw new Error('Notion blog details is not found')

    return NotionService.convertToBlog(blogDetails)
  }

  private static convertToBlog(blog: any): BlogPost {
    if(!blog.url) throw new Error('blog url is not found')
    const path = blog.url
    const slug = path ? path.split('/').slice(-1)[0] : ''

    return {
      id: blog.id,
      title: blog.properties.Name?.title[0].plain_text,
      tags: blog.properties.Tags?.multi_select,
      image: blog.properties['Files & media'].files[0].file?.url || '',
      description: blog.properties.Description?.rich_text[0]?.plain_text || '',
      date: blog.properties.Date?.date.start,
      cover: blog.cover.file?.url || '',
      slug: slug
    }
  }
}
