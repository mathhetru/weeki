// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content', 'nuxt-studio', '@nuxt/image', 'nuxt-security'],
  content: {},
  studio: {
    repository: {
      provider: 'github',
      owner: 'mathhetru',
      repo: 'weeki',
      branch: 'content',
    },
  },
  security: {
    headers: {
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production'
          ? {
              'default-src': ["'self'"],
              'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "'wasm-unsafe-eval'"],
              'script-src-attr': ["'unsafe-inline'"],
              'style-src': ["'self'", "'unsafe-inline'"],
              'img-src': ["'self'", 'data:', 'https:'],
              'font-src': ["'self'", 'data:'],
              'connect-src': ["'self'", 'https:'],
              'frame-src': ["'self'", 'https://app.netlify.com'],
            }
          : false,
    },
  },
})
