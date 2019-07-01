/*
  请求接口地址，以字面量来填写 /user/get-verify-code
*/
let online = {
  //注册
  sign:'/login/wx-reg-no-mobile',
  //用户登录 
  login: '/login/is-reg',//ok 
  //获取验证码
  getCode: '/login/send-msg',//ok
  //注册微信 
  signByWX: '/login/wx-reg',
  //普通手机号
  signByMobile: '/login/mobile-reg',
  //获取周边配送员
  getNearPost: '/home/near-delivery-clerk',//ok
  //获取历史记录
  getHistory: '/home/address-search-history',//no
  //删除历史
  delhis:'/home/del-history-address',
  //获取价格
  getPrice: '/home/get-distance-price',//no
  //上传图片
  updataImg: '/site/upload-img',
  //支付
  pay:'/order/create',
  //获取用户信息
  getUserInfo: '/member/get-member-info',
  //保存用户信息
  saveUserInfo:'/member/save-member-info',
  //获取宠物信息
  getPetInfo: '/member/get-member-pets',
  //保存宠物信息
  savePetInfo:'/member/save-member-pets',
  //获取订单列表
  orderList: '/order/list',
  //订单详情
  orderDetail: '/order/info',
  //价格明细
  priceList: '/order/get-price-info',
  //获取订单内宠物信息
  getOrderPetDetail: '/order/get-pets-info',
  //获取免责申明
  disclaimer:'/site/get-disclaimer',
  //平台介绍
  introduce: '/site/get-platform-introduction',
  //价格说明
  priceIntroduce:'/site/get-price-info',
  //获取可选范围
  getAllowArea:'/home/get-allow-city',
  //提交评论
  evalute:'/order/comment',
  //申请退款
  refund:'/order/refund',
  //获取地理位置
  getPosterPos:'/order/get-delivery-location',
  //获取优惠券列表
  getCardList:'/coupon/get-coupon-list',
  //判断是否可用优惠券
  isUseCard:'/coupon/get-coupon-price',
  //赠送优惠券
  sendCard:'/coupon/rand-coupon'
}
// 测试
let test = {
  //用户登录 
  login: '/user/get-access-token',
  //获取验证码
  getCode: '/getCode',
  //注册 
  sign: '/user/register',
  //获取周边配送员
  getNearPost:'/poster',
  //获取历史记录
  getHistory:'/gethistory',
  //获取价格
  getPrice:'/getPrice',
  //注册
  register:'/register',
  //上传图片
  updataImg:'/updataImg',
  //支付
  pay:'/wxPay',
  //获取用户信息
  getUserInfo:'/getUserInfo1',
  //获取宠物信息
  getPetInfo:'/getPetInfo',
  //获取订单列表
  orderList:'/orderAll',
  //订单详情
  orderDetail:'/detail',
  //价格明细
  priceList:'/priceList',
  //获取订单内宠物信息
  getOrderPetDetail:'/getOrderPet'
}

module.exports = online 
//module.exports = test