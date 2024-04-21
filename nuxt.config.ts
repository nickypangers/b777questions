// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
        'data-theme': 'light'
      }
    }
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  imports: {
    dirs: ['types/**/*.ts'],
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-lodash"],
  lodash: {
    prefix: 'use',
    upperAfterPrefix: true,
  },
})