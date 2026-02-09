// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content', 'nuxt-studio'],
  content: {},
  studio: {
    repository: {
      provider: 'github',
      owner: 'mathhetru',
      repo: 'weeki',
      branch: 'feat/nuxt-content',
    },
  },
})
