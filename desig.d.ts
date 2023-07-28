type Theme = 'light' | 'dark'

type Tag = {
  color: string
  id: string
  name: string
}

type BlogPost = {
  id: string
  title: string
  description: string
  tags: Tag[]
  cover?: string
  date: string
  slug: string
}

type BlogCardProps = {
  post: BlogPost
}
