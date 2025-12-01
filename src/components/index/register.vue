<template>
  <div class="login-container">
    <input type="text" placeholder="Email" v-model.trim="regiterModel.email" ref="email">
    <div class="password-container">
      <input :type="passeye ? 'text' :'password'" placeholder="Password" v-model.trim="regiterModel.password" ref="password">
      <i class="box" :class="passeye ? 'eye' : 'shuteye'" @click="passeye = !passeye"></i>
    </div>
    <div class="password-container">
      <input :type="passeyeComfirm ? 'text' : 'password'" placeholder="Confirm Password" v-model.trim="regiterModel.confirmpassword" ref="confirmpassword">
      <i class="box" :class="passeyeComfirm ? 'eye' : 'shuteye'" @click="passeyeComfirm = !passeyeComfirm"></i>
    </div>
    <el-select v-model="regiterModel.country" placeholder="Country" class="get-country" style="margin-bottom:0" @change="select">
        <el-option
        v-for="item in coutryList"
        :key="item.id"
        :value="item.id"
        :label="item.name">
        <span style="font-size:16px">{{item.name}}</span>
        </el-option>
    </el-select>
    <div class="code">
        <input type="number" placeholder="Verification Code" v-model.trim="regiterModel.code" ref="code">
        <span @click="sendCode()" v-if="sendCodeFlag">SEND CODE</span>
        <span v-else>{{totaltime}} s</span>
    </div>
    <Verify
      width="300"
      ref="logverify"
      @success="checkbut=false"
      explain="Drag the slider to the right"
      :type="3"
    ></Verify>
    <el-button class="mainbtn" :loading="loading" @click="regiter()">Register</el-button>
    <p> Already HAVE AN ACCOUNT? </p>
    <p>
      <router-link to="/advertising/login">LOGIN HERE </router-link>
    </p>
  </div>
