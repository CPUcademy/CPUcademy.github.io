import sectionOrder from './websiteData/section-order.json'

export const SECTION_ORDER: Record<string, string[]> = sectionOrder
export type Category = keyof typeof SECTION_ORDER

export function sectionTitle(section: string): string {
  return section
    .split('-')
    .map((word: string) =>
      word === 'and' ? '&' : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ')
}