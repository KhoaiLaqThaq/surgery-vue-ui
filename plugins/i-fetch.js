import setupInterceptor from "~~/services/setupInterceptor";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(setupInterceptor());
});
