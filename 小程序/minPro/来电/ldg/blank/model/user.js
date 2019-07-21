import _interface from "../interface"
import Ajax from "../libs/ajax.js";
import  Location  from "./map.js";
import Tool from "../libs/tool"
class User{
  constructor(){
    this.userId="";
     this.isSign=false;//默认未注册
    this.isVIP=false;
    this.deposit = 0;
    this.balance = 0;
    //获取附近列表
    this.posArr = [];
    this.location={}
  }
  getPos(cb){
    Tool.getLocation().then(res=>{
      Location.init('map')
       this.location=res;
      cb && cb(res)
    }).catch(err=>{
      
    })
  }
  login(){
    my.getAuthCode({
      scopes: 'auth_base',
      success: (res) => {
        console.log(res)
          my.getOpenUserInfo({
      fail: (res) => {
        console.log('err',res)
      },
      success: (res) => {
        console.log('ok',res)
        //let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
      }
    });
      //   my.alert({
      //   content: res.authCode,
      // });
      },
    });
  }
}
let user=new User();
export { user as User }