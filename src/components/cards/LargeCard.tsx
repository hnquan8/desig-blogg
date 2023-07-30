import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'

import hero from 'static/images/hero.png'

const NewBlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/${post.slug}`)}
      className="card flex lg:flex-row w-full h-[540px] md:h-[434px] bg-base-200 cursor-pointer"
    >
      <figure className="pt-5 px-5 lg:px-7 lg:pt-0">
        <div className="w-[400px] h-[180px] sm:w-[600px] sm:h-[220px] lg:w-[630px] lg:h-[380px] relative">
          <Image
            src={post.image || hero}
            alt="cover"
            className="rounded-xl"
            objectFit="cover"
            objectPosition="center"
            layout="fill"
          />
        </div>
      </figure>
      <div className="card-body flex-1 gap-5 max-h-[330px] md:px-5 my-auto ">
        <h2 className="card-title text-[24px]">{post.title}</h2>
        <p className="text-[14px] text-neutral-content">{post.description}</p>
        <div className="card-actions">
          {post.tags.map((tag) => (
            <div key={tag.id} className="relative badge">
              <div
                style={{ background: tag.color }}
                className="absolute top-0 left-0 w-full h-full opacity-20 rounded-lg"
              />
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default NewBlogCard
