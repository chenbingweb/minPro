/*
  请求接口地址，以字面量来填写
*/
let online = {
  //用户登录  login 
  login: 'login/index',//'User/Login','login/index'
  //获取用户信息和banner图
  getUserAndBanner: 'site/index',
  //获取首页最近课程和免费课程
  getIndexLesson: 'site/lesson',
  //微信绑定
  WXBindUser: 'login/index',
  //获取用户当前学习的课程基本信息
  getUserBaseLesson: 'site/base-lesson',
  //上传图片
  changeIndexImg: 'site/img-upload',
  //获取手机验证码
  getCode: '/login/get-code',
  //验证验证码接口
  checkCode:'/login/code-verification',
  //获取每个单元下的每节课
  getUnitLesson: 'course/list',
  //获取去备课页面相关信息，
  getBKInfo: 'course/prepare',
  //获取备课时绘本阅读
  getReadContent: 'course/reading-book-prepare',
  //读绘本备课完成
  readEndOk: 'course/prepare-end',
  //完成每节课
  endSK: 'course/source-end',
  //上传音频
  uploadFile: 'course/reading-book-upload',
  //看动画（备课）
  LookAnimation: "course/cartoon-explain-prepare",
  //看动画（ 上课）
  LookAnimationSK: "course/cartoon-explain-begin",
  //听故事（备课阶段），
  listenStory: 'course/deep-reading-prepare',
  //听故事（上课阶段），
  getSKStory: "course/deep-reading-begin",
  //编辑故事内容
  editContent: 'course/deep-reading-create',
  //重置故事内容
  repeateContent: 'course/deep-reading-delete',
  //获取题目数量
  getQuestionNum: 'course/practice-prepare',
  //选择题目数量
  selectPracticeNum: 'course/practice-create',
  //删除录音音频
  deleteRecord: 'course/reading-book-delete',
  //上课基本新
  getSKBaseInfo: 'course/begin',
  //上课读绘本
  getSKLesson: 'course/reading-book-begin',
  //获取练习题
  getPractice: 'course/practice-begin',
  //判断用户答题是否正确
  selectAnswer: 'course/select-option',
  //获取用户签到信息
  getSignPage: 'site/sign',
  //用户签到
  toSign: 'site/sign-up',
  //获取签记录
  getSignList: 'site/sign-log',
  //获取课程大纲
  getLessonList: 'course/all-course',
  //获取我的课程大纲
  getMyLesson: "course/my-course",
  //获取妈妈信息
  getMumInfo: 'site/get-mother-info',
  //修改妈妈信息
  updataMumInfo:'site/change-mother-info',
  //获取宝宝信息
  getBabyInfo: 'site/get-baby-info',
  //修改宝宝信息
  updataBabyInfo: 'site/change-baby-info',
  //获取商城页面信息
  getShopInfo: 'shop/index',
  //兑换魔药
  exchangeMY:"shop/gold-exchange",
  //兑换码
  exchangeCode:'shop/code-exchange',
  //获取学贝记录
  getUserConsumeXB: 'shop/gold-log',
  //获取魔药记录
  getUserConsumeMY: 'shop/diamonds-log',
  //获取成绩
  getUserScore: 'share/get-user-score',
  //提交评价信息和礼物
  submitEval: 'share/evalue-save',
  //获取分享页面
  getShareInfo: "share/index",
  //兑换课程
  exchangeLesson:'course/exchange',
  //备课完成
  BKIsOver: 'course/course-end',
  //判断是否是新用户
  isNewUser:'login/relogin',
  //修改图片
  updataImg:'site/change-avatar',
  //修改手机号
  updatePhone:'site/change-mobile',
  //支付参数
  paydata: 'shop/buy',
  //支付成功后
  payBack:'shop/member-diamonds',
  //获取海报信息
  getPoster:'share/poster',
  //添加免费课程
  addFreeLesson:'share/get-course',
  //删除宝宝录音  
  deleteBabyRecord:'course/reading-book-baby-delete',
  //日志接口
  note:'share/send-log',
  //登录
  userLogignLog:'login/send-login',
  //打开小程序
  openMin:'login/send-open'
}

module.exports = online
