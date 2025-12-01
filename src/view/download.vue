<template>
  <div>
    <!-- <div class="partnerstext">
      <div class="content-body">
        <h1 class="first-text">
          Resources
        </h1>
      </div>
      <sale-slide  :img="imgti"></sale-slide>
    </div> -->
    <div class="partner-top">
          <!-- <h1>RESOURCES</h1> -->
          <img src="../public/img/resources/resources_1.png" style="width:100%" alt="">
    </div>
    <div class="subtitle">
      Free free to download what you need below!
    </div>
    <div class="downloadtemplate" :style="{backgroundImage: 'url(' + (img) + ') '}" >

        <div class="itembox">
              <div class="item">
                <div class="itemborder">
                  <i class="iconfont">
                    &#xe656;
                  </i>
                  <p class="itemtext">
                    Wallpaper
                  </p>
                </div>
              </div>
          <div class="item">
            <div class="itemborder">
              <i class="iconfont">
                &#xe68c;
              </i>
              <p class="itemtext">
                User Manual
              </p>
            </div>
          </div>
          <div class="item">
            <div class="itemborder">
              <i class="iconfont">
                &#xe701;
              </i>
              <p class="itemtext">
                Android
              </p>
            </div>
          </div>
          <div class="item">
            <div class="itemborder">
              <i class="iconfont">
                &#xe684;
              </i>
              <p class="itemtext">
                Marketing Material
              </p>
            </div>
          </div>
          </div>
        <div class="clearfix">
        </div>
      <div class="clearfix"></div>
      </div>
  </div>
</template>
<script>
  import MM from '@/components/download/pageMM.vue'
  import batch from '@/components/payorder/batch.vue'
  import SaleSlide from "@/components/payorder/SaleSlide";
  export default {
    name: 'download',
    data () {
      return {
        img:require("@/public/img/download.jpg"),
        whitelogo:require("@/public/img/whitelogomax.png"),
        imgti:require("@/public/img/resources/titile.jpg"),
      }
    },
    components:{
      batch,
      MM,
      SaleSlide
    },mounted(){

    },methods:{
      open(val){
        switch (val) {
          case "mm":
            this.$refs.mm.childMethod();
            break
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.partner-top{
background: #30327F;
h1{
    margin: 0 auto;
    font-size: 60px;
    font-family: Verdana Black;
    color: #ffffff;
    text-align: center;
    padding: 170px 0;
}
}
  .partnerstext{
    position: relative;

    .content-body {
      position: absolute;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #ffffff;
      .first-text{
        margin: 0 auto;
        font-size: 60px;
        font-family: Verdana Black;
      }
    }
    .saleslide{
      margin: 0px;
    }
  }
  .subtitle{
    font-size: 40px;
    text-align: center;
    padding: 35px 0;
    font-weight: bold;
    color: #393939;
  }
  .downloadtemplate{
 /*   height: 420px;*/

    overflow: hidden;
      .text{
        width: 40%;
        float: left;
        background: rgba(5, 16, 140, 0.7);
        position: relative;
        text-align: center;
        height: 420px;
        img{
          width: 60%;
          padding: 50px 50px 30px 50px;
        }
        .content{
            font-size: 35px;
            color: white;
            font-weight: bold;
        }
      }
    .text:before{
      content: '';
      position: absolute;
      right: -82px;
      bottom: -0.5px;
      border-top: 416px solid transparent;
      border-right: 0px solid transparent;
      border-left: 82px solid rgba(5, 16, 140, 0.7);
    }
    .text:after{
      content: '';
      position: absolute;
      right: -139px;
      bottom: 15.5px;
      border-right: 59px solid transparent;
      border-bottom: 430px solid transparent;
      border-left: 55px solid white;
      transform: rotate(315deg);
      -ms-transform: rotate(315deg);
      -moz-transform: rotate(315deg);
      -webkit-transform: rotate(-15deg);
      -o-transform: rotate(315deg);
    }
    .itembox {
      height: 100%;
    /*  width: 50%;
      margin-left:10%;*/
      width: 100%;
      padding: 50px 0px;
      float: left;
        .item{
          cursor: pointer;
          text-align: center;
          float: left;
          /*width: 50%;*/
          width: 25%;
          transition: all 0.5s ease-in-out;
          .itemborder{
            width: auto;
            margin: 25px;
            .iconfont{
              transition: all 0.5s ease-in-out;
              font-size: 80px;
              color: #2f328c;
            }
            .itemtext{
              transition: all 0.5s ease-in-out;
                font-size: 30px;
                color: #2f328c;
              font-weight: bold;
            }
        }
      }
      .item:hover{
        transform: scale(1.05);
        .itemborder{
          .iconfont{
              color:#cc9977;
          }
          .itemtext{
            color:#cc9977;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1200px){
    .partnerstext {
      .content-body {
        .first-text {
          font-size: 22px;
        }
      }
    }
    .subtitle{
      font-size: 17px;
    }
    .downloadtemplate{
      height: auto;
      overflow: unset;
      .text{
        width: 100%;
        float: unset;
        height:210px;
        img{
          width: 40%;
        }
        .content{
          font-size: 25px;
        }
      }
      .text:before{
       display: none;
      }
      .text:after{
      display: none;
      }
      .itembox {
        width: 100%;
        margin-left:0%;
        padding: 50px 0px;
        float: left;
        .item{
          float: left;
          width: 50%;
          .itemborder{
            margin: 25px;
            .iconfont{
              font-size: 40px;
              color: #2f328c;
            }
            .itemtext{
              font-size: 17px;
            }
          }
        }
      }
    }
  }

</style>
