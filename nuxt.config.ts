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
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
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
    dev: false,
    repository: {
      provider: 'github',
      owner: 'mathhetru',
      branch: 'content',
      repo: 'weeki',
    },
  },
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
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
      contentSecurityPolicy: {
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "'wasm-unsafe-eval'",
          'https://cloud.umami.is',
          'https://esm.sh',
        ],
        'script-src-elem': [
          "'self'",
          "'unsafe-inline'",
          "'wasm-unsafe-eval'",
          'https://cloud.umami.is',
          'https://esm.sh',
        ],
        'img-src': [
          "'self'",
          'data:',
          'https://avatars.githubusercontent.com',
          'https://res.cloudinary.com',
          'https://cloud.umami.is',
        ],
        'img-src': ["'self'", 'data:', 'https://avatars.githubusercontent.com'],
      },
    },
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dbihnwsar/image/upload',
    },
  },
})
