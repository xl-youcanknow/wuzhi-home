<template>
  <div class="insdu">
    <div class="insdu-box clearfix">
      <div class="insdu-item" v-for="(item,index) in industriesBefore" :key="index">
        <div class="icon">
          <img :src="IconBefore[index].img" alt>
        </div>
        <h2 class="title">{{ item.title }}</h2>
        <div class="content">{{item.content }}</div>
      </div>
    </div>
    <div class="insdu-box clearfix">
      <div class="insdu-item" v-for="(item,index) in industriesAfter" :key="index">
        <div class="icon">
          <img :src="IconAfter[index].img" alt>
        </div>
        <div class="title">{{ item.title}}</div>
        <div class="content">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";
import english from "../lang/English.js";
import chinese from "../lang/Chinese.js";

export default {
  name: "Insdu",
  data() {
    return {
      msg: "insdu",
      industriesBefore: [],
      industriesAfter: [],
      IconBefore: [
        { img: require("../public/img/meet.png") },
        { img: require("../public/img/store.png") },
        { img: require("../public/img/cut.png") }
      ],
      IconAfter: [
        { img: require("../public/img/hotel.png") },
        { img: require("../public/img/shop.png") },
        { img: require("../public/img/family.png") }
      ]
    };
  },
  computed: {
    type() {
      return store.state.currency.lang;
    }
  },
  watch: {
    type() {
      this.getLang();
    }
  },
  methods: {
    getLang() {
      let lang;
      if (this.type == "English") {
        lang = english;
      } else {
        lang = chinese;
      }
      this.industriesBefore = lang.indus.list.slice(0, 3);
      this.industriesAfter = lang.indus.list.slice(3, 6);
    }
  },
  mounted() {
    this.getLang();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.insdu {
  padding-bottom: 80px;
}
.insdu-box {
  text-align: center;
  padding: 0 50px;
  box-sizing: border-box;
  width: 1300px;
  margin: 0 auto;
  .insdu-item {
    float: left;
    width: calc(~"33% - 50px");
    margin: 0 25px 32px;
    .icon {
      margin-bottom: 10px;
      height: 67px;
    }
    .title {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      color: #373737;
      font-size: 18px;
      line-height: 40px;
      font-weight: bold;
    }
  }
}
@media (min-width: 1024px) and (max-width: 1400px) {
  .insdu-box {
    width: 960px!important;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .insdu-box {
     width: 100% !important;
  }
}

@media only screen and (max-width: 768px) {
  .insdu-item {
    width: 100% !important;
    margin: 20px 0 !important;
    .content {
      line-height: 20px;
      font-size: 16px;
    }
  }
  .insdu-box{
    width: 100% !important;
  }
}
</style>
