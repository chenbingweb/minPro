//app.js
let util = require('./utils/util.js');
let config = require('./config.js');
let _interface = require('./utils/interface.js');
//获取假数据
let testData = require('./utils/data.js');
import Tool from "./libs/Tool.js";
import Login from "./libs/Login.js";
import Ajax from "./libs/Ajax.js";
App({
  onLaunch: function (res) {
    console.log(res)
    //获取手机信息
    this.getPhoneInfo();


  },
  onShow: function (res) {
    console.log(res)
    //移除本地储存
    //this.removeStorageFn()
    /**
     * activate_ticket:""
      code
      errCode
      wx_activate_after_submit_url:
     * 
     */
    if (!res.referrerInfo) return
    //会员卡激活 
    if (res.referrerInfo.appId == 'wxeb490c6f9b154ef9' && res.referrerInfo.extraData) {
      let active = res.referrerInfo.extraData;
      let subUrl = active.wx_activate_after_submit_url;

      let activeData = {
        activate_ticket: active.activate_ticket,
        AccessToken: this.globalData.UserId
      }
      activeData = Object.assign(activeData, this.queryKey(subUrl))

      console.log('会员激活->', activeData)
      wx.showLoading({
        title: '加载中...',
      })
      util.Ajax(activeData, res => {
        console.log(res)
        if (res.errcode == 0)
        {
          let data = res.data
          wx.hideLoading()
          let param = {
            encrypt_card_id: data.EncryptCardId, outer_str: data.Id + '', biz: data.CardBiz
          }

          Tool.memberComponent(param).then(res => {
            console.log(res)
            //  if()
          }).catch(err => {
            wx.showToast({
              title: '激活失败',
              icon: 'none'
            })
          })
        }
        else
        {
          wx.showToast({
            title: '激活失败',
            icon: 'none'
          })
        }
      }, err => {
        console.log(err)
      }, _interface.activeMember)

      //  let ajax=new Ajax({
      //   data: activeData,
      //   path: _interface.activeMember
      // })
      // ajax.then(res=>{
      //   console.log(res)
      // //  if (res.errcode == 0) {
      //     let data = res.data;
      //     //EncryptCardId
      //     let param = {
      //       encrypt_card_id: decodeURIComponent(data.EncryptCardId), outer_str: decodeURIComponent(data.Id + ''), biz: decodeURIComponent(data.CardBiz)
      //     }
      //     console.log(param)
      //     Tool.memberComponent(param).then(res => {
      //       console.log(res)
      //       //  if()
      //     }).catch(err => {
      //       wx.showToast({
      //         title: '打开失败',
      //         icon: 'none'
      //       })
      //     })
      // //  }
      // }).catch(err=>{
      //     console.log(err)
      // })
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
  /*
    cb 回调函数，可以回去用户基本信息，头像，用户名等
    callback 回调函数，可以获取从服务器返回的用户信息{encode:0,userId:''}
    scene场景值
    bindInfo 添加额外用户信息
  */
  getUserInfo: function (cb, callback, bindInfo) {
    var that = this;
    //获取用户userId
    if (this.globalData.userInfo && this.globalData.uid == '') {
      typeof cb == "function" && cb(this.globalData.userInfo)
    }
    //if (this.globalData.uid == '') {
    //调用登录接口
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (data) {
            //添加额外用户信息(比如：用户绑定手机号)
            if (bindInfo) {
              res = Object.assign(res, bindInfo)
            }
            that.userLogin(res, data, callback);
            console.log(data.userInfo)
            //获取用户头像，用户名称等基本信息
            that.globalData.userInfo = data.userInfo;
            //cb为function,则执行cb()回调
            typeof cb == "function" && cb(that.globalData.userInfo)
          },
          fail: () => {
            //登录失败或拒绝登录设置默认信息（根据具体项目，填写相关字段）
            var defalutValue = { userId: '', type: 0 }
            //执行callback回调方法
            callback(defalutValue)
          }
        })
      }
    })

    // }
  },
  //用户登陆 Ajax(data, path, reqtype, contentType, succ, fail)
  /*
    res:获取用户登录凭证
  */
  userLogin: function (res, data, callback) {
    var that = this;
    var data = {
      code: res.code,//用户登录凭证
      encryptedData: data.encryptedData,//包括敏感数据在内的完整用户信息的加密数据
      iv: data.iv,//加密算法的初始向量
    };

    util.Ajax(data, function (res) {
      if (typeof res === "string") {
        res = JSON.parse(res.trim(res))
      }

      if (res.errcode == 0) {
        var data = res.data;
        console.log(data)
        typeof callback == "function" && callback(data)
        /*
          获取用户信息,赋值为全局变量（如uid,status）
        */
        that.globalData.uid = data.uid;//用户id
        that.globalData.status = data.status;//判断用户是否绑定0为没有绑定，1为绑定
      }
    }, function (err) {
      // that.globalData.uid="";
      if (config.debug) {
        console.log(testData)
        typeof callback == "function" && callback(testData.userInfo.data);
        /*
          给全局变量赋假数据中的值
        */
        that.globalData.uid = testData.userInfo.data.uid;
        that.globalData.status = testData.userInfo.data.status;
      }

    }, _interface.login_url);
  },
  //获取手机信息
  getPhoneInfo: function (options) {
    var me = this;
    wx.getSystemInfo({
      success: function (res) {
        me.globalData.screenWidth = res.windowWidth;
        me.globalData.screenHeight = res.windowHeight;
        me.globalData.sysInfo = res;
        var SDKVersion = res.SDKVersion.split('.');
        //判断基础库版本（不低于1.4.*）
        // if (SDKVersion[1] < 4) {
        //   wx.showModal({
        //     title: '提示',
        //     content: '当前微信版本过低，无法使用某些功能，请升级到最新微信版本后重试',
        //   })
        // }
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
  /*
    1,自定义导航跳转
      tabbar:导航配置信息
      index:导航id
  */
  selectTabbar: function (tabbar, index) {
    for (let i = 0; i < tabbar.length; i++) {
      if (tabbar[i].nid == index) {
        tabbar[i].selected = true;
        wx.reLaunch({
          url: tabbar[i].path,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
      else {
        tabbar[i].selected = false;
      }
    }
    this.globalData.navBar = tabbar;
    return tabbar
  },
  UserLogin: function (succ) {
    var that = this;
    let login = new Login();
    if (!this.globalData.UserId) {
      login.resolveLogin({
        path: _interface.login,//接口地址，默认为空(必传)
        loginSucc(res) { //登录成功(必传)
          console.log(res)
          //设置用户UserId
          console.log(that.globalData)
          // if(res.errcode==0)
          /// {
          that.globalData.UserId = res.AccessToken;
          succ()
          // }
          // else
          // {
          //   wx.showToast({
          //     title: '登录失败',
          //     icon: "none",
          //     mask: true
          //   })
          // }

        },
        loginFail(err) { //登录失败(必传)
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })
          succ('err')
        }
      })
    }
    else {
      succ()
    }

  },
  //获取会员卡组件参数，并跳转会员卡界面
  ToMemberCard: function (sendData) {
    wx.showLoading({
      title: '加载中...',
    })
    var data = sendData;
    var ajax = new Ajax({
      data,
      path: _interface.getMemBerData
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        let param = res.data;
        console.log(param)
        Tool.memberComponent(param).then(res => {
          console.log(res)
          //  if()
        }).catch(err => {
          wx.showToast({
            title: '打开失败',
            icon: 'none'
          })
        })
      }
      console.log(res)
      //

    })
    ajax.catch(err => {
      console.log(err)
    })

  },
  //发起微信支付id=13&AccessToken
  WXpay: function (id) {
    var data = {
      AccessToken: getApp().globalData.UserId,
      id: id
    }
    //che pai hao
    let plate = arguments[1];
    // if (plate) {
    //   data.VehLicense = plate
    // }
    var ajax = new Ajax({
      data,
      path: _interface.paydata
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        let oid = res.data.id;
        console.log(res.data)
        console.log(res.data.id)
        Tool.WXpay(res.data).then(res => {
          console.log(res)
          this.globalData.pay=true;
          this.AddCoupon(id, oid,plate)
        }).catch(err => {
          wx.hideLoading()
          wx.showToast({
            title: '取消支付',
            icon: 'none'
          })
          console.log(err)
        })
      }
      else if (res.errcode == -1) //已领取卡券
      {
        wx.hideLoading()
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      else if (res.errcode == 1)//支付未添加,从新领取卡券
      {
          let oid=res.data;
          this.AddCoupon(id, oid, plate)
      }
      else
      {
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
  //添加优惠券到卡包  id=13&AccessToken
  AddCoupon: function (id, oid) {
    console.log(typeof arguments[2] )
    wx.showLoading({
      title: '加载中...',
    })
    var data = {
      AccessToken: getApp().globalData.UserId,
      id: id
    }
    
    if (arguments[2])
    {
      data.VehLicense = arguments[2]
    }
    //如果不是免费，则把订单号传给后台
    if (oid) {
      data.oid = oid
    }
    console.log(data)
    var ajax = new Ajax({
      data,
      path: _interface.addCard
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        Tool.addCard(res.data).then(res => {
          console.log(res)
          
        }).catch(err => {
          console.log(err)
        })
      }
      else
      {
       wx.showToast({
         title: '获取卡券失败',
       })
      }
      
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
    })
  },
  //修改底部导航状态
  updateNav: function (index) {
    let navList = getApp().globalData.navBar;
    if (!navList) return
    for (let i = 0; i < navList.length; i++) {
      if (i == index) {
        navList[i].selected = true;
      }
      else {
        navList[i].selected = false;
      }
    }
  },
  //全局参数
  globalData: {
    userInfo: null,//用户信息，
    sysInfo: null,//用户手机信息
    screenWidth: 0,//屏幕宽度
    screenHeight: 0,//屏幕高度
    imgUrl: config.imgUrl,//图片地址
    navBar: config.navBar,//获取自定义导航相关配置（如果是自带的导航，请删除此字段）
    /***根据实际项目情况，自行添加全局字段***/
    UserId: undefined,//用户id
    cityList: [],
    isOk:false,
    pageSize: config.pageSize,
    pay:false
  },

})
