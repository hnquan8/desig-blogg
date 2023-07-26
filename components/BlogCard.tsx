import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

type BlogCardProps = {
  post: BlogPost
}

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/${post.slug}`)}
      className="card w-96 bg-base-200"
    >
      <figure className="px-10 pt-10">
        <img src={post.cover} alt="" className="rounded-xl" />
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title">{post.title}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          {post.tags.map((tag) => (
            <div key={tag.id} className="badge badge-secondary">
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogCard
