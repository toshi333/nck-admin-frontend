// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'

// The login action passes vuex commit helper that we will use to trigger mutations.
export default {
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
          // mutation to change state properties to the values passed along
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
  // eslint-disable-next-line no-unused-vars
  getTableList({ commit }, endpoint) {
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
  // eslint-disable-next-line no-unused-vars
  getTableItem({ commit }, endpoint, tableKey) {
    return new Promise((resolve, reject) => {
      let ep = endpoint + (tableKey === undefined ? '' : '/' + tableKey)
      axios
        .get(ep)
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
  // eslint-disable-next-line no-unused-vars
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
}
