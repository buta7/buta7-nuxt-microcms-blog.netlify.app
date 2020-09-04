<template>
  <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({params, $config}) {
    const page = params.p || '1'
    const categoryId = params.categoryId
    const limit = 10
    const { data } = await axios.get(
      $config.baseUrl+`/blog?limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      //$config.baseUrl+'/blog?limit=${limit}&offset=${(page - 1) * limit}',
      {
        headers: { 'X-API-KEY': $config.apiKey }
      }
    )
    return data
  }
}
</script>