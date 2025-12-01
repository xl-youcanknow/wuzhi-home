<template>
    <div class="maorder-container">
        <div class="wrap">
            <h6>Order</h6>
            <div class="moni-table" v-loading="listLoading">
                <div class="moni-tr title">
                    <div class="tr-img">All Order</div>
                    <div class="tr-name"></div>
                    <div class="tr-detail"></div>
                    <div class="tr-amount">Total Amount</div>
                    <div class="tr-payment"></div>
                </div>
                <div  v-for="(item,index) in orderlist" :key="index">
                    <div class="moni-tr">
                        <!-- <div class="tr-img"><img src="https://testweb.okportal.net/app_admin/Uploads/15478715758556530.png" alt=""></div> -->
                        <div class="tr-img"><img :src="item.img" alt=""></div>
                        <div class="tr-name">
                            <p>{{ item.product }}</p>
                            <p>{{ item.productdetails }}</p>
                        </div>
                        <div class="tr-detail" @click="getDetails(item.id)">
                            <p>Order Details</p>
                        </div>
                        <div class="tr-amount">$ {{item.total}}</div>
                        <div class="tr-payment" v-if="item.type == 0">
                            <p style="margin-bottom: 15px;">Unpaid</p>
                            <button @click="paymentType(0,item.id,item.url)">Payment</button>
                        </div>
                        <div class="tr-payment" v-else-if="item.type == 1">
                            <p>Account Paid</p>
                        </div>
                        <div class="tr-payment" v-else-if="item.type == 2">
                            <p style="margin-bottom: 15px;">Delivered</p>
                            <button @click="paymentType(2,item.id)">Confirm Receipt</button>
                        </div>
                        <div class="tr-payment" v-else-if="item.type == 3">
                            <p style="margin-bottom: 15px;">Order Completion</p>
                            <button @click="paymentType(1,item.id)">Delete order</button>
                        </div>
                        <div class="tr-payment" v-else-if="item.type == 4">
                            <p>Payment Review</p>
                        </div>
                        <div class="tr-payment" v-else-if="item.type == 5">
                            <p style="margin-bottom: 15px;">Cancel Order</p>
                            <button @click="paymentType(1,item.id)">Delete order</button>
                        </div>
                        <div class="tr-payment" v-else-if="item.type == 6">
                            <p style="margin-bottom: 15px;">Return/Refund</p>
                            <button @click="paymentType(1,item.id)">Delete order</button>
                        </div>
                        <div class="tr-payment" v-else-if="item.type == 7">
                            <p style="margin-bottom: 15px;">Rejected</p>
                            <button @click="paymentType(0,item.id,item.url)" style="margin-bottom:15px">Payment</button>
                            <button @click="paymentType(1,item.id)">Delete Order</button>
                        </div>
                    </div>
                    <p class="order-p">
                        <span>{{ item.time }}</span>
                        <span>Order Number : {{ item.number }}</span>
                        <span v-if="item.type == 0 ">UNPAID</span>
                        <span v-else-if="item.type == 1">Account Paid</span>
                        <span v-else-if="item.type == 2">Delivered</span>
                        <span v-else-if="item.type == 3">Order Completion</span>
                        <span v-else-if="item.type == 4">Payment Review</span>
                        <span v-else-if="item.type == 5">Cancel Order</span>
                        <span v-else-if="item.type == 6">Return/Refund</span>
                        <span v-else-if="item.type == 7">Rejected</span>
                        <span>Tracking Number : --</span>
                    </p>
                </div>
                <div class="no-order" v-if="!orderlist" v-loading="listLoading">NO Order</div>
            </div>
            <el-pagination
            layout="prev, pager, next"
            :total="total_count"
            background
            @current-change="handleCurrentChange"
            :page-size="4"
            style="margin:30px auto;display:flex;justify-content: center;">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="editAddressShow" v-loading="elLoading" :show-close="false" width="40%">
            <div class="close" @click="editAddressShow = !editAddressShow"><span class="el-icon-close"></span></div>
            <h6>Order Details</h6>
            <div class="order-contianer" v-if="detailsList">
                <ul class="order-list">
                    <li>
                        <div class="left"><span class="el-icon-location-outline"></span> {{ detailsList.address }}</div>
                        <div> </div>
                    </li>
                    <li>
                        <div class="left">TrackingNumber</div>
                        <div>-------</div>
                    </li>
                    <li>
                        <div class="left">phone</div>
                        <div>{{ detailsList.phone }}</div>
                    </li>
                </ul>
                <ul class="order-list">
                    <!-- <li v-for="(jtem,index) in item.goodslist" :key="index"> -->
                    <li v-for="(item,index) in detailsList.goodslist" :key="index">
                        <div class="left-flex">
                            <div style="width:30%;margin-right:20px">
                                <!-- <img src="https://app.okportal.net/app_admin/Uploads/1548216464352446.png" alt=""> -->
                                <img :src="item.img" alt="">
                            </div>
                            <div>
                                <p>{{ item.product}}</p>
                                <p>{{ item.unitprice}} * {{ item.quantitu }}</p>
                            </div>
                        </div>
                        <div> </div>
                    </li>
                </ul>
                <ul class="order-list">
                    <li>
                        <div class="left">
                            Total
                        </div>
                        <div>{{detailsList.productSub}} USD</div>
                    </li>
                    <li>
                        <div class="left">
                            Freight Cost
                        </div>
                        <div>{{ detailsList.shipping}} USD</div>
                    </li>
                    <li>
                        <div class="left">Price</div>
                        <div>{{ detailsList.total }} USD</div>
                    </li>
                    <li>
                        <div class="left">Order Time</div>
                        <div>{{ detailsList.creation }}</div>
                    </li>
                    <li>
                        <div class="left">Order Number</div>
                        <div>{{ detailsList.orderNumber }}</div>
                    </li>
                </ul>
            </div>
            <br >
            <br >
        </el-dialog>
    </div>
