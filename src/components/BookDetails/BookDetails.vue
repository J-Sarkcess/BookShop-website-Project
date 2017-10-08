<template>
  <div class="bookDetails">
    <div class="bookImg">
      <img :src="bookDetails.img" alt="cover">
    </div>
    <div class="bookName" v-text="bookDetails.title"></div>
    <div class="subTitle" v-text="bookDetails.sub1"></div>
    <div class="catalog">图书分类：<span v-for="(catalog, index) in bookDetails.catalog.split(' ')" v-text="catalog" :key="index"></span></div>
    <div class="buyLink"><span>购买链接：</span>
      <a :href="link.slice(link.indexOf(':') + 1)" v-for="(link, index) in bookDetails.online.split(' ')" :key="index" target="_blank">{{link.split(':')[0]}}</a>
    </div>
    <div class="introduction"><p>图书简介：</p>{{bookDetails.sub2}}</div>
    <div class="bottom">
        <p>----到底了哦----</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bookDetails: this.$store.state.bookDetails[this.$store.state.showDetails.outterIndex]['data'][this.$store.state.showDetails.innerIndex]
    }
  },
  activated () {
    window.scrollTo(0, 0)
    this.bookDetails = this.$store.state.bookDetails[this.$store.state.showDetails.outterIndex]['data'][this.$store.state.showDetails.innerIndex]
  }
}
</script>
<style>
.bookImg {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.bookName {
  padding: 20px;
  text-align: left;
  font-size: 50px;
}
.subTitle {
  padding: 0 20px 20px;
  text-align: left;
  font-size: 35px;
  border-bottom: 20px solid #ccc;
}
.catalog {
  padding: 20px;
  text-align: left;
  font-size: 35px;
}
.catalog span:not(:last-child) {
  margin-right: 20px;
  font-size: 24px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-sizing: border-box;
}
.introduction {
  padding: 40px;
  text-align: left;
  font-size: 30px;
  line-height: 40px;
}
.introduction p {
  margin-left: -20px;
  font-size: 35px;
  margin-bottom: 20px;
}
.buyLink {
  padding: 20px 0 35px 20px;
  font-size: 35px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
.buyLink a {
  font-size: 24px;
  color: white;
  padding: 15px 20px;
  border-radius: 30px;
  margin-right: 20px;
}
.buyLink a:first-of-type {
  background-color: red;
}
.buyLink a:nth-of-type(2) {
  background-color: orange;
}
.buyLink a:nth-of-type(3) {
  background-color: skyblue;
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
</style>


