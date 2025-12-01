<template>
<div>
  <div class="login-container" v-if="loginShow">
    <input type="text" placeholder="Email" v-model="email" ref="email" autocomplete="off">
    <div class="password-container">
      <input :type="passeye ? 'text':'password'" placeholder="Password" v-model="password" ref="password"  autocomplete="off">
      <i class="box" :class="passeye ? 'eye' : 'shuteye'" @click="passeye = !passeye"></i>
    </div>
    <el-checkbox v-model="checked" style="margin-bottom:30px">Remember me</el-checkbox>
    <Verify
      width="300"
      ref="logverify"
      @success="checkbut=false"
      explain="Drag the slider to the right"
      :type="3"
    ></Verify>
    <el-button class="mainbtn" :loading="loading" @click="login()">Login</el-button>
    <p @click="loginShow = !loginShow">FORGOT PASSWORD</p>
    <p><router-link to="/advertising/register">NO ACCOUNT ? SIGN UP HERE</router-link> </p>
  </div>
  <div class="login-container" v-else>
    <div v-if="changeShow">
      <input type="text" placeholder="Email" v-model="findEmail" ref="findEmail">
      <div class="code">
          <input type="number" placeholder="Verification Code" v-model.trim="code" ref="code">
          <span @click="sendCode()" v-if="sendCodeFlag">GET CODE</span>
          <span v-else>{{totaltime}} s</span>
      </div>
      <el-button class="mainbtn" :loading="loading2" @click="ver()" style="margin:0 auto">NEXT</el-button>
      <p style="margin-top:20px" @click="loginShow = true">Go Login</p>
    </div>
    <div v-else>
      <div class="password-container">
        <input :type="passeye2 ? 'text' : 'password'" placeholder="password" v-model="passwordchange" ref="password">
        <i class="box" :class="passeye2 ? 'eye' : 'shuteye'" @click="passeye2 = !passeye2"></i>
      </div>
      <div class="password-container">
        <input :type="passeye3 ? 'text' :'password'" placeholder="confirm password" v-model="confirmpassword" ref="confirmpassword">
        <i class="box" :class="passeye3 ? 'eye' : 'shuteye'" @click="passeye3 = !passeye3"></i>
      </div>
      <el-button class="mainbtn" :loading="loading" @click="changepaswword()" style="margin:0 auto">CHANGE</el-button>
    </div>
  </div>
