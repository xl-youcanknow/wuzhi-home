<template>
  <div class="resources">
    <img src="../public/img/resources/resources_1.png" style="width:100%" alt class="pc">
    <h6>FREE FREE TO DOWNLOAD</h6>
    <p class="s-tit">what you need below! </p>
    <ul class="wrap">
      <li v-for="(item,index) in list" :key="index">
        <router-link :to="{path:'/resources/' + goRoute(index)}">
          <img :src="srcURL + item.type_img" alt>
          <div>
            {{item.type_name}}
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {getParentType} from '@/api/index'
export default {
  data() {
    return {
      list:null,
      srcURL:null
    }
  },
  created() {
    getParentType().then(res=>{
      this.list = res.data.list;
      this.srcURL = res.data.file_path
    })
  },
  methods:{
  },
  computed:{
    goRoute(val) {
      return (val) =>{
        switch (val) {
          case 0:
            return 'wallpaper'
            break
          case 1:
            return 'userGuide'
            break
          case 2:
            return 'case'
            break
          case 3:
            return 'material'
            break
          default:
            return undefined
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "../public/css/currency.less";
.mo {
  display: none;
}
@media only screen and (max-width: 768px) {
  .pc {
    display: none;
  }
  .mo {
    display: block;
  }
}
.resources {
  h6 {
    color: #2e347f;
    text-align: center;
    font-size: 40px;
    padding: 30px 0;
    padding-top: 80px;
    font-weight: 600;
  }
  .s-tit {
    color: #498ecc;
    text-align: center;
    padding-bottom: 80px;
    font-size: 30px;
  }
  .wrap {
    width: 1200px;
    margin: 0 auto;
    li {
      position: relative;
      text-align: center;
      margin-bottom: 50px;
      img {
        max-width: 100%;
      }
      div {
        position: absolute;
        width: 13%;
        text-align: left;
        .transform(translate(-50%, -50%));
        top: 50%;
        right: 30%;
        color: #2e347f;
        font-size: 35px;
        font-weight: 600;
      }
    }
  }
}
@media only screen and (max-width: 1366px) {
  .resources {
    .wrap {
      width: 83%;
    }
  }
}
@media only screen and (max-width: 768px) {
  .resources {
    h6 {
      font-size: 30px;
      padding: 15px 0;
      padding-top: 30px;
    }
    .s-tit {
      font-size: 25px;
      padding-bottom: 30px;
    }
    .wrap {
      width: 83%;
      li {
        div {
          font-size: 25px;
        }
      }
    }
  }
}
</style>
