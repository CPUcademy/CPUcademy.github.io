export type Tag = { label: string, color: string }
export type Project = {
  id: string
  url: string
  logo: string
  title: string
  description: string
  featured?: boolean
  tags: Tag[]
}