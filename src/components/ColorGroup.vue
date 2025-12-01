<template>
  <div class="colorGrop clearfix">
    <div class="box" v-for="(item,index) in colorGroupArr" :key="index">
        <div class="top-img">
            <img :src="picArr[index].img" alt="">
        </div>
        <div class="title">
            {{item.title}}
            </div>
        <div class="content">
            {{item.content}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'colorGroup',
  data () {
    return {
      msg: 'colorGroup',
      picArr:[
           {img: require("../public/img/money.png"),type:"img"},
           {img: require("../public/img/good.png"),type:"img"},
           {img: require("../public/img/sale.png"),type:"img"},
           {img: require("../public/img/gg.png"),type:"img"},
        ]
    }
  },
  props:['colorGroupArr'],
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .colorGrop{
        width: 1334px;
        margin: 5px auto 32px;
        .box{
            width: calc(~"25% - 4px");
            margin: 0 2px;
            float: left;
            height: 270px;
            &:hover .top-img{
                transform:scale(1.2);
                -webkit-transform:scale(1.2);
                -moz-transform:scale(1.2);
                -o-transform:scale(1.2);
                -ms-transform:scale(1.2);
            }
            .top-img{
                width: 100%;
                height: 90px;
                line-height: 90px;
                margin-top: 30px;
                text-align: center;
                transition:All 0.4s ease-in-out;
                -webkit-transition:All 0.4s ease-in-out;
                -moz-transition:All 0.4s ease-in-out;
                -o-transition:All 0.4s ease-in-out;
                img{
                    width: 68px;
                    
                }
            }
            .title{
                color: #fff;
                font-size: 30px;
                font-weight: bolder;
                width: 100%;
                text-align: center;
                margin-bottom: 20px;
            }
            .content{
                color: #fff;
                font-size: 18px;
                width: 90%;
                margin: 0 auto;
                text-align: center;
                line-height: 24px;
                span{
                    width: 100%;
                    display: inline-block;
                    text-align: center;
                    color: #fff;
                    font-size: 18px;
                    line-height: 24px;
                }
            }
        }
        .box:nth-child(1){
            background-color: #575cf0;
        }
        .box:nth-child(2){
            background-color: #7a7cd4;
        }
        .box:nth-child(3){
            background-color: #30318d;
        }
        .box:nth-child(4){
            background-color: #94c9ec;
        }
    }
@media (min-width:1024px) and (max-width:1400px) { 
    .colorGrop{
        width: 96%;
        margin: 20px 2%;
    }
}

@media (min-width:768px) and (max-width:1024px) {   
    .colorGrop{
        width: 96%;
        margin: 20px 2%;
         .box{
            width: calc(~"50% - 4px");
            margin: 10px 2px;
         }
    }
}

@media only screen and (max-width: 768px){ 
     .colorGrop{
        width: 96%;
        margin: 20px 2%;
         .box{
            width:96%;
            margin: 10px 2%;
         }
    }
}
</style>
