<template>
  <div class="process clearfix">
   <div class="left">
       <div class="sort">
           1. BILING ADDRESS
       </div>
       <div class="left-main">
           <div class="form-group">
               <el-row :gutter="6">
                    <el-col :md="12" class="form-group">
                        <div class="label">First Name <i class='red'>*</i> </div>
                        <div class="inputbox">
                            <input type="text" value="1">
                        </div>
                    </el-col>
                    <el-col :md="12"  class="form-group">
                         <div class="label">Last Name <i class='red'>*</i></div>
                        <div class="inputbox">
                            <input type="text" value="2">
                        </div>
                    </el-col>
                    
                    <el-col :md="24"  class="form-group">
                        <el-select v-model="country" filterable placeholder="Country" @change="changeCountry()">
                            <el-option
                            v-for="item in countryArr"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :md="24"  class="form-group">
                        <el-select v-model="province" filterable placeholder="Province" no-data-text="Please select country"  @change="changeProvince()" >
                            <el-option
                            v-for="item in provinceArr"
                            :key="item.id"
                            
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :md="24"  class="form-group">
                        <el-select v-model="city" filterable no-data-text="Please select province"  placeholder="City">
                            <el-option
                            v-for="item in cityArr"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :md="24"  class="form-group">
                        <div class="label">Address <i class='red'>*</i></div>
                        <div class="inputbox">
                            <input type="text" v-model="address">
                        </div>
                    </el-col>
                     <el-col :md="24"  class="form-group">
                         <div class="label">Company <i class='red'>*</i></div>
                        <div class="inputbox">
                            <input type="text" value="2">
                        </div>
                    </el-col>
                    <el-col :md="24"  class="form-group">
                        <el-checkbox v-model="shipChecked" disabled fill="#817f9f">Create an account for later use</el-checkbox>
                    </el-col>
                     <el-col :md="24" class="form-group">
                        <div class="label">Email <i class='red'>*</i> </div>
                        <div class="inputbox">
                            <input type="text" value="1" v-model="email">
                        </div>
                    </el-col>
                    <el-col :md="12" class="form-group">
                        <div class="label">Password <i class='red'>*</i> </div>
                        <div class="inputbox">
                            <input type="text" value="1" v-model="password">
                        </div>
                    </el-col>
                    <el-col :md="12"  class="form-group">
                         <div class="label">Comfirm Password <i class='red'>*</i></div>
                        <div class="inputbox">
                            <input type="text" value="2" v-model="comfirm">
                        </div>
                    </el-col>
                     <el-col :md="24" class="form-group">
                        <div class="label">Code <i class='red'>*</i> </div>
                        <div class="inputbox">
                            <input type="text" value="1" v-model="code">
                            <span class="send" v-show="sendrun">{{sendtime}}</span>
                            <span class="send" @click="sendcode" v-show="!sendrun">send code</span>
                        </div>
                    </el-col>
                </el-row>
           </div>
           <div class="form-group"></div>
       </div>
   </div>
   <div class="middel">
        <div class="sort">
           2. SHIPPING METHOD
       </div>
       <div class="middel-main">
           <ul>
               <li>
                   <el-radio v-model="shipradio" label="1" @change="selectship('0.00')" >Free Shipping:$0.00</el-radio>
                </li>
                <li>
                   <el-radio v-model="shipradio" label="2" @change="selectship('18.00')">EMS:$18.00</el-radio>
                    <div class="logo">
                        <img src="../../public/img/pay/ems.jpg" alt="">
                    </div>
               </li>
           </ul>
       </div>
        <div class="sort">
          3. PAYMENT METHOD
       </div>
       <div class="middel-main">
           <ul>
               <li>
                   <el-radio v-model="payradio" label="1">Paypal</el-radio>
                    <div class="logo">
                        <img src="../../public/img/pay/paypal.jpg" alt="">
                    </div>
                </li>
           </ul>
       </div>
   </div>
   <div class="right">
        <div class="sort">
           4. REVIEW YOUR ORDER
       </div>
       <div class="number-detail">
           <table>
               <thead>
                   <th>Product</th>
                   <th>QTY</th>
                   <th>Price</th>
               </thead>
               <tbody>
                    <tr v-for="(item,index) in orderlist" :key="index" v-show="item.checked">
                       <td>
                           {{item.product_name}}
                       </td>
                       <td>
                            {{item.quantity}}
                       </td>
                       <td>
                           {{item.discount_price}}
                       </td>
                    </tr>
                    
                    <tr class="noborder">
                       <td></td>
                       <td>Shipping</td>
                       <td>{{shipMoney}}</td>
                   </tr>
                    <tr class="noborder">
                       <td></td>
                       <td>Grand total</td>
                       <td class="total-price">{{totalPrice}}</td>
                    </tr>
               </tbody>
           </table>
       </div>
        <el-col :md="24"  class="form-group">
            <el-checkbox v-model="terms" fill="#817f9f" disabled>I accept the Terms and Conditions</el-checkbox>
        </el-col>
        <div class="order-submit" @click="submit">
            PLACE ORDER NOW
        </div>
   </div>
  </div>
