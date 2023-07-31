import { Fragment } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Banner from 'components/banner'
import Header from 'components/header'
import Blogs from 'components/blogs'

import NotionService from 'services/notion.service'

const ONE_HOUR = 3600

export default function Home({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!allPosts) return <Fragment />

  return (
    <div className="flex flex-col w-full items-center">
      <Header />
      <Banner />
      <div className="h-full pt-4 pb-16 mx-auto py-[10px] w-[400px] sm:w-[580px] md:w-[800px] lg:w-[1040px]">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-[46px] md:text-[56px] font-bold">
              Desig Labs
            </h1>
            <p className="mb-5 text-[16px] md:text-[20px] text-neutral-content">
              Desig is a blockchain-agnostic multisig solution, enhancing a
              Trustless ecosystem with two-factor authentication and social
              recovery.
            </p>
          </div>
        </div>
        <Blogs posts={allPosts} />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const notionService = new NotionService()
    const allPosts = await notionService.getAllBlogPosts()
    return {
      props: {
        allPosts,
      },
      revalidate: ONE_HOUR,
    }
  } catch (error) {
    console.error('Cannot get blog post', error)
  }
}
