
/* API URL */
/*-------------------------OKportal。net接口------ -------------*/
import axios from 'axios'
import {Message} from 'element-ui'

let url=window.location.host || 'www.okportal.net';

const service = axios.create({
    // baseURL:`https://${url}/device/index.php/`,
    baseURL:"http://192.168.20.242/okportalnet/device/index.php",
    timeout: 20000,
    withCredentials:true //本地测试跨域请求--send cookie 上线前注释掉
});
service.interceptors.response.use(// response 拦截器
  response => {
    return response.data  
  },
  error => {
    Message({
      message: 'Network request failed!',
      type: 'error'
    });
  }
)


//产品列表
export const Productinfo = params => service.post('Product/productinfo',params)
export const getUrl = data => service.post('Product/getUrl',data);
export const getsing = data => service.post('Product/getsing',data);//获取签名
//支付页，登录
export const orderLogin = data => service.post('Order/payorder',data)
export const getCountry = data => service.post('Address/getcoutry',data)
export const getProvince = data => service.post('Address/getprovince',data)
export const getCity = data => service.post('Address/getcity',data)
export const vercode = data => service.post('Register/verificationcode',data)
export const registerAPI = data => service.post('Register/register',data)
export const loginAPI = data => service.post('Login/newlogin',data)
export const emailBuy = data => service.post('Purchase/shopping',data)//license email buy
export const addcar = data => service.post('Car/addcar',data)
export const dellcar = data => service.post('Car/dellcar',data)
export const changeNumber = data => service.post('Car/changenumber',data)
export const getCart = data => service.post('Car/shoppinglist',data)
export const contactus = data => service.post('Purchase/contactus',data)
export const loginout = data => service.post('Login/loginout',data)
export const islogin = data => service.post('Login/islogin',data)
export const findpwdcode = data => service.post('Register/findpwdcode',data);
export const checkcode = data => service.post('Register/checkcode',data);
export const retrievepassword = data => service.post('/Register/retrievepassword',data);
export const creatorder = data => service.post('Order/creatorder',data);
export const productDetails = data => service.post('Product/productDetails',data);
export const sendemail = data => service.post('Purchase/sendemail',data); //license email code
/*······················订单并和---start·····················*/
export const Getorderlist = data => service.post('Order/orderlist',data); 
export const addOrder = data => service.post('Order/add',data); 
export const changeFreight = data => service.post('Order/freight',data); 
export const CheckCoupon = data => service.post('Order/check_coupon',data); 
export const GetAddresslist = data => service.post('Address/addr',data); 
export const GetAddressProvince = data => service.post('Address/province',data); 
export const GetAddressCity = data => service.post('Address/city',data); 
export const AddAddress = data => service.post('Address/add',data); 
export const UpdateAddress = data => service.post('Address/update',data); 
export const DelAddress = data => service.post('Address/del',data); 
export const GetInitial = data => service.post('Usercenter/initial',data); 
export const GetOrderdetails = data => service.post('Usercenter/orderdetails',data); 
export const DelOrder = data => service.post('Usercenter/dell',data); 
export const ConfirmOrder = data => service.post('Usercenter/confirm',data); 
/*······················订单并和---end······················*/
/*······················resell--Promotion-----······················  */
export const GetPolicy = data => service.get('Promotion/policy',{data}); 
export const PostPolicy = params => service.post('Promotion/policy',params); 
export const GetReferralCode = params => service.get('Promotion/referral_code',{params}); 
export const GetMyCoupon = params => service.get('Promotion/my_coupon',{params}); 
export const GetCreateCoupon = params => service.get('Promotion/create_coupon',{params}); 
export const PostCreateCoupon = params => service.post('Promotion/create_coupon',params); 
/* ----------------------user Centre-------------------------*/
export const GetUserinfo = params => service.get('usercenter/userinfo',{params}); 
export const PostUserinfo = params => service.post('usercenter/userinfo',params); 
export const NewChangePass = params => service.post('usercenter/change_password',params); 
export const EditUserImg = params => service.post('usercenter/edit_user_img',params); 
/* ----------------------resources---------------------------- */
export const GetResources = params => service.post('resources/get_resources',params); 



/**
 * 豪哥专用接口
 * okportalnetapi
 */

const service2 = axios.create({
  // baseURL:`https://${url}/okportalnetapi/index.php`,
  baseURL:"http://192.168.20.242/okportal_api/index.php",
  timeout: 20000
});
service2.interceptors.response.use(
  response => {
    return response.data  
  },
  error => {
    Message({
      message: 'Network request failed!',
      type: 'error'
    });
  }
)
export const leaveMessage = data => service2.post('/home/message/leave_message',data); 
export const backLogin = data => service2.post('/admin/login/login',data); 
export const getParentType = data => service2.post('/home/Resources/get_type',data); 
export const getChildType = data => service2.post('/home/Resources/get_child_type',data); 
export const getAllList = data => service2.post('/home/Resources/get_list',data); 


/* URL一堆链接---有用的东西 */
export const blog="https://"+url+"/blog";
export const opendevice="https://"+url+"/device/index.php/Product/device";
export const openpayorder="https://"+url+"/device/index.php/Order/configorder";
export const openaddress="https://"+url+"/device/index.php/Address/addres";
export const openorder="https://"+url+"/device/index.php/Usercenter/order";

