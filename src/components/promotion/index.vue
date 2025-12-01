<template>
    <div class="promotion-container">
        <ul class="tab-link">
            <li :class="nowFlag ? 'active' : ''" @click="nowFlag = true">Referral Code</li>
            <li :class="nowFlag ? '' : 'active'" @click="nowFlag = false">Your Coupon</li>
        </ul>
        <div class="main" v-if="nowFlag">
            <el-card class="box-card recode" v-if="reCode">
                <div class="text item">
                    <span>Sales Code：</span>
                    {{reCode.sales_code}}
                </div>
                <div class="text item">
                    <span>Discount：</span>
                    {{reCode.discount}}
                </div>
                <div class="text item">
                    <span>Commission：</span>
                    {{reCode.commission}}
                </div>
                <div class="text item">
                    <span>Preomotion Url：</span>
                    {{reCode.url}}
                </div>
            </el-card>
        </div>
        <div v-else>
            <h6 style="text-align: left">Event Coupon List</h6>
            <div class="main" v-if="evetCouponList">
                <el-card class="box-card" v-for="(item,index) in evetCouponList" :key="index">
                    <div class="text item">
                        <span>Sales Code：</span>
                        {{item.sales_code}}
                    </div>
                    <div class="text item">
                        <span>Discount：</span>
                        {{item.discount}}
                    </div>
                    <div class="text item">
                        <span>Start Time：</span>
                        {{item.stime}}
                    </div>
                    <div class="text item">
                        <span>End Time：</span>
                        {{item.etime}}
                    </div>
                </el-card>
            </div>
            <h6 style="text-align: left">Referral Code List</h6>
            <div class="main" v-if="CouponList">
                <el-card class="box-card" v-for="(item,index) in CouponList" :key="index">
                    <div class="text item">
                        <span>Sales Code：</span>
                        {{item.sales_code}}
                    </div>
                    <div class="text item">
                        <span>Discount：</span>
                        {{item.discount}}
                    </div>
                    <div class="text item">
                        <span>Commission：</span>
                        {{item.commission}}
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import { GetReferralCode , GetMyCoupon } from '@/api/index'
export default {
    data() {
        return {
            nowFlag:true,
            reCode:null,
            evetCouponList:null,
            CouponList:null,
        }
    },
    created() {
        let _this = this;
        let promise1 =  new Promise(function(resolve, reject) {
            GetReferralCode().then(res=>{
                _this.reCode = res.content;
                resolve()
            })
        })
        promise1.then(()=>{
            GetMyCoupon().then(res=>{
                _this.evetCouponList = res.content.event_coupon_list;
                _this.CouponList = res.content.referral_code_list;
            })
            }
        )
    }
    
}
</script>
<style lang="less" scoped>
* {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.promotion-container{
    width: 1190px;
    margin: 0 auto;
    padding: 25px 0;
    .tab-link{
        display: flex;
        display: -ms-flexbox;
        justify-content: flex-end;
        li{
            margin-left: 30px;
            font-size: 20px;
            color: #999999;
            padding-bottom: 15px;
            cursor: pointer;
            &.active{
                border-bottom: 2px solid #678bf1
            }
        }
    }
    .main{
        margin-top: 40px;
        padding-bottom: 80px;
        display: flex;
        display: -ms-flexbox;
        justify-content: center;
        justify-content: space-around;
        .box-card{
            width: 30%;
            padding: 20px 0;
            .text{
                margin-bottom: 30px;
            }
            span{
                width: 120px;
                display: inline-block;
                margin-right: 5px;
                text-align: right
            }
            &.recode{
                width: 63%;
                span{
                    width: 150px
                }
            }
        }
    }
}
</style>
