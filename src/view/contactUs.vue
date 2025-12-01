<template>
  <div> 
  <div class="blue" style="margin:20px auto"></div>
  <!-- <sale-slide :img="img" style="margin:20px auto" class="contact-sale"></sale-slide> -->
    <contact-from></contact-from>
  <conmap style="margin:20px auto"></conmap>

  <batch></batch>
  </div>
</template>

<script>
import contactFrom from '@/components/contactUs/contactFrom'
import consultation from '@/components/contactUs/consultation'
import batch from '@/components/payorder/batch.vue'
import SaleSlide from '@/components/payorder/SaleSlide.vue'
import conmap from '@/components/contactUs/conmap.vue'
export default {
  name: 'contactUs',
  data () {
    return {
      img:require("@/public/img/contactus.jpg"),
    }
  },
  components:{
    contactFrom,
    consultation,
    batch,
    SaleSlide,
    conmap,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.blue{
  width: 100%;
  height: 2px;
  background-color: #2f328c;
}
  .contact-sale{
    width: 75% !important;
  }
  @media (max-width: 1024px) {
    .contact-sale{
      width: 100% !important;
    }
  }
</style>
