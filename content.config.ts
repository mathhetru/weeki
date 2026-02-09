import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'data',
      source: 'pages/**.json',
      schema: z.object({
        title: z.string(),
        hero: z.object({
          heading: z.string(),
          description: z.string(),
        }),
        features: z.array(
          z.object({
            title: z.string(),
            text: z.string(),
          })
        ),
      }),
    }),
  },
})