</div>
</template>
<script>
import Verify from "@/components/Verify";
import store from "@/store/index";
import Crypto from "@/utils/crypto";
import { getUrl, findpwdcode, checkcode, retrievepassword } from "@/api/index";
export default {
  components: {
    Verify
  },
  data() {
    return {
      checked: true,
      checkbut: true,
      email: null,
      password: null,
      loading: false,
      loginShow:true,
      code:'',
      totaltime:60,
      sendCodeFlag:true,
      findEmail:'',
      totaltime:60,
      changeShow:true,
      passwordchange:'',
      confirmpassword:'',
      loading2: false,
      passeye:false,
      passeye2:false,
      passeye3:false
    };
  },
  created() {
    if(localStorage.getItem("userinfonet")) {
      this.email = JSON.parse(localStorage.getItem("userinfonet")).username;
      this.password = Crypto.decrypt(JSON.parse(localStorage.getItem("userinfonet")).password);
    }
  },
  methods: {
    login() {
      if (!this.email) {
        this.$refs.email.focus();
      } else if (!this.password) {
        this.$refs.password.focus();
      } else if (this.checkbut) {
        this.$message.warning("Please slider!");
      } else {
        this.loading = true;
        let data = {
          username: this.email,
          pwd: this.password,
          pid: store.state.products.cartProds
        };
        store.dispatch("user/AC_login", { data }).then(res => {
          this.loading = false;
          if (res.code == 200) {
            /* license */
            localStorage.setItem("returnid", res.userinfo.id);
            /* sales */
            localStorage.setItem("Ident", res.userinfo.sales_authority);
            localStorage.setItem("salesId", res.userinfo.sales_id);
            localStorage.setItem("Authorization", res.token);
            localStorage.setItem("Adv",res.adv);
            localStorage.setItem("sortName",res.userinfo.sortname)
            /* ****************** */
            let cart = res.shoppingcart;
            localStorage.setItem("cartList", JSON.stringify(cart));
            if (this.checked) {
              // console.log(this.password)
              let CRYPTO_PWD = Crypto.encrypt(this.password); /* aes加密 */
              let userinfo = {
                username: this.email,
                password: CRYPTO_PWD,
              };
              localStorage.setItem("userinfonet", JSON.stringify(userinfo));
            }else {
              localStorage.removeItem("userinfonet")
            }
            /* license */
            getUrl().then(res => {
              if (res.code == 1) {
                window.localStorage.setItem("netUrl", res.content);
                let ipdomain = window.location.host;
                window.location.href = `http://${ipdomain}/home` 
              }
            });
            /* ******* */
          } else {
            this.$refs.logverify.refresh();
            localStorage.removeItem("userinfonet")
            this.$message.error("Wrong Username or Password ");
            this.loading = false;
          }
        });
      }
    },
    sendCode() {
      let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if(reg.test(this.findEmail)) {
        this.sendCodeFlag = false;
        let timer =  window.setInterval(()=>{
            this.totaltime--;
            if(this.totaltime == 0) {
              this.sendCodeFlag = true;
              this.totaltime = 60;
              window.clearInterval(timer)
            }
        },1000);
        findpwdcode({username:this.findEmail}).then(res=>{
          if(res.code == 1){
            this.$message.success("Check Your Email for Verification Code");
          }else if(res.code == -2){
            this.$message.error("User Does Not Exist");
            register.totalTime=5;
          }else if(res.code == -1){
            this.$message.error("Fail to Send");
            register.totalTime=5;
            that.checksend = false;
          }else if(res.code == -3){
            this.$message.error("Verification Code Expiration");
            register.totalTime=5;
            that.checksend = false;
          }
        })
      }else {
        this.$message.error("Enter Your Email");
      }
    },
    ver() {
      let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if(reg.test(this.findEmail) && this.code.length>0) {
        this.loading2 = true;
        checkcode({
          code:this.code,
          username:this.findEmail,
        }).then(res=>{
          this.loading2 = false;
          if(res.code == 1){
            this.changeShow=!this.changeShow;
          }else if(res.code == -1){
            this.$message.error("Verification Code Expiration");
          }else  if(res.code == -2){
            this.$message.error("Verification Code Expiration");
          }else  if(res.code == -3){
            this.$message.error("Please Get Verification Code First");
          }else  if(res.code == -4){
            this.$message.error("User Does Not Exists ");
          }
        })
      }
    },
    changepaswword() {
      if(!this.passwordchange && !this.confirmpassword) {
        this.$message.error("Please Enter Password!");
      }else if(this.passwordchange != this.confirmpassword) {
        this.$message.error("Entered passwords differ!");
      }else {
        retrievepassword({pwd:this.confirmpassword}).then(res=>{
            if(res.code==1){
              this.loginShow=!this.loginShow;
              this.$message.success("Password Change Success");
            }
        })
        
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login-container {
  box-sizing: border-box;
  padding: 50px 20px;
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
  input {
    box-sizing: border-box;
    width: 100%;
    display: block;
    margin-bottom: 30px;
    font-size: 18px;
    padding: 10px 15px;
    border: 2px solid #918ab8;
    border-radius: 15px;
    -moz-border-radius: 15px; /* Firefox */
    -webkit-border-radius: 15px; /* Safari 和 Chrome */
    -o-border-radius: 15px; /* Safari 和 Chrome */
  }
  .code{
      border-top: 1px solid #3E3C89;
      border-bottom: 1px solid #3E3C89;
      padding: 7px 0;
      margin-bottom: 20px;
      input{
          display: inline-block;
          width: 70%;
          border: none;
          margin-bottom: 0;
      }
      span{
          color: #3e3c89;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          display: inline-block;
          flex: right
      }
  }
  p {
    font-size: 20px;
    margin-bottom: 15px;
    color: #b5b7b9;
    font-weight: 600;
    cursor: pointer;
    &:nth-of-type(2) {
      color: #469ad1;
      margin-bottom: 0;
    }
    a{
      color: inherit
    }
  }
}
</style>
<style lang="less">
.login-container {
  .el-checkbox {
    .el-checkbox__input {
      .el-checkbox__inner {
        width: 18px;
        height: 18px;
        background: #3e3c89;
        border-color: #3e3c89;
        &::after {
          top: 2px;
          left: 7px;
        }
      }
    }
    &.is-checked {
      span {
        color: #3e3c89;
      }
    }
    span {
      font-size: 18px;
      font-weight: 600;
      .is-checked {
      }
    }
  }
  .verify-bar-area {
      border-color: #3E3C89;
    .verify-move-block {
      background: #3e3c89 !important;
      border-color: #3E3C89 !important;
    }
    .verify-msg{
      padding-left: 20px;
    }
  }
  .mainbtn {
    background: #3e3c89;
    color: #ffffff;
    padding: 10px 30px;
    margin: 30px 0;
    border: none;
    border-radius: 15px;
    -moz-border-radius: 15px; /* Firefox */
    -webkit-border-radius: 15px; /* Safari 和 Chrome */
    -o-border-radius: 15px; /* Safari 和 Chrome */
    span {
      font-size: 20px;
    }
  }
}
@media only screen and (max-width: 1400px) {
    .login-container {
        padding: 30px !important;
        input{
          margin-bottom: 20px !important;
        }
        .mainbtn{
          margin: 20px 0;
        }
        .el-checkbox{
          margin-bottom: 20px !important
        }
    }
}
</style>
