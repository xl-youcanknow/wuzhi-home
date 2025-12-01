<template>
    <div class="mask" v-on:dblclick.stop="maskBool" v-show="losinShow">
      <div class="contentbody">
        <div class="loginpage" v-on:dblclick.stop="returnfalse()">
          <i class="el-icon-error remove-mask" v-on:click.stop="maskBool"></i>
          <div class="logo" >
            <img src="../public/img/logo.png" alt="">
          </div>
          <ul class='login' v-show="loginpage">
            <li class="clearfix">
              <div class="iconfont icon">&#xe63f;</div>
              <div class="input">
                <input type="text" v-model.trim="login.username" placeholder="Email" @blur="initverify">
              </div>
            </li>
            <li class="clearfix">
              <div class="iconfont icon">&#xe67a;</div>
              <div class="input">
                <input :type="passwordEy ? 'text':'password'" v-model.trim="login.password"  @keyup.enter="logins"  placeholder="password">
                <i class="iconfont check "  @click="passwordEy = !passwordEy">&#xe610;</i>
              </div>
            </li>
            <li class="remember">
              <el-checkbox v-model.trim="login.remember">Remember me</el-checkbox>
            </li>
            <li class="verify">
              <template>
                <Verify width="300" ref="logverify" @success="login.checkbut=false" @error="alert('error')" explain="Drag the slider to the right" :type="3"></Verify>
              </template>
            </li>
            <li class="clearfix" style="text-align:center">
              <el-button :loading="loading" round class="submit"  @click="logins">Login</el-button>
            </li>
            <li>
              <div class="fortg" @click="showfind" >
                FORGOT PASSWORD?
              </div>
              <div class="reg" @click="showreg"  style="color: #2b2b82">
                NO ACCOUNT ? SIGN UP
              </div>
            </li>
          </ul>
          <ul class="register" v-show="regpage" >
            <li class="clearfix">
              <div class="input">
                <input type="text"  placeholder="Email" v-model.trim="register.email" @blur="initverify">
              </div>
            </li>
            <li class="clearfix">
              <div class="input">
                <input :type="register.see[0]" v-model.trim="register.password" placeholder="password">
                <i class="iconfont check "  @click="seepwd(0)">&#xe610;</i>
              </div>
            </li>
            <li class="clearfix">
              <div class="input">
                <input :type="register.see[1]" v-model.trim="register.comfirm" @blur="checkpass" placeholder="confirm password" >
                <i class="iconfont check "  @click="seepwd(1)">&#xe610;</i>
              </div>
            </li>
            <li class="clearfix">
              <div class="input">
                <el-select v-model="register.country"  ref="selectfow" filterable placeholder="Country" @change="bindcountry">
                  <el-option
                    v-for="(item,index) in register.countryArr"
                    :key="index"
                    :label="item.name"
                    :value="item.name" >
                  </el-option>
                </el-select>
              </div>
            </li>

            <li class="clearfix">
              <div class="input" @mouseenter="enterbut()" @mouseleave="leavebut()">
                <input type="text"   placeholder="Verification Code" v-model.trim="register.code">
                <el-button  type="text" class="getcode" @click="getcode()"> {{register.sendCode}}</el-button>
              </div>
            </li>
            <li>
              <template>
                <Verify width="300" ref="regverify" @success="register.checkbut=false" @error="alert('error')" explain="Drag the slider to the right" :type="3"></Verify>
              </template>
            </li>
            <li class="clearfix" style="text-align:center">
              <el-button :loading="loading"   round class="submit" @click="registers">Register</el-button>
            </li>
            <li>
              <div class="reg" @click="showlogin">
                Go Login
              </div>
            </li>
          </ul>
          <ul class="register" v-show="findpage">
            <div v-show="findshow">
              <li class="clearfix">
                <div class="input">
                  <input type="text"  placeholder="Email" v-model.trim="find.email" @blur="initverify">
                </div>
              </li>
              <li class="clearfix">
                <div class="input" @mouseenter="fenterbut()" @mouseleave="fleavebut()">
                  <input type="text"  placeholder="Verification Code" v-model.trim="find.code">
                  <el-button type="text" class="getcode" @click="getfindcode()">{{find.sendCode}}</el-button>
                </div>
              </li>
              <template>
                <Verify width="300" ref="findverify" @success="verifierval=true" @error="alert('error')" explain="Drag the slider to the right" :type="3"></Verify>
              </template>
              
              <li class="clearfix" style="margin-top: 15px; text-align:center">
                <el-button :loading="loading"   round class="submit" @click="verifier">verifier</el-button>
              </li>
            </div>
            <div v-show="!findshow">
              <li style="text-align: center; color: #828282;font-size: 16px">Please enter a New Password</li>
              <li class="clearfix">
                <div class="input">
                  <input :type="find.see[0]" v-model.trim="find.pass" placeholder="new password">
                  <i class="iconfont check "  @click="seefindpwd(0)">&#xe610;</i>
                </div>
              </li>
              <li class="clearfix" style="margin-top: 15px; text-align:center">
                <el-button :loading="loading" round class="submit" @click="chengepass">Confirm</el-button>
              </li>
            </div>
            <li>
              <div class="reg" @click="showlogin">
                Cancel Change
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import {retrievepassword,checkcode,findpwdcode,vercode,getCountry,registerAPI,getUrl} from '@/api/index'
import store from '@/store/index'
import Verify from '@/components/Verify'
import Crypto from "@/utils/crypto";
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login',
      passwordEy:false,
      login:{
        userinfo:[],
        username:'',
        password:'',
        errortips:false,
        tips:"",
        remember:true,
        checkbut:true,
      },find:{
        verifierval:false,
        code:"",
        email:"",
        pass:"",
        comfirm:"",
        sendCode:"Send Code",
        totalTime:60,
        see:['password','password'],
        checkbut:true,
      }
      ,
      register:{
        email:"",
        username:'',
        password:'',
        comfirm:'',
        countryArr: [],
        country: '',
        countrycode: '',
        code:"",
        sendCode:"Send Code",
        totalTime:60,
        see:['password','password']
        ,   checkbut:true,
      },
      checksend:true,
      loading:false,
      loginpage:true,
      findpage:false,
      regpage:false,
      findshow:true
    }
  },
  computed: {
    losinShow(){
      return store.state.user.losinShow
    }
  },
  props:["show"],
  methods: {
    enterbut(e){
      const dom=event.target;
      if(dom.lastElementChild.disabled && dom.lastElementChild.innerText=="Send Code"){
       this.$refs.regverify.boxShod();
      }
    },
    fleavebut(e){
      this.$refs.findverify.unboxShod();
    },
    fenterbut(e){
      const dom=event.target;
      if(dom.lastElementChild.disabled && dom.lastElementChild.innerText=="Send Code"){
        this.$refs.findverify.boxShod();
      }
    },
    leavebut(e){
      this.$refs.regverify.unboxShod();
    },
    showfind(){
      this.loginpage=false;
      this.findpage=true;
      this.regpage=false
      this.init();
    },
    showlogin(){
      this.findshow=true;
      this.loginpage=true;
      this.findpage=false;
      this.regpage=false;
      this.init();
    },
    showreg(){
      getCountry().then(res=>{
        this.register.countryArr = res.content;
      })
      this.loginpage=false;
      this.findpage=false;
      this.regpage=true;
      this.init();
    },
    init(){
      this.$refs.logverify.refresh();
      this.$refs.regverify.refresh();
      this.$refs.findverify.refresh();
      this.loading=false;
      this.checksend=true;
      this.login.checkbut=true;
      this.register.checkbut=true;
      this.find.verifierval=false;
    },
    initverify(){
      this.init();
    },
    verifier(){
      let find = this.find;
      let check=(key)=>{
        return this.find[key].length>0;
      }
      if(check('email') && check('code')) {
        if(this.verifierval){
          checkcode({
              code:find.code,
              username:find.email,
          }).then(res=>{
              if(res.code == 1){
                  this.findshow=!this.findshow;
              }else if(res.code == -1){
                this.open2("Verification Code Expiration","error");
              }else  if(res.code == -2){
                  this.open2("Wrong Verification Code","error");
              }else  if(res.code == -3){
                this.open2("Please Get Verification Code First","error");
              }else  if(res.code == -4){
                this.open2("User Does Not Exists ","error");
              }
            })
        }else{
          this.open2("Please Slide Authentication");
        }
      }else{
        this.open2("Enter Your Email and Code","warning");
      }
    },
    chengepass(){     //修改密码
      this.loading=true;
      if(this.find.pass.length<1){
        this.open2("Enter Your Password ","warning");
        this.loading=false;
      }else{
      retrievepassword({
        pwd:this.find.pass,
      }).then(res=>{
          if(res.code==1){
            this.findshow=!this.findshow;
            this.init();
            this.open2("Password Change Success","warning");
            this.showlogin();
          }
      });
      }
    },
    getfindcode(){    //提交邮箱获取验证码
      let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      let find = this.find;
      let that = this;
      if(find.email.length>0){
        if(reg.test(find.email) ){  //邮箱正则
          if(find.totalTime == 60){
            this.checksend = true;
            find.sendCode = find.totalTime
            let clock = window.setInterval(() => {
              find.totalTime--;
              find.sendCode = find.totalTime;
              if (find.totalTime < 0) {     //当倒计时小于0时清除定时器
                window.clearInterval(clock)
                find.sendCode = 'Resend'
                find.totalTime = 60;
                that.checksend = false;
              }
            },1000)
            findpwdcode({
              username:find.email,
            }).then(res=>{
              if(res.code == 1){
                this.open2("Check Your Email for Verification Code","success");
              }else if(res.code == -2){
                this.open2("User Does Not Exist","error");
                register.totalTime=5;
              }else if(res.code == -1){
                this.open2("Fail to Send","error");
                register.totalTime=5;
                that.checksend = false;
              }else if(res.code == -3){
                this.open2("Verification Code Expiration","error");
                register.totalTime=5;
                that.checksend = false;
              }
            })
          }
        }else{
          this.open2("Wrong Email","warning");
        }
      }else{
        this.open2("Enter Your Email","warning");
      }
    },
    alert(i,type){
    },
    seefindpwd(i){
      let see =  this.find.see;
      if(i == 0){
        if(see[0] == "password"){ this.$set(see,0,'text')
        }else{ this.$set(see,0,'password')}
      }else{
        if(see[1] == "password"){ this.$set(see,1,'text')
        }else{this.$set(see,1,'password')}
      }
    },
    checkpass(){
      let register = this.register;
      if(register.password != register.comfirm){
        this.open2("Inconsistent Passwords","warning");
        register.comfirm = "";
        return false;
      }
    },
    logins(){
      this.loading = true;
      let data = {
        username:this.login.username,
        pwd:this.login.password,
        pid:store.state.products.cartProds
      }
      if(this.login.username.length < 1 || this.login.password.length <1){
        this.open2("Username and Password Cannot be Empty","warning");
        this.loading = false;
        return false;
      }

      if(this.login.checkbut){
        this.open2("Please Slide Authentication");
        this.loading = false;
        return false;
      }
     
       store.dispatch('user/AC_login',{data}).then(res=>{
          if(res.code == 200){
            /* license */
            localStorage.setItem("returnid",res.userinfo.id);
            /* sales */
            localStorage.setItem("Ident",res.userinfo.sales_authority);
            localStorage.setItem("salesId",res.userinfo.sales_id);
            localStorage.setItem("Authorization",res.token);
            localStorage.setItem("Adv",res.adv);
            localStorage.setItem("sortName",res.userinfo.sortname)
            /* ****************** */
            let cart = res.shoppingcart;
            localStorage.setItem('cartList',JSON.stringify(cart));
            if(this.login.remember){
              let CRYPTO_PWD = Crypto.encrypt(this.login.password); /* aes加密 */
              let userinfo = {username:this.login.username,password:CRYPTO_PWD}
              localStorage.setItem('userinfonet',JSON.stringify(userinfo))
            }
            /* license */
            getUrl().then(res=>{
              if(res.code == 1){
                window.localStorage.setItem("netUrl",res.content)
                location.reload();
              }
            })
            /* ******* */
          }else{
            this.open2("Wrong Username or Password ","error");
            this.login.errortips = true;
            this.loading = false;
          }
        })
    },
    seepwd(i){
      let see =  this.register.see;
      if(i == 0){
        if(see[0] == "password"){ this.$set(see,0,'text') 
        }else{ this.$set(see,0,'password')}
      }else{
         if(see[1] == "password"){ this.$set(see,1,'text') 
        }else{this.$set(see,1,'password')}
      }
    },
    bindcountry(value){
      let obj = {};
      obj = this.register.countryArr.find((item)=>{
        return item.name === value;
      });
      this.register.countrycode = obj.phonecode;
    },
    getcode(){
      let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      let login = this.login;
      let register = this.register;
      let that = this;
      console.log('run')
        if(register.email.length>0){
          if(reg.test(register.email) ){  //邮箱正则
              if(register.totalTime == 60){
                this.checksend = true;
                register.sendCode = register.totalTime
                let clock = window.setInterval(() => {
                  register.totalTime--;
                  register.sendCode = register.totalTime;
                  if (register.totalTime < 0) {     //当倒计时小于0时清除定时器
                    window.clearInterval(clock)
                    register.sendCode = 'Resend'
                    register.totalTime = 60;
                    that.checksend = false;
                  }
                },1000)
                vercode({
                username:register.email,
                countryid:register.country,
                countrycode:register.countrycode
                }).then(res=>{
                  if(res.code == 1){
                    this.open2("Check Your Email for Verification Code","success");

                  }else if(res.code == -1){
                    this.open2("Fail to Send","error");
                    register.totalTime=5;
                    that.checksend = false;
                  }else if(res.code == -3){
                    this.open2("Send Too Often ,Try Again Later","error");
                    register.totalTime=5;
                    that.checksend = false;
                  }
                  else if(res.code == -6){
                    this.open2("User Already Exists","error");
                    register.totalTime=5;
                    that.checksend = false;
                  }
              })            
            }
          }else{
            this.open2("Wrong Email","warning");
          }
        }else{
          this.open2("Enter Your Email","warning");
        }
    },
    registers(){
        let register = this.register;
        let check=(key)=>{
          return this.register[key].length>0;
        }
        if(check('email') && check('country') && check('password') && check('comfirm') && check('code')){
           if(this.register.checkbut){
            this.open2("Please Slide Authentication");
            this.loading = false;
            return false;
          }
          if(register.password == register.comfirm){
            registerAPI({
                username:register.email,
                pwd:register.password,
                code:register.code,
                country:register.country,
                countrycode:register.countrycode
            }).then(res=>{
                if(res.code == 200){
                    this.showlogin();
                    this.open2("Registration Successful","warning");
                    this.login.username = register.email;
                    this.login.password = register.password;
                }else if(res.code == -3){
                  this.open2("Wrong Verification Code","error");
                }else if(res.code == -1){
                  this.open2("Fail Register","error");
                }else if(res.code == -4){
                  this.open2("User Already Exists","error");
                }else if(res.code == -2){
                  this.open2("Verification Code Expiration","error");
                }
            })
          }
        }else{
          this.open2("Please Complete The Form","warning");
        }
    },

    returnfalse(){
      return false;
    },
    maskBool(){
      this.init();
      store.dispatch('user/AC_loginShow');
    },open2(body) {
      this.$confirm(body, {
        confirmButtonText: 'OK'
        ,showCancelButton:false,
        showClose:false,
        lockScroll:false
      }).then(() => {

      }).catch(() => {

      })}
  },
  mounted() {
    let userinfo = localStorage.getItem('userinfonet');
    if(userinfo == null){
      this.username = "";
      this.password = "";
    }else{
      this.login.username = JSON.parse(userinfo).username;
      this.login.password = Crypto.decrypt(JSON.parse(userinfo).password);
    }
  },components:{
    Verify
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../public/css/currency.less';
  .mask{
    height: 100%;
    width: 100%;
    _width: 0;
    background-color: rgba(0, 0, 0, .4);
    filter: Alpha(opacity=40);
    *zoom: 1;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    .el-message-box__btns{
      text-align: center;
    }
    .contentbody{
      position: absolute;
      display: flex;
      text-align: center;
      width: 100%;
      height: 100%;
      align-items: center;
      color: #ffffff;
    .remove-mask{
      position: absolute;
      right: -8px;
      top:-5px;
      color: #f40;
      font-size: 18px;
      background-color: #fff;
      cursor: pointer;
      .borderRadius(50%)
    }
    .loginpage{ 
      position: relative;
      width: 320px;
      margin:  0 auto;
      padding: 32px 20px 32px;
      box-sizing: border-box;
      background-color: #fff;
      .shadow();
      .logo{
        width: 260px;
        margin: 0 auto 42px;
        img{
          width: 100%;
        }
      }
      .login,.register{
        width: 90%;
        margin: 0 auto;
        .error{
          color: #f40;
          margin: 0;
        }
        .verify-error{
          color: #f40;
          height: 20px;
          width: 100%;
          text-align: center;
          line-height: 20px;
        }
        li{
          margin-bottom: 18px;
          .icon{
            float: left;
            width: 32px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            color: #0099ff;
            font-size: 30px;
          }
          .input{
             float: left;
             width: 100%;
             width: calc(~"100% - 34px");
             height: 32px;
             border-bottom: 1px solid #0099ff;
             line-height: 0;
             position: relative;
             .el-select{
               width: 100%;
               .el-input__inner{
               border:0!important;

               }
             }
             .getcode{
               display: block;
               position: absolute;
               right: 0px;
               top: 10px;
               color: #0099ff;
               cursor: pointer;
               padding: 2px 5px;
               background-color: #fff;
               font-family: Arial, Helvetica, sans-serif;
             }
             .check{
               position: absolute;
               right: 10px;
               top: 20px;
               cursor: pointer;
               color: #0099ff;
             }
             input{
               width: 100%;
               height: 100%;
               outline: none;
               border: 0;
               padding: 0 10px;
               box-sizing: border-box;
               font-size: 14px;
             }
          }
          .submit{
            width: 100%;
            color: #fff;
            background-color: #0099ff;
            &:disabled{
              pointer-events: none;
              cursor: not-allowed;
              box-shadow: none;
              opacity: .65;
            }
          }
          .reg{
            color: #2f328c;
            font-size: 16px;
            text-align: center;
            cursor: pointer;
            line-height: 22px;
            &:hover{
             color: #0099ff;
            }
          }
          .fortg{
            color:#bdceda;
            font-size: 16px;
            text-align: center;
            cursor: pointer;
            line-height: 22px;
            &:hover{
              color: #0099ff;
            }
          }
        }
        .verify{
          margin-bottom: 5px;
        }
        .remember{
          margin-bottom: 10px;
          padding-left: 10px;
          text-align: left;
        }
      }
      .register {
        li{
          margin-bottom: 15px;
        }
      .input{
        width: 100%!important;
      }
      }
    }
    }
  }
</style>
<style lang="less">
  .verify-msg{
    color: #828282!important;
  }
.loginpage{
  .input{         
  .el-select{
    width: 100%;
    .el-input__inner{
    border:0!important;
    border-bottom:1px solid #0099ff!important;
    border-radius:0px;
    padding-left:10px!important;
    }}
  }
 .login li {

 .submit span{
    font-size:18px!important;
  }
  .el-button.is-round{
    padding:10px 15px;
  }
  }
}
.submit{

    color: #fff;
    background-color: #0099ff;
    padding: 10px 50px;
    border-radius: 20px;
   span{
     font-size: 18px!important;

  }
}
.mask{
  .el-message-box__message p{
    text-align: center!important;
    font-size: 20px!important;
  }
  .el-message-box__btns{
    text-align: center;
    button{
      color: #fff;
      background-color: #0099ff;
      padding: 10px 50px;
      border-radius: 20px;
    }
  }

}

  
  @media screen and (max-width: 768px) {
    .el-message-box{
    width:300px!important;
  }
}
</style>
