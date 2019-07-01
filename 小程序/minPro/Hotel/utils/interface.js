/*
  请求接口地址，以字面量来填写
*/
let online = {
  //用户登录  login 
  login: 'use/login',//登录
  get_code:'/login/send-msg',//获取验证码
  regiser:'/use/reg',//注册
  log:'/use/log',//核销记录
  use:'/use/use',//核销
}


module.exports = online
