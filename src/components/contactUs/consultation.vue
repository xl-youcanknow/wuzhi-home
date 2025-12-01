<template>
  <div class="consultation"> 
    <div class="title">Email us at okportal@12456.com</div>
    <ul class="clearfix">
      <li v-for="(item,index) in 8" :key="index">
        <div class="name">China</div>
        <div class="tell" style="font-family:'MyriadSetPro-Thin';" >+1 (86) 557-10086</div>
      </li>
    </ul>
    <div class="tellmap">
      <ul class="clearfix">
        <li v-for="(item,index) in 3" :key="index">
          <div class="map-img">
            <img src="https://www.aislelabs.com/wp-content/themes/aislelabs3/images/map-toronto-office-new.png" alt="">
          </div>
          <div class="name">China</div>
          <div class="spot">HEADQUARTERS</div>
          <div class="add">210 Dundas St West, Suite D500</div>
          <div class="tell">Tel +1 (647) 557-3510</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'consultation',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .consultation{
    width: 1130px;
    margin: 0 auto 80px;
    .title{
      width: 100%;
      text-align: center;
      margin: 82px 0;
      font-size: 24px;
      }
      &>ul{
        margin: 32px 0 50px;
        li{
          float: left;
          width: 224px;
          padding: 0 20px;
          text-align: center;
          margin-bottom: 20px;
          .name{
            color: #666;
            font-size: 16px;
            margin-bottom: 10px;
          }
          .tell{
            color: #555;
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
      .tellmap{
        width: 100%;
        ul{
          li{
            float: left;
            width: 33%;
            text-align: center;
            .map-img{
              width: 100%;
              text-align: center;
            }
            .name{
              color: #333;
              font-size: 20px;
              margin: 32px 0;
            }
            .spot{
              color: #777;
              font-size: 14px;
              margin: 20px 0;
            }
            .add{
              color: #777;
              font-size: 16px;
              margin-bottom: 10px;
            }
            .tell{
              color: #777;
              font-size: 16px;
              margin-bottom: 10px;
            }
          }
        }
      }
  }
</style>
