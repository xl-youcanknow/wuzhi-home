<template>
  <div class="popular">
      <div class="title">
          <span class="text">Popular This Week</span>
      </div>
      <div class="main">
          <ul class="clearfix">
              <li v-for="(item,index) in 6 " :key="index">
                  <div class="main-img">
                      <img src="http://iph.href.lu/278x182?text=okportal&bg=3541d2" alt="">
                  </div>
                  <div class="main-title">
                      Stay Calm and Start Blogging
                  </div>
                  <div class="main-action">
                      <span class="travel">TRAVEL</span>
                      <span class="date">AUGUST 24,2016</span>
                      <span class="share" title="SHARE">
                          <i class="iconfont">&#xe62a;</i>
                          SHARE
                      </span>
                      <span class="like">
                           <i class="iconfont">&#xeca1;</i>20
                      </span>
                  </div>
                  <div class="main-text">
                      We have collected and analyzed data on 80 million unque indiviauals;across 480 million visits and 34,00 venues.We provide insights on this data for our customers to identify patterns...
                  </div>
                  <div class="main-read">
                      <span>READ MORE</span>
                  </div>
              </li>
          </ul>
      <prevnext></prevnext>
      </div>
  </div>
</template>

<script>
import Prevnext from '@/components/blog/Prevnext'
export default {
  name: 'Popular',
  data () {
    return {
    }
  },
  components:{
      Prevnext
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../public/css/currency.less';
    .popular{
        width: 100%;
        .title{
            width: 100%;
            border-bottom: 2px solid #2f328c;
            margin-bottom: 15px;
            .text{
                height: 36px;
                background-color: #2f328c;
                color: #fff;
                font-size: 32px;
                padding: 0 20px;
            }
        }
        .main{
            width: 870px;
            margin: 0 auto;
            box-sizing: border-box;
            overflow: hidden;
            ul{
                width: 1000px;   
                height: 1100px;
                li{
                    float: left;
                    width: 275px;
                    border: 2px solid #2f328c;
                    position: relative;
                    background-color: #fff;
                    padding-bottom: 32px;
                    box-sizing: border-box;
                    margin-right: 18px;
                    .transition();
                    &:hover{
                       .hovertransform();
                    }
                    .main-img{
                        width: 100%;
                        height: 182px;
                        img{
                            width: 100%;
                        }
                    }
                    .main-title{
                        width: 100%;
                        text-align: center;
                        font-size: 24px;
                        color: #333;
                        margin-top: 20px;
                    }
                    .main-text{
                        color: #7d7d7d;
                        font-size: 13px;
                        width: 96%;
                        margin: 0 auto 20px;
                        line-height: 20px;
                    }
                    .main-action{
                        width: 100%;
                        height: 42px;
                        line-height: 42px;
                        margin-bottom: 20px;
                        padding: 0 10px;
                        cursor: pointer;
                        span{
                            display: inline-block;
                            
                        }
                        .travel{
                            padding: 1px 4px;
                            border: 2px solid #2f328c;
                            border-radius: 15px;
                            line-height: 15px;
                            font-weight: bold;
                            margin-right: 10px;
                        }
                        .share{
                            margin-right: 5px;
                            margin-left: 5px;
                            i{
                                color: #2e318b;
                                display: inline-block;
                                margin-right: 0px;
                                // font-weight: 200;
                            }
                            &:hover{
                                color: #333!important;
                            }
                        }
                        .like{
                            i{
                                color: #2e318b;
                                display: inline-block;
                                margin-right: 0px;
                                
                            }
                            &:hover{
                                color: #333!important;
                            }
                        }
                    }
                    .main-read{
                        width: 100%;
                        text-align: center;
                        span{
                            color: #2f328c;
                            border: 2px solid #2f328c;
                            background-color: #fff;
                            padding: 5px 8px;
                            display: inline-block;
                            font-size: 14px;
                            font-weight: bold;
                            cursor: pointer;
                             .transition();
                            &:hover{
                                background: #2f328c;
                                color: #fff;
                            }
                        }
                    }
                }
                li:nth-child(1){
                   top: 0;
                   left: 0;
                }
                li:nth-child(2){
                   top: 50px;
                }
                li:nth-child(3){
                   top: 100px;
                }
                li:nth-child(4){
                   top: 40px;
                }
                li:nth-child(5){
                   top: 90px;
                }
                li:nth-child(6){
                   top: 140px;
                }
            }
        }
    }

    @media (min-width:1024px) and (max-width:1400px) { 

    }

    @media (min-width:768px) and (max-width:1024px) {   

    }

    @media only screen and (max-width: 768px){ 
        .popular{
            .main{
                width: 100%;
                ul{
                    width: 100%;
                    height: auto;
                    li{
                        position: static;
                        width: 100%;
                        margin-bottom: 10px;
                        .main-img{
                            height: auto;
                        }
                        .main-action{
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>
