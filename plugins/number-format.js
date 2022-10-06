import VueNumberFormat from "vue-number-format"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueNumberFormat, { prefix: 'R$ ', decimal: '.', thounsand: ',' })
});
