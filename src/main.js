// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import store from './store/index'
import './public/css/index.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import locale2 from 'element-ui/lib/locale/lang/zh-CN';
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.config.productionTip = false

Vue.use(VueI18n);
Vue.use(ElementUI, { locale2 });

/* 正式环境关闭devtools */
if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}
/* eslint-disable no-new */

window.onload = function () {
  var lang = localStorage.getItem('lang');
  if (lang == null && lang == undefined) {
    lang = "English"
  }
  store.state.lang = lang;
  localStorage.setItem('lang', lang);
}

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || "English", // 语言标识
  messages: {
    'Chinese': require('./lang/Chinese'),
    'English': require('./lang/English')
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("loginState") !== 1) {
      next();
    } else {
      window.location.href = `https://${document.domain}/home`;
    }
  } else {
    next();
  }
  if (to.meta.loginAuth) {
    if (localStorage.getItem("loginState") == 1) {
      next();
    } else {
      window.location.href = `https://${document.domain}/home`;
    }
  } else {
    next();
  }
});



new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
