import React from 'react'

import LargeCard from 'components/blogCard/largeBlogCard'
import SmallCard from 'components/blogCard/smallBlogCard'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Keyboard, Navigation, Pagination } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Blogs = ({ posts }) => {
  return (
    <div className="flex flex-col w-full">
      {/* New articles */}
      <h2 className="mt-12 font-semibold text-3xl md:text-4xl">New articles</h2>
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
          {posts.slice(0, 3).map((post: BlogPost) => (
            <SwiperSlide key={post.id}>
              <LargeCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* All articles */}
      <h2 className="mt-20 font-semibold text-4xl">All articles</h2>
      <div className="mt-8 w-full mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
        {posts.map((post: BlogPost) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Blogs
