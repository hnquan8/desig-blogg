import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { Fragment } from 'react'

import { parsePageId } from 'notion-utils'
import NotionService from 'services/notion.service'

import BlogCard from '@/components/blogCard/BlogCard'
import { domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'

import LoadingBlog from './LoadingBlog'

export const getStaticPaths: GetStaticPaths = async () => {
  const notionService = new NotionService()
  try {
    const allBlogPosts = await notionService.getAllBlogPosts()
    return {
      paths: allBlogPosts.map((post) => ({
        params: { blogId: post.slug }
      })),
      fallback: true
    }
  } catch (error) {
    return {
      paths: [],
      fallback: true
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
      notionService.getBlogPost(blogId)
    ])

    const relatedPosts = allPosts.filter((post) =>
      post.tags.some((tag) =>
        blogPost.tags.some((pageTag) => pageTag.name === tag.name)
      )
    )
    return {
      props: {
        resolve,
        blogPost,
        relatedPosts
      },
      revalidate: 60 // 30s ?
    }
  } catch (error) {
    console.error('page error', domain, rawBlogId, error)
    return {
      props: {
        resolve: null,
        blogPost: null,
        relatedPosts: null
      }
    }
  }
}

export default function DetailPage({
  resolve,
  blogPost,
  relatedPosts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!blogPost || !resolve || !relatedPosts) {
    return <Fragment></Fragment>
  }

  return (
    <>
      {blogPost.cover && (
        <div className='w-full h-[360px] relative'>
          <Image
            alt='cover'
            src={blogPost.cover}
            objectFit='cover'
            layout='fill'
          />
        </div>
      )}
      <h1 className='w-[386px] sm:w-[686px] font-semibold text-4xl mt-12 '>
        {blogPost.title}
      </h1>
      <LoadingBlog {...resolve} />
      <div className='w-[386px] sm:w-[686px] lg:w-[1040px] mt-8 mb-20'>
        <h2 className='font-semibold text-4xl'>Related articles</h2>
        <div className='mt-8 mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none'>
          {relatedPosts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
