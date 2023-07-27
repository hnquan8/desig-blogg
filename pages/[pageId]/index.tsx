import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import NotionService from 'services/notion.service'

import NotionPage from '@/components/NotionPage'
import BlogCard from '@/components/blogCard/BlogCard'
import { domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'

export const getStaticPaths: GetStaticPaths = async () => {
  const notionService = new NotionService()

  const posts = await notionService.getAllBlogPosts()

  const paths = posts.map((post) => {
    return `/${post.slug}`
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService()
  const rawPageId = context.params.pageId as string
  try {
    const resolve = await resolveNotionPage(domain, rawPageId)

    const allPosts = await notionService.getAllBlogPosts()
    const blogPost = await notionService.getBlogPost(resolve.pageId)

    const relatedPosts = allPosts.filter((post) =>
      post.tags.some((tag) =>
        blogPost.tags.some((pageTag) => pageTag.name === tag.name)
      )
    )
    return {
      props: {
        resolve,
        relatedPosts
      },
      revalidate: 86400 // 1 day ?
    }
  } catch (error) {
    console.error('page error', domain, rawPageId, error)
    throw error
  }
}

export default function DetailPage({
  resolve,
  relatedPosts
}: //
InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NotionPage {...resolve} />
      <div className='w-[1040px] mt-8 mb-20'>
        <h2 className='font-semibold text-4xl'>Related articles</h2>
        <div className='mt-8 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
          {relatedPosts &&
            relatedPosts.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} property='related' />
            ))}
        </div>
      </div>
    </>
  )
}
