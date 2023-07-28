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
    const blogs = await this.client.databases.query({
      database_id: database
    })

    return blogs.results.map((blog) => {
      return NotionService.convertToBlog(blog)
    })
  }

  async getNewBlogPosts(): Promise<BlogPost[]> {
    const newBlogs = await this.client.databases.query({
      database_id: database,
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ]
    })

    return newBlogs.results.map((blog) => {
      return NotionService.convertToBlog(blog)
    })
  }

  async getBlogDetails(pageId: string): Promise<BlogPost> {
    const blogDetails = await this.client.pages.retrieve({ page_id: pageId })
    if (!blogDetails) {
      return null
    }

    return NotionService.convertToBlog(blogDetails)
  }

  private static convertToBlog(blog: any): BlogPost {
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
