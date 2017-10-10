<template>
  <div id="app">
    <mt-header fixed :title="selectedPart" class="appHeader">
      <mt-button icon="back" slot="left" @click="goBack" v-if="selectedPart === '图书详情'">返回</mt-button>
    </mt-header>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <mt-tabbar v-model="selected" class="nav-tabBar" fixed v-if="selectedPart !== '图书详情' && selectedPart !== '关于'">
    <mt-tab-item id="/home" class="nav-tabItem">
      首页
    </mt-tab-item>
    <mt-tab-item id="/books" class="nav-tabItem">
      发现
    </mt-tab-item>
    <mt-tab-item id="/myCenter" class="nav-tabItem">
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
  created () {
    this.selected = this.$store.state.route.fullPath
  },
  data () {
    return {
      selected: '/home'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {
    selectedPart () {
      return this.$store.getters.selectedPart
    },
    routePath () {
      return this.$store.state.route.fullPath
    }
  },
  components: {
    MyHeader,
    Tabbar,
    TabItem
  },
  watch: {
    selected () {
      this.$router.push({path: this.selected})
    },
    routePath () {
      this.selected = this.$store.state.route.fullPath
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
  margin-bottom: 100px;
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

.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

</style>
