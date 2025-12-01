import Vuex from 'vuex'
import Vue from 'vue'
import {
  Productinfo,
  addcar,
  dellcar
} from '@/api/index'
Vue.use(Vuex)


const state = {
  green: sessionStorage.getItem('addgreen'),
  cartProds: JSON.parse(sessionStorage.getItem('cartList')) || [],
  delId: [],
};
const getters = {
  newAdd: state => {
    let addgreen = state.green || 0;
    return addgreen
  }
}

const mutations = {
  MU_NewAdd(store, data) {
    if (data) { //1 显示绿色， 0 隐藏
      state.cartProds.push(data);
      sessionStorage.setItem('cartList', JSON.stringify(state.cartProds));
      sessionStorage.setItem('addgreen', 1)
      state.green = 1;
    } else {
      sessionStorage.setItem('addgreen', 0)
      state.green = 0;
    }
  },
  //可以批量删除单个仓库--备用
  MU_DeleteCart(store, data) { //删除购物车的产品
    var init = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] == true) {
        state.delId.push(state.cartProds[i - init].id); //获取要删除的id
        state.cartProds.splice(i - init, 1);
        init++;
      }
    }
    sessionStorage.setItem('cartList', JSON.stringify(state.cartProds));
  },

  //删除单个仓库--新增
  MU_DeleteSingleCart(store, data) { //删除购物车的产品
    // state.cartProds = state.cartProds.filter(item =>item.id !== data);
    for(let i=0;i<state.cartProds.length;i++) {
      if(state.cartProds[i].id == data) {
        state.cartProds.splice(i,1);
      }
    }
    sessionStorage.setItem('cartList', JSON.stringify(state.cartProds));
  },


  MU_GoPay(store, data) { //购物车获取选中的产品支付
    for (let i = 0; i < data.checked.length; i++) {
      Vue.set(state.cartProds[i], 'checked', data.checked[i])
      Vue.set(state.cartProds[i], 'quantity', data.quantity[i])
    }
    sessionStorage.setItem('cartList', JSON.stringify(state.cartProds));
  },

  MU_LoginCart(store, data) { //登陆后更新购物车内容
    state.cartProds = [];
    for (let i = 0; i < data.length; i++) {
      state.cartProds.push(data[i])
    }
    sessionStorage.setItem('cartList', JSON.stringify(state.cartProds));
  },

  MU_RemoveCart(store, check) { //移除失效的购物车,check 是 index
    let cart = state.cartProds;
    state.cartProds = [];
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < check.length; j++) {
        if (i == check[j]) {
          state.cartProds.push(cart[i])
        }

      }
    }
    sessionStorage.setItem('cartList', JSON.stringify(state.cartProds));
  },
  MU_ChangeNumber(store, data) {
    for (let i = 0; i < data.checked.length; i++) {
      Vue.set(state.cartProds[i], 'checked', data.checked[i])
      Vue.set(state.cartProds[i], 'quantity', data.quantity[i])
    }
    sessionStorage.setItem('cartList', JSON.stringify(state.cartProds));
  },
  MU_DirectChangeNumber(store, data) {
    let tesingExist = data.id;
    state.cartProds.forEach((e, i) => {
      if (e.id == tesingExist) {
        let quantity = data.quantity + e.quantity;

        Vue.set(state.cartProds[i], 'quantity', quantity)

        sessionStorage.setItem('cartList', JSON.stringify(state.cartProds));
        state.cartProds = JSON.parse(sessionStorage.getItem('cartList'))
      }
    })
  }
};

const actions = {
  AC_ProdInfo(commit) {
    return new Promise(function (s, e) {
      Productinfo().then(res => {
        s(res.content)
      });
    })
  },

  AC_NewAdd(store, data) {
    let tesingExist = data.id;
    let boolen = false;
    for (let i = 0; i < state.cartProds.length; i++) {
      if (state.cartProds[i].id == tesingExist) {
        if (data.quantity + state.cartProds[i].quantity > 20) {
          return new Promise((s, e) => {
            s('50000')
          })
        }
        store.commit('MU_DirectChangeNumber', data);
        boolen = false;
        break;
      } else {
        boolen = true;
      }
    }
    if (boolen) {
      store.commit('MU_NewAdd', data);
    }
    if (state.cartProds.length == 0) {
      store.commit('MU_NewAdd', data);
    }
    const {
      rootGetters
    } = store;
    return new Promise((s, e) => {
      if (rootGetters['user/loginState'] == 1) {
        addcar({
          id: tesingExist,
          quantity: data.quantity
        }).then(res => {
          s('20000') //20000成功
        })
      } else {
        s('20000')
      }
    });
  },

  //可以批量删除--留着备用
  AC_DeleteCart(store, data) {
    store.commit('MU_DeleteCart', data);
    const { rootGetters } = store;
    return new Promise((s, e) => {
      if (rootGetters['user/loginState'] == 1) {
        dellcar({ id: state.delId }).then(res => {
          s('200');
        })
      } else {
        s('200');
      }
    })
  },

  //删除单个--newDelect
  AC_DeleteSingleCart(store, data) {
    store.commit('MU_DeleteSingleCart', data);
    const { rootGetters } = store;
    return new Promise((s, e) => {
      if (rootGetters['user/loginState'] == 1) {
        dellcar({ id: data }).then(res => {
          s('200');
        })
      } else {
        s('200');
      }
    })
  },


  AC_GoPay(store, data) {
    store.commit('MU_GoPay', data);
  },

  AC_LoginCart(store, data) {
    store.commit('MU_LoginCart', data);
  },

  AC_RemoveCart(store, data) {
    store.commit('MU_RemoveCart', data);
  },

  AC_ChangeNumber(store, data) {
    store.commit('MU_ChangeNumber', data);
  },
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
