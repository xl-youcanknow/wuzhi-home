<template>
  <div class="address-container">
    <div class="wrap">
      <button class="add-show" @click="addressShow(0)">Add New Address</button>
      <div class="flex-container" v-loading="loading">
        <div class="flex-box title">
          <div class="re-name">Recieved Name</div>
          <div class="shipping">Shipping Address</div>
          <div class="modify"></div>
          <div class="remove"></div>
        </div>
        <div class="flex-box" v-for="(item,index) in addressList" :key="index" >
          <div class="re-name">
            <div class="default" v-if="item.status == 1">default</div>
            <p>{{ item.name }}</p>
            <p>{{ item.phone }}</p>
          </div>
          <div class="shipping">
            <p>Home</p>
            <p>{{item.province}} . {{item.city}} , {{ item.address }} . </p>
            <p>{{item.postcode}}</p>
          </div>
          <div class="modify">
            <button @click="addressShow(1,item)">Modify</button>
          </div>
          <div class="remove" @click="remove(item.id,index)">
            <img src="@/public/img/reduce.png" alt>
          </div>
        </div>
        <div class="no-address" v-if="addressList.length == 0">No Address</div>
      </div>
    </div>
    <el-dialog :visible.sync="editAddressShow" :close-on-click-modal="false" v-loading="elLoading" :show-close="false" width="50%">
      <div class="close" @click="editAddressShow = !editAddressShow">X</div>
      <h6>{{ addressShowTitle }}</h6>
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
          <el-select v-model="TM_address.province"  class="select-item" placeholder="province" @change="getCity(TM_address.province)">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ><span>{{item.name}}</span></el-option>
          </el-select>
        </li>
        <li>
          <label>City</label>
          <el-select v-model="TM_address.city" class="select-item" placeholder="city">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ><span>{{item.name}}</span></el-option>
          </el-select>
        </li>
        <li>
          <label>Post Code</label>
          <el-input v-model="TM_address.postcode" class="no-select" placeholder="postcode"></el-input>
        </li>
        <li>
          <label>Detailed</label>
          <el-input type="textarea" :rows="2" placeholder="detailed" v-model="TM_address.detailed"> </el-input>
        </li>
      </ul>
      <div class="dialog-end">
        <p>
          <span>Default Address</span>
          <el-switch v-model="TM_address.isDefault" active-color="#3E3C89" inactive-color="#A8ABAE"></el-switch>
        </p>
        <el-button @click="saveAddress(0)" v-if="saveType == 0" :loading="loadingBtn">Confirm</el-button>
        <el-button @click="saveAddress(1)" v-else :loading="loadingBtn">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetAddresslist, GetAddressProvince , GetAddressCity , AddAddress , UpdateAddress , DelAddress} from "@/api/index"
