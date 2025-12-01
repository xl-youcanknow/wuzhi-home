
<template>
  <div class="view-res-detail">
    <div class="head-img">
      <img v-if="width>768" src="@/public/img/resdetail/guide_big.png" alt>
      <img v-else src="@/public/img/resdetail/guide-mobile.png" alt>
    </div>
    <div class="res-detail-type">
      <router-link :to="{path:'/download/id',query:{id:item.type_id}}" class="box" v-for="(item,index) in list" :key="index">
        <div class="box-ok-out">
          <img :src="urlPath+item.type_img" class="main-pic" alt>
        </div>
        <p v-for="(jtem,index) in item.type_name.split(',')" :key="index">{{jtem}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getChildType } from '@/api/index'
export default {
  name: "home",
  data() {
    return {
      msg: "home",
      list:null,
      urlPath:null,
      width: document.body.clientWidth
    };
  },
  created() {
    getChildType({type_id:1}).then(res=>{
      this.list = res.data.list;
      this.urlPath = res.data.file_path;
    })
  }
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
    width: 70%;
    max-width: 1200px;
    margin: 20px auto;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 144px;
    .box {
      width: 20%;
      padding: 5px;
      box-sizing: border-box;
      position: relative;
      background: #ffffff;
      &:hover .main-pic {
        -moz-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        transform: scaleX(-1);
        /*兼容IE*/
        filter: FlipH;
      }
      .box-ok-out {
        width: 100%;
        .main-pic {
          width: 100%;
           border-radius: 15px;
          background-color: #eaf7fe;
           transition: all 0.5s;
          -moz-transition: all 0.5s;
          -o-transition: all 0.5s;
          -webkit-transition: all 0.5s;
        }
      }
      .country {
        display: inline-block;
        position: absolute;
        bottom: 16px;
        left: 50%;
        margin-left: -34px;
        text-align: center;
        width: 68px;
      }
      p {
        width: 100%;
        text-align: center;
        color: #2e3580;
        font-size: 26px;
        position: relative;
        top: 20px;
        font-weight: bold;
        margin-top: 5px;
      }
    }
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
        }
      }
    }
  }
}
</style>
