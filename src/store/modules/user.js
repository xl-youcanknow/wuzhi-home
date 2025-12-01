
import Vuex from 'vuex'
import Vue from 'vue'
import { loginAPI } from '@/api/index'
Vue.use(Vuex)
//promise        20000 成功， 50000 失败

const state = {
  token: localStorage.getItem('token') || "",
  userinfo: {},
  username: localStorage.getItem('username'),
  losinShow: false,
  loginStates: localStorage.getItem('loginState') || "",
};

const getters = {
  loginState () {
    let loginStates = state.loginStates;
    if (loginStates == null || loginStates == "") {
      return 0;
    } else {
      return loginStates
    }
  },

}

const mutations = {
  MU_username (state, data) {
    localStorage.setItem('username', data);
    localStorage.setItem('loginState', 1);
    getters.loginState();
  },
  MU_loginShow () {
    state.losinShow = !state.losinShow;
  },
  MU_loginout () {
    state.loginStates = null;
    localStorage.setItem('loginState', 0);
    localStorage.removeItem("Authorization");
    localStorage.removeItem("loginState");
    localStorage.removeItem("Authorization");
    localStorage.removeItem("Ident");
    localStorage.removeItem("Adv");
    // localStorage.removeItem("userinfonet");
    localStorage.removeItem("username");
    localStorage.removeItem("returnid");
    localStorage.removeItem("sortName");
  },
  SET_USERINFO (state, data) {
    console.log('data :>> ', data);
    state.userinfo = data;
  },
  SET_TOKEN (state, data) {
    state.token = data;
  },
};

const actions = {
  AC_login (store, data) {
    return new Promise(function (s, e) {
      loginAPI(data.data).then(res => {
        if (res.code == 200) {
          store.commit('MU_username', res.userinfo.username);
          localStorage.setItem('loginState', 1);
          s(res)
        } else {
          s(res)
        }
      });
    })
  },
  AC_loginShow (store) {
    store.commit('MU_loginShow')
  },
  AC_loginout (store) {
    store.commit('MU_loginout')
  },
  AC_initLogin (store) {    //初始化login状态
    store.commit('MU_initLogin')
  }

}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}