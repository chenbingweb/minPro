// pages/index/index.js
let app=getApp();
let _util = require('../../utils/util.js');
let _fn=require('./fn.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: getApp().globalData.isLoading,//true,
    staticUrl: getApp().globalData.staticUrl,
    imgUrl: app.globalData.imgUrl,//获取图片地址
    img_url: '',//banner图
    motherInfo: {
      nickname: false,
      user_level: false,
      head_img: false,
    },
    babyInfo: {
      baby_name: false,
      baby_level: false,
      baby_img: false,
    },
    userIntegral: { //总学贝，周学贝，学习魔药
      gold: 0,
      diamonds: 0,
      total_gold: 0
    },
    lessonType:true,//默认为免费课程
    lessonList:[],//课程列表
    totalLesson: 0, //全部课程数量
    bknum:0, //已经备课数量
    sknum: 0,//已近上课数量,
    is_sign:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })

    this.setData({
      loading: getApp().globalData.isLoading
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // getApp().UserToLogin(res=>{
    //   console.log(res)
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!getApp().globalData.signOut)
    {
      //登录
      app.UserLogin((res) => {
        this.userid = res;
        if (res == 'err') {
          this.userid = 0;
        }
        
        _fn.getIndexInfo(this)
        console.log(res)
      })
    }
    else
    {
      this.userid=0;
      _fn.getIndexInfo(this)
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    let imageUrl=undefined;
    console.log(getApp().shareInfo)
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath:'pages/index/index',
      isBtn:false
    })
  },
  //跳转我的商城
  toMyShop(e) {
    // let aid = e.detail.dataset.detail;
   console.log(e)

  },
  // 跳转签到页面
  toSign(e){
    console.log(e)
  },
  //登录
  toLogin(e){
    console.log(e)
    if (e.detail.errMsg =='getUserInfo:fail auth deny')
    {
      return 
    }
    // getApp().UserToLogin(res => {
    //   console.log(res)
    // },e.detail)
    wx.showLoading({
      title: '加载中...',
      mask:true
    })

    let btn = e.currentTarget.dataset.btn
    if (!getApp().globalData.isLogin) {
      wx.navigateTo({
        url: '../userToLogin/userToLogin?src=' + btn
      })
      return
    }
    console.log(e)
    app.UserLogin((res) => {
      wx.hideLoading()
      if(res=='err')
      {
        return 
      }
      let url=""
      getApp().globalData.signOut = false
      //没有绑定手机号，跳转至登录页面
      if(!res)
      {
        url = '../userToLogin/userToLogin?src=' + btn
      }
      else
      {
        if(btn=='sign')
        {
          url = '../signPage/signPage'
        }
        else if (btn == 'tomum')
        {
          url = "../toMum/toMum"
        }
        else if (btn =='tobaby')
        {
          url = "../toBaby/toBaby"
        }
        else if (btn =='changeImg')
        {
          //上传图片
          _fn.changeImg(this)
        }
        else if (btn =='xb')
        {
          url = "../shop/shop"
        }
        
      }
      if(url!=='')
      {
        wx.navigateTo({
          url
        })
      }
     
    
      console.log(res)
    })
  }
})