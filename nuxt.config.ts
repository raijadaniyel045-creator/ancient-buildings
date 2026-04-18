// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@tresjs/nuxt',
    'nuxt-auth-utils',
    '@nuxt/content'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: { nativeSqlite: true }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    locales: [
      { code: 'cn', name: 'Chinese', file: 'cn.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'cn'
  },

  icon: {
    serverBundle: {
      collections: ['uil', 'mdi']
    }
  }
})
