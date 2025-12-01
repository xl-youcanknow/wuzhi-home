<template>
  <div class="map">
    <div class="map-box">
        <img src="@/public/img/shortmap.png" alt="">
        <span class="spot china">
          <img src="@/public/img/spot.png" alt="" title="OKPortal">
        </span>
        <span class="spot thailand">
          <img src="@/public/img/spot.png" alt="" title="OKPortal">
        </span>
        <span class="spot myanmar">
          <img src="@/public/img/spot.png" alt="" title="OKPortal">
        </span>
         <span class="spot philippines">
          <img src="@/public/img/spot.png" alt="" title="OKPortal">
        </span>
         <span class="spot indonesia">
          <img src="@/public/img/spot.png" alt="" title="OKPortal">
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EarthMap',
  data () {
    return {
      msg: 'EarthMap'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .map{
    width: 100%;
    background-color: #ededed;
    margin: 20px auto;
    padding: 20px 0;
    .map-box{
      width: 1037px;
      height: 587px;
      margin: 0 auto;
      position: relative;
      .spot{
        position: absolute;//54,74
        left: calc(~"50% - 27px");
        top: calc(~"50% - 74px");
        cursor: pointer;
      }
      .china{
        margin-left: 256px;
        margin-top: -15px;
      }
      .thailand{
        margin-left: 226px;
        margin-top: 10px;
      }
      .myanmar{
        margin-left: 246px;
        margin-top: 22px;
      }
      .philippines{
        margin-left: 290px;
        margin-top: 100px;
      }
      .indonesia{
         margin-left: 315px;
        margin-top: 50px;
      }
    }
  }
@media (min-width:1024px) and (max-width:1400px) { 
  .map{
    .map-box{
      width: 800px;
      height: auto;
      img{
        width: 100%;
      }
    }
  }
}

@media (min-width:768px) and (max-width:1024px) {   
  .map{
    .map-box{
      width: 700px;
      height: auto;
      img{
        width: 100%;
      }
    }
  }
}

@media only screen and (max-width: 768px){ 
    .map{
    .map-box{
     width: 320px;
      height: auto;
      img{
        width: 100%;
      }
      .spot{
       img{
         width: 10px;
        
       }
      }
      .china{
        margin-top: 68px;
        margin-left: 100px;
      }
      .thailand{
        margin-top: 75px;
        margin-left: 90px;
      }
      .myanmar{
        margin-top: 80px;
        margin-left: 110px;
      }
      .philippines{
        margin-top: 95px;
        margin-left: 110px;
      }
      .indonesia{
        margin-top: 80px;
        margin-left: 120px;
      }
    }
  }
}
</style>
