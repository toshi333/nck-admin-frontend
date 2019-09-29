import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      meta: {
        name: '',
        requiresAuth: true,
      },
      redirect: {
        path: '/',
      },
    },
    {
      path: '/login',
      meta: {
        name: 'login',
        requiresAuth: false,
      },
      component: () => import(`@/views/LoginHome.vue`),
      // 既にログインしていたらメイン画面へ飛ばす
      beforeEnter: (to, from, next) => {
        if (store.getters.authorized) {
          next('/dashboard')
        } else {
          next()
        }
      },
    },
    {
      path: '',
      meta: {
        name: 'Top',
        requiresAuth: true,
      },
      component: () => import(`@/views/TopPage.vue`),
      children: [
        {
          path: '/',
          meta: {
            name: 'dashboard',
            requiresAuth: true,
          },
          component: () => import(`@/components/Dashboard.vue`),
        },
        {
          path: '/user',
          meta: {
            name: 'user',
            requiresAuth: true,
          },
          component: () => import(`@/components/UserList.vue`),
        },
        {
          path: '/user-item/:id',
          meta: {
            name: 'user-item',
            requiresAuth: true,
          },
          component: () => import(`@/components/UserItem.vue`),
        },
        {
          path: '/hello',
          meta: {
            name: 'hello',
            requiresAuth: true,
          },
          component: () => import(`@/components/HelloWorld.vue`),
        },
      ],
    },
  ],
})

// 全てのルートでログインチェックを行い、ログインしていない場合はログイン画面へ飛ばす
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.authorized) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