</template>
<script>
import Verify from "@/components/Verify";
import store from "@/store/index";
import { getCountry, vercode, registerAPI } from "@/api/index";
export default {
  components: {
    Verify
  },
  data() {
    return {
      checked: true,
      checkbut: true,
      password: null,
      loading: false,
      passeye: false,
      passeyeComfirm: false,
      coutryList:null,
      coutry:null,
      totaltime:60,
      sendCodeFlag:true,
      regiterModel:{
        email: '',
        country:null,
        countrycode:'',
        password:'',
        code:'',
        confirmpassword:'',
        vcode:''
      }
    };
  },
  created() {
      this.getcoutry();
      // let searchCode = window.location.search;
      let searchCode = this.$route.query.code;
      this.regiterModel.vcode = searchCode || '';
  },
  methods: {
    getcoutry() {
        getCountry().then(res=>{
            this.coutryList = res.content;
        })
    },
    regiter() {
      let register = this.regiterModel;
      console.log(register)
      if(!register.email) {
        this.$message.error("Please input email!");
      }else if(!register.password) {
        this.$message.error("Please input password!");
      }else if(register.password != register.confirmpassword) {
        this.$message.error("Please input confirmpassword!");
      }else if(!register.code) {
        this.$message.error("Please input Verification Code!");
      }else if(!register.country) {
        this.$message.error("Please select country!");
      }else if(this.checkbut) {
        this.$message.error("Please Drag the slider to the right!");
      }else {
        registerAPI({
          username:register.email,
          pwd:register.password,
          code:register.code,
          country:register.country,
          countrycode:register.countrycode,
          vcode:register.vcode
        }).then(res=>{
            if(res.code == 200){
              this.$message.success("Registration Successful");
              this.$router.push('/advertising/login');
            }else if(res.code == -3){
              this.$message.error("Wrong Verification Code");
            }else if(res.code == -1){
              this.$message.error("Fail Register");
            }else if(res.code == -4){
              this.$message.error("User Already Exists");
            }else if(res.code == -2){
              this.$message.error("Verification Code Expiration");
            }
        })
      }
    },
    select(val) {
      let obj = this.coutryList.filter(item => item.id == val);
      this.regiterModel.countrycode = obj[0].phonecode;
      this.regiterModel.country = obj[0].name; //转名字
    },
    sendCode() {
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(reg.test(this.regiterModel.email)) {
          this.sendCodeFlag = false;
          let timer =  window.setInterval(()=>{
            this.totaltime--;
            if(this.totaltime == 0) {
              this.sendCodeFlag = true;
              this.totaltime = 60;
              window.clearInterval(timer)
            }
          },1000);
          vercode({ username:this.regiterModel.email, countryid:this.regiterModel.country, countrycode:this.regiterModel.countrycode }).then(res=>{
            if(res.code == 1){
              this.$message.success("Check Your Email for Verification Code");
            }else if(res.code == -1){
              this.totalTime=5;
              this.$message.error("Fail to Send");
            }else if(res.code == -3){
              this.$message.error("Send Too Often ,Try Again Later");
              this.totalTime=5;
            }
            else if(res.code == -6){
              this.$message.error("User Already Exists");
              this.totalTime=5;
            }
          })
           
        }else{
          this.$message.error("Enter Your Email");
        }
    }
    
  }
};
</script>
<style lang="less" scoped>
.login-container {
  box-sizing: border-box;
  padding: 20px 20px;
  .password-container{
    position: relative;
   .box{
      padding: 0;
      display: inline-block;
      width: 23px;
      height: 23px;
      position: absolute;
      top: 12px;
      right: 15px;
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
    margin-bottom: 10px;
    font-size: 18px;
    padding: 10px 15px;
    border: 2px solid #918ab8;
    border-radius: 15px;
    -moz-border-radius: 15px; /* Firefox */
    -webkit-border-radius: 15px; /* Safari 和 Chrome */
    -o-border-radius: 15px; /* Safari 和 Chrome */
  }
  .get-country{
      width: 100%;
      margin-bottom: 10px;
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
    margin-bottom: 10px;
    color: #b5b7b9;
    font-weight: 600;
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
    }
  }
  .verify-bar-area {
      border-color: #3E3C89;
    .verify-move-block {
      background: #3e3c89 !important;
      border-color: #3E3C89 !important;
    }
  }
  .mainbtn {
    background: #3e3c89;
    color: #ffffff;
    padding: 10px 30px;
    margin: 20px 0;
    border: none;
    border-radius: 15px;
    -moz-border-radius: 15px; /* Firefox */
    -webkit-border-radius: 15px; /* Safari 和 Chrome */
    -o-border-radius: 15px; /* Safari 和 Chrome */
    span {
      font-size: 20px;
    }
  }
  .el-select-dropdown__item{
      span{
          font-size: 18px;
      }
  }
  .el-input{
    .el-input__inner{
        font-size: 20px;
        border: none
    }
}
}
@media only screen and (max-width: 1400px) {
    .login-container {
        padding: 5px !important;
        input{
          margin-bottom: 10px !important;
        }
        .mainbtn{
          margin: 15px 0;
        }
        .el-checkbox{
          margin-bottom: 20px !important
        }
        .el-select .el-input__inner{
          margin-bottom: 0 !important;
        }
        .code{
          margin-bottom: 13px !important;
          padding: 0 !important;
          input{
            margin-bottom: 0 !important;
            
          }
        }
    }
}
@media only screen and (max-width: 768px) {
  .login-container {
    input{
      margin-bottom: 20px !important;
    }
    .code{
      padding: 7px 0 !important;
      input{
        padding: 10px 5px;
        width: 60% !important;
      }
    }
    .mainbtn{
      margin: 20px 0 !important;
      font-size: 18px !important;
    }
    p{
      font-size: 18px !important;
      font-weight: 400 !important;
    }
  }
}
</style>
