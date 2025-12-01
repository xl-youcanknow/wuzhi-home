<template>
  <div class="blog">
   <unequal-sizes></unequal-sizes>
   <div class="box clearfix">
    <div class="left">
      <popular></popular>
    </div>
    <div class="right">
      <blog-search></blog-search>
    </div>
   </div>
   <slide-blog></slide-blog>
  </div>
</template>

<script>
import UnequalSizes from '@/components/blog/UnequalSizes.vue'
import Popular from '@/components/blog/Popular.vue'
import blogSearch from '@/components/blog/blogSearch.vue'
import SlideBlog from '@/components/blog/SlideBlog.vue'
import store from '@/store/index'
export default {
  name: 'blog',
  data () {
    return {
    }
  },
  components:{
    UnequalSizes,
    Popular,
    blogSearch,
    SlideBlog
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box{
  width: 1160px;
  margin: 0 auto;
}
  .blog{
    .left{
      width: 868px;
      float: left;
    }
    .right{
      width: 264px;
      float: left;
      margin-left: 27px;
    }
  }
  @media (min-width:1024px) and (max-width:1400px) { 

    }

    @media (min-width:768px) and (max-width:1024px) {   

    }

    @media only screen and (max-width: 768px){ 
        .box{
          width: 96%;
          margin: 0 2%;
          .left{
            width: 100%;
          }
          .right{
            width: 100%;
            margin-left: 0px;
          }
        }
    }
</style>
