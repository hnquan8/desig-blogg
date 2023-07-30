import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Banner from 'components/banner'
import Header from 'components/header'
import NotionService from 'services/notion.service'

import { Keyboard, Navigation, Pagination } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import LargeCard from 'components/cards/LargeCard'
import SmallCard from 'components/cards/SmallCard'

const ONE_HOUR = 3600

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService()
  try {
    const [allPosts, newPosts] = await Promise.all([
      notionService.getAllBlogPosts(),
      notionService.getNewBlogPosts(),
    ])
    return {
      props: {
        allPosts,
        newPosts,
      },
      revalidate: ONE_HOUR,
    }
  } catch {
    return {
      props: {
        allPosts: [],
        newPosts: [],
      },
    }
  }
}

export default function Home({
  allPosts,
  newPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
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
        <h2 className="mt-12 font-semibold text-3xl md:text-4xl">
          New articles
        </h2>
        <div className="mt-8 flex w-full h-[560px] md:h-[460px] mt-6 mx-auto">
          <Swiper
            pagination={true}
            keyboard={true}
            slidesPerView={'auto'}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Keyboard]}
            className="mySwiper"
          >
            {newPosts.slice(0, 3).map((post: BlogPost) => (
              <SwiperSlide key={post.id}>
                <LargeCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <h2 className="mt-20 font-semibold text-4xl">All articles</h2>
        <div className="mt-8 w-full mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
          {allPosts.map((post: BlogPost) => (
            <SmallCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
