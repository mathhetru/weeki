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
    footer: defineCollection({
      type: 'data',
      source: 'footer/navigation.json',
      schema: z.object({
        copyright: z.string(),
        legalLinks: z.array(
          z.object({
            text: z.string(),
            url: z.string(),
          })
        ),
        links: z.array(
          z.object({
            text: z.string(),
            url: z.string(),
          })
        ),
      }),
    }),
    home: defineCollection({
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
    auteurs: defineCollection({
      type: 'data',
      source: 'pages/auteurs.json',
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        writers: z.array(
          z.object({
            name: z.string(),
            img: z.string(),
            text: z.string(),
            slot: z.string(),
          })
        ),
      }),
    }),
  },
})
