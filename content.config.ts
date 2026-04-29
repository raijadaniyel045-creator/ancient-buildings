import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    buildings: defineCollection({
      type: 'page',
      source: 'buildings/**/*.md',
      schema: z.object({
        name: z.string(),
        provinces: z.array(z.string()),
        dynasties: z.array(z.string()),
        categories: z.array(z.string()),
        img: z.string(),
        desc: z.string(),
        title: z.string(),
        subtitle: z.string()
      }),
      indexes: [
        { columns: ['provinces'] },
        { columns: ['categories'] },
        { columns: ['dynasties'] }
      ]
    }),
    data: defineCollection({
      type: 'data',
      source: 'data/*.json',
      schema: z.object({
        id: z.string(),
        name: z.string(),
        level: z.string(),
        batch: z.number(),
        category: z.string(),
        province: z.string(),
        city: z.string(),
        district: z.string(),
        address: z.string(),
        era: z.string(),
        description: z.string(),
        historical_value: z.string(),
        sources: z.array(z.string()),
        last_updated: z.string(),
        data_quality: z.string(),
        contributors: z.array(z.string())
      }),
      indexes: [
        { columns: ['city'] },
        { columns: ['district'] },
        { columns: ['era'] },
        { columns: ['province'] },
        { columns: ['category'] }
      ]
    })
  }
})
