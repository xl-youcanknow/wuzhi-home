<template>
  <div class='smallmap clearfix'>
      <ul class="smallmap-ul">
          <li v-for="(item,index) in 3" :key="index">
              <div class="img-box">
                  <img src="http://iph.href.lu/122x122?text=image&bg=2f328c" alt="">
              </div>
              <div class="text">
                  lorem ipsum dolor sit amet ,consectetur adipiscing elit,sed do eiusmod tempor
              </div>
              <div class="map">
                  <img src="@/public/img/map.jpg" alt="">
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'SmallMap',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .smallmap{
        .smallmap-ul{
            width: 1010px;
            margin: 0 auto;
            li{
                height: 112px;
                margin-bottom: 32px;
                .img-box{
                    float: left;
                    width: 112px;
                    img{
                        width: 100%;
                    }
                }
                .text{
                    float: left;
                    width: calc(~"100% - 468px");
                    padding: 0 20px;
                    font-size: 22px;
                    color: #777;
                    line-height: 32px;
                    box-sizing: border-box;
                    padding-top: 10px;
                }
                .map{
                    float: left;
                    height: 104px;
                    width: 356px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
    @media (min-width: 1024px) and (max-width: 1400px) {
   
    }

    @media (min-width: 768px) and (max-width: 1024px) {

    }

    @media only screen and (max-width: 768px) {
        .smallmap{
            .smallmap-ul{
                width: 100%;
               li{
                   width: 96%;
                   margin: 0 2%;
                    .img-box{
                        width: 60px;
                        height: 60px;
                    }
                    .text{
                        width: calc(~"100% - 80px");
                        margin-left: 20px;
                        padding: 5px 0;
                        line-height: 20px;
                        font-size: 14px;
                    }
                    .map{
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
               }
            }
        }
    }
</style>