import Qs from "qs"
export default {
  data() {
    return {
      addressList: [],
      editAddressShow: false,
      addressShowTitle: "",
      loadingBtn: false,
      elLoading: false,
      loading: false,
      provinceList: null,
      cityList: null,
      saveType: 0,
      TM_address:{
        name:"",
        phone:"",
        province:"",
        city:"",
        postcode:"",
        detailed:"",
        id:"",
        isDefault:true,
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      GetAddresslist().then(res => {
        this.loading = false
        if (res.code == 200) {
          this.addressList = res.content;
        }
      });
      GetAddressProvince().then(res => {
        this.provinceList = res.content;
      });
    },
    addressShow(type,base) {
      this.saveType = type;
      this.editAddressShow = true;
      type == 0 ?  this.addressShowTitle = "Add Address" : this.addressShowTitle = "Modify Address" ;
      if(type == 0) {
        for(let item in this.TM_address) {
          if(item !== "isDefault") {
              this.TM_address[item] = ""
          }else {
              this.TM_address[item] = true
          }
        }
      }else {
        this.getCity(base.province,1)
        this.TM_address.name = base.name;
        this.TM_address.detailed = base.address;
        this.TM_address.city = base.city;
        this.TM_address.phone = base.phone;
        this.TM_address.postcode = base.postcode;
        this.TM_address.province = base.province;
        this.TM_address.id = base.id;
        base.status == 1 ? this.TM_address.isDefault = true : this.TM_address.isDefault = false
      }
    },
    getCity(id,type) {
      if(type == 1) {
        this.elLoading = true
      }
      this.TM_address.city = ''
      GetAddressCity(Qs.stringify({ "id": id  })).then(res=>{
          this.elLoading = false;
          this.cityList = res.content;
      })
    },
    saveAddress(type) {
      //0添加··············1修改·············
      if(type == 0) {
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
            this.getData();
          })
        }else{
           this.$message.warning("Please input All infomation");
        }
      }else {
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
            this.getData();
          })
        }else{
           this.$message.warning("Please input All infomation");
        }
      }
    },
    remove(id,index) {
      this.$confirm('REMOVE ?', 'Tips', { type: 'warning' }).then(() => {
          // this.addressList.splice(index,1)
          this.loading = true;
          DelAddress(Qs.stringify({'id':id })).then(res=>{
            this.getData();
            this.$message.success("Delete success !!");
            })
        }).catch(() => {
        });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.address-container {
  .wrap {
    width: 1190px;
    margin: 50px auto;
    padding-top: 30px;
    .add-show {
      width: 200px;
      text-align: center;
      background: #3e3c89;
      border-radius: 15px;
      -moz-border-radius: 15px;
      -webkit-border-radius: 15px;
      color: #ffffff;
      padding: 12px 0;
      font-size: 18px;
      display: block;
      margin: 20px 0;
      cursor: pointer;
    }
    .flex-container {
      margin-top: 40px;
      padding-bottom: 50px;
      .flex-box {
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        padding: 50px 0;
        color: #a7a9ac;
        border-bottom: 1px solid #3e3c89;
        position: relative;
        &.title {
          border-top: 1px solid #3e3c89;
          padding: 25px 0;
          .re-name {
            color: #222222;
          }
          .shipping {
            color: #222222;
          }
        }
        .re-name {
          font-weight: 900;
          width: 25%;
           .default{
              background: #3e3c89;
              color: #ffffff;
              font-weight: 600;
              width: 100px;
              padding: 5px 0;
              text-align: center;
              position: absolute;
              bottom: 0;
              left: 0;
            }
          p {
            line-height: 30px;
            &:nth-of-type(2) {
              font-weight: 600;
            }
          }
        }
        .shipping {
          font-weight: 900;
          width: 40%;
          p {
            line-height: 30px;
            &:nth-of-type(2) {
              font-weight: 600;
            }
            &:nth-of-type(3) {
              font-weight: 600;
            }
          }
        }
        .modify {
          width: 10%;
          button {
            width: 90px;
            background: #3e3c89;
            color: #ffffff;
            padding: 8px 0;
            border-radius: 15px;
            -moz-border-radius: 15px;
            -webkit-border-radius: 15px;
            cursor: pointer;
          }
        }
        .remove {
          width: 10%;
          text-align: center;
          img {
            width: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .no-address{
      color: #a7a9ac;
      font-size: 35px;       
      padding: 100px 0;
      text-align: center;

  }
}
@media only screen and (max-width: 768px) {
  .address-container {
    .wrap {
      width: 96% !important;
      .flex-container{
        justify-content: space-around;
        .flex-box{
          .re-name{
            width: 45%;
          }
          .shipping{
            width: 45%;
          }
          .modify{
            width: 45%;
            margin:15px 0;
          }
          .remove{
            width: 45%;
            margin:15px 0;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.address-container {
  .el-dialog {
    border-radius: 15px;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
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
      padding-top: 50px;
      color: #3e3c89;
    }
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
          input{
            border: 1px solid #bdbfc1;
            border-radius: 10px;
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
            color: #606266;
          }
        }
        .el-textarea{
          width: calc(100% - 180px);
        }
        .el-textarea__inner{
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
        .select-item{
            width: calc(100% - 180px);
            span{
                font-size: 14px;
            }
            input{
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
  
}
@media only screen and (max-width: 768px) {
  .address-container {
    .el-dialog {
      width: 96% !important;
    }
  }
}
</style>
<style>
.address-container span{
    font-size: 16px;
  }
   .el-message-box__btns button:nth-child(2){
    background: #3e3c89;
    border: none;
  }
</style>
