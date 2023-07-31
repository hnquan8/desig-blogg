import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Fragment } from 'react'
import { parsePageId } from 'notion-utils'

import Image from 'next/image'
import LoaderBlog from './LoaderBlog'
import RelatedBlogs from 'components/blogs/relatedBlogs'

import { domain } from 'providers/notion/config'
import { resolveNotionPage } from 'providers/notion/resolve-notion-page'
import NotionService from 'services/notion.service'

const ONE_HOUR = 3600

export default function DetailPage({
  resolve,
  blogPost,
  relatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!blogPost || !resolve || !relatedPosts) {
    return <Fragment />
  }

  return (
    <div className="flex flex-col w-full items-center">
      {blogPost.cover && (
        <div className="w-full h-[360px] relative">
          <Image
            alt="cover"
            src={blogPost.cover}
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}
      <h1 className="w-[386px] sm:w-[686px] font-semibold text-4xl mt-12 ">
        {blogPost.title}
      </h1>
      <LoaderBlog {...resolve} />
      <RelatedBlogs posts={relatedPosts} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const notionService = new NotionService()
    const allBlogPosts = await notionService.getAllBlogPosts()

    return {
      paths: allBlogPosts.map(({ slug }) => ({
        params: { blogId: slug },
      })),
      fallback: true,
    }
  } catch (error) {
    console.error('getStaticPaths error', domain, error)
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const rawBlogId = context.params.blogId as string
  const blogId = parsePageId(rawBlogId)
  try {
    const notionService = new NotionService()
    const [resolve, allPosts, blogPost] = await Promise.all([
      resolveNotionPage(rawBlogId),
      notionService.getAllBlogPosts(),
      notionService.getBlogDetails(blogId),
    ])

    const relatedPosts = allPosts.filter(({ tags }) =>
      tags.some(({ name: tagName }) =>
        blogPost.tags.some(({ name: pageName }) => pageName === tagName),
      ),
    )

    return {
      props: {
        resolve,
        blogPost,
        relatedPosts,
      },
      revalidate: ONE_HOUR,
    }
  } catch (error) {
    console.error('Cannot get blog post', domain, rawBlogId, error)

    return {
      props: {
        resolve: [],
        blogPost: [],
        relatedPosts: [],
      },
    }
  }
}
