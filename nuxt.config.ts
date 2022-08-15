import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    build: {
        transpile: ["h3"],
    },
    components: true,
    buildModules: [
        // ...
        [
            "@pinia/nuxt",
            {
                autoImports: [
                    // automatically imports `usePinia()`
                    "defineStore",
                    // automatically imports `usePinia()` as `usePiniaStore()`
                    ["defineStore", "definePiniaStore"],
                    "storeToRefs",
                ],
            },
        ],
    ],
});
