<template>
  <div>
    <div class="ad">
      <div class="wrap">
        <div class="nav_tit">
          <h1>数字教材</h1>
          <h2>Digital Textbook</h2>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="ny_content">
        <div class="lt">
          <div class="lt_title">数字教材</div>
          <div class="lt_nav">
            <ul id="xyNav">
              <li
                data-id="c03c57cd-423b-40c4-883b-e89f6eb8d9c6"
                data-name="调研报告"
              >
                数字教材
              </li>
            </ul>
          </div>
          <div class="lt_nav_img"><img src="../img/lt_nav_img.jpg" /></div>
        </div>

        <div class="rt">
          <div class="bd" style="display: flex; justify-content: space-around;">
            <img style="width: 30%;height: auto;" src="../assets/s1.png" alt="">
            <img style="width: 30%;height: auto;" src="../assets/s2.png" alt="">
            <img style="width: 30%;height: auto;" src="../assets/s3.png" alt="">
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
