import Image from 'next/image'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import hero from 'static/images/hero.png'

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/${post.slug}`)}
      className="card w-[330px] h-[440px] bg-base-200 cursor-pointer"
    >
      <figure className="px-5 pt-4">
        <Image
          src={post.image || hero}
          alt=""
          className="rounded-xl"
          objectFit="cover"
          objectPosition="center"
          width={290}
          height={160}
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title text-[24px]">{post.title}</h2>
        <p className="text-[12px] text-neutral-content">{post.description}</p>
        <div className="card-actions">
          {post.tags.map((tag) => (
            <div key={tag.id} className="relative badge">
              <div
                style={{ background: tag.color }}
                className="absolute top-0 left-0 w-full h-full opacity-30 rounded-lg"
              />
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default BlogCard
