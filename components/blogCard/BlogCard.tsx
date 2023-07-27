import hero from './hero.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

type BlogCardProps = {
  post: BlogPost
  property: 'new' | 'all' | 'related'
}

const BlogCard: FunctionComponent<BlogCardProps> = ({ post, property }) => {
  const router = useRouter()

  return property === 'new' ? (
    <div
      onClick={() => router.push(`/${post.slug}`)}
      className="card flex flex-row w-full h-[434px] bg-base-200 cursor-pointer"
    >
      <figure className="px-8">
        <Image
          src={hero}
          alt=""
          className="rounded-xl"
          objectFit="cover"
          objectPosition="center"
        />
      </figure>
      <div className="card-body flex-1 gap-5 max-h-[330px] px-4 my-auto ">
        <h2 className="card-title text-[24px]">{post.title}</h2>
        <p className="text-[14px] text-neutral-content">
          If a dog chews shoes whose shoes does he choose?
        </p>
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
  ) : (
    <div
      onClick={() => router.push(`/${post.slug}`)}
      className="card w-[330px] h-[431px] bg-base-200 cursor-pointer"
    >
      <figure className="px-5 pt-4">
        <Image
          src={hero}
          alt=""
          className="rounded-xl"
          objectFit="cover"
          objectPosition="center"
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title text-[24px]">{post.title}</h2>
        <p className="text-[14px] text-neutral-content">
          If a dog chews shoes whose shoes does he choose?
        </p>
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
