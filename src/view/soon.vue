<template>
  <div class="soon">
    <div class="back">
      <router-link href="/">Back Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'soon',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .soon{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #242776 url('../public/img/blue.jpg') no-repeat center fixed;
    -webkit-background-size: 75%;
    -moz-background-size: 75%;
    -o-background-size: 75%;
    background-size: 75%;
    .back{
      position: absolute;
      bottom: 100px;
      left: 50%;
      margin-left:-50px;
      width: 100px;
      background-color: #5f62c2;
      height: 26px;
      line-height: 26px;
      border-radius: 4px;
      text-align: center;
      a{
      color: #fff;
      display: block;
      font-size: 16px;

      }
    }
  }
</style>
