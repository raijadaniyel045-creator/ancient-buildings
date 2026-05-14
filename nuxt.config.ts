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
    '@nuxt/content',
    'nuxt-echarts',
    '@pinia-plugin-persistedstate/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    database: {
      type: 'postgres',
      url: 'postgresql://admin:123456@localhost:5432/buildings'
    },
    experimental: { nativeSqlite: true }
  },

  ui: {
    fonts: false
  },

  build: {
    transpile: ['echarts', 'vue-echarts', 'zrender'] // zrender 是 echarts 的底层依赖
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    routeRules: {
      // 将所有 /api/v1/ 开头的请求代理到后端服务
      '/api/v1/**': {
        proxy: 'http://localhost:5000/api/v1/**'
      }
    }
  },

  echarts: {
    // 导入所有图表类型
    charts: [
      'LineChart', 'BarChart', 'PieChart', 'ScatterChart',
      'RadarChart', 'MapChart', 'TreeChart', 'GraphChart',
      'GaugeChart', 'FunnelChart', 'ParallelChart', 'SankeyChart',
      'BoxplotChart', 'CandlestickChart', 'EffectScatterChart',
      'LinesChart', 'HeatmapChart', 'PictorialBarChart',
      'ThemeRiverChart', 'SunburstChart', 'CustomChart'
    ],
    // 导入所有常用组件
    components: [
      'GridComponent', 'LegendComponent', 'TooltipComponent',
      'TitleComponent', 'VisualMapComponent', 'DataZoomComponent',
      'MarkPointComponent', 'MarkLineComponent', 'MarkAreaComponent',
      'ToolboxComponent', 'BrushComponent', 'GeoComponent',
      'ParallelComponent', 'CalendarComponent', 'GraphicComponent',
      'TimelineComponent', 'DatasetComponent', 'TransformComponent'
    ]
  },

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
      { code: 'cn', name: '中文-简体', file: 'cn.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'cn'
  },

  icon: {
    serverBundle: 'local'
  }
})
