<template>
  <div id="app">
    <mt-header fixed :title="selectedPart" class="appHeader"></mt-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <mt-tabbar v-model="selected" class="nav-tabBar" fixed>
    <mt-tab-item id="home" class="nav-tabItem">
      首页
    </mt-tab-item>
    <mt-tab-item id="books" class="nav-tabItem">
      发现
    </mt-tab-item>
    <mt-tab-item id="myCenter" class="nav-tabItem">
      我的
    </mt-tab-item>
    </mt-tabbar>
  </div>
  </div>
</template>

<script>
// 引入mint-ui
import { Header as MyHeader, Tabbar, TabItem } from 'mint-ui'
// 导出数据
export default {
  name: 'app',
  data () {
    return {
      selected: 'home'
    }
  },
  methods: {

  },
  computed: {
    selectedPart () {
      return this.$store.getters.selectedPart
    }
  },
  components: {
    MyHeader,
    Tabbar,
    TabItem
  },
  watch: {
    selected () {
      this.$store.commit('select', this.selected)
      this.$router.push({path: this.selected})
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
  margin-bottom: 91px;
}
.appHeader {
  height: 80px;
  font-size: 24px;
}
.nav-tabBar {
  height: 91px;
}
.nav-tabItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-tabItem div{
  font-size: 24px;
}
</style>
