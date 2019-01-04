<template>
  <div class="bookDetails">
    <div class="bookImg">
      <img :src="bookDetails.pict_url" alt="cover">
    </div>
    <div style="font-size: 12px;text-align: left;">
      <div v-text="`商品原价：${bookDetails.reserve_price}`"></div>
      <div v-text="`商品折扣价：${bookDetails.zk_final_price}`"></div>
    </div>
    <div class="bookName" v-text="bookDetails.title"></div>
    <!-- <div class="subTitle" v-text="bookDetails.sub1"></div> -->
    <!-- <div class="catalog"><span class="catalogTitle">图书分类：</span><div class="catalogContent"><span v-for="(catalog, index) in bookDetails.catalog.split(' ')" v-text="catalog" :key="index"></span></div></div> -->
    <div v-text="`月销量：${bookDetails.volume}`" style="text-align: right;font-size: 12px;"></div>
    <div class="buyLink"><span class="buyLinkTitle">购买链接：</span>
      <div class="buyLinkContent"><a :href="bookDetails.item_url" target="_blank">点击购买</a></div>
    </div>
    <div class="shop_detail" v-text="`店铺名称：${bookDetails.nick}`" @click="toStore(bookDetails.seller_id)"></div>
    <div class="introduction" v-if="bookDetails.small_images"><p>商品详情</p><img :src="item" alt="" v-for="(item, index) in bookDetails.small_images.string" :key="index + item"></div>
    <div class="bottom">
        <p>----到底了哦----</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bookDetails: ''
    }
  },
  activated () {
    window.scrollTo(0, 0)
    this.getItemDetail();
  },
  created() {
    this.getItemDetail();
  },
  computed: {
    num_iid() {
      return this.$route.query.id
    }
  },
  methods: {
    getItemDetail() {
      this.$fetchTOP({
        method: 'taobao.tbk.item.info.get',
        platform: 2,
        num_iids: this.num_iid,
      }).then( res => {
        this.bookDetails = res.data.tbk_item_info_get_response.results.n_tbk_item[0]
      })
    },
    toStore(id) {
      window.location.href = `http://store.taobao.com/shop/view_shop.htm?user_number_id=${id}`
    }
  }
}
</script>
<style scoped>
.bookImg {
  font-size: 36px;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.bookImg img {
  width: 100%;
}
.bookName {
  padding: 20px;
  text-align: left;
  font-size: 30px;
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
.introduction img {
  width: 100%;
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


