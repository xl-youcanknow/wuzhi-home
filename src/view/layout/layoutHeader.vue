<template>
  <div class="header">
    <div class="header-wrap">
      <div class="th wrap">
        <div class="logo">
          <a><img src="@/assets/logo33.png" alt=""/></a>
        </div>
        <div class="rt">
          <div class="search">
            <input
              type="text"
              class="txt"
              name="materialTitle"
              placeholder="搜索更多内容"
            />
            <input type="button" class="btn" onclick="updateold(this)" />
          </div>
          <div class="login" v-if="token">
            <ul>
              <li>
                <a target="_blank">{{ userInfo.displayName }}</a>
              </li>
              <li><i>|</i></li>
              <li @click="loginout"><a target="_blank">退出</a></li>
            </ul>
          </div>
          <div class="login" v-else>
            <ul>
              <li @click="goLogin"><a target="_blank">登录</a></li>
              <li><i>|</i></li>
              <li @click="goRes"><a target="_blank">注册</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="header-nav">
        <ul class="wrap" id="nav">
          <li><a href="#" @click.prevent="routerClick('/')">首页</a></li>
          <li>
            <a href="#" @click.prevent="routerClick('/major?ac=3')">专业园地</a>
            <ul>
              <li>
                <a href="#" @click.prevent="routerClick('/major?ac=3')"
                  >专业介绍</a
                >
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('/major?ac=0')"
                  >调研报告</a
                >
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('/major?ac=1')">
                  人才培养方案</a
                >
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('/major?ac=2')"
                  >专业教学标准</a
                >
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('/major?ac=4')"
                  >课程标准</a
                >
              </li>
            </ul>
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/course')">课程中心</a>
            <ul>
              <li>
                <a href="#" @click.prevent="routerClick('/course')"
                  >专业基础课</a
                >
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('/course')"
                  >专业核心课</a
                >
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('/course')"
                  >专业拓展课</a
                >
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('/course')"
                  >专业实训课</a
                >
              </li>
            </ul>
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/microCourse')"
              >微课中心</a
            >
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/materialCenter')"
              >素材中心</a
            >
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/skillCenter')"
              >实训中心</a
            >
            <ul>
              <li>
                <a href="#" @click.prevent="routerClick('/skillCenter')"
                  >实训服务</a
                >
              </li>
            </ul>
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/society')">培训中心</a>
            <ul>
              <li>
                <a href="#" @click.prevent="routerClick('society')">教师培训</a>
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('society')">职业培训</a>
              </li>
              <li>
                <a href="#" @click.prevent="routerClick('society')">竞赛培训</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/virtualCenter')"
              >虚仿中心</a
            >
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/textbook')">数字教材</a>
          </li>
          <li>
            <a href="#" @click.prevent="routerClick('/Ideological')"
              >思政板块</a
            >
          </li>
          <!-- <li><a>思政中心</a></li> -->
        </ul>
      </div>
    </div>
    <div class="banner" v-if="isHome">
      <el-carousel
        trigger="click"
        :height="carouselHeight"
        ref="bannerCarousel"
      >
        <el-carousel-item>
          <img
            src="@/assets/b1.png"
            style="width: 100%;height: auto;"
            @load="onBannerImgLoad"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="@/assets/b2.png"
            style="width: 100%;height: auto;"
            @load="onBannerImgLoad"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import store from '@/store/index';
export default {
  name: 'layoutheader',
  data() {
    return {
      carouselHeight: '300px',
      bannerRatios: [],
    };
  },
  mounted() {
    this.updateCarouselHeight();
    window.addEventListener('resize', this.updateCarouselHeight);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateCarouselHeight);
  },
  methods: {
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
    goLogin() {
      window.location.href = `https://sso.icve.com.cn/sso/auth?mode=simple&source=14&redirect=http://https://zyk.icve.com.cn/portalproject/themes/default/a0dd6bb6-4df2-4d61-a290-70a1f026118c/sta_page/index.html?projectId=a0dd6bb6-4df2-4d61-a290-70a1f026118c#/home`;
    },
    goRes() {
      window.location.href = `https://sso.icve.com.cn/sso/register?mode=simple&source=14&redirect=http://https://zyk.icve.com.cn/portalproject/themes/default/a0dd6bb6-4df2-4d61-a290-70a1f026118c/sta_page/index.html?projectId=a0dd6bb6-4df2-4d61-a290-70a1f026118c#/home`;
    },
    loginout() {
      this.$confirm('是否确认退出？', '提示', {
        type: 'warning',
      })
        .then(() => {
          localStorage.removeItem('token');
          document.cookie =
            'TOKEN=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
          location.reload();
        })
        .catch(() => {});
    },
    routerClick(path) {
      this.$router.push(path);
    },
  },
  computed: {
    userInfo() {
      return store.state.user.userinfo;
    },
    token() {
      return store.state.user.token;
    },
    isHome() {
      return this.$route && this.$route.path === '/home';
    },
  },
  watch: {
    $route(to, from) {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header .th .logo img {
  width: 340px;
}

li {
  cursor: pointer;
}

.header-wrap {
  width: 100%;
}
.header-absolute {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  .header-nav {
    background: rgba(14, 106, 242, 0.7) !important;
  }
}
</style>