</template>
<script>
import { GetInitial , GetOrderdetails , DelOrder , ConfirmOrder } from '@/api/index'
import Qs from "qs"
export default {
    data() {
        return {
            orderlist:null,
            listLoading:false,
            detailsList:null,
            elLoading:false,
            total_count:null,
            editAddressShow:false,
        }
    },
    created() {
        this.getData(1)
    },
    methods:{
        getData(page_no) {
            this.listLoading = true;
            GetInitial(Qs.stringify({'page_no':page_no,'page_size':4})).then(res=>{
                this.listLoading = true;
                if(res.code == 200) {
                    this.listLoading = false;
                    this.orderlist = res.content.list
                    this.total_count = res.content.total_count;
                }else {
                    this.$message.error(res.content);
                }
            })
        },
         handleCurrentChange(val) {
            this.getData(val)
            },
        paymentType(type,id,url) {
            //0---支付·····1----删除·······2确认收货
            switch (type) {
                case 0 :
                    this.listLoading = true;
                    window.location = url;
                    break
                case 1 :
                    this.$confirm('REMOVE ?', 'Tips', {
                    type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        DelOrder(Qs.stringify({ 'id' : id})).then(res=>{
                            this.getData(1)
                            if(res.code == 200 ) {
                                this.$message.success("Delect success !!");
                            }else{
                                this.$message.warning(res.content);
                            }
                        })
                    }).catch(() => {
                    });
                    break
                case 2 :
                    this.$confirm('Comfirm Arrival ?', 'Tips', {
                    type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        ConfirmOrder(Qs.stringify({ 'id' : id})).then(res=>{
                            this.getData(1)
                            if(res.code == 200 ) {
                                this.$message.success("Comfirm success !!");
                            }else{
                                this.$message.warning(res.content);
                            }
                        })
                    }).catch(() => {
                    });
                    break
                default:
                    break
            }

        },
        getDetails(id) {
            this.elLoading  = true;
            this.editAddressShow  = true;
            GetOrderdetails(Qs.stringify({"id":id})).then(res=>{
                this.elLoading = false;
                if(res.code == 0) {
                    this.detailsList = res
                }else {
                    this.$message.error("error !!!");
                }
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
.maorder-container{
    border-top: 20px solid #3e3c89;
    .wrap{
        width: 1190px;
        margin: 50px auto;
        padding-top: 30px;
        h6{
            font-size: 28px;
            color: #3e3c89;
            font-weight: 900;
            padding-bottom: 30px;
        }
        .moni-table{
            border-top: 2px solid #A19FC2;
            border-bottom: 2px solid #A19FC2;
            .no-order{
                font-size: 35px;
                text-align: center;
                font-weight: 600;
                padding: 150px 0;
                color: #939598;
            }
            .order-p{
                font-size: 16px;
                padding: 20px 0;
                margin-bottom: 15px;
                color: #000000;
                font-weight: 600;
                span{
                    margin-right: 20px;
                }
            }
            .moni-tr{
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                padding:25px;
                box-sizing: border-box;
                background: #F1F1F2;
                border-radius: 10px;
                -moz-border-radius: 10px;
                -webkit-border-radius: 10px;
                &.title{
                    padding:30px  0;
                    background: #ffffff;
                    .tr-amount{
                        margin-left: -45px;
                        color: #000000;
                    }
                }
                .tr-img{
                    width: 12%;
                    font-size: 20px;
                    font-weight: 900;
                    img{
                        max-width: 100%;
                    }
                }
                .tr-detail{
                    width: 15%;
                    cursor: pointer;
                    p{
                        color: #939598;
                        font-weight: 600;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
                .tr-name{
                    width: 25%;
                    font-weight: 600;
                    p{
                        font-size: 20px;
                        line-height: 35px;
                        &:nth-last-of-type(1){
                            font-size: 16px;
                            color: #939598;
                        }
                    }
                }
                .tr-amount{
                    width: 15%;
                    font-size: 20px;
                    font-weight: 900;
                    color: #3e3c89;
                }
                .tr-payment{
                    width: 15%;
                    color: #939598;
                    font-weight: 600;
                    font-size: 18px;
                    p{
                        width: 160px;
                        text-align: center;
                    }
                    button{
                        background: #3e3c89;
                        color: #ffffff;
                        border-radius: 10px;
                        -moz-border-radius: 10px;
                        -webkit-border-radius: 10px;
                        width: 160px;
                        text-align: center;
                        cursor: pointer;
                        padding: 7px 0;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    .maorder-container {
        .wrap{
            width: 96%;
            margin: 0 auto;
            .moni-table{
                .order-p{
                    text-align: center;
                    line-height: 25px;
                    width: 85%;
                    margin: 0 auto;
                }
                .moni-tr{
                    flex-wrap: wrap;
                    padding: 25px 5px;
                    .tr-img{
                        width: 25%;
                    }
                    .tr-name{
                        width: 15%;
                    }
                    .tr-amount{
                        width: 30%
                    }
                    .tr-payment{
                        width: 100%;
                        padding-top: 10px;
                        text-align: center;
                        p{
                            width: 100%;
                            text-align: center
                        }
                    }
                }
            }
        }
    }
}
</style>
<style lang="less">
.maorder-container {
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
    .order-contianer{
        padding-bottom: 35px;
        box-sizing: border-box;
        padding: 0 10%;
    }
    .order-list{
        border-bottom: 1px solid #dcdcdc;
        padding: 10px 0;
        margin-bottom: 10px;
        li{
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            margin-bottom: 15px;
            .left {
                width: 50%;
                text-align: left;
            }
            .left-flex{
                display: flex;
                display: -webkit-flex;
                text-align: left;
                width: 50%;
                align-items: center;
                img{
                    width: 100%;
                    display: block;
                }
                p{
                    line-height: 25px;
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
  .el-pagination.is-background .el-pager li:not(.disabled).active{
      background: #3e3c89;
  }
}
@media only screen and (max-width: 768px) {
.el-dialog{
    width: 85% !important;
}
}
</style>
