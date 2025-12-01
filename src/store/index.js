import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import currency from './modules/currency'
import user from './modules/user'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    products,
    currency,
    user
  },
  strict: debug,
})
