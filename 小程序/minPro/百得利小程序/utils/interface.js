/*
  请求接口地址，以字面量来填写
*/

module.exports={

 //获取会员卡
  getMemberList:'Brand/List',
  //获取banner图
  getBanner:'Banner/List',
 //获取附近店面 http://bdl-api.jeemoo.com/program/shop/NearbyList?longitude=1&latitude=1
  getNearShop:'Shop/NearbyList',
  //用户登录  login 
  login:'User/Login',
  //获取优惠券 http://bdl-api.jeemoo.com/program/Coupon/RecommendList
  getCoupon:'Coupon/RecommendList',
  //添加优惠 http://bdl-api.jeemoo.com/program/Coupon/GetCardExt?id=13&AccessToken=
  addCard:'Coupon/GetCardExt',
  //激活会员卡http://bdl-api.jeemoo.com/program/user/active?AccessToken=
  activeMember:'User/Active',
  //获取用户信息 http://bdl-api.jeemoo.com/program/user/info?AccessToken=
  userInfo:'User/Info',
  //文章详情 http://bdl-api.jeemoo.com/program/article/detail?AccessToken=6c7f841&id=1
  detail: 'Article/Detail',
  //统计次数
  coutTimes:'coutTimes',
  //跳转微信小点首页
  toMiniProgram:'toMiniProgram',
  //获取全部门店列表  http://bdl-api.jeemoo.com/program/shop/list?AccessToken=f&keyword=&provinceId=&cityId=&districtId=&brandId=&offset=&limit=
  getLoactShopList:'Shop/List',
  //获取城市列表http://bdl-api.jeemoo.com/program/city/list?AccessToken=
  getCityList:'City/List',
  //加载发现页面http://bdl-api.jeemoo.com/program/Coupon/list?AccessToken=1&offset=1&limit=5&keyword=
  findPage:'Coupon/List',
  //我的会员卡 http://bdl-api.jeemoo.com/program/user/membercards?AccessToken=ccf
  myMember:'User/Membercards',
  //我的优惠券 http://bdl-api.jeemoo.com/program/user/coupons?AccessToken=7e880f&offset=0&limit=10
  myCoupon:'User/Coupons',
  //意见反馈 http://bdl-api.jeemoo.com/program/feedback/create?AccessToken=f841&contact=1&details=b
  suggest:'Feedback/Create',
  //支付参数 http://bdl-api.jeemoo.com/program/coupon/buy?id=13&AccessToken=cc
  paydata:'Coupon/Buy',
  //品牌列表
  industry: 'Industry/List',
  //卡券详情 http://bdl-api.jeemoo.com/program/coupon/detail?accesstoken=c83ee&id=40
  couponDetail:'Coupon/Detail',
  // 领取后查看卡券详情
  myCoupDetail:'User/Coupon',
  //查看店铺详情Shop/Detail?id=&AccessToken=
  shopDetail:'Shop/Detail'
}