</template>

<script>
import {getCountry,getProvince,getCity,registerAPI,vercode} from '@/api/index'
import { mapState } from 'vuex'
import store from '../../store/index.js'
export default {
  name: 'process',
  data () {
    return {
        shipradio: '1',
        payradio: '1',
        countryArr: [],
        provinceArr:[],
        cityArr:[],
        country: '',
        province:'',
        address:'',
        city:'',
        email:'hz@okportal.net',
        password:'',
        lastname:'',
        firstname:'',
        comfirm:'',
        shipChecked:true,
        shipMoney:0,
        payChecked:true,
        terms:true,
        code:'',
        sendrun:false,
        sendtime:60,
    }
  },
    computed: {
        orderlist(){
            return store.state.products.cartProds;
        },
        totalPrice(){
            let initPrice = 0;
            let goods = this.orderlist.forEach(e => {
                    if(e.checked){
                        initPrice+= (parseInt(e.number) * parseFloat(e.discount_price) )
                    }
            });
            return  initPrice + parseFloat(this.shipMoney)
        }
    },
  methods: {
        cn(key){
        return this.register[key].length>0;           
        },
        submit(){
           if(cn('cityArr') && cn('email') && cn('password') && cn('comfirm') && cn('code') && cn('lastname') && cn('firstname')){
               console.log('ajax')
           }else{
               this.$message({
                message: 'Please fill in all of them',
                type: 'warning'
                });
           }
        },
        selectship(price){
          this.shipMoney = price
        },
        changeCountry(value){
            getProvince({countryid:this.country}).then(res=>{
            this.provinceArr = res.content;
            })
            this.province = "";
            this.city = "";
        },
        changeProvince(){
            getCity({provinceid:this.province}).then(res=>{
            this.cityArr = res.content;
            })
            this.city = "";
        },
        sendcode(){
          if(this.email.length>0){
              this.sendrun = true;
              if(this.sendtime == 60){
                vercode({username:this.email}).then(res=>{
                  if(res.code == 1){
                    let clock = window.setInterval(() => {
                      this.sendtime--;
                      console.log(this.sendtime)
                      if (this.sendtime < 0) {     //当倒计时小于0时清除定时器
                        window.clearInterval(clock)
                        this.sendtime = 60;
                        this.sendrun = false;
                        }
                    },1000)
                  }else{
                    this.$message({
                    showClose: true,
                    message: res.content,
                    type: 'error'
                    });
                    this.sendrun = false;
                  }
                })    
            }
          }else{
            this.$message({
            message: 'Please fill in the mailbox',
            type: 'warning'
             });
        }
        
    } 
       
  },
  mounted() {
      getCountry().then(res=>{
          this.countryArr = res.content;
      })
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
    .process{
        width: 1130px;
        margin: 20px auto;
        .left,.middel,.right{
            width: 356px;;
            margin-right: 30px;
            float: left;
            .sort{
                width: 100%;
                height: 32px;
                line-height: 32px;
                font-size: 16px;
                font-weight: bold;
            }
            .form-group{
                    margin-bottom: 10px;
                    .label{
                        margin-bottom:2px;
                        width: 100%;
                        text-align: left;
                        font-size: 14px;
                        color: #605e5a;
                        font-weight: bold;
                        
                    }
                    .inputbox{
                        box-sizing: border-box;
                        border: 1px solid #d6d5ce;
                        height: 30px;
                        line-height: 0px;
                        width: 100%;
                        position: relative;
                        input{
                            border: 0;
                            height: 100%;
                            width: 100%;
                            outline: none;
                            padding: 0 5px;
                            box-sizing: border-box;
                            background-color: #fff;
                            font-size: 14px;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                        .send{
                            position: absolute;
                            color: #fff;
                            background-color: #5052be;
                            right: 5px;
                            height: 20px;
                            line-height: 20px;
                            top: 4px;
                            font-size: 14px;
                            font-family: Arial;
                            display: inline-block;
                            padding: 0 2px;
                            cursor: pointer;
                            border-radius: 2px;
                        }
                    }
                }
            .left-main{
                width: 100%;
                background-color: #f1f0e9;
                padding: 20px;
                box-sizing: border-box;
                
                
            }
            .middel-main{
                width:100%;
                background-color:#e7e6df;
                ul{
                    li{
                        padding:0px 20px;
                        height: 50px;
                        line-height: 50px;
                        width:100%;
                        box-sizing: border-box;
                        border-top: 1px solid #cccbc4;
                        position: relative;
                        .logo{
                            position: absolute;
                            right: 10px;
                            bottom: 0px;
                        }
                    }
                    li:first-child{
                        border-top:0;
                    }
                }
            }
        }
        .right{
            margin-right: 0px;
            .number-detail{
                background-color: #e7e6df;
                padding:  20px 20px;
                margin-bottom: 15px;
                table{
                    width: 100%;
                    th{
                       text-align: left;
                       height: 26px;
                       font-size: 14px;
                       font-weight: bold;
                    }
                    tr{
                        height: 26px;
                        border-bottom: 1px solid #999;
                    }
                    .noborder{
                        border-bottom: 0;
                    }
                    .total-price{
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
            .apply-coupan{
                background-color: #303280;
                color: #fff;
                margin-bottom: 15px;
                float: left;
                padding: 6px ;
                cursor: pointer;
            }
            .order-submit{
                padding: 8px 10px;
                background-color: #303280;
                color: #fff;
                font-size: 20px;
                float: right;
                cursor: pointer;
                margin-top: 10px;

            }
        }
    }

    @media (min-width:1200px) and (max-width:1400px) { 

    }
    @media (min-width:768px) and (max-width:1200px) {  
        .process{
            width: 100%;
            .left,.middel,.right{
                width: 96%;
                margin: 0 2%;
            }
        } 
    }

    @media only screen and (max-width: 768px){ 
        .process{
            width: 100%;
            .left,.middel,.right{
                width: 96%;
                margin: 0 2%;
            }
        }
    }
</style>
<style lang="less">
.process {
    .el-select{
        width: 100%;
        .el-input{
            .el-input__inner{
                height: 30px!important;
            }

        }
        .el-input__icon{
            line-height: 30px;
        }
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,.el-radio__input.is-checked .el-radio__inner{
       background:#2b2e90;
       border-color:#2b2e90;
    }
    .el-radio__input.is-checked+.el-radio__label,.el-checkbox__input.is-checked+.el-checkbox__label{
        color: #605e5a;
    }
}
</style>
