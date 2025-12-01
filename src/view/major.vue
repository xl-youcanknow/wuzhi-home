<template>
  <div>
    <div class="ad">
      <div class="wrap">
        <div class="nav_tit">
          <h1>专业园地</h1>
          <h2>Professional Garden</h2>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="ny_content">
        <div class="lt">
          <div class="lt_title">专业园地</div>
          <div class="lt_nav">
            <ul id="xyNav">
              <li
                data-id="5904fa47-6806-4df3-9db8-23eb6d32888b"
                data-name="课程标准"
                :class="{ active: ac == 3 }"
                @click="ac = 3"
              >
                专业介绍
              </li>
              <li
                data-id="c03c57cd-423b-40c4-883b-e89f6eb8d9c6"
                data-name="调研报告"
                :class="{ active: ac == 0 }"
                @click="ac = 0"
              >
                调研报告
              </li>
              <li
                data-id="2861c8d0-35fc-420f-baee-08a55ab4164a"
                data-name="人才培养方案"
                :class="{ active: ac == 1 }"
                @click="ac = 1"
              >
                人才培养方案
              </li>
              <li
                data-id="5904fa47-6806-4df3-9db8-23eb6d32888b"
                data-name="专业教学标准"
                :class="{ active: ac == 2 }"
                @click="ac = 2"
              >
                专业教学标准
              </li>
              <li
                data-id="5904fa47-6806-4df3-9db8-23eb6d32888b"
                data-name="专业教学标准"
                :class="{ active: ac == 4 }"
                @click="ac = 4"
              >
                课程标准
              </li>
            </ul>
          </div>
          <div class="lt_nav_img"><img src="../img/lt_nav_img.jpg" /></div>
        </div>
        <div class="rt">
          <div class="bd">
            <div class="" v-if="ac == 3">
              <div style="width: 80%;">
                <el-carousel
                  trigger="click"
                  ref="bannerCarousel"
                  indicator-position="none"
                >
                  <el-carousel-item>
                    <a
                      href="https://mp.weixin.qq.com/s?__biz=MzI5NzIzMTIzOA==&mid=2651972582&idx=1&sn=04e905196ee10a6cf5ae232f1c2d00ec&chksm=f6487ae40808c7a99409346e66400b33f026f829fbeabc8125d9bc3bc0e12d17c6674f95bf02&mpshare=1&scene=23&srcid=0516mkTqON0R5QDq8Em6Ryut&sharer_shareinfo=a918b86c3bd2f67255bb94b2eba23b50&sharer_shareinfo_first=a918b86c3bd2f67255bb94b2eba23b50#rd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="../assets/zhuanye1.png"
                        style="width: 100%;height: auto;"
                      />
                    </a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a
                      href="https://mp.weixin.qq.com/s?__biz=MzI5NzIzMTIzOA==&mid=2651972501&idx=1&sn=975d55bd53347e06cd9f5141982201e8&chksm=f69586456fa334d7a96a35b1e4369b6eabdab6bf8e4540c332ec34f417359280404ea803faa7&mpshare=1&scene=23&srcid=0513h131wSpX64NEMcMcBgV3&sharer_shareinfo=e749288ec6c0346da56f6381f39999a5&sharer_shareinfo_first=e749288ec6c0346da56f6381f39999a5#rd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="../assets/zhuanye2.png"
                        style="width: 100%;height: auto;"
                      />
                    </a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a
                      href="https://mp.weixin.qq.com/s?__biz=MzI5NzIzMTIzOA==&mid=2651971655&idx=1&sn=164e6343b3e029a7756802a3ee249fb2&chksm=f63027d6219e04c4f10f71ab644d9c1c8a96caed8532c49f385c6c0a89f01c03947cf491d2fd&mpshare=1&scene=23&srcid=0423OgOIN8gF8tYwZYdkTpfz&sharer_shareinfo=9813c92aa93dd5378204dbed041b7853&sharer_shareinfo_first=9813c92aa93dd5378204dbed041b7853#rd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="../assets/zhuanye3.png"
                        style="width: 100%;height: auto;"
                      />
                    </a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a
                      href="https://mp.weixin.qq.com/s?__biz=MzI5NzIzMTIzOA==&mid=2651972149&idx=2&sn=8887b79a8ece3e4728115e3b4591503b&chksm=f6461a5c1a89f8ccbd36ca38a3e35d941c17ed71e9af97f9d311cde26cfd403878d802af981b&mpshare=1&scene=23&srcid=0423UNnV4mwiykyAHcY7TUZC&sharer_shareinfo=701353041e381f922c94c1974eff0438&sharer_shareinfo_first=701353041e381f922c94c1974eff0438#rd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="../assets/zhuanye4.png"
                        style="width: 100%;height: auto;"
                      />
                    </a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a
                      href="https://mp.weixin.qq.com/s?__biz=MzI5NzIzMTIzOA==&mid=2651972149&idx=3&sn=a3b4223a2b4e85a26b62c04b552d2d00&chksm=f68984b23e42f32ae80ba5fc42b3ba6c82c94a00b3a7ca4608112e031af7964a312105cc49f0&mpshare=1&scene=23&srcid=0423wXpLZa5gopzyVzfkx2Xb&sharer_shareinfo=372334a0f0df076693ad7497e3ec4d48&sharer_shareinfo_first=372334a0f0df076693ad7497e3ec4d48#rd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="../assets/zhuanye5.png"
                        style="width: 100%;height: auto;"
                      />
                    </a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a
                      href="https://mp.weixin.qq.com/s?__biz=MzI5NzIzMTIzOA==&mid=2651972179&idx=1&sn=03dc6800039c4078ab2b978d4bf51d34&chksm=f652d827d3755f14b019f4af1de96d8072026df78beaab2435383d27009669aad2db0252885d&mpshare=1&scene=23&srcid=042393iV2Lfk1rv9aQzczaP9&sharer_shareinfo=21cc0f8f1e5582d797104667ad6e1a0a&sharer_shareinfo_first=21cc0f8f1e5582d797104667ad6e1a0a#rd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="../assets/zhuanye6.png"
                        style="width: 100%;height: auto;"
                      />
                    </a>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div class="" v-if="ac == 1">
              <ul class="doc-list">
                <li v-for="f in staticFiles" :key="f">
                  <span class="name">{{ f }}</span>
                  <a
                    class="download"
                    :href="'static/teach/' + encodeURIComponent(f)"
                    download
                    >下载</a
                  >
                </li>
              </ul>
            </div>
            <div class="" v-if="ac == 2">
              <ul class="doc-list">
                <li v-for="f in staticFiles2" :key="f">
                  <span class="name">{{ f }}</span>
                  <a
                    class="download"
                    :href="'static/teach/' + encodeURIComponent(f)"
                    download
                    >下载</a
                  >
                </li>
              </ul>
            </div>
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
      ac: 0,
      staticFiles: [
        '大数据技术专业人才培养方案 (中外合作).doc',
        '大数据技术专业人才培养方案 (本专业方向).doc',
        '工业软件开发技术专业人才培养方案.doc',
        '智能网联汽车技术专业人才培养方案.pdf',
        '计算机网络技术专业人才培养方案.pdf',
      ],
      staticFiles2: [
        '大数据技术-专业教学标准.pdf',
        '工业软件开发技术-专业教学标准.pdf',
        '计算机网络技术-专业教学标准.pdf',
        '人工智能技术-专业教学标准.pdf',
        '软件技术-专业教学标准.pdf',
        '信息安全管理-本科专业教学标准.pdf',
        '智能网联汽车技术-专业教学标准.pdf',
      ],
    };
  },
  mounted() {
    this.ac = this.$route.query.ac;
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../css/style2.css';
.doc-list {
  padding: 0;
  margin: 0;
}
.doc-list li {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eaeaea;
  margin: 0 !important;
  margin-bottom: 20px !important;
  padding-bottom: 20px !important;
}
.doc-list .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16px;
}
.doc-list .download {
  color: #0e6af2;
  background: transparent !important;
}
</style>
