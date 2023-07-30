import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Fragment } from 'react'

import Image from 'next/image'
import { parsePageId } from 'notion-utils'
import { domain } from 'providers/notion/config'
import { resolveNotionPage } from 'providers/notion/resolve-notion-page'
import NotionService from 'services/notion.service'

import LoadingBlog from './LoaderBlog'
import SmallCard from 'components/cards/SmallCard'

const ONE_HOUR = 3600

export const getStaticPaths: GetStaticPaths = async () => {
  const notionService = new NotionService()
  try {
    const allBlogPosts = await notionService.getAllBlogPosts()
    return {
      paths: allBlogPosts.map(({ slug }) => ({
        params: { blogId: slug },
      })),
      fallback: true,
    }
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    }
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService()
  const rawBlogId = context.params.blogId as string
  const blogId = parsePageId(rawBlogId)
  try {
    const [resolve, allPosts, blogPost] = await Promise.all([
      resolveNotionPage(rawBlogId),
      notionService.getAllBlogPosts(),
      notionService.getBlogDetails(blogId),
    ])

    const relatedPosts = allPosts.filter((post) =>
      post.tags.some((tag) =>
        blogPost.tags.some((pageTag) => pageTag.name === tag.name),
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
    console.error('page error', domain, rawBlogId, error)

    return {
      props: {
        resolve: null,
        blogPost: null,
        relatedPosts: null,
      },
    }
  }
}

export default function DetailPage({
  resolve,
  blogPost,
  relatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!blogPost || !resolve || !relatedPosts) {
    return <Fragment />
  }

  return (
    <>
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
      <LoadingBlog {...resolve} />
      <div className="w-[386px] sm:w-[686px] lg:w-[1040px] mt-8 mb-20">
        <h2 className="font-semibold text-4xl">Related articles</h2>
        <div className="mt-8 mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
          {relatedPosts.map((post: BlogPost) => (
            <SmallCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
