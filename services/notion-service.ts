import { Client } from '@notionhq/client'

export default class NotionService {
  client: Client
  constructor() {
    this.client = new Client({
      auth: 'secret_66ZSMDeotqsC1Lx0CPvTGe303IxyXiMCUy8sPDXD58b',
    })
  }
  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    const database = '677f0fd492ed4884af268db31eebb0ec'
    // list blog posts
    const response = await this.client.databases.query({
      database_id: database,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res)
    })
  }

  private static pageToPostTransformer(page: any): BlogPost {
    const path = page.url
    const slug = path ? path.split('/').slice(-1)[0] : ''

    // switch (cover.type) {
    //   case 'file':
    //     cover = page.cover.file.url
    //     break
    //   case 'external':
    //     cover = page.cover.external.url
    //     break
    //   default:
    //     // Add default cover image if you want...
    //     cover = {}
    // }

    return {
      id: page.id,
      title: page.properties.Name?.title[0].plain_text,
      tags: page.properties.Tags?.multi_select,
      cover: '',
      date: page.properties.Date?.date.start,
      slug: slug,
    }
  }
}
