import type { ComponentType } from 'react'
import { SECTION_ORDER } from './sections'
import { sharedLessons } from './sharedLessons'

export type TutorialPage = {
  category: string
  section: string
  slug: string
  title: string
  order: number
  Component: ComponentType
}

type MdxModule = {
  frontmatter?: { title?: string; order?: number }
  default: ComponentType
}

const modules = import.meta.glob('./**/*.mdx', { eager: true }) as Record<string, MdxModule>

export const tutorialPages: TutorialPage[] = [Object.entries(modules).map(([path, mod]) => {
  const [, category, section, filename] = path.replace('.mdx', '').split('/')
  return { category, section, slug: filename, title: mod.frontmatter?.title ?? filename, order: mod.frontmatter?.order ?? 0, Component: mod.default, }
}), ...sharedLessons].flat()

function getCategorySequence(category: string): TutorialPage[] {
  const sectionsForCategory = SECTION_ORDER[category] ?? []
  const pagesInCategory = tutorialPages.filter(p => p.category === category)

  const sequence: TutorialPage[] = []
  for (const section of sectionsForCategory) {
    const items = pagesInCategory
      .filter(p => p.section === section)
      .sort((a, b) => a.order - b.order)
    sequence.push(...items)
  }
  return sequence
}

export function getNextPage(current: TutorialPage): TutorialPage | null {
  const sequence = getCategorySequence(current.category)
  const currentIndex = sequence.findIndex(p => p.slug === current.slug)
  if (currentIndex === -1 || currentIndex === sequence.length - 1) return null
  return sequence[currentIndex + 1]
}

export function getPreviousPage(current: TutorialPage): TutorialPage | null {
  const sequence = getCategorySequence(current.category)
  const currentIndex = sequence.findIndex(p => p.slug === current.slug)
  if (currentIndex <= 0) return null
  return sequence[currentIndex - 1]
}