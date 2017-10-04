import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'home'
  },
  mutations: {
    select (state, part) {
      state.selected = part
    }
  },
  getters: {
    selectedPart (state) {
      switch (state.selected) {
        case 'home':
          return '首页'
          // break
        case 'books':
          return '发现'
          // break
        case 'myCenter':
          return '个人中心'
          // break
      }
    }
  }
})
