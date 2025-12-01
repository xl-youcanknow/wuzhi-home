
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
    const state = {
        lang:localStorage.getItem('lang'),
        barShow:false,
        menuShow:true,
        screenWidth:document.body.clientWidth,
    };
    const  mutations = {
        showbar(state){
            state.barShow = !state.barShow;          
        },
        menushow(state){
            state.menuShow = !state.menuShow;          
        },
        menuTrue(state){
            state.menuShow = true;        
        },
        menuFalse(state){
            state.menuShow = false;        
        },
        barFalse(state){
            state.barShow = false;
        },
        barTrue(state){
            state.barShow = true;
        },
        MU_screenRes(state){
            state.screenWidth = document.body.clientWidth;
            if(state.screenWidth<768){
                state.menuShow = false;    
            }
        }
    };
    const actions = {
        screenRes(store){
            store.commit('MU_screenRes');
        },
        bindShowBar(store){
            store.commit('showbar');
        },
        TrueShowBar(store){
            store.commit('barTrue')
        },
        FalseShowBar(store){
            store.commit('barFalse')
        },
        bindMenuShow(store){
            store.commit('menushow');
        },
        TrueMenuShow(store){
            store.commit('menuTrue')
        },
        FalseMenuShow(store){
            store.commit('menuFalse')
        },
    }


    export default {
        namespaced: true,
        state,
        actions,
        mutations
      }
