/**
 * componentsフォルダ配下のvueファイル自動一括インポート
 * これでvue内のどこからでもコンポーネントが使えるようになる
 */

import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// componentsフォルダ配下の拡張子.vueファイルリストを取得
const compnents = require.context('@/components', true, /\.vue$/)

// vueファイルリストをvueコンポーネントに一括登録
compnents.keys().forEach(fileName => {
  const component = compnents(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  console.log(componentName)
  Vue.component(componentName, component.default || component)
})
