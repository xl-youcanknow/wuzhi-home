<template>
  <div class="main">
    <!-- 轮播图代码 开始 -->

    <div class="page1">
      <div class="yh">
        <div class="hd wrap">
          <ul>
            <li>
              <a
                href="https://zyk.icve.com.cn/icve-admin/workbench"
                target="_blank"
              >
                <div class="icon"><img src="../img/yh_js.png" /></div>
                <div class="text">
                  <h3>教师用户</h3>
                  <h4>TEACHER USERS</h4>
                </div>
                <div class="line"></div>
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="routerClick('/course')">
                <div class="icon"><img src="../img/yh_xs.png" /></div>
                <div class="text">
                  <h3>学生用户</h3>
                  <h4>STUDENT USERS</h4>
                </div>
                <div class="line"></div>
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="routerClick('/course')">
                <div class="icon"><img src="../img/yh_qy.png" /></div>
                <div class="text">
                  <h3>企业用户</h3>
                  <h4>Enterprise USERS</h4>
                </div>
                <div class="line"></div>
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="routerClick('/course')">
                <div class="icon"><img src="../img/yh_sh.png" /></div>
                <div class="text">
                  <h3>社会学习者</h3>
                  <h4>Social learners</h4>
                </div>
                <div class="line"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="js_tj wrap">
        <div class="tw_tj">
          <div class="wz_js_tit">
            <h4>introduce</h4>
            <h3>资源库介绍</h3>
          </div>
          <div class="wz_js" id="jieshao" v-html="userInfo.introduce"></div>

          <div class="tj">
            <ul id="stat_box">
              <li>
                <div class="icon"><img src="../img/tj_icon1.png" /></div>
                <div class="num">{{ numberData.courseNumber }}<i>门</i></div>
                <div class="stat_tit">课程</div>
              </li>
              <li>
                <div class="icon"><img src="../img/tj_icon2.png" /></div>
                <div class="num">
                  {{ numberData.courseInfoNumber }}<i>条</i>
                </div>
                <div class="stat_tit">素材</div>
              </li>
              <li>
                <div class="icon"><img src="../img/tj_icon3.png" /></div>
                <div class="num">{{ numberData.smallCourse }}<i>门</i></div>
                <div class="stat_tit">微课</div>
              </li>
              <li>
                <div class="icon"><img src="../img/tj_icon4.png" /></div>
                <div class="num">{{ numberData.userNumber }}<i>人</i></div>
                <div class="stat_tit">学员</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="video_js">
          <!-- <video
            poster="../img/video_fm.jpg"
            id="myVideo"
            controls
            style="width: 100%; height: 100%;"
            autoplay
            muted
          >
            <source :src="videoData.ossOriUrl" type="video/MP4" />
          </video> -->
          <video
            ref="videoPlayer"
            style="width: 100%; height: 100%;"
            controls
            autoplay
            muted
          ></video>
        </div>
      </div>
    </div>

    <!--人才培养方案 建设标准 开始-->
    <div class="page2 wrap" style="margin-top:120px">
      <div class="rcpyfa">
        <a href="#" @click.prevent="routerClick('/major?ac=1')">
          <div class="tit_more">
            <div class="tit">
              <h3>人才培养方案</h3>
              <h4>Talent cultivation plan</h4>
            </div>
            <div class="more">立即查看-&gt;</div>
          </div>
        </a>
      </div>
      <div class="jsbz">
        <a href="#" @click.prevent="routerClick('/major?ac=2')">
          <div class="tit_more">
            <div class="tit">
              <h3>专业教学标准</h3>
              <h4>Talent cultivation plan</h4>
            </div>
            <div class="more">立即查看-&gt;</div>
          </div>
        </a>
      </div>
    </div>
    <!--人才培养方案 建设标准 结束-->

    <!--特色板块 开始-->
    <div class="page3">
      <div class="wrap">
        <div class="tit">
          <h2>特色资源</h2>
          <h4>Featured Resources</h4>
        </div>
        <ul>
          <li>
            <a href="#" @click.prevent="routerClick('/society?ac=1')"
              ><h1>职教出海</h1></a
            >
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/skillCenter?ac=2')"
              ><h1>特色培训包</h1></a
            >
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/materialCenter?ac=3')"
              ><h1>题库服务</h1></a
            >
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/skillCenter?ac=4')"
              ><h1>产教融合</h1></a
            >
          </li>
        </ul>
      </div>
    </div>

    <!--特色板块 结束-->

    <div class="page4">
      <div class="wrap">
        <div class="tit">
          <h2>课程中心</h2>
          <h4>course center</h4>
        </div>
        <div class="hd">
          <ul>
            <li class="on" data-tag="zyjck"><a>专业基础课</a></li>
            <li data-tag="zyhxk"><a>专业核心课</a></li>
            <li data-tag="zytzk"><a>专业拓展课</a></li>
            <li data-tag="pxkc"><a>培训课程</a></li>
            <li data-tag="zhkc"><a>智慧课程学习中心</a></li>
          </ul>
          <div class="hmore"><a id="course_more">更多&gt;&gt;</a></div>
        </div>
        <div class="bd">
          <div class="li">
            <ul id="jck_course_html">
              <!-- <li>
                <a href="jtkc.html" target="_blank"
                  ><div class="pic">
                    <img src="../img/wlxtyyw.png" alt="" />
                  </div>
                  <div class="txt">
                    <h3>网络系统建设与运维初级</h3>
                    <h4>武汉职业技术大学</h4>
                    <div class="flxa">
                      <h6>XXX</h6>
                      <h5>2023.04.20</h5>
                    </div>
                  </div></a
                >
              </li>
              <li>
                <a target="_blank"
                  ><div class="pic"><img src="../img/sjcj.jpg" alt="" /></div>
                  <div class="txt">
                    <h3>数据采集技术</h3>
                    <h4>武汉职业技术大学</h4>
                    <div class="flxa">
                      <h6>xxxx</h6>
                      <h5>2023.04.20</h5>
                    </div>
                  </div></a
                >
              </li>
              <li>
                <a target="_blank"
                  ><div class="pic"><img src="../img/sjcj.jpg" alt="" /></div>
                  <div class="txt">
                    <h3>Linux高级服务器配置与管理</h3>
                    <h4>武汉职业技术大学</h4>
                    <div class="flxa">
                      <h6>XXX</h6>
                      <h5>2023.04.20</h5>
                    </div>
                  </div></a
                >
              </li> -->
            </ul>
          </div>
          <div class="li">
            <ul id="hxk_course_html">
              <li>
                <a target="_blank"
                  ><div class="pic"><img src="../img/sjksh.jpg" alt="" /></div>
                  <div class="txt">
                    <h3>数据可视化技术</h3>
                    <h4>武汉职业技术大学</h4>
                    <div class="flxa">
                      <h6>xxx</h6>
                      <h5>2022.06.30</h5>
                    </div>
                  </div></a
                >
              </li>
            </ul>
          </div>
          <div class="li">
            <ul id="tzk_course_html">
              <li>
                <a target="_blank"
                  ><div class="pic"><img src="../img/sjksh.jpg" alt="" /></div>
                  <div class="txt">
                    <h3>数据可视化技术</h3>
                    <h4>武汉职业技术大学</h4>
                    <div class="flxa">
                      <h6>xxx</h6>
                      <h5>2023.03.11</h5>
                    </div>
                  </div></a
                >
              </li>
            </ul>
          </div>
          <div class="li">
            <ul id="pxkc_course_html">
              <li>
                <a target="_blank"
                  ><div class="pic"><img src="../img/sjksh.jpg" alt="" /></div>
                  <div class="txt">
                    <h3>XXXXXXXX</h3>
                    <h4>武汉职业技术大学</h4>
                    <div class="flxa">
                      <h6>xxx</h6>
                      <h5>2023.03.06</h5>
                    </div>
                  </div></a
                >
              </li>
            </ul>
          </div>
          <div class="li">
            <ul id="zhkc_course_html">
              <li>
                <a target="_blank"
                  ><div class="pic"><img src="../img/sjksh.jpg" alt="" /></div>
                  <div class="txt">
                    <h3>XXXXXXXX</h3>
                    <h4>武汉职业技术大学</h4>
                    <div class="flxa">
                      <h6>xxx</h6>
                      <h5>2023.03.06</h5>
                    </div>
                  </div></a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--素材中心 开始-->
    <div class="page5">
      <div class="wrap">
        <div class="tit">
          <h2>素材中心</h2>
          <h4>Material Center</h4>
        </div>
        <div class="more"><a>更多&gt;&gt;</a></div>

        <div class="bd">
          <ul id="material_html">
            <!-- <li>
              <a target="_blank"
                ><div class="pic"><img src="../img/sjksh.jpg" alt="" /></div>
                <div class="txt">
                  <h3>数据可视化实训-数据大屏展示...</h3>
                  <div class="flxa">
                    <h6>35</h6>
                    <h5>2023-05-15</h5>
                  </div>
                </div></a
              >
            </li> -->
          </ul>
        </div>
      </div>
    </div>

    <!--素材中心 结束-->

    <div class="page5">
      <div class="wrap">
        <div class="tit">
          <h2>数字教材</h2>
          <h4>Material Center</h4>
        </div>
        <div class="more"><a>更多&gt;&gt;</a></div>

        <div class="bd">
          <ul id="material_html">
            <!-- <li>
              <a href="bookdetail.html" target="_blank"
                ><div><img src="../img/xxjs.jpg" alt="" /></div>
                <div class="txt">
                  <h3>信息技术应用</h3>
                  <div class="flxa">
                    <h6>35</h6>
                    <h5>主编: 聂哲 王铮钧 袁爱娥</h5>
                  </div>
                </div></a
              >
            </li> -->
          </ul>
        </div>
      </div>
    </div>

    <!--建设团队 开始-->
    <div class="page6">
      <div class="wrap">
        <div class="tit">
          <h2>建设团队</h2>
          <h4>Building team</h4>
        </div>

        <div class="bd">
          <div class="flogo">
            <h2><i>主持院校</i></h2>
            <ul>
              <li>
                <a target="_blank"><img src="../img/001.jpg" alt=""/></a>
              </li>
            </ul>
          </div>
          <!-- <div class="flogo">
            <h2><i>参建单位</i></h2>
            <ul>
              <li>
                <a target="_blank"><img src="@/assets/logo33.png" alt=""/></a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
    <!--建设团队 结束-->
  </div>
