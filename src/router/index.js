import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/view/Layout/layoutIndex'

import NoPage from '@/components/404/index'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'hash',
  base: '/',
  routes: [{
    path: '/',
    name: 'Home',
    component: Layout,
    children: [{
      path: '/',
      redirect: to => {
        return '/home'
      },
    }, {
      path: '/home',
      component: () => import('@/view/home'),
    }, {
      path: '/society',
      component: () => import('@/view/society'),
    }, {
      path: '/major',
      component: () => import('@/view/major'),
    }, {
      path: '/course',
      component: () => import('@/view/course'),
    }, {
      path: '/microCourse',
      component: () => import('@/view/microCourse'),
    }, {
      path: '/materialCenter',
      component: () => import('@/view/materialCenter'),
    }, {
      path: '/textbook',
      component: () => import('@/view/textbook'),
    }, {
      path: '/Ideological',
      component: () => import('@/view/Ideological'),
    }, {
      path: '/skillCenter',
      component: () => import('@/view/skillCenter'),
    }, {
      path: '/virtualCenter',
      component: () => import('@/view/virtualCenter'),
    }, {
      path: '/documentations',
      component: () => import('@/view/blog'),
    }, {
      path: '/pay',
      component: () => import('@/view/payOrder'),
    }, {
      path: '/contactUs',
      component: () => import('@/view/contactUs'),
    },
    {
      path: '/licence',
      component: () => import('@/view/licence'),
    }, {
      path: '/download/:id',
      component: () => import('@/components/resources/download'),
    }, {
      path: '/order/configorder',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/payorder/configOrder'),
    }, {
      path: '/products/device',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/device/index'),
    }, {
      path: '/order/managerAddress',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/payorder/managerAddress'),
    }, {
      path: '/order/managerOrder',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/payorder/managerOrder')
    }, {
      path: '/payResult/success',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/payResult/success')
    }, {
      path: '/payResult/failure',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/payResult/failure')
    }, {
      path: '/resell/index',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/resell/index')
    }, {
      path: '/resell/coupon',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/resell/coupon')
    }, {
      path: '/promotion/index',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/promotion/index')
    }, {
      path: '/userCenter/index',
      meta: {
        loginAuth: true
      },
      component: () => import('@/components/userCenter/index')
    }
    ]
  }, {
    path: '/development',
    name: 'soon',
    component: () => import('@/view/soon'),
  }, , {
    path: '*',
    component: NoPage
  }, {
    path: "/resources",
    component: Layout,
    redirect: '/resources/index',
    children: [{
      path: 'index',
      component: () => import('@/view/resources'),
    }, {
      path: 'wallpaper',
      component: () => import('@/components/resources/reswall'),
    }, {
      path: 'userGuide',
      component: () => import('@/components/resources/resguide'),
    }, {
      path: 'case',
      component: () => import('@/components/resources/rescase'),
    }, {
      path: 'material',
      component: () => import('@/components/resources/resmaterial'),
    },]
  },]
})
