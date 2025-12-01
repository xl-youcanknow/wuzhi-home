<template>
    <div class="resell-container">
        <div class="resell-box" @click="loginSales"> sales </div>
        <router-link to="/resell/coupon"> <div class="resell-box"> coupon </div></router-link>
        <el-dialog :visible.sync="dialogVisible" width="38%" :show-close="false">
            <h6>AGREEMENTS</h6>
            <div class="wrap" v-loading="wrapLoading">
                <p v-if="dataList" v-html="dataList.policy"></p>
            </div>
            <div class="resell-footer">
                <el-button type="primary" @click="confirmPolicy" :loading="loadingBtn">I Agree</el-button>
                <el-button @click="$router.go(-1)">Cancel</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { GetPolicy , PostPolicy , backLogin } from '@/api/index';
import { getToken, setToken, removeToken, getAuth, setAuth, removeAuth } from '@/utils/auth'
import aixos from 'axios';
import Crypto from "@/utils/crypto";
export default {
    data() {
        return {
            dataList:null,
            dialogVisible:false,
            loadingBtn:false,
            wrapLoading:false,
        }
    },
    created() {
        this.wrapLoading = true;
        GetPolicy().then(res=>{
            this.wrapLoading = false;
            if(res.content.user_confirm == 1) {
                this.dialogVisible = false;
            }else {
                this.dialogVisible = true;
                this.dataList = res.content;
            }
        })
    },
    methods: {
        confirmPolicy() {
            this.loadingBtn = true;
            PostPolicy().then(res=>{
                this.loadingBtn = false;
                this.dialogVisible = false;
            })
        },
        loginSales() {
            let url = window.location.origin;
            let username = JSON.parse(localStorage.getItem("userinfonet")).username;
            let password = Crypto.decrypt(JSON.parse(localStorage.getItem("userinfonet")).password);
            backLogin({username:username,password:password}).then(res=>{
                const data = res.data;
                let authArr = data.auth_list.join(',')
                localStorage.setItem('userinfo',JSON.stringify(data));
                setToken(data.user_token);
                setAuth(authArr);
                window.location.href = `${url}/okportal_back`;
            })
        }
    },
   
}
</script>
<style lang="less" scoped>
* {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.resell-container{
    padding: 50px 0;
    .wrap{
        width: 80%;
        margin: 0 auto;
        min-height: 150px;
        p{
            line-height: 30px;
            font-size: 20px;
            color: #a7a9ac;
            text-align: left;
        }
    }
    .resell-box{
        width: 350px;
        margin: 0 auto;
        margin-bottom: 50px;
        text-align: center;
        background: #3e3c89;
        color: #ffffff;
        font-size: 30px;
        padding: 50px 0;
        cursor: pointer;
    }
}
</style>
<style lang="less" scoped>
* {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}

</style>
<style lang="less">
.resell-container {
  .el-dialog {
    border-radius: 15px;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    .close {
      background: #3e3c89;
      color: #ffffff;
      position: absolute;
      top: -4px;
      right: -4px;
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      font-size: 16px;
      border-radius: 100%;
      cursor: pointer;
    }
    h6 {
      font-size: 25px;
      padding: 30px 0;
      text-align: center;
      color: #3e3c89;
    }
    .resell-footer{
        display: flex;
        display: -ms-flexbox;
        justify-content: center;
        padding: 25px 0;
        button{
            padding: 12px 0;
            text-align: center;
            width: 100px;
        }
        .el-button--primary{
            background: #3e3c89;
            border: none
        }
    }
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>