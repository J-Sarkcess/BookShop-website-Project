<template>
  <div>
    <div v-if="!dataLoaded">
      <p class="loadingPage">
        <span class="loadingText">加载中</span>
        <mt-spinner type="double-bounce" color="rgb(38, 162, 255)" :size="20"></mt-spinner>
      </p>
    </div>
    <div class="HomePage" v-if="dataLoaded">
      <mt-swipe :auto="4000" class="slideshow-wrap">
        <mt-swipe-item v-for="(item, index) in bannerImages" :key="index">
          <a :href="item.link"><div class="banner" :style="{background: 'url(' + item.img + ') center no-repeat'}"></div></a>
        </mt-swipe-item>
      </mt-swipe>
      <div class="recommended">
        <div class="recommendedTitle">强烈推荐</div>
        <div class="recommendedContent">
          <div class="recLeft" @click="forDetails(randomNum, 1)"><img :src="randomList['data'][1]['img']" alt="cover"></div>
          <div class="recRight">
            <div @click="forDetails(randomNum, 4)"><img :src="randomList['data'][4]['img']" alt="cover"></div>
            <div @click="forDetails(randomNum, 3)"><img :src="randomList['data'][3]['img']" alt="cover"></div>
            <div @click="forDetails(randomNum, 5)"><img :src="randomList['data'][5]['img']" alt="cover"></div>
            <div @click="forDetails(randomNum, 6)"><img :src="randomList['data'][6]['img']" alt="cover"></div>
          </div>
        </div>
      </div>
      <div class="recommended">
        <div class="recommendedTitle">热销图书</div>
        <div class="recommendedContent">
          <div class="recLeft" @click="forDetails(randomNum, 9)"><img :src="randomList['data'][9]['img']" alt="cover"></div>
          <div class="recRight">
            <div @click="forDetails(randomNum, 2)"><img :src="randomList['data'][2]['img']" alt="cover"></div>
            <div @click="forDetails(randomNum, 7)"><img :src="randomList['data'][7]['img']" alt="cover"></div>
            <div @click="forDetails(randomNum, 8)"><img :src="randomList['data'][8]['img']" alt="cover"></div>
            <div @click="forDetails(randomNum, 0)"><img :src="randomList['data'][0]['img']" alt="cover"></div>
          </div>
        </div>
      </div>
      <div class="recommended">
        <div class="recommendedTitle">经典好书</div>
        <div class="recommendedContent">
          <div class="recLeft" @click="forDetails(specificNum, 1)"><img :src="specificBookDetails['data'][1]['img']" alt="cover"></div>
          <div class="recRight">
            <div @click="forDetails(specificNum, 8)"><img :src="randomList['data'][8]['img']" alt="cover"></div>
            <div @click="forDetails(specificNum, 3)"><img :src="randomList['data'][3]['img']" alt="cover"></div>
            <div @click="forDetails(specificNum, 5)"><img :src="randomList['data'][5]['img']" alt="cover"></div>
            <div @click="forDetails(specificNum, 6)"><img :src="randomList['data'][6]['img']" alt="cover"></div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p>----到底了哦----</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Spinner } from 'mint-ui'
import Vue from 'vue'

Vue.component(Spinner.name, Spinner)

export default {
  created () {
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
  activated () {
    window.scrollTo(0, 0)
  },
  data () {
    return {
      bannerImages: [
        {
          'link': 'https://pro.m.jd.com/mall/active/Zen6RsFGjG8kCYRXsXcAxbFKXfu/index.html',
          'img': 'static/1.jpg'
        },
        {
          'link': 'https://pro.m.jd.com/mall/active/3GxG1uWbootpZdHcWE2Wv7qMH2ac/index.html',
          'img': 'static/2.jpg'
        },
        {
          'link': 'https://sale.jd.com/act/S2udRrNCGVnptb.html?cpdad=1DLSUE',
          'img': 'static/3.jpg'
        }
      ],
      dataLoaded: false,
      randomNum: 0,
      specificNum: 15
    }
  },
  methods: {
    forDetails (outterIndex, innerIndex) {
      this.$store.commit('showBookDetails', { outterIndex, innerIndex })
      this.$router.push({ path: '/details' })
    }
  },
  components: {
    Swipe,
    SwipeItem
  },
  computed: {
    specificBookDetails () {
      return this.$store.state.bookDetails[this.specificNum]
    },
    randomList () {
      this.randomNum = Math.floor(Math.random() * 13)
      return this.$store.state.bookDetails[this.randomNum]
    }
  }
}
</script>
<style scoped>
.slideshow-wrap {
  height: 400px;
  /* background-color: orangered; */
  margin-bottom: 20px;
}
.banner {
  height: 100%;
  background-size: cover !important;
}
.recommended {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.recommendedTitle {
  font-size: 30px;
  background-color: #eee;
  width: 100%;
  padding: 15px 0;
}
.recommendedContent {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.recLeft {
  padding: 20px;
  flex: 1;
  box-sizing: border-box;
}
.recLeft img {
  width: 100%;
}
.recRight {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.recRight div {
  width: 50%;
  box-sizing: border-box;
  padding: 10px;
}
.recRight img {
  width: 100%;
}
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  background-color: #eee;
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


