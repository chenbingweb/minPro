/*
  请求接口地址，以字面量来填写
*/
let online = {
  //用户登录  login 
  login: 'login/index',
  //获取用户基本信息
  getUserInfo:'login/info',
  //获取首页banner 推荐楼盘 推荐房源
  getIndexInfo: 'index/banner',
  //推荐资讯
  getRecomInfor: 'information-category/list',
  //推荐职业
  recomJob: 'index/job',
  //收藏
  collect:'collect/edit',
  //取消收藏
  cancelCollect:'collect/delete',
  //获取收藏状态
  getCollectStatus:'collect/status',
  //获取楼盘筛选列表
  buildFilterList:'direct-selling/get-search',
  //获取楼盘列表
  getBuildList: 'direct-selling/list',
  //获取楼盘详情信息
  getBuiltDetail: 'direct-selling/detail',
  //上传图片
  updataImg:'index/img-upload',
  //提交中介资料
  submitMidd:'member-license/edit',
  //获取手机验证码
  getCode: 'member-license/send-msg',
  //验证验证码接口
  checkCode: 'member-license/verify-phone',
  //获取区域列表
  getAreaList: 'place/list',
  //获取中介发布可选标签
  getLabelList: "tag/list",
  //检查中介是否提交资料
  checkMiddStatus: 'member-license/status',
  //普通用户认证
  authUser: 'member-license/auth',
  //中介发布
  middleBulidRelease: 'housing/edit',
  //个人房源发布
  personBulidRelease: 'housing/edit',
  //boss招聘发布
  bossRelease:'recruit/edit',
  //毛遂自荐发布
  selfRelease:'will/edit',
  //资讯发布
  infoRelease:'information/edit',
  //获取boss发布薪水
 // getPayList: 'getPayList',
  //保存个人信息
  saveInfo:"member-info/edit",
  //获取个人信息(毛遂自荐)
  getPersonInfo:'member-info/detail',
  //保存个人基本信息
  savaBaseInfo:'savaBaseInfo',
  //获取资讯所有分类表
  getInfoClass: 'information-category/get-all',
  //获取房源列表
  getHouseList: 'housing/list',
  //房源详情
  getHouseDetail:'housing/detail',
  //获取Boss招聘列表
  getBossList:'recruit/list',
  //获取boss招聘职位详情
  getJobDetail: 'recruit/detail',
  //获取毛遂自荐列表
  getSelfList:'will/list',
  //获取毛遂自荐详情
  getSelftDetail:"will/detail",
  //获取资讯列表
  getInfoList:'information/list',
  //获取资讯详情
  getInfoDetail:"information/detail",
  //签到
  signPage:'sign/sign',
  //获取签到列表
  getSignList: "signin-log/list",
  //获取钱包
  getWallList: 'shop/detail',
  //获取支付参数
  getPayData: "shop/buy",
  //获取赚币列表
  getMakeCoin: 'task/list',
  //分享
  shareFunction:'task/edit',
  //获取用户基本信息
  getUserBaseInfo:'member-license/info',
  //获取中介个人发布列表
  getHistoryReleaseHouse: "info/house",
  //获取boss招聘 毛遂自荐
  getHistoryReleaseBoss: "info/boss",
  //上架 下架
  doSJXJ: 'info/change',
  //支付历史
  getpayhistotyList: 'info/pay',
  //获取雄心币历史记录
  getXXhistooryList: 'info/log',
  //获取我的收藏历史 (房产中介/个人房源
  getCollectList: 'info/collect',
  //获取我的收藏历史(boss招聘/毛遂自荐)
  getBossCollectList: 'info/collect',
  //关于我们
  getAboutUs: 'info/about',
  //获取搜索列表
  getSearchResultRest: "index/search",
  //获取猜你想搜列表
  getSearchLabel:"getSearchLabel",
  //获取房屋型号列表
  getHouseTypeList:"housing/door",
  //获取中介个人房源发布后 推荐列表
  getCommList: "housing/recommend",
  //获取毛遂自荐发布成功后 推荐列表
  getCommSelfList: 'recruit/recommend',
  //发布资讯后 推荐列表
  getCommInfoList:'information/recommend',
  //资讯boss发布成功后 推荐列表
  getCommBossList:'will/recommend',
  //formId
  sendFormId:'/login/submit-form',
  //获取职位
  jobList:'/index/job-list'
}
// 测试
let test = {
  //用户登录  login 
  login: 'login/index',
  //获取用户基本信息
  getUserInfo: 'login/info',
  //获取首页banner 推荐楼盘 推荐房源
  getIndexInfo: 'getIndexInfo',
  //推荐资讯
  getRecomInfor: 'getRecomInfor',
  //推荐职业
  recomJob: 'recomJob',
  //获取楼盘筛选列表
  buildFilterList: 'buildFilterList',
  //获取楼盘列表
  getBuildList: 'getBuildList',
  //获取楼盘详情信息
  getBuiltDetail: 'getBuiltDetail',
  //上传图片
  updataImg: 'updataImg',
  //提交中介资料
  submitMidd: 'submitMidd',
  //获取手机验证码
  getCode: 'getCode',
  //验证验证码接口
  checkCode: 'checkCode',
  //获取区域列表
  getAreaList:'getAreaList',
  //获取中介发布可选标签
  getLabelList:"getLabelList",
  //检查中介是否提交资料
  checkMiddStatus:'checkMiddStatus',
  //普通用户认证
  authUser:'authUser',
  //保存个人基本信息
  savaBaseInfo: 'savaBaseInfo',
  //中介发布
  middleBulidRelease: 'submitMidd',
  //个人房源发布
  personBulidRelease:'submitMidd',
  //boss发布
  bossRelease: 'submitMidd',
  //获取boss发布薪水
  getPayList:'getPayList',
  //资讯发布
  infoRelease: 'submitMidd',
  //获取资讯分类表
  getInfoClass:'getInfoClass',
  //获取房源列表
  getHouseList:'getHouseList',
  //房源详情
  getHouseDetail: 'getHouseDetail',
  //获取Boss招聘列表
  getBossList: 'getBossList',
  //获取boss招聘职位详情
  getJobDetail:'getJobDetail',
  //签到
  signPage: 'signPage',
  //获取签到列表
  getSignList:"getSignList",
  //获取钱包
  getWallList:'getWall',
  //获取支付参数
  getPayData:"payList",
  //获取赚币列表
  getMakeCoin:'getMakeCoin',

  //获取中介个人发布列表
  getHistoryReleaseHouse:"getHouseList",
  //获取boss招聘 毛遂自荐
  getHistoryReleaseBoss: "getHouseList",
  //上架 下架
  doSJXJ:'doSJXJ',
  //支付历史
  getpayhistotyList:'getpayhistotyList',
  //获取雄心币历史记录
  getXXhistooryList:'getpayhistotyList',
  //获取我的收藏历史 (房产中介/个人房源
  getCollectList:'getHouseList',
  //获取我的收藏历史(boss招聘/毛遂自荐)
  getBossCollectList: 'getHouseList',
  //关于我们
  getAboutUs:'getAboutUs',
  //获取猜你想搜列表
  getSearchLabel: "getSearchLabel",
  //获取搜索列表
  getSearchResultRest:"getSearchResultRest",
  //获取中介个人房源发布后 推荐列表
  getCommList:"getCommList",
  //获取boss发布成功后 推荐列表
  getCommSelfList:'will/recommend',
 
}

module.exports = online
//module.exports = test