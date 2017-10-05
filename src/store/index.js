import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'home',
    bookList: '',
    bookDetails: []
  },
  mutations: {
    select (state, part) {
      state.selected = part
    },
    getBookList (state, data) {
      state.bookList = data.body.result
    },
    getBookDetails (state, data) {
      state.bookDetails.push(data.body.result)
    }
  },
  actions: {
    getDatas (context, payload) {
      Vue.http({
        url: payload.url,
        params: {
          key: 'd89ed133151c0011a104f4082fd2ad40',
          ...payload.options
        },
        method: payload.method
      })
        .then(data => {
          // 成功的回调
          console.log(data)
          payload.callBack(context, data)
        }, err => {
          // 失败的回调
          console.log(err)
        })
    },
    getDetails (context, payload) {
      context.dispatch('getDatas', {
        url: 'http://apis.juhe.cn/goodbook/query',
        options: {
          catalog_id: payload.id,
          pn: 0,
          rn: 10
        },
        method: 'get',
        callBack (contex, data) {
          context.commit('getBookDetails', data)
        }
      })
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
