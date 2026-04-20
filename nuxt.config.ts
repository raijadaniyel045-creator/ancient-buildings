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
    '@nuxt/content',
    'nuxt-echarts'
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
    serverBundle: {
      collections: ['uil', 'mdi']
    }
  }
})
