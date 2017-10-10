<template>
  <div class="bookDetails">
    <div class="bookImg">
      <img :src="bookDetails.img" alt="cover">
    </div>
    <div class="bookName" v-text="bookDetails.title"></div>
    <div class="subTitle" v-text="bookDetails.sub1"></div>
    <div class="catalog"><span class="catalogTitle">图书分类：</span><div class="catalogContent"><span v-for="(catalog, index) in bookDetails.catalog.split(' ')" v-text="catalog" :key="index"></span></div></div>
    <div class="buyLink"><span class="buyLinkTitle">购买链接：</span>
      <div class="buyLinkContent"><a :href="link.slice(link.indexOf(':') + 1)" v-for="(link, index) in bookDetails.online.split(' ')" :key="index" target="_blank">{{link.split(':')[0]}}</a></div>
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
<style scoped>
.bookImg {
  font-size: 36px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: left;
  font-size: 35px;
}
.catalogTitle {
  flex: 1;
}
.catalogContent {
  flex: 3;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.catalogContent span:not(:last-child) {
  margin: 5px 20px 5px 0;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px 20px;
  font-size: 35px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
.buyLinkTitle {
  flex: 1;
}
.buyLinkContent {
  flex: 3;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;  
}
.buyLinkContent a {
  font-size: 24px;
  color: white;
  padding: 15px 20px;
  border-radius: 30px;
  margin: 5px 20px 5px 0;
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
.buyLink a:nth-of-type(4) {
  background-color: dodgerblue;
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


