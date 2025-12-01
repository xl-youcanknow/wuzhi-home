<template>
  <div class="sendEmail">
    <el-dialog title="Purchase product" :visible.sync="EmailSisible" :show-close="false" :close-on-click-modal="false">
  <el-form :model="form" :inline="true">
    <el-form-item label="Please Input Your Email Address">
      <el-input v-model="form.email" ></el-input>
    </el-form-item>
  </el-form-item>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="product_name"
        label="Product"
        width="180">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="Quantity"
        width="180">
      </el-table-column>
      <el-table-column
        prop="discount_price"
        label="Unit Price ( $ ) ">
      </el-table-column>
    </el-table>
    <div class="total-price">Total : ${{totalPrice}} USD</div>
    <p style="margin:10px;color:#666;font-size:16px;font-weight:bold">*Reminder : We will contact you to confirm your order</p>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="hideDialog">Cancel</el-button>
    <el-button type="primary" :loading="load" @click="emailSubmit">Send</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import store from '../store/index.js'//
import {emailBuy} from '@/api/index'
export default {
  name: 'ShopCart',
  props:['EmailSisible'],
  data () {
    return {
      msg: 'ShopCart',
        dialogFormVisible: false,
        load:false,
        form: {
          email: '',
        },
        totalPrice:0,
        checked:[],
        tableData: []
    }
  },
  computed: {
    CartProds:function(){
        return  store.state.products.cartProds;
    },
  },
  watch: {
      CartProds(){
          this.getTotal();
      }
  },
  methods: {
      getTotal(){
          this.tableData = [];
          this.totalPrice = 0;
          for (let i = 0; i < this.CartProds.length; i++) {
          if(this.CartProds[i].checked){
            this.checked.push(true)
            this.tableData.push(this.CartProds[i])
            this.totalPrice += ((parseFloat(this.CartProds[i].discount_price) * parseFloat(this.CartProds[i].quantity)))
          }else{
            this.checked.push(false)
          }   
        }
      },
      hideDialog(){
          this.$emit('hideDialog',false);
      },
      emailSubmit(){
          let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
          if(reg.test(this.form.email)){
            this.load = true;
            emailBuy({pid:this.tableData,email:this.form.email}).then(res=>{
                if(res.code == 200){
                  store.dispatch('products/AC_DeleteCart',this.checked).then(res=>{
                  this.load = false;
                  this.$emit('hideDialog',false);
                  this.$message({
                    message: 'Success',
                    type: 'success'
                  });
                  })
                }
           })
                     
          }else{
             this.$message.error('Error in mailbox format');
          }
      }
  },
  mounted() {
      this.getTotal();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.total-price{
    width: 100%;
    text-align: right;
    padding-right: 10px;
    margin: 20px 0;
    font-size: 24px;
    color: #333;
    font-weight: bold;
}
</style>
<style lang="less">
  
  @media only screen and (max-width: 768px) {
    .sendEmail{
    .el-dialog{
      width:90%;
    }
  }
}
</style>
