import axios from 'axios'
require('dotenv').config()

const { API_KEY, API_BASE_URL } = process.env
const isDev = process.env.NODE_ENV === 'development'

export default {
  //[isDev ? 'publicRuntimeConfig':'privateRuntimeConfig'] : {'apiKey': API_KEY },
  //[isDev ? 'publicRuntimeConfig':'privateRuntimeConfig'] : {'baseUrl': API_BASE_URL },
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
    baseUrl: process.env.NODE_ENV !== 'production' ? API_BASE_URL : undefined
  },
  privateRuntimeConfig: {
    //apiKey: process.env.API_KEY
    apiKey: API_KEY,
    baseUrl: API_BASE_URL
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'page',
      });
      routes.push({
        path: '/category/:categoryId/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'category',
      })
    },
  },
  generate: {
    async routes() {
      const limit = 10
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // 一覧のページング
      const pages = await axios
        .get(`${API_BASE_URL}/blog?limit=0`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
            route: `/page/${p}`,
          }))
        )

        const categories = await axios
        .get(`${API_BASE_URL}/categories?fields=id`, {
          headers: { 'X-API-KEY': API_KEY },
        })
          .then(({ data }) => {
            return data.contents.map((content) => content.id)
          });

      // カテゴリーページのページング
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios.get(
            `${API_BASE_URL}/blog?limit=0&filters=category[equals]${category}`,
            { headers: { 'X-API-KEY': API_KEY } }
          )
            .then((res) =>
              range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
              })))
      )
      )

      // 2次元配列になってるのでフラットにする
      const flattenCategoryPages = [].concat.apply([], categoryPages)
      return [...pages, ...flattenCategoryPages]
    },
  },
}
