<template>
<div class="bigsearch-out clearfix">
  <div class="bigsearch">
      <div class="cate">
        <el-select v-model="value8" filterable placeholder="Select">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </div>
      <div class="search-content">
        <input type="text" placeholder="Search here">
      </div>
      <div class="search-btn">
          Search
      </div>
  </div>
  <div class="cart-group">
      <a href="#">
          <i class="iconfont">&#xeca1;</i>
          <span class="text">Whishlist
              <i class="like-number">3</i>
          </span>
      </a>
      <a href="#">
          <i class="iconfont">&#xe632;</i>
          <span class="text">Cart
              <i class="cart-number">{{cartNumber}}</i>
          </span>
      </a>
  </div>
</div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'BigSearch',
  data () {
    return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: ''
      
    }
  },
  computed: {
      cartNumber(){
          return store.state.currency.shopCar;
      },
      res(){
          return store.state.currency.creenWidth;
      }
  },
  watch: {
      res(){
          
      }
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bigsearch-out{
     width: 100%;
     text-align: center;
     padding: 25px 0;
     background-color: #e4e8ee;
}
.bigsearch{
    width: 816px;
    height: 44px;
    display: inline-block;
    .cate{
        width: 165px;
        float: left;
        height: 100%;
        border-top: 2px solid #b5b5b5;
        border-left: 2px solid #b5b5b5;
        border-bottom: 2px solid #b5b5b5;
        border-right: 1px solid #b5b5b5;
        border-radius: 50px 0 0 50px;
        overflow: hidden;
        select{
            height: 100%;
            width: 100%;
            border: 0;
            font-size: 24px;
            color: #7e7e7e;
            padding-left: 20px;
            outline: none;
        }
        .el-input__inner{
            height: 40px;
        }
    }
    .search-content{
        width: 520px;
        height: 100%;
        float: left;
        border-top: 2px solid #b5b5b5;
        border-bottom: 2px solid #b5b5b5;
        input{
            height: 100%;
            width: 100%;
            padding: 0 20px;
            border: 0;
            box-sizing: border-box;
            font-size: 20px;
            outline: none;
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                font-size: 18px;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                font-size: 18px;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                    font-size: 18px;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                font-size: 18px;
            }
        }
    }
    .search-btn{
        width: 124px;
        height: 100%;
        float: left;
        text-align: center;
        line-height: 44px;
        font-size: 24px;
        color: #fff;
        border-radius: 0 50px 50px 0;
        border: 2px solid #2f328c;
        background-color: #2f328c;
    }
}
.cart-group{
    display: inline-block;
        height: 44px;
        line-height: 44px;
        margin-left: 50px;
    a{
        display: inline-block;
        margin: 0 20px;
        height: 100%;
        color:#787a7f;
        font-weight: bold;
        &:hover{
            color: #2f328c!important;
            // font-size: 22px;              
        }
        i{
            display: block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            font-weight: 100;
        }
        .text{
            height: 20px;
            line-height: 20px;
            display: block;
            width: 100%;
            text-align: center;
            font-size: 18px;
            position: relative;
            .cart-number,.like-number{
                position: absolute;
                font-style: normal ;
                right: -5px;
                top: -34px;
                width: 18px;
                height: 18px;
                line-height: 20px;
                text-align: center;
                border-radius: 50%;
                background-color: #242282;
                color: #fff;
                font-size: 12px;
                font-family: Arial, Helvetica, sans-serif;
            }
            .like-number{
                right: 15px;
            }
        }
    }
}

@media (min-width: 1024px) and (max-width: 1400px) {
   
}

@media (min-width: 768px) and (max-width: 1024px) {

}

@media only screen and (max-width: 768px) {
     .bigsearch{
        width: 100%;
        .cate{
            width: 20%;
            select{
                font-size: 14px;
            }
        }
        .search-content{
            width: 58%;
        }
        .search-btn{
            width: 18%;
            font-size: 14px;
        }
    }
    .cart-group{
        margin-top: 10px;
        width: 100%;
        text-align: center;
        margin-left: 0;
    }
}
</style>

<style lang="less">
    .bigsearch .cate{
        .el-input__inner{
            height:45px!important;
            border:0!important;
        }
    }
</style>

