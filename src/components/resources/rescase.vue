<template>
  <div class="view-res-detail" >
    <div class="head-img">
      <img v-if="width>768" src="@/public/img/resdetail/case_big.png" alt>
      <img v-else src="@/public/img/resdetail/case-mobile.png" alt>
    </div>
    <div class="res-detail-type" v-loading="list_loading" >
      <div class="box" v-for="(item,index) in list" :key="index" @click="checkDetail(item)">
        <div class="box-ok-out">
          <img :src="urlPath+item.file_img" class="main-pic" alt>
          <img :src="item.country_img" alt class="country">
        </div>
        <p>{{item.file_name}}</p>
      </div>
    </div>
    <div class="mask" v-if="eject_display">
      <div class="detail-eject "> 
          <i class="el-icon-error close" @click="eject_display = false"></i>
          <div class="left">
            <div style="position:relative">
              <img :src="urlPath+detail.file_img" class="main-pic" alt>
              <img :src="detail.country_img" alt class="country">
            </div>
          </div>
          <div class="right" >
            <p>{{detail.file_name}}</p>
            <p v-html="detail.file_des"></p>
            <p>{{detail.country}}</p>
            <a :href="detail.url" target="_bank" class="more">Read More>></a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getAllList } from '@/api/index';
export default {
  name: "home",
  data() {
    return {
      width: document.body.clientWidth,
      msg: "home",
      list_loading:false,
      eject_loading:false,
      eject_display:false,
      maskbool:false,
      list:null,
      urlPath:null,
      detail:null
    };
  },
  created() {
    getAllList({type_id:2,page_no:1,page_size:10}).then(res=>{
      this.list = res.data.list;
      this.urlPath = res.data.file_path;
    })
  },
  methods: {
   checkDetail(item){
     this.eject_display = true;
     this.maskbool = true;
     this.detail = item;
   }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.view-res-detail {
  width: 100%;
  .head-img {
    width: 100%;
    background-color: #2e3580;
    text-align: center;
    margin-bottom: 116px;
  }
  .res-detail-type {
    display: flex;
    width: 85%;
    max-width: 1200px;
    margin: 20px auto;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 154px;
    .box {
      width: 20%;
      padding: 5px;
      box-sizing: border-box;
      border-radius: 15px;
      position: relative;
      cursor: pointer;
      background: #ffffff;
      z-index: 9;
      .box-ok-out {
        width: 100%;
        position: relative;
        .main-pic {
          width: 100%;
          background-color: #eaf7fe;
        }
      }
      .country {
        display: inline-block;
        position: absolute;
        bottom: -16px;
        left: 50%;
        margin-left: -34px;
        text-align: center;
        width: 68px;
      }
      p {
        width: 100%;
        text-align: center;
        color: #2e3580;
        font-size: 28px;
        position: relative;
        font-weight: bold;
        margin-top: 25px;
      }
    }
  }
  .detail-eject{
    width: 480px;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    padding: 20px 0; 
    position: relative;
    // display: flex;
    // display: -webkit-flex;
    // align-content: center;
    .close{
      position: absolute;
      right: 0px;
      top: 0px;
      font-size: 18px;
      color: #f40;
      cursor: pointer;
    }
    .left{
      width: 168px;
      padding: 20px 30px;
      height: auto;
      .main-pic{
        width: 100%;
      }
      .country{
        position: absolute;
        text-align: center;
        width: 68px;
        left: 50%;
        margin-left: -34px;
        bottom: -5px;
      }
      border-right: 1px solid #2e3580;
    }
    .right{
      width: 216px;
      padding-left: 20px;
      p{
        width: 100%;
        padding: 5px;
        margin-bottom: 10px;
        color: #2e3580;
        font-size: 24px;
        font-weight: bold;
      }
      .more{
        position: absolute;
        bottom:10px;
        font-size: 14px;
        width: 100%;
        text-align: right;
        color: #2e6694;
        display: block;
        right: 10px;
      }
    }
  }
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: cneter;
    align-items: center;
    left: 0;
    top: 0;
    z-index: 2002;
    background-color: rgba(0, 0, 0, .3)
  }
}
@media screen and (max-width: 1190px) {
  .view-res-detail {
    .res-detail-type {
      width: 100%;
      padding: 0 50px;
      box-sizing: border-box;
    }
  }
}
@media screen and (max-width: 768px) {
  .view-res-detail {
    .head-img{
      margin-bottom: 50px;
    }
    .res-detail-type {
      .box {
        width: 46%;
        margin: 2%;
        margin-bottom: 20px;
        p {
          font-size: 16px;
          top: 12px;
        }
      }
    }
  }
  .detail-eject{
    width: 360px!important;
    .left{
      width: 114px!important;
    }
    .right{
       width: 150px!important;
      p{
        padding: 5px!important;
        font-size: 16px!important;
      }
    }
  }
}
</style>
