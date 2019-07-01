//app.js
var util = require('./utils/util.js');
var config=require('./config.js')
//经销商,管理员
var tabbar_1=[
  {
    tabname:'首页',
    index:0,
    selected:true,
    icon_s:'home_s.png',
    icon:'home.png',
    page:'../home/home',
    w:'34rpx',
    h:'30rpx'
  },
  {
    tabname: '全部礼品',
    index: 1,
    selected: false,
    icon_s: 'gift_s.png',
    icon: 'gift.png',
    page: '../allGifts/allGifts',
    w: '32rpx',
    h: '32rpx'
  },
  {
    tabname: 'Mini考',
    index: 2,
    selected: false,
    icon_s: 'minik_s.png',
    icon: 'minik.png',
    page: '../miniTest/miniTest',
    w: '35rpx',
    h: '27rpx'
  },
  {
    tabname: 'Mini刊',
    index: 3,
    selected: false,
    icon_s: 'minic_s.png',
    icon: 'minic.png',
    page: '../miniJournal/miniJournal',
    w: '34rpx',
    h: '28rpx'
  },
  {
    tabname: '我的',
    index: 4,
    selected: false,
    icon_s: 'center_s.png',
    icon: 'center.png',
    page: '../center/center',
    w: '32rpx',
    h: '30rpx'
  }
]
//客户
var tabbar_2=[
  {
    tabname: '首页',
    index: 0,
    selected: true,
    icon_s: 'home_s.png',
    icon: 'home.png',
    page: '../home/home',
    w: '34rpx',
    h: '30rpx'
  }, 
  {
    tabname: '全部礼品',
    index: 1,
    selected: false,
    icon_s: 'gift_s.png',
    icon: 'gift.png',
    page: '../allGifts/allGifts',
    w: '32rpx',
    h: '32rpx'
  }, 
  {
    tabname: '我的',
    index: 4,
    selected: false,
    icon_s: 'center_s.png',
    icon: 'center.png',
    page: '../center/center',
    w: '32rpx',
    h: '30rpx'
  }
]
App({
  onLaunch: function(res) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getPhoneInfo();
   
    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
    })
  },
  onShow:function(){
    this.removeStorageFn()
   // this.getUserInfo(null,null)
  
  },
  onHide:function(){
  
  },
  //cb 回调函数，可以回去用户基本信息，头像，用户名等
  //callback 回调函数，可以回去从服务器返回的{encode:0,userId:''}
  //scene场景值
  getUserInfo: function (cb, callback) {
    var that = this;
    //获取用户userId
    if (this.globalData.userInfo && this.globalData.uid=='') {
      typeof cb == "function" && cb(this.globalData.userInfo)
    }
    //if (this.globalData.uid == '') {
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (data){
              that.userLogin(res, data, callback);
              that.globalData.userInfo = data.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo )
            },
            fail:()=>{
              //登录失败或拒绝登录设置默认信息
              var defalutValue = { userId: '', type: 0 }
              callback(defalutValue)
            }
          })
        }
      })

   // }
  },
  //用户登陆 Ajax(data, path, reqtype, contentType, succ, fail)
  userLogin: function (res, data, callback) {
    var that = this;
    var data ={
      code: res.code,
      encryptedData: data.encryptedData,
      iv: data.iv
    };
   
    util.Ajax(data, function (res) {
      if (typeof res === "string")
      {
        res=JSON.parse(res.trim(res))
      }
      console.log(res)
      if (res.encode==0)
      {
        var data=res.data;
        typeof callback == "function" && callback(data)
        that.globalData.uid = data.userId;//用户id
        that.globalData.power = data.type;//用户权限
        that.globalData.myIntegral = data.integral;//用户几分
        that.globalData.email = data.email;//用户邮件
        that.globalData.company = data.company_name||'';//公司名称
        that.globalData.status = data.status;//是否申请经销员
        that.globalData.username = data.username;//经销员姓名
        /*
        if (data.type == 0) {//普通用户 app.globalData.tab_b
          that.globalData.tabbar = tabbar_2
        }
        else if (res.status == 1)
        {
          that.globalData.tabbar = tabbar_1
        }*/
      }
    }, function (err) {
     // that.globalData.uid="";
      }, 'login/index');
  },
  //获取手机信息
  getPhoneInfo: function (options) {
    var me = this;
    wx.getSystemInfo({
      success: function (res) {
        me.globalData.screenWidth = res.windowWidth;
        me.globalData.screenHeight = res.windowHeight;
        me.globalData.sysInfo=res;
        var SDKVersion = res.SDKVersion.split('.');
        if (SDKVersion[1]< 4 )
        {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用某些功能，请升级到最新微信版本后重试',
          })
        }
      }
    })
    
  },
  //移除本的参数 
  removeStorageFn: function () { 
    var list = ['orderDetail','status', 'buygoods','marksrc'];
    for(let i=0;i<list.length;i++){
      wx.removeStorage({
        key: list[i]
      })
    }

  },
  //导航信息
  selectTabbar:function(tabbar,index){
    for(let i=0;i<tabbar.length;i++){
      if(tabbar[i].index==index)
      {
        tabbar[i].selected = true;
        wx.reLaunch({
          url: tabbar[i].page,
          success: function(res){},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
      else
      {
        tabbar[i].selected=false;
      }
    }
    this.globalData.tabbar = tabbar
  },
  //全局参数
  globalData: {
    userInfo: null,
    uid:'',//用户id
    power:'',//权限
    myIntegral:0,
    email:'',
    company:'',
    status:'',
    username:'',
    sysInfo: null,
    screenWidth:0,
    screenHeight:0,
    tabbar: tabbar_2,
    tab_a: tabbar_1,//经销员
    tab_b: tabbar_2,//普通用户
    imgUrl: config.imgUrl,
    showToast:true//默认不显示提示
  },
 
})
 