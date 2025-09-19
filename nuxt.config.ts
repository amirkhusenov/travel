// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxtjs/supabase',
  ],
  shadcn: {

    prefix: '',

    componentDir: './components/ui'
  },
  supabase: {
    url: 'https://srrzfwevndjzkqogrxrq.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycnpmd2V2bmRqemtxb2dyeHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NDMwNjksImV4cCI6MjA3MzUxOTA2OX0.Lit-cjaON1zTLIlsWm39NA37GbAoj5Sy4wcV8Uclt2k',
    redirect: false
  }
})