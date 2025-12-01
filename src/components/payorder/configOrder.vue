<template>
  <div class="config-order" v-loading="containerLoading">
    <div class="order-container">
      <div class="order-details">
        <div class="order-address">
          <div class="select-address">
            <p>Checkout</p>
            <p>Shipping Address</p>
          </div>
          <div class="address-main" v-if="defaultAdress">
            <p>{{ defaultAdress.name }}</p>
            <p>{{ defaultAdress.phone }}</p>
            <p>{{ defaultAdress.province}} , {{ defaultAdress.city }}</p>
            <p>{{ defaultAdress.address }}</p>
            <p>{{ defaultAdress.postcode }}</p>
            <button @click="changeAdressShow = !changeAdressShow">Switch</button>
          </div>
        </div>
        <div class="order-product">
          <div class="order-box" v-for="(item,index) in orderList" :key="index">
            <div class="order-product-img"><img :src="item.img" alt=""></div>
            <!-- <div class="order-product-img"> <img src="../../public/img/pro-img2.png" alt> </div> -->
            <div class="order-product-main">
              <!-- <p>Sonic</p> -->
              <p>{{ item.product }}</p>
              <p class="lite-main">{{ item.productdetails }}</p>
              <p class="lite-price">$ {{ item.unitprice }}</p>
            </div>
            <div class="order-product-quaty">× {{ item.quantity }}</div>
          </div>
        </div>
      </div>
      <div class="order-main" :class="containerLoading ? '':'fix'">
        <p class="order-main-tit">Grocerry List</p>
        <div class="order-heavy">
          <p>
            Total Price ({{totalItem}} item)
            <span :class="countTotalPrice ? 'under' : ''">$ {{ totalPrice }}</span>
            <br v-if="countTotalPrice">
            <span v-if="countTotalPrice"> $ {{ countTotalPrice }}</span>
            <br v-if="countTotalPrice">
          </p>
          <p>
            Shipping Fee
            <span>$ {{ freightTotal }}</span>
          </p>
          <!-- <p>Shipping Insurance <span>$ 5.00</span></p> -->
        </div>
        <div class="order-vcode">
            <el-input placeholder="coupon" v-model="couponNumber" @blur="checkCoupon"> </el-input>
        </div>
        <p class="order-main-p">
          Total Bill
          <span v-if="countTotalPrice">$ {{ countTotalPrice + freightTotal}}</span>
          <span v-else>$ {{ totalPrice + freightTotal}}</span>
        </p>
        <button @click="GoToBuy()" v-loading="paymentLoading">Payment Method</button>
      </div>
    </div>
    <el-dialog
      :visible.sync="changeAdressShow"
      :close-on-click-modal="false"
      v-loading="elLoading"
      :show-close="false"
      width="65%"
    >
      <div class="close" @click="changeAdressShow = !changeAdressShow">
        <span class="el-icon-close"></span>
      </div>
      <h6>Switch Address</h6>
      <div class="switch-container">
        <div
          class="switch-box"
          v-for="(item,index) in addressList"
          :key="index"
          @click="changeAddress(item.id)"
        >
          <div class="default" v-if="item.check"></div>
          <p>{{ item.name }} {{ item.phone }} {{ item.postcode }}</p>
          <p>
            <span class="el-icon-location-outline"></span>
            {{ item.province }} , {{ item.city }} , {{ item.address }}
          </p>
          <p class="modify" @click.stop="modify(item)">Modify</p>
        </div>
      </div>
      <p class="add-add" @click="addNewAddress">Add Address</p>
      <br>
      <br>
    </el-dialog>
    <el-dialog :visible.sync="modifyShow" :close-on-click-modal="false" v-loading="elLoading2" :show-close="false" width="50%" >
      <div class="close" v-if="flag" @click="modifyShow = !modifyShow"> <span class="el-icon-close"></span> </div>
      <div class="close" v-else @click="goHome"> <span class="el-icon-close"></span> </div>
      <h6 v-if="flag">Modify Address</h6>
      <h6 v-else>Add Address</h6>
      <ul class="from-letter">
        <li>
          <label>Receiving Name</label>
          <el-input v-model="TM_address.name" class="no-select" placeholder="name"></el-input>
        </li>
        <li>
          <label>Telephone Number</label>
          <el-input v-model="TM_address.phone" class="no-select" placeholder="phone"></el-input>
        </li>
        <li>
          <label>Province</label>
          <el-select
            v-model="TM_address.province"
            class="select-item"
            placeholder="province"
            @change="getCity(TM_address.province)"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
              <span>{{item.name}}</span>
            </el-option>
          </el-select>
        </li>
        <li>
          <label>City</label>
          <el-select v-model="TM_address.city" class="select-item" placeholder="city">
            <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name">
              <span>{{item.name}}</span>
            </el-option>
          </el-select>
        </li>
        <li>
          <label>Post Code</label>
          <el-input v-model="TM_address.postcode" class="no-select" placeholder="postcode"></el-input>
        </li>
        <li>
          <label>Detailed</label>
          <el-input type="textarea" :rows="2" placeholder="detailed" v-model="TM_address.detailed"></el-input>
        </li>
      </ul>
      <div class="dialog-end">
        <p v-if="flag">
          <span>Default Address</span>
          <el-switch v-model="TM_address.isDefault" active-color="#3E3C89" inactive-color="#A8ABAE"></el-switch>
        </p>
        <el-button v-if="flag" @click="saveAddress()" :loading="loadingBtn">Save</el-button>
        <el-button v-else @click="addAddressF()" :loading="loadingBtn">Add</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="payShow" :close-on-click-modal="false" v-loading="elLoading2" :show-close="false" width="30%" >
       <h5>Pay with</h5>
       <div class="s-close"> 
        <router-link to="/order/managerOrder">
         <span class="el-icon-close"></span>
        </router-link>
        </div>
       <div class="pay-box">
         <ul class="pay-list">
           <a :href="payUrl">
            <li>
              <div class="img"><img src="@/public/img/pay/paypal.png" alt=""></div>
              <div class="name">Paypal</div>
              <div class="right"><img src="@/public/img/pay/right2.png" alt=""></div>
            </li>
           </a>
         </ul>
       </div>
    </el-dialog>
  </div>
