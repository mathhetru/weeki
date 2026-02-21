import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    header: defineCollection({
      type: 'data',
      source: 'header/navigation.json',
      schema: z.object({
        title: z.object({
          img: z.string(),
          ariaLabel: z.string(),
          link: z.string(),
          text: z.string(),
        }),
        pages: z.array(
          z.object({
            text: z.string(),
            link: z.string(),
          })
        ),
        contact: z.object({
          text: z.string(),
          ariaLabel: z.string(),
          link: z.string(),
        }),
      }),
    }),
    pages: defineCollection({
      type: 'data',
      source: 'pages/home.json',
      schema: z.object({
        title: z.string(),
        hero: z.object({
          heading: z.string(),
          description: z.string(),
        }),
        features: z.array(
          z.object({
            title: z.string(),
            search: z.string(),
            img: z.string(),
            text: z.string(),
          })
        ),
      }),
    }),
  },
})
