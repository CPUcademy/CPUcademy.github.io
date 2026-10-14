import { defineConfig, type Plugin } from 'vite'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { languageCategoryTransformer } from './src/keyword-colors.js'

const publicPrecache = [
  '/manifest.webmanifest',
  '/favicon.png',
  '/icons/main/logo.png',
  '/icons/main/circlelogo.png',
  '/icons/main/circlelogo-192.png',
  '/css/fontello.css',
  '/font/css/all.min.css',
  '/font/fontello.woff2',
  ...readdirSync('public/font/webfonts').filter(file => file.endsWith('.woff2')).map(file => `/font/webfonts/${file}`),
]

function serviceWorker(): Plugin {
  return {
    name: 'service-worker',
    apply: 'build',
    generateBundle(_, bundle) {
      const bundleFiles = Object.keys(bundle).filter(file => file !== 'index.html')
      const precache = ['/index.html', ...publicPrecache, ...bundleFiles.map(file => `/${file}`)]
      const hash = createHash('sha256')
      for (const file of bundleFiles) hash.update(file)
      for (const file of publicPrecache) hash.update(readFileSync(`public${file}`))
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: readFileSync('src/sw.js', 'utf-8').replace('__CACHE__', `cpucademy-${hash.digest('hex').slice(0, 12)}`).replace('__PRECACHE__', JSON.stringify(precache)) })
    },
  }
}

export default defineConfig({
  base: '/',

  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          [
            rehypeRaw,
            {
              passThrough: [
                'mdxjsEsm',
                'mdxJsxFlowElement',
                'mdxJsxTextElement',
                'mdxFlowExpression',
                'mdxTextExpression',
              ],
            },
          ],
          [rehypePrettyCode, { theme: 'github-dark', transformers: [languageCategoryTransformer] }],
        ],
      }),
    },
    react({ include: /\.(jsx|js|tsx|ts)$/ }),
    serviceWorker(),
  ],
})