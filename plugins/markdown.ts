// https://github.com/antfu/vite-plugin-vue-markdown
import Shiki from '@shikijs/markdown-exit'
import LinkAttributes from 'markdown-it-link-attributes'
import Markdown from 'unplugin-vue-markdown/vite'

export default Markdown({
  wrapperClasses: 'prose',
  headEnabled: true,
  async markdownItSetup(md) {
    md.use(Shiki({
      defaultColor: false,
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    }))
    md.use(LinkAttributes, {
      matcher: (link: string) => /^https?:\/\//.test(link),
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    })
  },
})
