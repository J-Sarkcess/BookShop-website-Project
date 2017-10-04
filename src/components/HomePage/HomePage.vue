<template>
  <div class="HomePage">
    <mt-swipe :auto="4000" class="slideshow-wrap">
      <mt-swipe-item v-for="(item, index) in bannerImages" :key="index">
        <a :href="item.link"><div class="banner" :style="{background: 'url(' + item.img + ') center no-repeat'}"></div></a>
      </mt-swipe-item>
    </mt-swipe>
    
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui'

export default {
  data () {
    return {
      bannerImages: [
        {
          'link': 'https://pro.m.jd.com/mall/active/Zen6RsFGjG8kCYRXsXcAxbFKXfu/index.html',
          'img': '../../../static/1.jpg'
        },
        {
          'link': 'https://pro.m.jd.com/mall/active/3GxG1uWbootpZdHcWE2Wv7qMH2ac/index.html',
          'img': '../../../static/2.jpg'
        },
        {
          'link': 'https://sale.jd.com/act/S2udRrNCGVnptb.html?cpdad=1DLSUE',
          'img': '../../../static/3.jpg'
        }
      ]
    }
  },
  components: {
    Swipe,
    SwipeItem
  }
}
</script>
<style scoped>
.slideshow-wrap {
  height: 400px;
  background-color: orangered;
}
.banner {
  height: 100%;
  background-size: cover !important;
}
</style>


