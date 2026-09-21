import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { languageCategoryTransformer } from './src/keyword-colors.js'

export default defineConfig({
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
  ],
})