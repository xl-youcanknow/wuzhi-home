<template>
  <div class="grouptitle">
    <h2 class="title">{{titles}}</h2>
    <div class="img-box">
      <img :src="img" alt="" >
    </div>
    <div v-if="type=='text'">
      <div class="content">{{content}}</div>
      <div class="contentmore" style="display:none">{{contentmore}}</div>
    </div>
    <div v-else class="team-group">
      <div class="team-img" v-for="(item,index) in 3 " :key="index" >
        <img src="http://iph.href.lu/240x240?text=team" alt="">
        <div class="team-img-more">
            <div class="name">name</div>
            <div class="tips"> tips</div>
            <div class="contact">
              <a href="#" class="iconfont">&#xe708;</a>
              <a href="##" class="iconfont">&#xe626;</a>
            </div>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grouptitle',
  data () {
    return {
      msg: 'Grouptitle',
      text:'text',
    }
  },
  props:{
    titles: {  
    },
    content: {  
    },
    img: {  
    },
    contentmore: {  
    },
    type: {  
      default:"text"
    }
  },

  mounted() {
    // console.log(this.type);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.transition{
  transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;  
};
  .grouptitle{
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: inherit;
    .title{
      font-size: 42px;
      font-weight: bolder;
      color: #393939;
      width: 100%;
      text-align: center;
    }
    .img-box{
      height: 52px;
      line-height: 52px;
      width: 250px;
      margin: 20px auto;
      text-align: center;
      img{
        width: 100%;
      }
    }
    .content{
      color: #333;
      width: 100%;
      margin: 0 auto;
      line-height: 24px;
      font-size: 22px;
      text-align: center;
    }
    .contentmore{
      color: #777;
      width: 512px;
      margin: 26px auto 20px;
      line-height: 24px;
      font-size: 16px;
      text-align: center;
    }
    .team-group{
      text-align: center;
      margin-top: 42px;
      .team-img{
        height: 240px;
        width: 240px;
        display: inline-block;
        margin: 0 15px;
        position: relative;
        cursor: pointer;
        .team-img-more{
          position: absolute;
          opacity: 0;    
          top: 0;
          left: 0;
          width: 96%;
          height:96%;
          margin-top: 2%;
          margin-left: 2%;
          background-color: #2f338f;
          transition: all .5s;
          -moz-transition: all .5s;
          -o-transition: all .5s;
          -webkit-transition: all .5s;
          color: #fff;          
          .name{
            margin-top: 80px;
            font-size: 22px;
            color: #fff;
          }
          .tips{
            margin-top: 20px;        
            font-size: 14px;
             color: #9ea0ee;
          }
          .contact{
            margin-top: 20px;    
              width: 100%;
              text-align: center;
              a{
                color: #fff;
                display: inline-block;
                margin: 0 5px;
                font-size: 26px;
              }
          }
        }
      }

      .team-img:hover .team-img-more{
        opacity: 1;    
      }
    }
    
  }
  @media only screen and (max-width: 768px){ 
    .grouptitle{
      padding: 10px 0;
        .content{
        width: 100%;
        font-size: 14px;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
    .grouptitle .title{
      font-size: 20px;
    }
}
</style>
