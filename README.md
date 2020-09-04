# hige-nuxt-microcms-blog.netlify.app

[microCMS \+ NuxtでJamstackブログを作ってみよう](https://microcms.io/blog/microcms-nuxt-jamstack-blog/)

## Build Setup

```shell
# create project
npx create-nuxt-app hige-nuxt-microcms-blog.netlify.app

cd hige-nuxt-microcms-blog.netlify.app

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
npm run generate
```

追加モジュール

```shell
npm install --save axios
npm install --save node-sass sass-loader
npm install --save-dev @nuxtjs/dotenv
```

## Microcms

* hige-nuxt-microcms-blog.netlify.app
* hige-blog.microcms.io
* API名: blog
* エンドポイント: https://hige-blog.microcms.io/api/v1/blog
* APIの型を選択: リスト形式
* APIスキーマ
    * title/タイトル/テキストフィールド
    * body/本文/リッチエディタ

## Link

* [最近話題のヘッドレスCMS「microCMS」\+Nuxtでサイトを作った話 \- Qiita](https://qiita.com/yutopia898/items/653068aa3d8237f3e89a)
* [NuxtのJamstack構成におけるAPIキーの隠蔽方法について](https://microcms.io/blog/nuxt-secure-api-key/)
