<template>
    <div class="user-container">
        <div class="user-card">
            <div class="user-img" v-if="userInfo">
                <el-upload
                class="upload-demo"
                action
                :auto-upload="false"
                :show-file-list="false"
                :on-change="(file, fileList)=>changeUpload(file,fileList)"
                >
                    <img :src="userInfo.img" alt="Header Image">
                </el-upload>
                <el-button type="primary" @click="passwordShow = !passwordShow">Change Password</el-button>
            </div>
            <div class="user-mail">
                <p v-if= "nameUser">{{ nameUser }}</p>
                <p v-else>Username</p>
                <p>{{ emailUser }}</p>
            </div>
        </div>
        <ul class="user-list" v-if="userInfo">
            <li>
                <label>User Name</label>
                <input type="text" v-model="userInfo.name">
            </li>
            <li>
                <label>Full Name</label>
                <input type="text" v-model="userInfo.full_name">
            </li>
            <li>
                <label>Email</label>
                <input type="text" v-model="userInfo.user" disabled>
            </li>
            <li>
                <label>Country</label>
                <input type="text" v-model="userInfo.country" disabled>
            </li>
            <li>
                <label>Language</label>
                <input type="text" v-model="userInfo.language">
            </li>
            <li>
                <label> </label>
                <el-button type="primary" :loading="saveLoading" @click="save">Save</el-button>
            </li>
        </ul>
        <el-dialog :visible.sync="passwordShow" :close-on-click-modal="false" :show-close="false" width="40%" >
            <div class="close" @click="passwordShow = !passwordShow"> <span class="el-icon-close"></span> </div>
            <h6>Change Password</h6>
            <div class="change-box">
                <div class="password-container">
                    <el-input v-model="old_password" placeholder="Old Password" :type="passeyeOld ? 'text' : 'password'"></el-input>
                    <i class="box" :class="passeyeOld ? 'eye' : 'shuteye'" @click="passeyeOld = !passeyeOld"></i>
                </div>
                <div class="password-container">
                    <el-input v-model="password" placeholder="New Password" :type="passeyeNew ? 'text' : 'password'"></el-input>
                    <i class="box" :class="passeyeNew ? 'eye' : 'shuteye'" @click="passeyeNew = !passeyeNew"></i>
                </div>
            </div>
            <div class="footer">
                <el-button type="primary" :loading="saveBtn" @click="change">Confirm</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { GetUserinfo , NewChangePass , EditUserImg , PostUserinfo} from '@/api/index'
import store from "@/store/index";
import Qs from "qs"
export default {
    data() {
        return {
            userInfo:null,
            passwordShow:false,
            saveBtn:false,
            old_password:'',
            password:'',
            nameUser:'',
            emailUser:'',
            saveLoading:false,
            passeyeOld:false,
            passeyeNew:false,
        }
    },
    created() {
        GetUserinfo().then(res=>{
            this.userInfo = res.content;
            this.userInfo.img = res.content.img || require('@/public/img/user/user_default.png');
            this.nameUser = res.content.name;
            this.emailUser = res.content.user;
        })
    },
    methods: {
        change() {
            if(this.old_password.length > 0 || this.password.length > 0) {
                this.saveBtn = true;
                NewChangePass(Qs.stringify({password:this.password,old_password:this.old_password})).then(res=>{
                    this.saveBtn = false;
                    if(res.code == 200) {
                        this.$message.success("Successful !!");
                        store.dispatch('user/AC_loginout')
                        window.location.href = `https://${document.domain}/`;
                    }else {
                        this.$message.warning(res.content);
                    }
                } )
            }else {
                this.$message.warning('Please input all infomation');
            }
        },
        changeUpload(file, fileList) {
            let formData = new FormData();
            formData.append("file", file.raw);
            EditUserImg(formData).then(res=>{
                this.userInfo.img = res.content;
            })
        },
        save() {
            this.saveLoading = true;
            PostUserinfo(Qs.stringify(this.userInfo)).then(res=>{
                this.saveLoading = false;
                this.$message.success("Save success !!");
                this.nameUser = this.userInfo.name;
            })
        }
    }
}
</script>
<style lang="less" scoped>
* {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.user-container{
    width: 890px;
    min-height: 560px;
    margin: 30px auto;
    padding: 30px 0;
    .user-card{
        width: 80%;
        margin: auto;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 40px;
        .user-img{
            width: 180px;
            img{
                width: 100%;
                cursor: pointer;
                display: block;
                border-radius: 100%;
                overflow: hidden;
                padding: 5px;
                box-sizing: border-box;
            }
            button{
                margin-top: 10px;
                width: 100%;
                background: #30327F;
                border: none;

            }
        }
        .user-mail{
            p:nth-of-type(1){
                font-weight: 900;
                color: #31317e;
                font-size: 40px;
            }
            p:nth-of-type(2){
                font-size: 30px;
                padding: 16px 5px;
                border-bottom: 2px solid #31317e
            }
        }
    }
    .user-list{
        padding-top: 50px;
        width: 80%;
        margin: 0 auto;
        li{
            margin-bottom: 25px;
            label{
                width: 100px;
                display: inline-block;
                font-weight: 600;
                color: #919191;
            }
            input{
                width: calc(100% - 105px);
                padding: 8px 12px;
                box-sizing: border-box;
                border: 1px solid #857CAD;
                border-radius: 8px;
            }
            button{
                margin-top: 10px;
                width: 100%;
                background: #30327F;
                border: none;
                display: inline-block;
                width: 150px;
            }
        }
    }
    .password-container{
    position: relative;
    .box{
      display: inline-block;
      width: 23px;
      height: 23px;
      position: absolute;
      top: 12px;
      right: 15px;
      padding: 0;
      cursor: pointer;
      &.eye{
        background: url('../../public/img/user/eye.png') no-repeat center;
        background-size: 100% 100%;
      }
      &.shuteye{
        background: url('../../public/img/user/shuteye.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
<style lang="less">
.user-container {
  .el-dialog {
    border-radius: 15px;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    .change-box{
        width: 80%;
        margin: 0 auto;
        .el-input{
            margin-bottom: 30px;
        }
    }
    .close {
      background: #3e3c89;
      color: #ffffff;
      position: absolute;
      top: -5px;
      right: -5px;
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
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
    font-weight: 600;
  }
  .footer{
      width: 80%;
      margin: 0 auto;
      text-align: right;
      padding-bottom: 30px;
      button{
        background: #30327F;
        border: none;
      }
  }
}
@media only screen and (max-width: 768px) {
  .user-container{
    .el-dialog {
      width: 96% !important;
    }
  }
}
</style>