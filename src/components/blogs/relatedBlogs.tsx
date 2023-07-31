import React from 'react'

import SmallCard from 'components/blogCard/smallBlogCard'

const RelatedBlogs = ({ posts }) => {
  return (
    <div className="w-[386px] sm:w-[686px] lg:w-[1040px] mt-8 mb-20">
      <h2 className="font-semibold text-4xl">Related articles</h2>
      <div className="mt-8 mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
        {posts.map((post: BlogPost) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default RelatedBlogs
