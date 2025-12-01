<template>
  <div class="coupon-contaienr">
    <h6>You can create some .....</h6>
    <div class="creat-from">
      <el-input
        v-model="num"
        type="number"
        placeholder="Number"
        clearable
      ></el-input>
      <el-button type="primary" @click="creatNumber" :loading="loadingBtn">Create</el-button>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%;margin-top:50px"
      v-loading="loadingTable">
      <el-table-column
        prop="sales_code"
        label="Sales Code" 
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="commission"
        label="Commission"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="discount"
        label="discount"
        align="center">
      </el-table-column>
      <el-table-column
        prop="used"
        label="Used"
        align="center">
      </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total_count"
    style="margin-top:50px;padding-bottom:30px;"
    align="center"
    @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import { GetCreateCoupon, PostCreateCoupon } from "@/api/index";
import Qs from "qs";
export default {
  data() {
    return {
      dataList: null,
      num: null,
      loadingBtn:false,
      total_count:null,
      loadingTable:false
    };
  },
  created() {
      this.getData(1)
  },
  methods: {
    getData(page_no) {
      this.loadingTable = true;
      GetCreateCoupon({ page_no: page_no, page_size: 10 }).then(res => {
        this.loadingTable = false;
        this.dataList = res.content.list;
        this.total_count = res.content.total_count;
      });
    },
    creatNumber() {
      if(this.num > 0) {
        this.loadingBtn = true;
        PostCreateCoupon(Qs.stringify({ num: this.num })).then(res => {
            this.loadingBtn = false;
            this.$message.success("Creat success !!");
          //   location.reload();
          this.getData(1)
        });
      }else{
        this.$message.warning("Please input Number !");
      }
    },
    handleCurrentChange(val) {
        this.getData(val)
    }
  }
};
</script>
<style lang="less" scoped>
* {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.coupon-contaienr {
  width: 1190px;
  margin: 0 auto;
  padding: 30px 0;
  h6 {
    font-size: 20px;
    padding: 25px 0;
    padding-bottom: 50px;
  }
  .creat-from {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    .el-input{
        width: 30%;
        margin-right: 25px;
    }
    button{
        background: #678bf1;
        border: none;
    }
  }
}
@media only screen and (max-width: 768px) {
    .coupon-contaienr {
        width: 96%;
        h6{
            padding: 30px 0;
        }
        .creat-from {
            .el-input{
                width: 50%;
            }
        }
    }
}
</style>
<style lang="less">
.coupon-contaienr {
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background: #32327E;
    }
}
</style>