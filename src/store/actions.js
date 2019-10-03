/**
 * データ操作系処理のまとめ
 */

import axios from 'axios'

export default {
  // ログイン処理
  // Emailとパスワードを送信
  // ログインに成功すると、アクセスTokenとユーザー情報を返す
  login({ commit }, userData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios
        .post('/auth/login/', {
          email: userData.username,
          password: userData.password,
        })
        .then(response => {
          const token = response.data.key
          const user = response.data.user
          axios.defaults.headers.common['Authorization'] = 'Token ' + token
          // 取得したアクセスTokenとユーザー情報をStoreに保存
          // 以降はthis.$store.gettersでアクセス出来る
          commit('auth_success', { token, user })
          resolve(response)
        })
        .catch(err => {
          console.log('login error')
          commit('auth_error')
          reject(err)
        })
    })
  },

  // ログアウト処理
  // サーバのログアウトに成功すると、フロント側のStore情報も削除する
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      delete axios.defaults.headers.common['Authorization']
      axios
        .post('/auth/logout/')
        .then(() => {
          console.log('logout')
          resolve()
        })
        .catch(err => {
          console.log('logout error')
          reject(err)
        })
    })
  },

  // データベース取得処理
  // 1件取得、複数件取得共用
  getTableItem({ commit }, endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          if (err.response.status == 403) {
            commit('logout')
            delete axios.defaults.headers.common['Authorization']
          }
          reject(err)
        })
    })
  },

  // データベース更新処理
  updateTableItem({ commit }, tableData) {
    return new Promise((resolve, reject) => {
      axios({
        url: tableData.endpoint,
        method: tableData.method,
        data: tableData.item,
      })
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          if (err.response.status == 403) {
            commit('logout')
            delete axios.defaults.headers.common['Authorization']
          }
          reject(err)
        })
    })
  },

  // 画像やファイルを含むフォームデータの更新処理
  // コンテンツタイプ：multipart/form-data
  updateFormItem({ commit }, tableData) {
    const option = { 'content-type': 'multipart/form-data' }
    return new Promise((resolve, reject) => {
      axios
        .patch(tableData.endpoint, tableData.item, { headers: option })
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          if (err.response.status == 403) {
            commit('logout')
            delete axios.defaults.headers.common['Authorization']
          }
          reject(err)
        })
    })
  },
}
