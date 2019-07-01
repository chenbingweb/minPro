let config = require('./config.js');
let _interface = require('./utils/interface.js');
//获取假数据
let testData = require('./utils/data.js');
import Tool from "./libs/Tool.js";
import Login from "./libs/Login.js";
import Ajax from "./libs/Ajax.js";
import Upload from "./libs/Upload.js";
import {User} from "./model/user.js"
let job_data = require("./utils/job.js");
let appComm = require("./appComm.js")
let appObj = {
  onLaunch: function (res) {
    console.log(res)
    //获取手机信息
    this.getPhoneInfo();
    // wx.setEnableDebug({
    //   enableDebug: false
    // })
  },
  onShow: function (res) {
    wx.setKeepScreenOn({
      keepScreenOn: true,
      success: () => {
        // wx.showToast({
        //   title: '已经开启保持常亮状态',
        //   icon:'none'
        // })
      }
    })
    console.log('res=>', res)
    let { query } = res;
    let { share_code, sid } = query
    if (share_code) {
      // getApp().globalData.otherShareCode = share_code
    }
    if (sid) {
      //getApp().globalData.otherShopId = sid
    }
    console.log(res)
    this.removeStorageFn()
    //检查小程序版本
    Tool.Version()
    
  },
  onHide: function () {

  }, //全局参数
  globalData: {
    signOut: false,//退出
    userInfo: null,//用户信息，
    sysInfo: null,//用户手机信息
    screenWidth: 0,//屏幕宽度
    screenHeight: 0,//屏幕高度
    imgUrl: config.imgUrl,//图片地址
    navBar: config.navBar,//获取自定义导航相关配置（如果是自带的导航，请删除此字段）
    /***根据实际项目情况，自行添加全局字段***/
    self_shop_id: "",//店铺id 如果不是分享家，则为空字符串
    token: '',//用户id
    share_code: "",//分享家fan
    otherShareCode: '',//其他分享家id
    otherShopId: '',
    level: '',//	等级  1:一级分享家;2:二级分享家 3:已经注册过的用户
    city: '',//城市
    cityId: '',
    getUserInfo: false,//是否已经获取到用户信息
    shop_logo: ''//店铺logo
  }
};

appObj = Object.assign(appObj, appComm)

App(appObj)
