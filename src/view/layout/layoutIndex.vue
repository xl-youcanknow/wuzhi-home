<template>
  <div class="hello">
    <layoutheader></layoutheader>
    <router-view></router-view>
    <layoutfooter></layoutfooter>
  </div>
</template>

<script>
import layoutheader from './layoutHeader';
import layoutfooter from './layoutFooter';
import layoutshoes from './layoutShoes';
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Layout',
      margin:"122"
    }
  },
  components:{
    layoutheader,
    layoutfooter,
  },methods:{
    setresheight(val){

      this.margin=val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .homeview{
    position: relative;
    margin-top: 122px;
  }
/*  @media only screen and (max-width: 768px){
.homeview{
    margin-top: 38px;
  }
  }*/
</style>
