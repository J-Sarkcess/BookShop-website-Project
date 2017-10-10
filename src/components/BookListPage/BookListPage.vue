<template>
  <div>
    <div v-if="!dataLoaded">
      <p class="loadingPage">
        <span class="loadingText">加载中</span>
        <mt-spinner type="double-bounce" color="rgb(38, 162, 255)" :size="20"></mt-spinner>
      </p>
    </div>
    <div v-if="dataLoaded">
      <div class="bookListPage" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="nav-wrap">
          <ul>
            <li :key="index" v-for="(item, index) in bookList" v-text="item.catalog" @click="select(index)" :data-id="item.id" :class="{selected: (active === 
        index.toString())}"></li>
            <li></li>
          </ul>
        </div>
        <div class="navMenu">
          <a @click="toggleMenu">
            <span v-text="isShowMenu ? '折叠': '展开'"></span>
          </a>
        </div>
        <transition name="menu" mode="out-in">
          <div class="bookMenu" v-if="isShowMenu" @click="toggleMenu">
            <div class="menuList">
              <p>为你精选以下标签</p>
              <div class="menuBox">
                <a v-for="(item, index) in bookList" :key="index" v-text="item.catalog" :class="{selectedMenu: active === index.toString()}" @click="select(index)"></a>
              </div>
            </div>
          </div>
        </transition>

        <mt-tab-container v-model="active" class="bookslist-wrap">
          <mt-tab-container-item :id="indexContainer.toString()" v-for="(item, indexContainer) in bookList" :key="indexContainer">
            <a v-for="(item, indexItem) in bookDetails[indexContainer]['data']" 
            :key="indexItem" 
            class="content-main" @click="forDetails(indexContainer, indexItem)">
              <div class="content-left">
                <img :src="item.img" alt="cover">
              </div>
              <div class="content-right">
                <h3 v-text="item.title"></h3>
                <div class="content-rightBottom">
                  <span v-text="item.reading" class="reading"></span>
                  <span class="goToBuy">点击查看</span>
                </div>
              </div>
            </a>
            <p class="loadingPage" v-show="loading">
              <span class="loadingText">加载中</span>
              <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)" :size="15"></mt-spinner>
            </p>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
  
  
</template>
<script>
import Vue from 'vue'
import { TabContainer, TabContainerItem, InfiniteScroll, Spinner } from 'mint-ui'

Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)

