import { createI18n } from 'vue-i18n';
import en from '~~/locales/en.json';
import vi from '~~/locales/vi.json';

export default defineNuxtPlugin(({vueApp}) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'vi',
        messages: {
            en,
            vi
        },
        datetimeFormats: {
            en: {
                short: {
                    year: 'numeric', month: 'short', day: 'numeric'
                },
                long: {
                    year: 'numeric', month: 'short', day: 'numeric',
                    weekday: 'short', hour: 'numeric', minute: 'numeric'
                }
            },
            vi: {
                short: {
                    year: 'numeric', month: 'short', day: 'numeric'
                },
                long: {
                    year: 'numeric', month: 'short', day: 'numeric',
                    weekday: 'short', hour: 'numeric', minute: 'numeric'
                }
            },
        },
        numberFormats: {
            en: {
                currency: {
                    style: 'currency', currency: 'USD', notation: 'standard'
                },
                decimal: {
                    style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
                },
                percent: {
                    style: 'percent', useGrouping: false
                }
            },
            vi: {
                currency: {
                    style: 'currency', currency: 'USD', notation: 'standard'
                },
                decimal: {
                    style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
                },
                percent: {
                    style: 'percent', useGrouping: false
                }
            },
        }
    })
    vueApp.use(i18n)
})
