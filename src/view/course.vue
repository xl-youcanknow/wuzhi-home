<template>
  <div>
    <div class="ad">
      <div class="wrap">
        <div class="nav_tit">
          <h1>课程中心</h1>
          <h2>course center</h2>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="ny_content">
        <div class="lt">
          <div class="lt_title">课程中心</div>
          <div class="lt_nav">
            <ul id="xyNav">
              <li
                data-id="c03c57cd-423b-40c4-883b-e89f6eb8d9c6"
                data-name="双师培训"
              >
                专业基础课
              </li>
              <li
                data-id="2861c8d0-35fc-420f-baee-08a55ab4164a"
                data-name="技术培训"
              >
                专业核心课
              </li>
              <li
                data-id="5904fa47-6806-4df3-9db8-23eb6d32888b"
                data-name="企业员工培训"
              >
                专业拓展课
              </li>
              <li
                data-id="5904fa47-6806-4df3-9db8-23eb6d32888b"
                data-name="企业员工培训"
              >
                专业实训课
              </li>
            </ul>
          </div>
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
    return {
    };
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../css/style2.css";
</style>
