import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const $store = new Vuex.Store({
    state: {
        theme: {
            color: '#FBDCDA',
            bgColor: '#FBDCDA',
        }
    },
    mutations: {
    },
    actions: {
    }
})

export default $store
