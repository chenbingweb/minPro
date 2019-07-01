/*
  请求接口地址，以字面量来填写 /user/get-verify-code
*/
let online = {
  //用户登录 
  login: '/login/is-reg',
  //注册
  register: '/login/index',
  //上传图片
  updataImg: '/site/upload-img',
  //获取用户信息
  getUserInfo: '/delivery/get-info',
  //保存用户信息
  saveUserInfo:'/delivery/save-info',
  //获取订单列表
  orderList: '/order/list',
  //订单详情
  orderDetail: '/order/info',
  //确认订单
  confirmOrder: '/order/delivery',
  //获取订单内宠物信息
  getOrderPetDetail: '/order/get-pets-info',
  //获取宠物信息
  getPosterPet: '/order/get-delivery-pets-info',
  //开始配送
  startSend: '/order/pick',
  //已经送达
  isArrive: '/order/receive',
  //获取我完成订单列表
  getMyOrderList: '/order/get-complete',
  //保存地理位置
  savaPos: '/delivery/save-location',
  //获取到店照片
  getArriveImg: '/order/get-receive-image'
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