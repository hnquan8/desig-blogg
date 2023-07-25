// import { NotionPage } from '@/components/NotionPage'
// import { domain } from '@/lib/config'
// import { resolveNotionPage } from '@/lib/resolve-notion-page'
import BlogCard from '@/components/BlogCard'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import NotionService from 'services/notion-service'

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService()
  const posts = await notionService.getPublishedBlogPosts()

  return {
    props: {
      posts,
    },
  }
}

export default function NotionDomainPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="h-full pt-4 pb-16 mx-auto">
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
          {posts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
