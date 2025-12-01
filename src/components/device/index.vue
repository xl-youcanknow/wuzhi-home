<template>
    <div class="device-container">
        <div class="wrap">
            <h1>Device List</h1>
            <div class="add-device" @click="addDeviceShow = !addDeviceShow">
                <i class="el-icon-circle-plus"></i>
                Add Device
            </div>
            <div class="flex-container" v-if="deviceList.length > 0">
                <div class="flex-box" v-for="(item,index) in deviceList" :key="index">
                    <div class="flex-img" @click="openApp(item.hotspotip)"><img src="../../public/img/pro-img.png" alt=""></div>
                    <div class="flex-name" @click="openApp(item.hotspotip)">
                        <p>{{ item.type }}</p>
                        <p>{{ item.name }}</p>
                    </div>
                    <div class="flex-status">
                        <i class="circle-green" :class="item.status == 1 ? 'active':'' "></i>
                        <span>Online</span>
                        <br class="huanhang"/>
                        <i class="circle-red" :class="item.status == 1 ? '':'active' "></i>
                        <span>Offline</span>
                    </div>
                    <div class="flex-reduce" @click="removeDeivece(item.hotspotip,index)"><img src="@/public/img/reduce.png" alt=""></div>
                </div>
            </div>
            <div class="no-device" v-else> 
                NO Device
            </div>
        </div>
        <el-dialog :visible.sync="addDeviceShow" width="50%">
            <div class="dialog-top">
                <p><font>Input Your Device Information</font> <span><router-link to="/products"> Buy OKportal Device > </router-link></span></p>
            </div>
            <div class="dialog-body">
                <input type="text" class="input1" v-model="username" placeholder="Username">
                <input type="text" class="input1" v-model="password" placeholder="Password">
                <div class="ip-box">
                    <input type="button" value="IP :">
                    <el-input v-model.number="ipVal[index]" v-for="(item,index) in ipVal" ref="input" :key="index" class="ipinput" type="number" maxlength="3" @change="limit(ipVal[index],index)" @keyup.native="limit(ipVal[index],index,$event)"></el-input>
                </div>
            </div>
            <div class="dialog-footer">
                <el-button type="primary" @click="addDeivce" :loading="loadingBtn">Confirm</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import { getsing } from '@/api/index' 
