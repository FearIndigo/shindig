// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  // Pre-render routes.
  ssr: true,

  srcDir: "src/",

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },

  modules: ["@vueuse/nuxt", "vuetify-nuxt-module"],

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: "dark",
      },
    },
  },
});