export default {
  created () {
    // this.getDatas('http://apis.juhe.cn/goodbook/catalog', {}, 'get', (data) => {
    //   this.bookList = data.body.result
    // })
    if (!this.$store.state.bookList) {
      this.$store.dispatch('getDatas', {
        url: 'http://apis.juhe.cn/goodbook/catalog',
        options: {},
        method: 'jsonp',
        callBack (context, data) {
          context.commit('getBookList', data)
        }
      })
      for (let i = 0; i < 17; i++) {
        let id = 242 + i
        this.$store.dispatch('getDetails', {
          id: id,
          method: 'jsonp',
          index: i
        })
      }
    }
  },
  beforeMount () {
    setTimeout(() => {
      this.dataLoaded = true
    }, 3000)
  },
  data () {
    return {
      active: '0',
      isShowMenu: false,
      navTimer: () => {},
      pageScrollTop: 0,
      navScrollLeft: 0,
      loading: false,
      loadingTimer: () => {},
      dataLoaded: false
    }
  },
  deactivated () {
    this.pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop
    this.navScrollLeft = document.querySelector('.nav-wrap').scrollLeft
    this.loading = true
  },
  activated () {
    if (this.dataLoaded) {
      window.scrollTo(0, this.pageScrollTop)
      document.querySelector('.nav-wrap').scrollLeft = this.navScrollLeft
      this.loading = false
    }
  },
  methods: {
    activeChange (active) {
      this.$store.commit('activeChange', active)
    },
    toTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    select (index) {
      // let leftValue = (id - 2) * 150
      // document.querySelector('.nav-wrap ul').offsetLeft = 400
      // console.log(document.querySelector('.nav-wrap ul').offsetLeft)
      // let leftValue = (id - 2) * 150
      this.active = index.toString()
    },
    scrollAnimate (index) {
      // 处理传入的index
      index = +index
      const oWrap = document.querySelector('.nav-wrap')
      const lis = document.querySelectorAll('.nav-wrap ul li')
      const initialLeft = oWrap.scrollLeft
      const oLiWidth = lis[0].offsetWidth
      const oLiLength = lis.length
      const newLeft = (index - 2) < 0 ? 0 : oLiWidth * (index + 2 >= oLiLength ? oLiLength - 5 : index - 2)
      const stepValue = initialLeft > newLeft ? -5 : 5
      // 让页面回到顶部
      this.toTop()
      // 让导航条滚动
      clearInterval(this.navTimer)
      this.navTimer = setInterval(() => {
        console.log(1)
        console.log('left' + oWrap.scrollLeft)
        console.log('new' + newLeft)
        if (Math.abs(oWrap.scrollLeft - newLeft) <= Math.abs(stepValue)) {
          oWrap.scrollLeft = newLeft
          clearInterval(this.navTimer)
        } else {
          oWrap.scrollLeft += stepValue
        }
      }, 5)
    },
    toggleMenu () {
      this.isShowMenu = !this.isShowMenu
    },
    loadMore () {
      this.loading = true
      const id = this.activePage
      let pn = +this.$store.state.bookDetails[this.active]['pn']
      // console.log(pn)
      setTimeout(() => {
        // console.log(1)
        this.$store.dispatch('updateDetails', {
          id: id,
          method: 'jsonp',
          pn: pn + 10
        })
        setTimeout(() => {
          this.loading = false
        }, 2500)
      }, 100)
    },
    forDetails (outterIndex, innerIndex) {
      this.$store.commit('showBookDetails', {outterIndex, innerIndex})
      this.$router.push({path: '/details'})
    }
  },
  computed: {
    bookList () {
      return this.$store.state.bookList
    },
    bookDetails () {
      return this.$store.state.bookDetails
    },
    activePage () {
      return this.$store.getters.activePageNum + 242
    }
  },
  components: {
    TabContainer,
    TabContainerItem
  },
  watch: {
    active () {
      this.scrollAnimate(this.active)
      this.activeChange(this.active)
    }
  }
}
</script>
<style scoped>
.bookListPage {
  margin-top: 140px;
}
.selected {
  border-bottom: 1px solid red !important;
  box-sizing: border-box;
}
.selectedMenu {
  background-color: black !important;
  color: white !important;
  border-color: black !important;
}
.nav-wrap {
  width: 100%;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 80px;
  z-index: 999;
  height: 61px;
  background-color: white;
  border-bottom: 1px solid #ccc;
}
.nav-wrap ul {
  height: 60px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-wrap ul li {
  font-size: 24px;
  font-weight: bold;
  width: 150px;
  display: inline-block;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid transparent;
  box-sizing: border-box;
  color: black;
}
.nav-wrap::-webkit-scrollbar {
  width:0;
  height:0;
}
.navMenu {
  position: fixed;
  top: 80px;
  right: 0;
  z-index: 1100;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
}

.menu-enter {
  opacity: 0;
}

.menu-enter-to {
  opacity: 1;
}

.menu-leave {
  opacity: 1;
}

.menu-leave-to {
  opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.1s ease;
}

.bookMenu {
  background-color: rgba(100,100,100,0.5);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 1000;
}
.menuList {
  background: white;
}
.menuList p {
  font-size: 24px;
  color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
  padding-left: 50px;
}
.menuBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0;
}
.menuList a {
  display: inline-block;
  color: #aaa;
  background-color: white;
  border-radius: 30px;
  border: 1px solid #aaa;
  font-size: 24px;
  padding: 15px 10px;
  box-sizing: border-box;
  margin: 0 11px 30px;
  width: 22%;
}
.navMenu a {
  font-size: 24px;
  color: #444;
}
.navMenu a span {
  border-left: 2px solid #ccc;
  padding: 0 25px 0 25px;
}
.content-main {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ccc;
}
.content-left {
  font-size: 36px;
  width: 200px;
  padding: 40px 50px 30px 50px;
}
.content-left img {
  width: 200px;
}
.content-right {
  padding: 40px 50px 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
}
.content-right h3 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
  text-align: left;
  color: #111;
}
.content-rightBottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
}
.reading {
  padding: 10px;
  background-color: red;
  color: white;
  margin-bottom: 20px;
}
.goToBuy {
  background-color: orange;
  color: white;
  font-weight: bold;
  padding: 10px;
}
.loadingPage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
}
.loadingText {
  margin-right: 20px;
}
</style>

