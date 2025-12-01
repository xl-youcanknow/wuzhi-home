<template>
    <div class="batch">
        <div class="batch-tips" v-if="type == 0">
            <div class="batch-tips-box clearfix">
                <div class="icon">
                    <img src="../../public/img/pay/cart.jpg" alt="">
                </div>
                <div class="content">
                    <div class="top">Fill the form below to complete your purchase</div>
                    <div class="bottom" @click="login">Already registered! click here to login</div>
                </div>
                <div class="button">
                    REFER TO FRIEND!
                </div>
            </div>
        </div>
        <div class="batch-adv" v-else>
            <div class="total">
              <div class="img-box">
                <img src="../../public/img/pay/tips.jpg" alt="">
              </div>


                <div class="white">
                    <ul>
                        <li>
                            <a href=" https://www.facebook.com/okportal/" target="_blank" class="iconfont"> &#xe6e5;</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/okportal/" target="_blank" class="iconfont">&#xe6c1;</a>
                        </li>
                        <li>
                           <a href="https://www.youtube.com/channel/UCyDBG-D7oGzdVDFNFCui2MA" target="_blank" class="iconfont">&#xe630;</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/okportaltech/" target="_blank" class="iconfont">&#xe643;</a>
                        </li>
                       
                        <li>
                             <a href="https://twitter.com/OKportaltech" target="_blank" class="iconfont">&#xe89d;</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store/index'
import {orderLogin} from '@/api/index'
import axios from 'axios'
export default {
  name: 'batch',
  data () {
    return {
    }
  },
  props:['type'],
  methods: {
      login(){
          store.dispatch('user/AC_loginShow');
      }
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .batch{
        width: 100%;
        .batch-tips{
            width: 100%;
            background-color: #e5e5e5;
            .batch-tips-box{
                width: 1130px;
                margin: 0 auto;
                padding: 0 78px;
                box-sizing: border-box;
                height: 140px;
                line-height: 140px;
                .icon{
                    float: left;
                    img{
                        width: 100%;
                    }
                }
                .content{
                    float: left;
                     line-height: 20px;
                     padding: 36px 30px;
                    .top{
                        width: 100%;
                        font-size: 28px;
                        color:#333;
                        font-weight: bold;
                        padding-top: 10px;
                        margin-bottom: 10px;
                    }
                    .bottom{
                        width: 100%;
                        color: #2e2e87;
                        font-size: 22px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                }
                .button{
                    float: right;
                    line-height: 0;
                    background-color: #303280;
                    color: #fff;
                    font-size: 18px;
                    padding: 20px  48px;
                    margin-top: 50px;
                    cursor: pointer;
                }
            }
        }
        .batch-adv{
            display: none;
            width: 100%;
            background-color: #fff;
          .img-box{
            float: left;
          }
            .total{
                width: 1130px;
                margin: 0 auto;
                position: relative;
                .white{
                    height: 100%;
                    background-color: #fff;
                    ul{
                        li{
                            display: inline-block;
                            margin: 0 20px;
                            line-height: 145px;
                            a{
                                font-size:42px;
                                color: #09f;
                            }
                        }
                    }
                }
            }
        }
    }



    @media only screen and (max-width: 1200px){
            .batch{
                .batch-tips{
                    .batch-tips-box{
                         width: 100%;
                         padding: 0 10px;
                         height: 84px;
                         line-height: 84px;
                        .icon{
                            width: 32px;
                            height: 32px;
                            line-height: 0
                        }
                        .content{
                            padding: 0 5px;
                            .top,.bottom{
                                font-size: 14px;
                                margin-bottom: 0;
                            }
                        }
                        .button{
                            padding:10px 5px;
                            margin-top: 10px;
                        }
                    }
                }
                .batch-adv{
                    .total{
                        width: 100%;
                      text-align: center;
                      .img-box{
                        float: none;
                      }
                        img{
                            width: 60%;
                            display: inline-block;
                        }
                        .white{
                            margin-top: 0px;
                            height: 50px;
                            width: 100%;
                            ul{
                                text-align: center;
                                li{
                                    margin: 0 5px;
                                    line-height: 48px;
                                    a{
                                        font-size: 32px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
    }
</style>
