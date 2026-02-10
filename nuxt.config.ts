// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/image',
    'nuxt-security',
    '@nuxt/ui',
    '@nuxt/fonts',
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  fonts: {
    families: [
      { name: 'Birthstone Bounce', provider: 'google', weights: [400, 500] },
      {
        name: 'Montserrat',
        provider: 'google',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    ],
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'mathhetru',
      repo: 'weeki',
      branch: 'content',
    },
  },
  app: {
    head: {
      script:
        process.env.NODE_ENV === 'production'
          ? [
              {
                defer: true,
                src: process.env.NUXT_PUBLIC_UMAMI_URL,
                'data-website-id': process.env.NUXT_PUBLIC_UMAMI_ID,
              },
            ]
          : [],
      htmlAttrs: {
        lang: 'fr',
      },
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
