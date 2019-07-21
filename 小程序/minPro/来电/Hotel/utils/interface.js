/*
  请求接口地址，以字面量来填写 /user/get-verify-code
*/
let online = {
 
  //用户登录 
  login:'/sendSessionCode',
  //zhuce
  register: '/saveUserInfo',
  //获取附近充电列表
  getNearList:'/GetShopLists',
 
  doCharge:"/doCharge",
  //支付押金
  payment:'/payment',
  //获取充值列表
  getRechangeList:'/GetMoneyType',
  //交易记录
  getMoneyList:'/GetMoneyList'
}
// 测试
let test = {
  //用户登录 
  login: '/user/get-access-token',
  //获取验证码
  getCode: '/getCode',
  
  //注册
  register: '/register',
  //上传图片
  updataImg: '/updataImg',
  //获取用户信息
  getUserInfo: '/getUserInfo1',
  //获取订单列表
  orderList: '/getOrderList',
  //订单详情
  orderDetail: '/post_order_detail',
  //确认订单
  confirmOrder: '/clearCart',
  //获取订单内宠物信息
  getOrderPetDetail: '/getOrderPet',
  //获取宠物信息
  getPosterPet:'/post-pet-info',
  //开始配送
  startSend: '/clearCart',
  //已经送达
  isArrive:'/clearCart',
  //获取我完成订单列表
  getMyOrderList:'/getMyOrderList',
  //保存地理位置
  savaPos:'/clearCart',
  //获取到店照片
  getArriveImg:'/getArriveImg'
}

module.exports = online
//module.exports = test