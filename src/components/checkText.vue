<template>
  <div class="checkText">
    <div class="check-box" v-for="(item,index) in list" :key="index">
        <div class="top clearfix">
            <div class="img-box">
                <img src="../public/img/check.png" alt="">
            </div>
            <div class="cheek-text">
                {{item.text}}
            </div>
        </div>
        <div class="content">
            {{item.content}}
        </div>
    </div>
  </div>
</template>

<script>
import langObj from '../lang/index.js'
export default {
  name: 'CheckText',
  data () {
    return {
      msg: 'checkText',
      list:langObj.checkText
    }
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .checkText{
    padding: 0 50px 75px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    .check-box{
        width: 348px;
        display: inline-block;
        box-sizing: border-box;
        padding-left: 20px;
        padding-right: 20px;
        .img-box{
            float: left;
            width: 56px;
            height: 56px;
        }
        .cheek-text{
            float: left;
            width: calc(~"100% - 56px");
            padding-left: 20px;
            height: 56px;
            line-height: 56px;
            box-sizing: border-box;
            text-align: left;
            font-size: 20px;
            font-weight: bold;
        }
        .content{
            text-align: left;
            padding-top: 5px;
            color: #6b6b6b;
            line-height: 24px;
            font-size: 14px;
        }
    }
  }
@media (min-width:1024px) and (max-width:1400px) { 
.checkText{
    .check-box{
        width: 300px;
    }
}
}

@media (min-width:768px) and (max-width:1024px) {   
    .check-box{
        width: 100%!important;
        padding-bottom: 10px;
    }
}

@media only screen and (max-width: 768px){ 
    .checkText{
        padding: 0 20px 20px;
    }
    .check-box{
        width: 100%!important;
        padding-bottom: 10px;
    }
    .check-box .content{
        margin: 10px 0;
    }
}
</style>
