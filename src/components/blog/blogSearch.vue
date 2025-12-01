<template>
  <div class="blogsearch">
    <div class="top-group clearfix">
      <div class="search-input">
        <input type="text" placeholder="Search">
      </div>
      <div class="search-btn">Search</div>
    </div>
    <div class="guide-group">
     <div class="guide-group-box">
       <div class="title">
         About OkPortal
       </div>
       <div class="main">
          OKPortal is a technology company addisting retailers to increase sales through the power of big data analytics.Our mission is to transform retail localtions to smart stores,resulting in effective marketing ,increased sales ,and better customer satisfaction
       </div>
      </div>
      <div class="guide-group-box">
       <div class="title">
         Connent with us
       </div>
       <div class="main">
         <ul>
           <li>
             <a href="www.twitter.com/okportal">www.twitter.com/okportal</a>
             <i class="iconfont icon">&#xe89d;</i>
           </li>
          <li>
             <a href="www.facebook.com/okportal">www.facebook.com/okportal</a>
              <i class="iconfont icon">&#xe6e5;</i>
           </li>
           <li>
             <a href="www.youtube.com/okportal">www.youtube.com/okportal</a>
              <i class="iconfont icon">&#xe630;</i>
           </li>
         </ul>
       </div>
     </div>
     <div class="guide-group-box">
       <div class="title">
         Connent with us
       </div>
       <div class="main">
         <div class="cate">Announcement</div>
         <div class="cate">Blog</div>
         <div class="cate">Post</div>
         <div class="cate">Product Updates</div>
         <div class="cate">Technology</div>
       </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogSearch',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .blogsearch{
      .top-group{
          box-sizing: border-box;
          .search-input{
            width: 180px;
            height: 26px;
            line-height: 24px;
            border: 2px solid #2e318b;
            float: left;
            input{
              height: 100%;
              width: 100%;
              box-sizing: border-box;
              padding: 0 2px;
              outline: none;
              font-size: 16px;
            }
          }
          .search-btn{
            box-sizing: border-box;
            float: left;
            width: 70px;
            border: 2px solid #2e318b;
            color: #2e318b;
            background-color: #f4f4f4;
            margin-left: 5px;
            height: 28px;
            line-height: 24px;
            font-size: 18px;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
          }
      }
      .guide-group{
        margin-top: 32px;
        .guide-group-box{
          width: 100%;
          .title{
            font-size: 22px;
            color: #333;
            font-weight: bold;
            padding-bottom: 15px;
            border-bottom: 3px solid #999;

          }
          .main{
            padding-top: 15px;
            padding-bottom: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #747471;
            .cate{
              font-size: 18px;
              font-weight: bold;
              color: #747471;
              margin-bottom: 20px;
              cursor: pointer;
            }
            ul{
              li{
                position: relative;
                margin: 15px 0;
                a{
                  color: #333;
                  font-size: 14px;
                  &:hover{
                    color: #737cea;
                  }
                }
                i{
                  position: absolute;
                  right: 5px;
                  top:5px;
                  color:#2e318b;
                  font-size: 20px;
                }
              }
            }
          }
        }
      }
  }
@media (min-width:1024px) and (max-width:1400px) { 

}

@media (min-width:768px) and (max-width:1024px) {   

}

@media only screen and (max-width: 768px){ 

}
</style>