</template>
<script>
import {  Getorderlist, addOrder, changeFreight, GetAddressProvince, GetAddressCity , UpdateAddress , AddAddress , CheckCoupon} from "@/api/index";
import Qs from "qs";
export default {
  data() {
    return {
      containerLoading: false,
      modifyShow: false,
      loadingBtn: false,
      voceShow: true,
      elLoading: false,
      elLoading2: false,
      paymentLoading: false,
      flag:false,
      changeAdressShow: false,
      payShow: false,
      orderList: null,
      totalPrice: null,
      countTotalPrice: null,
      TM_TOtal:null,
      defaultAdress: null,
      totalItem: null,
      freightTotal: null,
      addressList: null,
      shippingcid: null,
      provinceList: null,
      cityList: null,
      couponNumber: '',
      payUrl: '',
      TM_address: {
        name: "",
        phone: "",
        province: "",
        city: "",
        postcode: "",
        detailed: "",
        id: "",
        isDefault: true
      }
    };
  },
  created() {
    this.containerLoading = true;
    let promiseDevice =  new Promise((resolve, reject)=> {
        Getorderlist().then(res => {
        if(res.code == 0) {
            window.location="/order/managerOrder";
        }
          this.containerLoading = false;
          this.orderList = res.goodslist;
          this.addressList = res.address;
          this.shippingcid = res.shippingc[0].id;
          this.addressList.map((v, i) => {
            if (this.addressList[i].status == 1) {
              this.$set(this.addressList[i], "check", true);
            } else {
              this.$set(this.addressList[i], "check", false);
            }
          });
          this.totalPrice = res.goodstotal;
          this.TM_TOtal = res.goodstotal;
          this.defaultAdress = res.address.filter(item => item.status == 1)[0];
          let TM_totalItem = 0;
          // console.log(res.goodslist[0])
          for (let i = 0; i < res.goodslist.length; i++) {
            TM_totalItem += res.goodslist[i].quantity;
          }
          this.totalItem = TM_totalItem;
        resolve(res)
        })
       
    })
    promiseDevice.then((res)=>{
        //判断用户是否有地址，如果无有就要添加
        if(res.address.length >0) {
            changeFreight(Qs.stringify({ addressid: res.address[0].id, companyid: this.shippingcid })).then(res =>{
                this.freightTotal = res.content;
            })
        }else{
            this.flag = false;
            this.modifyShow = true;
        }
    })
    GetAddressProvince().then(res => {
    this.provinceList = res.content;
    });
  },
  methods: {
    GoToBuy() {
      this.containerLoading = true;
      addOrder(Qs.stringify({ way: 1 , 'vcode':this.couponNumber})).then(res => {
        this.containerLoading = false;
        if(res.code == 200 ) {
          this.payShow = true;
          this.payUrl = res.url;
        }else{
          this.$message.warning(res.content);
        }
      });
    },
    changeAddress(id) {
      this.addressList.forEach((val, item) => {
        if (val.id == id) {
          val.check = true;
          this.defaultAdress = val;
        } else {
          val.check = false;
        }
      });
      changeFreight( Qs.stringify({ addressid: id, companyid: this.shippingcid }) ).then(res => {
          this.freightTotal = res.content;
      });
    },
    modify(base) {
        this.flag = true;
        this.modifyShow = true;
        this.getCity(base.province)
        this.TM_address.name = base.name;
        this.TM_address.detailed = base.address;
        this.TM_address.city = base.city;
        this.TM_address.phone = base.phone;
        this.TM_address.postcode = base.postcode;
        this.TM_address.province = base.province;
        this.TM_address.id = base.id;
        base.status == 1 ? this.TM_address.isDefault = true : this.TM_address.isDefault = false
    },
    getCity(id, type) {
      this.TM_address.city = "";
      GetAddressCity(Qs.stringify({ id: id })).then(res => {
        this.elLoading = false;
        this.cityList = res.content;
      });
    },
    saveAddress() {
        let arr = [];
        for(let item in this.TM_address) {
          if(item !== "isDefault") {
              arr.push(this.TM_address[item].length)
          }
        }
        let flag = arr.indexOf(0);
        if(flag < 0) {
          let ifDefault = 0;
          this.TM_address.isDefault ? ifDefault = 1 : ifDefault = 0;
          this.loadingBtn = true;
          /* 将省市id换成名字 */
          let TM_CITY,TM_PROVINCE;
          !isNaN(this.TM_address.city) ? TM_CITY = this.cityList.filter(item => item.id == this.TM_address.city)[0].name : TM_CITY = this.TM_address.city;
          !isNaN(this.TM_address.province) ? TM_PROVINCE = this.provinceList.filter(item => item.id == this.TM_address.province)[0].name : TM_PROVINCE = this.TM_address.province;
          // console.log(TM_CITY,TM_PROVINCE,this.TM_address.city,this.TM_address.province,this.cityList)
          // return false;
          UpdateAddress(Qs.stringify({ 
            "id": this.TM_address.id,
            "city": TM_CITY,
            "detailed": this.TM_address.detailed,
            "isDefault": ifDefault,
            "name": this.TM_address.name,
            "phone": this.TM_address.phone,
            "postcode": this.TM_address.postcode,
            "province": TM_PROVINCE,
            })).then(res=>{
            this.loadingBtn = false;
            this.editAddressShow = false;
            this.$message.success("Save success !!");
            location.reload();
            // window
          })
        }else{
           this.$message.warning("Please input All infomation");
        }
    },
    addAddressF() {
        let arr = [];
        for(let item in this.TM_address) {
          if(item !== "isDefault" && item !== "id") {
              arr.push(this.TM_address[item].length)
          }
        }
        let flag = arr.indexOf(0);
        if(flag < 0) {
          let ifDefault = 0;
          this.TM_address.isDefault ? ifDefault = 1 : ifDefault = 0;
          this.loadingBtn = true;
          /* 将省市id换成名字 */
          let TM_PROVINCE = this.provinceList.filter(item => item.id == this.TM_address.province)[0].name;
          let TM_CITY = this.cityList.filter(item => item.id == this.TM_address.city)[0].name;
          AddAddress(Qs.stringify({ 
            "city": TM_CITY,
            "detailed": this.TM_address.detailed,
            "isDefault": ifDefault,
            "name": this.TM_address.name,
            "phone": this.TM_address.phone,
            "postcode": this.TM_address.postcode,
            "province": TM_PROVINCE,
            })).then(res=>{
            this.loadingBtn = false;
            this.editAddressShow = false;
            this.$message.success("Add Address success !!");
            location.reload();
          })
        }else{
           this.$message.warning("Please input All infomation");
        }
    },
    addNewAddress() {
        this.flag = false;
        this.modifyShow = true;
        for(let item in this.TM_address) {
          if(item !== "isDefault") {
              this.TM_address[item] = ""
          }else {
              this.TM_address[item] = false
          }
        }
    },
    goHome() {
        if(this.addressList.length > 0) {
            this.modifyShow = false
        }else {
            window.location="/order/managerOrder";
        }
    },
    checkCoupon() {
        if(this.couponNumber.length > 0 && this.couponNumber) {
            this.paymentLoading = true;
            CheckCoupon(Qs.stringify({'vcode':this.couponNumber,'goodstotal': this.TM_TOtal})).then(res=>{
                this.paymentLoading = false;
                if(res.code == 200) {
                    this.countTotalPrice = res.content.goodstotal;
                    this.$message.success("This coupon can be used !!");
                }else {
                    this.couponNumber = '';
                    this.countTotalPrice = null;
                    this.$message.warning(res.content);
                }
            })
        }else {
          this.countTotalPrice = null;
        }
    }
  }
};
</script>
<style lang="less" scoped>
.font {
  font-family: Arial, Helvetica, sans-serif;
}
.config-order {
  width: 1334px;
  margin: 32px auto;
  .order-container {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-top: 20px;
    .order-main {
      width: 350px;
      box-sizing: border-box;
      padding: 30px;
      margin-top: 25px;
      max-height: 400px;
      box-shadow: 0px 0px 10px 3px #dedede;
      background: #ffffff;
      border-radius: 20px;
      -moz-border-radius: 20px;
      -webkit-border-radius: 20px;
      .font;
      &.fix {
        position: fixed;
        top: 145px;
        right: 15%;
      }
      button {
        font-size: 18px;
        width: 100%;
        background: #32327e;
        color: #ffffff;
        padding: 10px 0;
        border-radius: 50px;
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        cursor: pointer;
        margin-top: 20px;
      }
      .order-main-tit {
        font-size: 23px;
        margin-bottom: 20px;
      }
      .order-main-p {
        font-size: 20px;
        color: #a7a9ac;
        margin-top: 20px;
        span {
          font-size: inherit;
          float: right;
          font-weight: 900;
        }
      }
      .order-heavy {
        padding: 20px 0;
        margin: 10px 0;
        border-top: 2px solid #2f328c;
        border-bottom: 2px solid #2f328c;
        p {
          .font;
          font-size: 20px;
          color: #a7a9ac;
          margin-bottom: 20px;
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
          span {
            font-weight: 900;
            font-size: 20px;
            float: right;
            color: #111111;
            &.under{
              text-decoration: line-through;
              color: #a7a9ac
            }
          }
        }
      }
      .order-vcode{
          padding: 10px 0;
          padding-top: 0px;
          border-bottom: 2px solid #2f328c;
          position: relative;
      }
      .vcode-p{
          color: #ff0000;
          font-weight: 600;
          margin-top: 15px;
      }
    }
    .order-details {
      width: 820px;
      .order-address {
        .select-address {
          padding-bottom: 30px;
          p {
            font-size: 23px;
            .font;
            &:nth-of-type(1) {
              font-weight: 900;
              color: #2f328c;
              margin-bottom: 10px;
            }
            &:nth-of-type(2) {
              font-weight: 600;
              font-size: 20px;
            }
          }
        }
        .address-main {
          border-top: 2px solid #32327e;
          padding-top: 20px;
          font-size: 20px;
          p {
            line-height: 35px;
            .font;
            font-size: inherit;
            &:nth-of-type(1) {
              font-size: 23px;
              font-weight: 900;
              color: #2f328c;
              margin-bottom: 5px;
            }
          }
          button {
            width: 180px;
            font-size: 20px;
            text-align: center;
            color: #ffffff;
            background: #2f328c;
            padding: 8px 0;
            border-radius: 12px;
            -moz-border-radius: 12px;
            -webkit-border-radius: 12px;
            margin-top: 25px;
            cursor: pointer;
            margin-bottom: 50px;
          }
        }
      }
      .order-product {
        .order-box {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #2f328c;
          padding: 20px 0;
          .order-product-img {
            width: 30%;
            img {
              max-width: 100%;
            }
          }
          .order-product-main {
            width: 50%;
            p {
              .font;
              font-size: 25px;
              line-height: 25px;
              font-weight: 900;
              margin-bottom: 5px;
              &.lite-main {
                font-size: 20px;
                color: #a7a9ac;
                font-weight: 400;
              }
              &.lite-price {
                color: #2f328c;
              }
            }
          }
          .order-product-quaty {
            .font;
            font-size: 25px;
            font-weight: 900;
          }
        }
      }
      .order-shipping {
      }
    }
  }
}
@media (max-width: 1200px) {
  .config-order{
    width: 96%;
    margin: 0 auto;
    .switch-container{
      flex-wrap: wrap;
      .switch-box{
        width: 100%;
      }
    }
    .order-container{
      flex-wrap: wrap;
      .order-details{
        width: 100%;
      }
      .order-main{
        &.fix{
          width: 100%;
          margin-top: 0;
          position: relative;
          top: auto;
          right: auto;
          box-shadow: none;
          border-top: 2px solid #2f328c;
          border-radius: 0;

        }
      }
    }
  }
}
</style>
<style lang="less">
.config-order {
  .el-dialog {
    border-radius: 15px;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    .from-letter {
      width: 85%;
      margin: 0 auto;
      li {
        display: flex;
        display: -ms-flexbox;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        label {
          width: 150px;
          display: block;
          color: #3e3c89;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 600;
          text-align: right;
        }
        .no-select {
          width: calc(100% - 180px);
          display: block;
          box-sizing: border-box;
          input {
            border: 1px solid #bdbfc1;
            border-radius: 10px;
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
            color: #606266;
          }
        }
        .el-textarea {
          width: calc(100% - 180px);
        }
        .el-textarea__inner {
          font-size: 18px;
          box-sizing: border-box;
          padding: 7px 20px;
          border: 1px solid #bdbfc1;
          border-radius: 10px;
          -moz-border-radius: 10px;
          -webkit-border-radius: 10px;
          color: #606266;
          display: block;
          margin-right: 0;
        }
        .select-item {
          width: calc(100% - 180px);
          span {
            font-size: 14px;
          }
          input {
            font-size: 16px;
            border: 1px solid #bdbfc1;
            box-sizing: border-box;
            padding: 7px 20px;
            border-radius: 10px;
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
          }
        }
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
    h5{
      background: #3e3c89;
      color: #ffffff;
      padding: 30px 0;
      font-size: 25px;
      text-indent: 25px;
      font-weight: 600;
      border-radius: 15px 15px 0 0;
      -moz-border-radius: 15px 15px 0 0;
      -webkit-border-radius: 15px 15px 0 0;
    }
    .pay-box{
      background: #ffffff;
      width: 88%;
      margin: 0 auto;
      .pay-list{
        padding: 25px 0;
        li{
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          .img{
            width: 20%;
            img{
              width: 100%;
            }
          }
          .name{
            width: 50%;
            color: #bdbfc1;
            font-size: 20px;
          }
          .right{
            width: 15px;
             img{
              width: 100%;
            }
          }
        }
      }
    }
    .s-close{
      position: absolute;
      color: #ffffff;
      top: 10px;
      right: 10px;
      span{
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
      }
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
  .dialog-end {
    width: 85%;
    margin: 0 auto;
    padding: 30px 0;
    text-align: right;
    p {
      margin-bottom: 30px;
      span {
        color: #3e3c89;
        margin-right: 25px;
        position: relative;
        top: 5px;
      }
      .el-switch__core {
        width: 70px !important;
        height: 30px !important;
        margin-right: 0;
      }
      .el-switch__core:after {
        height: 27px;
        width: 27px;
        border-radius: 20px;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
      }
      .el-switch.is-checked .el-switch__core::after {
        margin-left: -27px;
      }
    }
    button {
      width: 200px;
      padding: 10px 0;
      background: #3e3c89;
      color: #ffffff;
      border-radius: 12px;
      -moz-border-radius: 12px;
      -webkit-border-radius: 12px;
      border: none;
      span {
        font-size: 16px;
      }
    }
  }
  .switch-container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    display: -ms-flexbox;
    flex-wrap: wrap;
    justify-content: space-between;
    .switch-box {
      width: 45%;
      box-sizing: border-box;
      padding: 15px;
      border: 3px solid #3e3c89;
      border-radius: 15px;
      -moz-border-radius: 15px;
      -webkit-border-radius: 15px;
      position: relative;
      margin-bottom: 20px;
      .default {
        position: absolute;
        bottom: 0;
        right: 0;
        background: #3e3c89;
        color: #ffffff;
        width: 40px;
        text-align: center;
        padding: 15px 0;
        border-radius: 15px 0 10px 0;
        -moz-border-radius: 15px 0 10px 0;
        -webkit-border-radius: 15px 0 10px 0;
        &::after {
          z-index: 99;
          content: "\2714";
          position: absolute;
          color: white;
          font-size: 20px;
          right: 8px;
          bottom: 2px;
        }
      }
      .modify {
        color: #cfa182;
        margin-top: 10px;
        cursor: pointer;
        width: 70px;
        &:hover {
          text-decoration: underline;
        }
      }
      p {
        font-size: 16px;
        line-height: 25px;
        width: 70%;
        word-break: break-all;
      }
    }
  }
  .add-add{
    width: 90%;
    margin: 0 auto;
    color: #cfa182;
    font-size: 23px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        text-decoration: underline;
    }
  }
  .order-vcode{
    .el-input__inner {
        border: none;
        font-size: 20px;
    }
      
  }
}
@media only screen and (max-width: 768px) {
  .config-order{
    .el-dialog {
      width: 96% !important;
    }
  }
}
</style>