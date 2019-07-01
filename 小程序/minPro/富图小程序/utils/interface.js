/*
  请求接口地址，以字面量来填写 /user/get-verify-code
*/
let online = {
  //用户登录 ok
  login: '/user/get-access-token', 
  //获取验证码 ok
  getCode: '/user/get-verify-code',
  //注册 ok
  sign: '/user/register',
  //获取首页banner ok
  getBanner: '/banner/list',
  //获取菜品排行 ok 
  foodRange: "/food/rank",
  //获取附近店铺 ok
  getNearShop: '/restaurant/list',
  //获取推荐菜品 ok 
  recommontFood:'/food/recommend',
  //设置餐厅id ok 
  setRestaurantId: '/user/change-restaurant',
  //获取餐厅详情信息（菜品，分类等信息） ok
  getResDetailInfo: '/restaurant/detail',
  //添加购物车 ok
  addCart: '/cart/set-quantity',
  //获取购物车列表 ok
  getCartList: '/restaurant/cart',
  //获取菜品详情信息 ok
  getResDetail: '/food/detail',
  //获取点赞状态
  getThumbs: '/getThumbs',
  //点赞 ok
  doThumbs: '/food/vote',
  //取消点赞
  cancelThumbs:'/food/cancel-vote',
  //获取标签列表 ok
  getMarkList: '/tag/list',
  //支付 ok
  wxPay: '/order/create',
  //确认支付 ok
  confirmPayment:'/order/confirm-payment', 
  //待支付 ok
  prepay:'/order/prepay',
  //清除购物车 ok
  clearCart: '/cart/clear',
  //获取订单列表 ok
  getOrderlist: '/order/list',
  //获取订单详情 ok
  getOrderDetail: '/order/detail',
  //取消订单
  cancelOrder: '/order/cancel',
  //获取消费统计列表
  getNoteList: "/user/consume-log",
  //保存生日信息
  saveInfo: '/user/update',
  cabinet: '/order/open-cabinet'
}
// 测试
let test = {
  //用户登录  login 
  login: 'login',
  //获取验证码
  getCode:'getCode',
  //注册
  sign:'sign',
  //获取首页banner
  getBanner:'getBanner',
  //获取菜品排行
  foodRange:"foodRange",
  //获取附近店铺
  getNearShop:'getNearShop',
  //获取推荐菜品
  recommontFood:'recommont_food',
  //设置餐厅id
  setRestaurantId:'setRestaurant_id',
  //获取餐厅详情信息（菜品，分类等信息）
  getResDetailInfo:'getResDetailInfo',
  //添加购物车
  addCart:'addCarts',
  //获取购物车列表
  getCartList:'getCartLists',
  //获取菜品详情信息
  getResDetail: 'getResDetail',
  //获取点赞状态
  getThumbs:'getThumbs',
  //点赞
  doThumbs:'doThumbs',
  //获取标签列表
  getMarkList:'getMarkList',
  //支付
  wxPay:'wxPay',
  //清除购物车
  clearCart: 'clearCart',
  //获取订单列表
  getOrderlist:'getOrderlist',
  //获取订单详情
  getOrderDetail:'getOrderDetail',
  //取消订单
  cancelOrder:'cancelOrder',
  //获取消费统计列表
  getNoteList:"getNoteList",
  //保存生日信息
  saveInfo:'clearCart'
}

module.exports = online
//module.exports = test