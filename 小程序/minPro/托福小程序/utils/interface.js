/*
  请求接口地址，以字面量来填写 /user/get-verify-code
*/
let online = {
  //用户登录 
  login: '/user/get-access-token',
  //注册
  register:'/user/register',
  //获取词库列表
  thesaurusList:'/thesaurus/list',
  //设置词库
  setThesaurus: '/user/set-thesaurus',
  //获取计划列表
  getPlant: '/plan/list',
  //确认计划
  setPlan:'/user/set-plan',
  //获取学习情况
  todaySchedule:'/user/today-schedule',
  //获取排行平
  getRange: '/getRange',
  //获取单词
  getOneWord: '/study/get-word',
 //完成一个单词
  studyCompleteWord:'/study/complete-word',
  //获取小结单词列表 
  overviewSection:'/study/overview-section',
  //完成小结
  completeSection:'/study/complete-section',
  //开始复习
  startView:'/review/restart',
  //继续复习
  viewOldWords:'/review/get-section',
  //完成复习
  finishOldWords:'/review/complete-section',
  //收藏
  collection:'/collection/add',
  //取消收藏
  removeCollection:'/collection/remove',
  //收藏列表
  collectList: '/collection/list',
  //获取排行
  getRange: '/user/rank',
  //获取海报
  getPoster:'/image/get-image',
  //banner 
  getBanner:'/banner/list',
  //下一个单词
  getNextWord:'/study/get-next-word',
  //获取单词列表
  getSection:'/study/get-section'
}
// 测试
let test = {
  //用户登录 
  login: '/user/get-access-token',
  //获取首页信息
  index:'/index',
  //获取排行平
  getRange:'/getRange',
  //获取单词
  getOneWord:'/getOneWord',
  //获取计划列表
  getPlant:'/getPlant',
  //获取计划详情
  getStudyInfo:'/getStudyInfo'
}

//module.exports = online
module.exports = online