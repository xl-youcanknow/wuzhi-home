<template>
  <div class="payorder">
      <saleslide :img="imgArr[0]"></saleslide>
      <batch type="0"></batch>
      <process></process>
      <saleslide :img="imgArr[1]"></saleslide>
      <batch></batch>
  </div>
</template>

<script>
import saleslide from '@/components/payorder/SaleSlide'
import batch from '@/components/payorder/batch'
import process from '@/components/payorder/process'
import store from '@/store/index'
export default {
  name: 'payOrder',
  data () {
    return {
      imgArr:[
       require("../public/img/pay/100.png"),
      //  require("../public/img/slide/pic-13.png"),
      ]
    }
  },
  components:{
      saleslide,
      batch,
      process
  },
    mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
