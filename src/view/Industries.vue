<template>
  <div>
    <!-- <indu-title></indu-title> -->
    <img src="../public/img/indu/industries_home.png" alt style="width:100%" class="pc">
    <indu-select></indu-select>
    <batch></batch>
  </div>
</template>

<script>
import batch from "@/components/payorder/batch.vue";
export default {
  name: "test",
  data() {
    return {};
  },
  components: {
    induTitle,
    induSelect,
    batch
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mo {
  display: none;
}
@media only screen and (max-width: 768px) {
  .pc {
    display: none;
  }
  .mo {
    display: block;
  }
}
</style>
