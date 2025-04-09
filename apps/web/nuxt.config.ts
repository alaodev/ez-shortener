// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  imports: {
    dirs: ['composables/useApi'],
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }],
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'pinia-plugin-persistedstate/nuxt',
    'shadcn-nuxt',
  ],
  nitro: {
    preset: 'netlify',
  },
  colorMode: {
    classSuffix: '',
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  runtimeConfig: {
    public: {
      baseUrl: '',
      domainUrl: '',
      authApiKey: '',
      urlsApiKey: '',
      accessApiKey: '',
    },
  },
  vite: {
    server: {
      allowedHosts: ['host.docker.internal'],
    },
  },
});
