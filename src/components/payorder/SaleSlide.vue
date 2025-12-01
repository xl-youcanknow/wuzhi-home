<template>
  <div class="saleslide">
      <img :src="img" alt="">
  </div>
</template>
<script>
import store from '@/store/index'
export default {
  name: 'SaleSlide',
  data () {
    return {
        height:"",
    }
  },
  props:["img"],
watch: {
    res(){
        this.setWidth();
    }
},
  methods: {
    setWidth(){
      var width = window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth;
      var height = width*370/1132;
      this.height = height+"px";
    }
  },
  mounted() {
      this.setWidth();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .saleslide{
        width: 100%;
        margin-bottom: 20px;
        img{
            width:100%;
        }
    }
</style>
