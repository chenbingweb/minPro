// pages/userLesson/userLesson.js
let _fn=require("./fn.js");
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticUrl: getApp().globalData.staticUrl,
    BKInfo:null,
    showTip:false,
    userIntegral: {},
    BKOK: false,
    showBKTip:false,
    gold:0,
    PlanningPageBanner1:'',
    PlanningPageBanner2: '',
    PlanningPageBanner3:'',
    PlanningPageBanner4: ''
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
    this.diamonds=0;//魔药
    this.isBuy=false;//是否购买
    this.uid = options.uid;
    this.lid = options.lid;
    this.cid=options.cid;
    //没有获取到用户id,设置为未登陆
    if (!getApp().globalData.UserId){
      this.login=false;
    }
    else
    {
      this.login = true;
    }

    this.setData({
      userIntegral:getApp().globalData.userIntegral,
      PlanningPageBanner1: getApp().globalData.BECConf.Text.PlanningPageBanner1.Value,
      PlanningPageBanner2: getApp().globalData.BECConf.Text.PlanningPageBanner2.Value,
      PlanningPageBanner3: getApp().globalData.BECConf.Text.PlanningPageBanner3.Value,
      PlanningPageBanner4: getApp().globalData.BECConf.Text.PlanningPageBanner4.Value,
      UnlockPopup1: getApp().globalData.BECConf.Text.UnlockPopup1.Value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    _fn.getBKInfo(this)    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
   * 用户点击右上角分享*/
  
  onShareAppMessage: function () {
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/userLesson/userLesson",
      isBtn: false
    })
  }, 
  // 去备课相关操作
  doBK({currentTarget,detail}){
    if (detail.errMsg == 'getUserInfo:fail auth deny') {
      return
    }

    let { url,btn } = currentTarget.dataset;
    this.innerSrc=btn
    url += `&uid=${this.uid}&lid=${this.lid}&cid=${this.cid}`;
    app.UserLogin((res) => {
      wx.hideLoading()
      //取消获取用户信息授权
      if (res == 'err') {
        return
      }
     
      //没有绑定手机号，跳转至登录页面
      if (!res || wx.getStorageSync('signOut')) {
        url = '../userToLogin/userToLogin?src=' + btn + `&uid=${this.uid}&lid=${this.lid}&isBuy=${this.isBuy}&cid=${this.cid}`;
        wx.navigateTo({
          url
        })
        return 
      }
      //设置魔药
      this.setData({
        userIntegral: getApp().globalData.userIntegral
      })
      if (!this.login)
      {
        this.login=true
        _fn.getBKInfo(this)  
      }
      else
      {
        //如果没有购买此课程，则禁止跳转
        if (!this.isBuy) {
          this.setData({
            showTip: true
          })
          return
        }
        if (url !== '') {
          wx.navigateTo({
            url
          })
        }
      }
    


      console.log(res)
    })
  },
  //返回主页
  goIndex(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  //兑换课程
  toExchangelesson(){
    this.UnlockPopup2 = getApp().globalData.BECConf.Text.UnlockPopup2.Value
   _fn.toExchangeLesson(this)
  },
  //完成备课
  BKIsOver(){
    if (!this.data.BKOK) return 
    _fn.BKisOVer(this)
  },
  //关闭解锁课程提示
  closeEvent() {
    this.setData({
      showTip:false
    })
  },
  goBack(){
    wx.navigateBack({
      delta:1
    })
  },
  animationend(){
    // wx.navigateBack({
    //   delta:1
    // })
  }
})