</template>
<script>
import store from '@/store/index';
import axios from 'axios';
import Hls from 'hls.js';
export default {
  name: 'home',
  data() {
    return {
      videoSrc: `https://file.icve.com.cn/gen_zyk/449/296/7074A19C0A7B9D890CA2F9F024EE836E-25.mp4/1080p.m3u8`,
      hls: null,
      numberData: {},
      videoData: {},
      carouselHeight: '300px',
      bannerRatios: [],
    };
  },
  mounted() {
    this.getData();
    this.initPlayer();
    this.updateCarouselHeight();
    window.addEventListener('resize', this.updateCarouselHeight);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateCarouselHeight);
  },
  methods: {
    routerClick(url) {
      this.$router.push(url);
    },
    onBannerImgLoad(e) {
      const img = e.target;
      if (!img.naturalWidth) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      this.bannerRatios.push(ratio);
      this.updateCarouselHeight();
    },
    updateCarouselHeight() {
      const carousel = this.$refs.bannerCarousel;
      if (!carousel) return;
      const width = carousel.$el.offsetWidth;
      let ratio;
      if (this.bannerRatios && this.bannerRatios.length) {
        ratio = Math.min.apply(null, this.bannerRatios);
      } else {
        const img = carousel.$el.querySelector('img');
        if (!img || !img.naturalWidth) return;
        ratio = img.naturalHeight / img.naturalWidth;
      }
      this.carouselHeight = Math.round(width * ratio) + 'px';
    },
    initPlayer() {
      const video = this.$refs.videoPlayer;

      if (!video) return;

      // 如果浏览器支持 HLS.js
      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(this.videoSrc);
        this.hls.attachMedia(video);

        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            console.log('⚠ autoplay 被禁止，需要用户点击');
          });
        });
      }

      // 如果浏览器原生支持 HLS（如Safari）
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = this.videoSrc;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => {});
        });
      }
    },
    getData() {
      axios
        .get(
          'https://urc.icve.com.cn/stage-api/zyk/g@7074A19C0A7B9D890CA2F9F024EE836E-25.mp4/status?userId=&productId=c3ee6633ec1244a6b605090b0ba99c53'
        )
        .then((res) => {
          this.videoData = res.data;
        });
      axios
        .get(
          'https://zyk.icve.com.cn/prod-api/website/projectGroupInfo/projectStatistics/statisticsAllInfo?projectId=a0dd6bb6-4df2-4d61-a290-70a1f026118c'
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.numberData = res.data.data;
          }
        });
    },
  },
  computed: {
    userInfo() {
      return store.state.user.userinfo;
    },
    token() {
      return store.state.user.token;
    },
  },
};
</script>

<style scoped>
.page1 {
  position: relative;
  z-index: 999;
  top: -120px;
}
</style>
