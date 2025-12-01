<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
  import store from '@/store/index'
  export default {
    name: 'Login',
    data(){
      return{
        dialogTableVisible:false,
      }
    },methods:{
      showboy(boolen){
        this.dialogTableVisible=boolen;
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
