<template>
  <div id="app"><router-view /></div>
</template>

<script>
import store from '@/store/index';
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      userinfo: null,
    };
  },
  mounted() {
    const token = this.getTokenFromURL();

    // 2. 存储 token
    if (token) {
      localStorage.setItem('token', token);
       store.commit('user/SET_TOKEN', token);
      // 删除 URL 中的 token
      this.$router.replace({ path: this.$route.path });
    }

    if (token) {
      document.cookie = `TOKEN=${token}; path=/; expires=${new Date(
        '2099-12-31'
      ).toUTCString()}; secure`;
    }
    if (localStorage.getItem('token')) {
      }
      this.getUserInfo();
  },
  methods: {
    getTokenFromURL() {
      // 优先从 Vue Router query 中拿
      if (this.$route.query.token) {
        return this.$route.query.token;
      }

      // 如果 token 在 search 部分
      const params = new URL(window.location.href).searchParams;
      return params.get('token');
    },

    getUserInfo() {
      axios
        .get(
          'https://zyk.icve.com.cn/prod-api/website/projectGroupInfo/detail/info?shortUrl=whzdxxaqjsyyqun'
        )
        .then((res) => {
          if (res.data.code == 200) {
            store.commit('user/SET_USERINFO', res.data.data.projectGroupInfo);
          }
        });
    },
  },
};
</script>

<style lang="less">
@import './css/base.css';
@import './css/slicy.css';
@import './css/style.css';
@import './css/swiper.min.css';
</style>
