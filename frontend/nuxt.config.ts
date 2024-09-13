// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true, // Pre-render routes.
  srcDir: "src/",
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
});
