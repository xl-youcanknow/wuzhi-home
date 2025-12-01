<template>
  <div class="prevnext clearfix">
      <div class="prev">
          <i class="iconfont">&#xe667;</i>
      </div>
      <div class="next">
          <i class="iconfont">&#xe6ab;</i>
      </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .prevnext{
        margin-bottom: 20px;
        .prev,.next{
            cursor: pointer;
            width: 40px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            float: left;
            background-color: #474747;
            i{
            color: #fff;
            font-size: 20px;

            }
        }
        .next{
            margin-left: 10px;
        }
    }
</style>
