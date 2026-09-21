import ProgrammingBasics from './shared/programming-basics.mdx'
import MySQLDatabaseAccess from './shared/mysql-database-access-in-php.mdx'
import type { ComponentType } from 'react'

type SharedPlacement = {
  category: string
  section: string
  slug: string
  order: number
  title: string
  Component: ComponentType
}

export const sharedLessons: SharedPlacement[] = [
  { category: 'python', section: 'basic', slug: 'programming-basics', order: 1, title: 'Programming basics', Component: ProgrammingBasics },
  { category: 'cpp', section: 'basic', slug: 'programming-basics', order: 1, title: 'Programming basics', Component: ProgrammingBasics },
  { category: 'java', section: 'basic', slug: 'programming-basics', order: 1, title: 'Programming basics', Component: ProgrammingBasics },
  { category: 'web', section: 'JavaScript', slug: 'programming-basics', order: 1, title: 'Programming basics', Component: ProgrammingBasics },
  { category: 'electronics-and-it-basics', section: 'programming-and-operating-systems', slug: 'programming-basics', order: 1, title: 'Programming basics', Component: ProgrammingBasics },
  { category: 'databases', section: 'MySQL', slug: 'mysql-database-access-in-php', order: 15, title: 'Database access in PHP', Component: MySQLDatabaseAccess },
  { category: 'web', section: 'PHP (a deprecated language)', slug: 'mysql-database-access-in-php', order: 3, title: 'MySQL database access', Component: MySQLDatabaseAccess },
]