//app.js
let util = require('./utils/util.js');
let config = require('./config.js');
let _interface = require('./utils/interface.js');
//获取假数据
let testData = require('./utils/data.js');
import Tool from "./libs/Tool.js";
import Login from "./libs/Login.js";
import Ajax from "./libs/Ajax.js";
import Upload from "./libs/Upload.js";
App({
  onLaunch: function (res) {
    console.log(res)
    let send = {
      message:'open',
      ext1: res.scene,
     
      userid:0
    }
    if (res.query.cid)
    {
      send.ext2 = res.query.cid
    }
   
    this.sendNote(send)
    //获取手机信息
    this.getPhoneInfo();

 
  },
  onShow: function (res) {
    this.getConfig()
    console.log(res)
    if (res.path !== 'pages/index/index' && (res.scene == 1001 || res.scene == 1089) && res.path !== 'pages/post/post') {
      if (res.query.shareid)
      {
        wx.redirectTo({
          url: '../index/index',
        })
      }
     
      console.log(22)
    }
    try{
      if (this.globalData) {
        this.globalData.signOut = wx.getStorageSync('signOut')
      }
    }catch(e)
    {

    }
 
    
  },
  onHide: function () {

  },
  queryKey(url) {
    let urlArr = url.slice(url.indexOf('?') + 1).split('&');
    let obj = {};
    for (let i = 0; i < urlArr.length; i++) {
      let key = urlArr[i].split('=')[0];
      let value = urlArr[i].split('=')[1]
      obj[key] = value
    }
    return obj
  },
  //发送日志
  sendNote(data){
    let sendData={
      ext1: null,
      ext2: null,
      ext3: null,
      ext4: null,
      ext5: null,
    }
    let d = Object.assign(sendData, data)
      let ajax=new Ajax({
        data: d,
        path: _interface.note,
      })
      ajax.then(res=>{
        console.log('发送成功-->',res)
      })
      ajax.catch(err=>{
        console.log('发送失败-->',err)
      })
  },
  //获取手机信息
  getPhoneInfo: function (options) {
    var me = this;
    wx.getSystemInfo({
      success: function (res) {
        me.globalData.screenWidth = res.windowWidth;
        me.globalData.screenHeight = res.windowHeight;
        me.globalData.sysInfo = res;
      }
    })

  },
  //移除本地缓存数据参数 
  removeStorageFn: function () {
    var list = ['str', 'gpsCity'];
    for (let i = 0; i < list.length; i++) {
      wx.removeStorage({
        key: list[i]
      })
    }

  },
 //用户登录
  UserLogin: function (callback) {
    var that = this;
    let login = new Login();
    if (!this.globalData.UserId) {
      login.resolveLogin({
        path: _interface.login,//接口地址，默认为空(必传)
        loginSucc(res) { //登录成功(必传)
          console.log(res)
          //设置用户UserId
          console.log(that.globalData)
          if (res.errcode == 0) {
            that.globalData.UserId = res.data.userId;
            getApp().globalData.signOut = false;
            //登录成功后，标记为true
            getApp().globalData.isLogin = true;
            if (getApp().globalData.isLoginLog == false) {
              let log = new Ajax({
                path: _interface.userLogignLog,
                data: {
                  userid: res.data.userId
                }
              })
              log.then(r => {
                getApp().globalData.isLoginLog = true
                console.log(r)
              })
              log.catch(err => {
                console.log(err)
              })
            }
            if (getApp().globalData.isopenLog==false)
            {
              that.openMinPro(res.data.userId)
            }

            callback(res.data.userId)
          }
          else 
          {
            wx.showToast({
              title: '登录失败',
              icon: "none",
              mask: true
            })
          }

        },
        loginFail(err) { //登录失败(必传)
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })
          callback(err)

        }
      })
    }
    else {
      callback(that.globalData.UserId)
    }

  },
  //新版
  UserToLogin: function (callback){
    var that = this;
    let login = new Login();
    if (!this.globalData.UserId) {
      login.userToLogin({
        data:arguments[1]||undefined,
        path: _interface.login,//接口地址，默认为空(必传)
        loginSucc(res) { //登录成功(必传)
          console.log(res)
          //设置用户UserId
          console.log(that.globalData)
          if (res.errcode == 0) {
            that.globalData.UserId = res.data.userId;
            if (getApp().globalData.isLoginLog==false)
            {
              let log = new Ajax({
                path: _interface.userLogignLog,
                data:{
                  userid: res.data.userId
                }
              })
              log.then(r=>{
                getApp().globalData.isLoginLog=true
                  console.log(r)
              })
              log.catch(err=>{
                console.log(err)
              })
            }
            


            getApp().globalData.signOut = false;
            //登录成功后，标记为true
            getApp().globalData.isLogin=true;
            callback(res.data.userId)

          }
          else {
            wx.showToast({
              title: '登录失败',
              icon: "none",
              mask: true
            })
          }

        },
        loginFail(err) { //登录失败(必传)
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })
          callback(err)

        }
      })
    }
    else {
      callback(that.globalData.UserId)
    }
  },
  openMinPro:function(userid){

    let log = new Ajax({
      path: _interface.openMin,
      data: {
        userid: userid
      }
    })
    log.then(r => {
      getApp().globalData.isopenLog = true
      console.log(r)
    })
    log.catch(err => {
      console.log(err)
    })
  },
  //完成绘本阅读备课
  BKEndOk(that) {
    var data = {
      courseid: that.cid,
      userid: that.userid,
      uid: that.uid,
      lid: that.lid,
      source: that.class_type, //book_reading_status  cartoon_explain_status deep_reading_status practice_status  
      "type": that.lesson_type//prepare/end
    }
    var ajax = new Ajax({
      data,
      path: _interface.endSK
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        // that.setData({
        //   showMark: true
        // })
        that.callBack(res.data)
      }
      else {
        wx.showToast({
          title: '获取失败',
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      console
    })
  },
  //完上课
  SKEndOk(that) {
    var data = {
      courseTime: new Date().getTime() - that.startTime,
      courseid: that.cid,
      userid: that.userid,
      uid: that.uid,
      lid: that.lid,
      source: that.class_type, 
      "type": that.lesson_type//read阅读，cartoon卡通,story 听故事, practice 选择练习
    }
    var ajax = new Ajax({
      data,
      path: _interface.endSK
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        // that.setData({
        //   showMark: true
        // })
        that.callBack(res.data)
      }
      else {
        wx.showToast({
          title: '获取失败',
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      console
    })
  },
  //发起微信支付id=13&AccessToken
  WXpay: function (id,callBack) {
    var data = {
      userid: getApp().globalData.UserId,
      price_id: id
    }
    var ajax = new Ajax({
      data,
      path: _interface.paydata
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

        console.log(res.data)
        Tool.WXpay(res.data).then(res => {
          console.log(res)
          // this.globalData.isOk=true;
          callBack(res)
        }).catch(err => {
          wx.hideLoading()
          wx.showToast({
            title: '取消支付',
            icon: 'none'
          })
          console.log(err)
        })
      }
      // else if (res.errcode == -1) //已领取卡券
      // {
      //   wx.hideLoading()
      //   wx.showToast({
      //     title: res.msg,
      //     icon: 'none'
      //   })
      // }
      // else if (res.errcode == 1)//支付未添加,从新领取卡券
      // {
      //   let oid = res.data;
      //   this.AddCoupon(id, oid)
      // }
      else {
        wx.showToast({
          title: res.Message,
        })
      }


      console.log(res)
    })
    ajax.catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  UpdatePhoto(that){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showLoading({
          title: '正在上传...',
          mask: true
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];

        let upload = new Upload({
          path: _interface.updataImg,
          filePath: tempFilePaths,
          formData: {
            userid: that.userid,
            "type":that.type
          }
        })
        console.log({
          userid: that.userid,
          "type": that.type
        })
        upload.then(res => {
          wx.hideLoading()
          //let res = JSON.parse(res)
          // that.setData({
          //   img_url: app.globalData.imgUrl + res.img_url
          // })
          if(res.errcode==0)
          {
            that.callBack(res.data)
          }
          console.log(res)
         
          wx.showToast({
            title: '上传成功',
            mask: true
          })
        }).catch(err => {
          console.log(err)
          wx.showToast({
            title: '上传图片失败',
            icon: 'none',
            mask: true
          })
          wx.hideLoading()
        })
      }
    })
  },
  splitFn(str){
    let firstStr=''
    let arr=[]

    if(str.indexOf('.')>0)
    {
      firstStr='.'
     
    }else if (str.indexOf('!') > 0) {
      firstStr="!"
      let index = str.indexOf('.');
    }
    else if(str.indexOf('?') > 0)
    {
      firstStr = "?"
    }
    let index =0
    if (firstStr!='')
    {
      index= str.indexOf(firstStr);
    }
    console.log(index)
    if (index>0)
    {
      
      arr[0] = str.slice(0, index + 1)
      arr[1] = str.slice(index + 1)
    }
    else
    {
      arr[0] = str
    }
    
    return arr
  },
  ShareFn: Tool.ShareFn,
  getConfig:function(callBack){
    wx.request({
      url:'https://staticfiles.yoojooy.com/wechat/becpro/wechatclient/becconfig.json',// 'https://config-1253148048.cosbj.myqcloud.com/becconfig.json',
      success:res=>{
        console.log(res)
        if (res.statusCode==200)
        {
          getApp().globalData.BECConf=res.data;
          getApp().globalData.shareInfo={
            share_img: res.data.Common.DefaultSharePicture.Value,
            share_title: res.data.Common.DefaultShareTitle.Value,
            path: res.data.Common.DefaultReturnPath.Value
          }
          if (callBack)
          {
            callBack(res.data)
          }
        }
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  //全局参数
  globalData: {
    signOut:false,//退出
    userInfo: null,//用户信息，
    sysInfo: null,//用户手机信息
    screenWidth: 0,//屏幕宽度
    screenHeight: 0,//屏幕高度
    imgUrl: config.imgUrl,//图片地址
    navBar: config.navBar,//获取自定义导航相关配置（如果是自带的导航，请删除此字段）
    /***根据实际项目情况，自行添加全局字段***/
    UserId: 0,//用户id
    cityList: [],
    isOk: false,
    staticUrl: config.staticUrl,
    mobile: null,
    bindUserDetail:null,
    userIntegral:{},//学习魔药 总学果
    isLogin:false,//是否登录
    isLoading:true,//是否是第一次登录
    shareInfo:null,
    BECConf:{},//文字json配置
    isLoginLog:false,
    isopenLog: false
  },

})
