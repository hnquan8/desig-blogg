type Theme = 'light' | 'dark'

type Tag = {
  color: string
  id: string
  name: string
}

type BlogPost = {
  id: string
  title: string
  tags: Tag[]
  cover: string
  date: string
  slug: string
}
