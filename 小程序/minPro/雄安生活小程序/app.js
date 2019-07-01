let config = require('./config.js');
let _interface = require('./utils/interface.js');

//获取假数据
let testData = require('./utils/data.js');
import Tool from "./libs/Tool.js";
import Login from "./libs/Login.js";
import Ajax from "./libs/Ajax.js";
import Upload from "./libs/Upload.js";
let job_data=require("./utils/job.js")
App({
  onLaunch: function (res) {
    console.log(res)

    //获取手机信息
    this.getPhoneInfo();
    //获取区域列表
    this.getAreaList()
    //获取职位类型
    this.getJobType()
    //获取房屋类型
    this.getHouseDoor()
   // this.getTaskList()
  },
  onShow: function (res) {
    //检查小程序版本
    Tool.Version()
    this.getJobList() 
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
  //职位类型
  getJobType(){
    let jobType=[];
    console.log(job_data.data)
    job_data.data.forEach(item=>{
      jobType.push(item.name)
    })
    this.globalData.jobTypeList = jobType;
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
  //新版
  UserToLogin: function (callback) {
    var that = this;
    let login = new Login();
    if (!this.globalData.UserId) {
      login.userToLogin({
        data: arguments[1] || undefined,
        path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
        loginSucc(res) { //登录成功(必传)
          console.log(res)
          //设置用户UserId
          console.log(that.globalData)
          if (res.errcode == 0) {
            that.globalData.userId = res.data.userId;
            that.globalData.amount = res.data.amount;
            that.globalData.visible = res.data.visible;
            that.globalData.price = res.data.price;
            // getApp().globalData.signOut = false;
            // //登录成功后，标记为true
            // getApp().globalData.isLogin=true;
            callback(res.data.userId)
          }
          else {
            if (getApp().globalData.userId!='')
            {
              wx.showToast({
                title: '登录失败',
                icon: "none",
                mask: true
              })
            }
           
          }

        },
        loginFail(err) { //登录失败(必传)
          if (getApp().globalData.userId != '') {
            wx.showToast({
              title: '登录失败',
              icon: "none",
              mask: true
            })
          }
          console.log(err)
          callback(err)

        }
      })
    }
    else {
      callback(that.globalData.UserId)
    }
  },


  //发起微信支付id=13&AccessToken
  WXpay: function (id, callBack) {
    var data = {
      userId: getApp().globalData.userId,
      id: id
    }
    var ajax = new Ajax({
      data,
      path: _interface.getPayData
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
      else {
        wx.showToast({
          title: res.Message,
          icon:"none"
        })
      }


      console.log(res)
    })
    ajax.catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  UpdatePhoto(that) {
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
            userid: that.userid
          }
        })
        console.log({
          userid: that.userid
        })
        upload.then(res => {
          wx.hideLoading()
          //let res = JSON.parse(res)
          // that.setData({
          //   img_url: app.globalData.imgUrl + res.img_url
          // })
          if (res.errcode == 0) {
            that.callBack(res.data)
          }
          console.log(res)
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
  //多张上传图片
  uploadImgs(that) {
    let imgArr = [];
    let tempFilePaths = that.tempFilePaths
    return () => {

      (function iter(i) {

        if (i >= tempFilePaths.length) {
          if (that.callBack && imgArr.length) {
            that.callBack(imgArr)
          }
          else {
            that.callBack(false)
          }
          return
        }

        let upload = new Upload({
          path: _interface.updataImg,
          filePath: tempFilePaths[i],
          formData: {
            userid: that.userid
          }
        })
        upload.then(res => {
          console.log(res)
          if (res.errcode == 0) {
            imgArr.push(res.data);
          }
          i++
          iter(i)

        }).catch(err => {
          i++
          iter(i)
          wx.showToast({
            title: '上传图片失败',
            icon: 'none',
            mask: true
          })

          wx.hideLoading()
        })

      })(0)


    }
  },
  //获取区域列表
  getAreaList(callback) {
    let ajax = new Ajax({
      data: {},
      path: _interface.getAreaList
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        this.globalData.areaList = res.data
        if (callback)
        {
          callback(res.data)
        }
        
      }
      else {

      }

    })
    ajax.catch(err => {
      console.log('err')
    })
  },
  //获取房屋型号  
  getHouseDoor(callback){
    let ajax = new Ajax({
      data: {},
      path: _interface.getHouseTypeList
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        let lists=[];
        res.data.forEach(item=>{
          lists.push({
            name:item,
            checked:false
          })
        })
        this.globalData.houseTypeList = lists
        if (callback) {
          callback(lists)
        }

      }
      else {

      }

    })
    ajax.catch(err => {
      console.log('err')
    })
  },
  //获取发布金币的个数
  getTaskList (that){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  let data= {
      userId: getApp().globalData.userId
    }
  let ajax= new Ajax({
      path: _interface.getMakeCoin,
      data
    }).then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        getApp().globalData.getCoin = res.data.taskList[3].price
      }
      else {
        wx.showToast({
          icon: 'none',
          title: '获取数据失败',
        })
      }

    }).catch(err => {
      wx.hideLoading();
      // wx.showToast({
      //   icon: 'none',
      //   title: '服务器报错了...',
      // })
    })
  },
  //发送手机验证码
  getCode(data) {
    wx.showLoading({
      title: '正在发送...',
    })
    let ajax = new Ajax({
      data,
      path: _interface.getCode
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        wx.showToast({
          title: '发送成功',
          mask: true
        })
      }
      else {
        wx.showToast({
          title: '发送失败',
          icon: 'none'
        })
      }

    })
    ajax.catch(err => {
      wx.showToast({
        title: '发送失败',
        icon: 'none'
      })
    })
  },
  //验证手机码
  checkCode(data, callBack) {
    wx.showLoading({
      title: '正在发送...',
    })
    let ajax = new Ajax({
      data,
      path: _interface.checkCode
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        callBack()
      }
      else {
        wx.showToast({
          title: '验证码错误',
          icon: 'none'
        })
      }

    })
    ajax.catch(err => {
      wx.showToast({
        title: '服务报错',
        icon: 'none'
      })
    })
  },
  //判断雄心币是否足够
  hasCoin(callback) {
    if (this.globaData.amount <= 2) { }
  },
  //获取薪资
  getPayList(that) {
    let ajax = new Ajax({
      data: {},
      path: _interface.getPayList
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        let payList = that.data.payList
        payList.push(...res.data);
        that.setData({
          payList: payList
        })
        console.log(payList)
      }
    })
    ajax.catch(err => {
      wx.showToast({
        title: '服务器报错..',
        icon: 'none'
      })
    })
  },
  //发送formId
  setFormId(userId,formId){
    let ajax = new Ajax({
      data:{
        userId,
        formId
      },
      path: _interface.sendFormId
    })
    ajax.then(res => {
      if (res.errcode == 0) {
       
      }
      else {
        
      }

    })
    ajax.catch(err => {
      wx.showToast({
        title: '服务报错',
        icon: 'none'
      })
    })
  },
  //获取职位列表
  getJobList() {
  
    let ajax = new Ajax({
      data:{},
      path: _interface.jobList
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        let list = [{
          "code": 500000,
          "name": "类型",
          "subLevelModelList": [{
            "code": 500000,
            "name": "类型",
            "subLevelModelList": [{
              "code": 500000,
              "name": "类型",
              "subLevelModelList": null
            }]
          }]
        }]
        list.push(...res.data)
        this.globalData.jobList = list
      }
      else {
        
      }

    })
    ajax.catch(err => {
     
      console.log(err)
    })
  },
  ShareFn: Tool.ShareFn,
  //全局参数
  globalData: {
    signOut: false,//退出
    userInfo: null,//用户信息，
    sysInfo: null,//用户手机信息
    screenWidth: 0,//屏幕宽度
    screenHeight: 0,//屏幕高度
    imgUrl: config.imgUrl,//图片地址
    navBar: config.navBar,//获取自定义导航相关配置（如果是自带的导航，请删除此字段）
    /***根据实际项目情况，自行添加全局字段***/
    userId: '',//用户id
    amount: 0,//金币
    visible: 0,//权限 0 普通用户 1认证用户 2 中介 
    price:0,//推荐价格
    jobTypeList:[],//职业类型
    areaList: [],//区域
    houseTypeList:[],//房屋类型列表
    getCoin:0//发布后获取的雄心币
  },

})
