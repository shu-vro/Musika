import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    build: {
        transpile: ["h3"],
    },
    components: true,
    modules: [
        // ...
        [
            "@pinia/nuxt",
            {
                autoImports: [
                    // automatically imports `usePinia()`
                    "defineStore",
                    "storeToRefs",
                ],
            },
        ],
    ],
    vite: {
        vue: {
            template: {
                compilerOptions: {
                    isCustomElement: tag => ["marquee"].includes(tag),
                },
            },
        },
    },
    css: ["~/assets/styles/main.scss"],
});
