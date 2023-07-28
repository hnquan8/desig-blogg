import { Fragment } from 'react'

import DefautlBlogCard from './DefautlBlogCard'
import NewBlogCard from './NewBlogCard'

type CardSize = 'LARGE' | 'SMALL'
type Props = {
  post: BlogPost
  size: CardSize
}

const BlogCard: React.FC<Props> = ({ post, size }) => {
  switch (size) {
    case 'LARGE':
      return <NewBlogCard post={post} />
    case 'SMALL':
      return <DefautlBlogCard post={post} />
    default:
      return <Fragment></Fragment>
  }
}

export default BlogCard
