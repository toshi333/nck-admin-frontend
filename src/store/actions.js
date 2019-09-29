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
          const user = response.data.username
          console.log(response)
          // storing jwt in localStorage. https cookie is safer place to store
          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          // mutation to change state properties to the values passed along
          commit('auth_success', { token, user })
          resolve(response)
        })
        .catch(err => {
          console.log('login error')
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      axios
        .post('/auth/logout/')
        .then(() => {
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
        .catch(err => {
          console.log('login error')
          reject(err)
        })
    })
  },
  refreshtoken({ commit }) {
    axios
      .get('/refresh')
      .then(response => {
        const token = response.data.access_token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('auth_success', { token })
      })
      .catch(error => {
        console.log('refresh token error')
        commit('logout')
        localStorage.removeItem('token')
        console.log(error)
      })
  },
  // eslint-disable-next-line no-unused-vars
  getTableList({ commit }, endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint)
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
        .catch(err => {
          console.log(err)
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
          console.log(response)
          resolve(response.data)
        })
        .catch(err => {
          console.log(err)
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
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
}
