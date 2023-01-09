export default {
  ssr: false,
  head: {
    title: "Surgery",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "http://fonts.googleapis.com/css?family=Roboto",
      },
    ],
    script: [],
  },
  css: [
    "@/assets/scss/custom.scss",
    "@/assets/scss/position.scss",
    "@/assets/scss/sizing.scss",
    "@/assets/scss/select2.scss",
    "@/assets/scss/pagination.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  plugins: [
    { src: "~/plugins/fontawesome.js" },
    { src: "~/plugins/i-fetch.js" },
    { src: "~/plugins/number-format.js" },
    { src: "~/plugins/i18n.ts"}
  ],
  components: true,
  buildModules: [
    '@nuxt/image'
  ],
  build: {
    transpile: [
      "chartjs",
      "@vuepic/vue-datepicker"
    ]
  },
  modules: [],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
};
