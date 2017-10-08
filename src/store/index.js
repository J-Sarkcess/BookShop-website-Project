import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bookList: '',
    bookDetails: [],
    activePage: '0',
    showDetails: {
      outterIndex: 0,
      innerIndex: 0
    }
  },
  mutations: {
    activeChange (state, active) {
      state.activePage = active
    },
    getBookList (state, data) {
      state.bookList = data.body.result
    },
    getBookDetails (state, payload) {
      state.bookDetails[payload.index] = payload.data.body.result
    },
    updateBookDetails (state, data) {
      state.bookDetails[this.getters.activePageNum]['data'].push(...data.body.result.data)
      state.bookDetails[this.getters.activePageNum]['pn'] = data.body.result.pn
    },
    showBookDetails (state, payload) {
      state.showDetails.outterIndex = payload.outterIndex
      state.showDetails.innerIndex = payload.innerIndex
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
          if (data.body.result === null) {
            Vue.http({
              url: payload.url,
              params: {
                key: 'd89ed133151c0011a104f4082fd2ad40',
                ...payload.options
              },
              method: 'get'
            })
              .then(data => {
                // 成功的回调
                payload.callBack(context, data)
              }, err => {
                // 失败的回调
                console.log(err)
              })
          } else {
            payload.callBack(context, data)
          }
        }, err => {
          // 失败的回调
          console.log(err)
          Vue.http({
            url: payload.url,
            params: {
              key: 'd89ed133151c0011a104f4082fd2ad40',
              ...payload.options
            },
            method: 'get'
          })
            .then(data => {
              // 成功的回调
              payload.callBack(context, data)
            }, err => {
              // 失败的回调
              console.log(err)
            })
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
        method: 'jsonp',
        callBack (contex, data) {
          context.commit('getBookDetails', {
            index: payload.index,
            data: data
          })
        }
      })
    },
    updateDetails (context, payload) {
      context.dispatch('getDatas', {
        url: 'http://apis.juhe.cn/goodbook/query',
        options: {
          catalog_id: payload.id,
          pn: payload.pn,
          rn: 10
        },
        method: 'jsonp',
        callBack (contex, data) {
          context.commit('updateBookDetails', data)
        }
      })
    }
  },
  getters: {
    selectedPart (state) {
      switch (state.route.fullPath) {
        case '/home':
          return '首页'
          // break
        case '/books':
          return '发现'
          // break
        case '/myCenter':
          return '个人中心'
          // break
        case '/details':
          return '图书详情'
          // break
      }
    },
    activePageNum (state) {
      return +state.activePage
    }
  }
})
