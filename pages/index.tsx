import { GetStaticProps, InferGetStaticPropsType } from 'next'

import NotionService from 'services/notion.service'
import { Keyboard, Navigation, Pagination } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import Banner from '@/components/banner'
import BlogCard from '@/components/blogCard/BlogCard'

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService()
  const allPosts = await notionService.getAllBlogPosts()
  const newPosts = await notionService.getNewBlogPosts()
  return {
    props: {
      allPosts,
      newPosts
    },
    revalidate: 86400 // 1 day ?
  }
}

export default function Home({
  allPosts,
  newPosts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Banner />
      <div className='h-full pt-4 pb-16 mx-auto py-[10px] w-[1040px]'>
        <div className='hero-content text-center'>
          <div className='max-w-2xl'>
            <h1 className='mb-5 text-[56px] font-bold'>Desig Labs</h1>
            <p className='mb-5 text-[20px] text-neutral-content'>
              Desig is a blockchain-agnostic multisig solution, enhancing a
              Trustless ecosystem with two-factor authentication and social
              recovery.
            </p>
          </div>
        </div>
        <h2 className='mt-12 font-semibold text-4xl'>New articles</h2>
        <div className='mt-8 flex w-full h-[460px] mt-6 mx-auto'>
          <Swiper
            pagination={true}
            keyboard={true}
            modules={[Navigation, Pagination, Keyboard]}
            className='mySwiper'
          >
            {newPosts.slice(0, 3).map((post: BlogPost) => (
              <SwiperSlide key={post.id}>
                <BlogCard post={post} property='new' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <h2 className='mt-20 font-semibold text-4xl'>All articles</h2>
        <div className='mt-8 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
          {allPosts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} property='all' />
          ))}
        </div>
      </div>
    </>
  )
}
