<template>
<div class="videotext-out" ref="Box" id="searchBar"  >
  <div class='videotext clearfix'>
    <div class="left-video" >
    </div>
    <div class="right-text">
        <h2 class="title">Who We Are</h2>
        <div class="main">
        <p>OKportal is an integrated WiFi marketing and advertising platform. We are an innovative technology company providing fast and simple solutions to businesses across Asia and Africa. </p>
       <br>
       <br>
       <p>We pride ourselves on our comprehensive knowledge and expertise in multiple industries, ensuring that customers receive cost-friendly and effective solutions that empower their business. </p>
       <br>
       <br>
        </div>
      <el-row style="text-align: center">
        <el-button class="addcart" @click="buy">See our PRODUCTS</el-button>
      </el-row>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'videoText',
  data () {
    return {

    }
  },
  methods: {
     handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var offsetTop =this.$refs.Box.offsetTop ;
         if (scrollTop > offsetTop-200) {
            /*this.$refs.video.play();*/
        }
    },
    buy(){
      window.location='/products'
    }
  },props:['play'],
    mounted() {
//           window.addEventListener('scroll', this.handleScroll)
//     },
//     destroyed () {
//       window.removeEventListener('scroll', this.handleScroll)
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.videotext-out{
    width: 100%;
     background-color: #ececec;
     padding: 50px 0 50px;
}
    .videotext{
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
        .left-video{
            float: left;
            width:58%;
            border: 3px solid #2f3288;
            video{
                width: 100%;
            }
        }
        .right-text{
            float: left;
            width: 40%;
            margin-left: 4px;
            .title{
                font-size: 36px;
                width: 100%;
                text-align: center;
                font-weight: bold;
                margin-bottom: 20px;
                margin-top: 12px;
                color: #2d2d2d;
            }
            .main{
             
                width: 100%;
                padding: 0 45px;
                box-sizing: border-box;
                
                text-align: left;
                color: #6e6e6e;
                // font-weight: bold;
                 p{
                line-height: 28px;
                font-size: 20px;
                }
            }
          .addcart{
            text-align: center;
            padding: 7px 29px;
            background: #2F328C;
            color: white;
            border: 3px solid #2F328C;
            margin: 20px 5px 20px 0;
          }
        }
    }
@media  (max-width: 1200px) {
  .videotext-out {
    .videotext {
      .right-text {
        .main{
            font-size: 13px!important;
            padding: 0 20px;
        }
      }
    }
  }

}
@media   (max-width: 1024px) {
  .videotext-out{
    .videotext{
      width: 100%;
      .left-video{
        width: 90%;
        margin: 0 5%;
      }
      .right-text{
        width: 100%;
        margin-left: 0px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
    .videotext-out{
        .main{
            font-size: 14px!important;
        }
    }
  .videotext .addcart span{
    font-size: 18px!important;
    font-weight: bold;
  }
}
</style>
<style>
  .videotext .addcart span{
    font-size: 22px;
    font-weight: bold;
  }
  @media only screen and (max-width: 768px) {
    .videotext .addcart span{
      font-size: 15px!important;
      font-weight: bold;
    }
  }
</style>
