<template>
  <div>
    <div class="ad">
      <div class="wrap">
        <div class="nav_tit">
          <h1>微课中心</h1>
          <h2>Micro center</h2>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="ny_content">
        <div class="lt">
          <div class="lt_title">微课中心</div>
          <div class="lt_nav_img"><img src="../img/lt_nav_img.jpg" /></div>
        </div>
        <div class="rt">
          <div class="bd">
            <div class="li"><ul id="material_html"></ul></div>
          </div>

          <div class="paging">
            <div class="pagination" id="pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {};
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../css/style2.css';
</style>
