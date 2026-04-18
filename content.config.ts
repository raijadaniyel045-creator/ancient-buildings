import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    buildings: defineCollection({
      type: 'page',
      source: 'buildings/*.md',
      schema: z.object({
        name: z.string(),
        province: z.array(z.string()),
        dynasty: z.array(z.string()),
        category: z.array(z.string()),
        img: z.string(),
        desc: z.string()
      }),
      indexes: [
        { columns: ['province'] },
        { columns: ['category'] },
        { columns: ['dynasty'] }
      ]
    })
  }
})