import Qs from "qs"
import axios from 'axios'
export default {
    data() {
        return {
            addDeviceShow:false,
            username:"",
            password:"",
            ipVal:['','','',''],
            deviceList:[],
            loadingBtn:false
        }
    },
    created() {
        this.getDevice();
    },
    methods:{
        limit(val,index,event) {
            if(val > 256) {
                this.$set(this.ipVal,index,255);
            }
            if(event) {
                if(/(^[0-9]\d*$)/.test(event.key)) {
                    if(val >= 100) {
                        let _index = index+1;
                        _index > 3 ?  _index = 0 : _index
                        this.$refs.input[_index].focus()
                    }
                }
            }
        },
        getDevice() {
            let [arr,uid,timestamp,app_username] = [{},localStorage.getItem("returnid"), Date.parse(new Date())/1000,localStorage.getItem("username")];
            let promiseDevice =  new Promise(function(resolve, reject) {
                getsing(Qs.stringify({ "arr[uid]": uid , "arr[timestamp]" : timestamp ,"arr[app_username]":app_username})).then( res => {
                resolve(res)
                })
            })
            promiseDevice.then((res)=>{
                let postNet = localStorage.getItem("netUrl");
                let postUrl = `${postNet}/admin.php/Userbinding/devicelist`
                axios.post(postUrl,Qs.stringify({
                    "uid": uid , "timestamp" : timestamp ,"app_username":app_username,"sign":res
                })).then(res=>{
                    if(typeof(res.data) !=='string') {
                        this.deviceList = res.data;
                    }else{
                        this.deviceList = null
                    }
                })
                }
            )
        },
        addDeivce() {
            if(this.username && this.password && this.ipVal[0] && this.ipVal[1] && this.ipVal[2] && this.ipVal[3]){
                this.loadingBtn = true;
                let ipString = this.ipVal.toString().replace(/,/g,'.');
                let [arr,timestamp,uid,username,password,app_username,sign,ip,email,sortname] 
                = 
                [{},Date.parse(new Date())/1000,localStorage.getItem("returnid"),this.username,this.password,localStorage.getItem("username"),null,ipString,localStorage.getItem("username"),localStorage.getItem("sortName")];
    
                //timestamp,uid,username,password,app_username,sign,ip,email,sortname
                let promiseAddDeivce =  new Promise(function(resolve, reject) {
                    getsing(Qs.stringify({ 
                        "arr[uid]": 123 , 
                        "arr[timestamp]" : timestamp ,
                        "arr[username]" : username ,
                        "arr[password]" : password ,
                        "arr[app_username]" : app_username ,
                        "arr[ip]" : ip ,
                        "arr[email]" : email ,
                        "arr[sortname]" : sortname ,
                        })).then( res => { resolve(res) })
                })
                promiseAddDeivce.then((res)=>{
                    let postNet = localStorage.getItem("netUrl");
                    let postUrl = `${postNet}/admin.php/Userbinding/adddevice`;
                    axios.post(postUrl,Qs.stringify({
                        "timestamp": timestamp,
                        "uid": uid,
                        "username": username,
                        "password": password,
                        "app_username": app_username,
                        "sign": res,
                        "ip": ip,
                        "email":app_username,
                        "sortname":sortname,
                    })).then(res=>{
                        // this.loadingBtn = false;
                        if(res.data.code == 1) {
                            this.addDeviceShow = false;
                            this.$message.success("Add Device success !!");
                            window.reload();
                        }else {
                            this.$message.error(res.data.content);
                        }
                    }).catch(error=>{
                        this.$message.error(error);
                    })
                    
                })
            }else {
                this.$message.warning("Please input All infomation");
            }
        },
        //open app
        //newWindow .location = openurl+"/admin.php/Login/applogin?timestamp=" + timestamp2 + "&uid=" + id + "&app_username=" + app_username + "&sign=" + data + "&ip=" + ip;
        openApp(ipHost) {
            let [arr,uid,timestamp,ip,app_username] = [{},localStorage.getItem("returnid"), Date.parse(new Date())/1000,ipHost,localStorage.getItem("username")];
            let newWindow = window.open();
            let promiseOpen =  new Promise(function(resolve, reject) {
                getsing(Qs.stringify({ "arr[uid]": uid , "arr[timestamp]" : timestamp ,"arr[app_username]":app_username,"arr[ip]":ip})).then( res => {
                resolve(res)
                })
            })
            promiseOpen.then((res)=>{
                // /admin.php/Userbinding/adddevice
                let netHost = localStorage.getItem("netUrl");
                newWindow.location = `${netHost}/admin.php/Login/applogin?timestamp=${timestamp}&uid=${uid}&app_username=${app_username}&sign=${res}&ip=${ip}`
                }
            )
        },
        removeDeivece(ipHost,index) {
            // /admin.php/Userbinding/devicedel
            this.$confirm("REMOVE ?", "Tips", { type: "warning" }).then(() => {
                let [arr,uid,timestamp,ip,app_username] = [{},localStorage.getItem("returnid"), Date.parse(new Date())/1000,ipHost,localStorage.getItem("username")];
                let promiseRemove =  new Promise(function(resolve, reject) {
                    getsing(Qs.stringify({ "arr[uid]": uid , "arr[timestamp]" : timestamp ,"arr[app_username]":app_username,"arr[ip]":ip})).then( res => {
                    resolve(res)
                    })
                })
                promiseRemove.then((res)=>{
                    let postNet = localStorage.getItem("netUrl");
                    let postUrl = `${postNet}/admin.php/Userbinding/devicedel`;
                    axios.post(postUrl,Qs.stringify({
                        "timestamp": timestamp,
                        "uid": uid,
                        "app_username": app_username,
                        "sign": res,
                        "ip": ip
                    })).then(res=>{
                        this.deviceList.splice(index,1);
                        this.$message.success("Remove success !!");
                    })
                })
            }).catch(()=>{})
        }
    },
}
</script>
<style lang="less" scoped>
*{
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
}
.device-container{
    border-top: 20px solid #32327E;
    .wrap{
        width: 1190px;
        margin: 50px auto;
        h1{
            font-size: 25px;
            font-weight: 900;
            color: #32327E;
        }
        .no-device{
            font-size: 30px;
            padding: 150px 0;
            text-align: center;
            color: #a7a9ac;
            font-weight: 600;
        }
        .add-device{
            padding: 30px 0;
            border-top: 2px solid #918AB4;
            border-bottom: 2px solid #918AB4;
            margin-top: 30px;
            font-size: 22px;
            font-weight: 600;
            color: #a7a9ac;
            cursor: pointer;
            i{
                font-size: 25px;
                color: #32327E;
                margin-right: 25px;
            }
        }
        .flex-box{
            display: flex;
            display: -webkit-flex;
            box-sizing: border-box;
            padding:20px 30px;
            align-items: center;
            justify-content: space-between;
            background: #F1F1F2; 
            border-radius: 10px;
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
            margin-bottom: 20px;
            &:nth-of-type(1){
                margin-top: 20px;
            }
            .flex-img{
                width: 18%;
                cursor: pointer;
                img{
                    max-width: 100%;
                }
            }
            .flex-name{
                width: 40%;
                cursor: pointer;
                p{
                    &:nth-of-type(1) {
                        font-size: 23px;
                        font-weight: 900;
                        color: #000000;
                        margin-bottom: 20px;
                    }
                    &:nth-of-type(2) {
                        color: #939598;
                        font-size: 16px;
                    }
                }
            }
            .flex-status{
                width: 25%;
                text-align: center;
                color: #939598;
                .huanhang{
                    display: none
                }
                i{
                    display: inline-block;
                    background: #D1D3D4;
                    width: 20px;
                    height: 20px;
                    position: relative;
                    top: -2px;
                    border-radius: 100%;
                    -moz-border-radius: 100%;
                    -webkit-border-radius: 100%;
                    vertical-align: middle;
                    margin-right: 25px;
                    &.circle-green.active{
                        background: #2BB673;
                    }
                    &.circle-red.active{
                        background: #BE1E2D;
                    }
                }
                span{
                    margin-right: 25px;
                }
            }
            .flex-reduce{
                width: 25px;
                cursor: pointer;
                img{
                    max-width: 100%;
                }
            }
        }
    }
    .dialog-top{
        background: #33338A;
        box-sizing: border-box;
        padding: 30px 5%;
        color: #ffffff;
        p{
            font-size: 20px;
            font-weight: 600;
            font{
                padding-left: 20px;
            }
            span{
                float: right;
                font-size: 17px;
                font-weight: 400;
                cursor: pointer;
                a{
                    color: inherit;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    .dialog-body{
        background: #ffffff;
        box-sizing: border-box;
        padding: 50px 5%;
        padding-bottom: 0;
        .input1{
            font-size: 18px;
            display: block;
            box-sizing: border-box;
            padding: 10px 20px;
            border-bottom: 1px solid #32327E;
            width: 100%;
            margin-bottom: 15px;
        }
        .input1::-webkit-input-placeholder{
            color: #a7a9ac;
        }
        .input1:-moz-placeholde{
            color: #a7a9ac;
        }
        .input1::-moz-placeholder{
            color: #a7a9ac;
        }
        .input1:-ms-input-placeholder{
            color: #a7a9ac;
        }
        .ip-box{
            width: 60%;
            margin: 30px auto;  
            display: flex;
            display: -ms-flexbox;
            justify-content: space-between;
            input{
                font-size: 18px;
                width: 12%;
                padding: 15px;
                color: #404042;
                text-align: center;
            }
        }
    }
    .dialog-footer{
        padding: 30px 0;
        button{
            margin: 0 auto;
            display: block;
            background: #32327E;
            color: #ffffff;
            font-size: 18px;
            width: 180px;
            padding: 12px 0;
            border-radius: 20px;
            -moz-border-radius: 20px;
            -webkit-border-radius: 20px;
            cursor: pointer;
            border: none;
        }
    }

}
@media only screen and (max-width: 768px) {
.device-container{
    .wrap{
        width: 96%;
        margin: 20px auto;
        h1{
            font-size: 20px;
        }
        .add-device{
            padding: 15px 0;
            margin-top: 20px;
            font-size: 20px ;
        }
        .flex-box{
            padding: 15px;
            .flex-status{
                .huanghang{
                    display: block;
                }
            }
        }
    }
    .dialog-body{
        .ip-box{
            width: 90% !important;
        }
    }
    
    }
}
</style>
<style lang="less">
.device-container{
    .el-dialog{
        border-radius: 10px;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        overflow: hidden;
    }
    .el-dialog__header{
        padding: 0;
    }
    .el-dialog__body{
        padding: 0;
    }
    .ipinput{
        background: #F1F1F2;
        font-size: 18px;
        width: 16%;
        color: #404042;
        text-align: center;
        border-radius: 20px !important;
        -moz-border-radius: 20px !important;
        -webkit-border-radius: 20px !important;
        overflow: hidden;
        input{
            width: 100%;
            background: #F1F1F2 !important;
            border: none;
            height: 100%;
            padding: 15px 20px;
            text-align: center;
        }
    }
    .el-dialog__headerbtn .el-dialog__close{
        color: #ffffff;
        font-weight: 600;

    }
    .el-button{
        span{
            font-size: 18px;
        }
    }
}
@media only screen and (max-width: 768px) {
    .device-container{
        .el-dialog{
            width: 96% !important;
        }
        .ipinput{
            input{
                padding: 0px 5px
            }
        }
    }
}
</style>
