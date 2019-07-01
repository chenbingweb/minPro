// pages/lookAnimation/lookAnimation.js
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'bk',
    showTip:false,
    animationInfoList:null,
    animationInfo:null,
    showMark:false,
    staticUrl: getApp().globalData.staticUrl,
    gold:0,//学贝
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
    this.uid = options.uid;
    this.lid = options.lid;
    this.cid = options.cid;
    this.userid = getApp().globalData.UserId;
    this.startTime=0;
    this.currentTime =0;//播放时长
    // if (options.src=='bk')
    // {
    //   //备课结束类型
    //   this.class_type = 'cartoon';
    // }
    this.class_type = 'cartoon_explain_status';
  
    //备课、上课结束回调
    this.callBack = res => {
      console.log(res)
      if (res.gold)
      {
        this.setData({
          gold: res.gold
        })
      }
      wx.hideLoading()
      this.setData({
        showMark: true
      })
    }
    this.setData({
      src: options.src
    })
    if (options.src == 'bk')
    {
      this.lesson_type ="prepare"
      _fn.LookAnimation(this)
    }
    else
    {
      this.lesson_type = "end"
      _fn.LookAnimationSK(this)
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.onNetworkStatusChange(({ isConnected, networkType})=>{
      if (isConnected)
      {
        console.log("onNetworkStatusChange")
        _fn.videoExchange(this)
      }
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/lookAnimation/lookAnimation",
      isBtn: false
    })
  },
  //结束动画
  endAni(){
    wx.showLoading({
      title: '正在结束动画...',
    })
    let ms ="planning-movie"
    if (this.data.src == 'bk') {
      getApp().BKEndOk(this);
     
    }
    else {
      getApp().SKEndOk(this)
      
    }
    let send = {
      message: ms,
      ext1: this.cid,
      ext2: 1,
      ext3: this.currentTime,
      userid: getApp().globalData.UserId
    }
    getApp().sendNote(send)

  },
  //打开提示
  openTip(e){
    this.setData({
      showTip:true
    })
  },
  //关闭提示
  closeTipX(){
    this.setData({
      showTip: false
    })
  },
  //继续备课
  goOnBK(){
    wx.navigateBack({
      delta: 1
    })
  },
  //关闭提示
  closeTip(){
    this.setData({
      showMark: false
    })
  },
  //视频播放结束
  vidioEnd(){
    wx.showLoading({
      title: '正在结束动画...',
    })
    let ms = "planning-movie"
    if(this.data.src=='bk')
    {
      getApp().BKEndOk(this);
      ms = "planning-movie"
    }
    else
    {
      getApp().SKEndOk(this)
      ms = "study-movie"
    }
    let send = {
      message: ms,
      ext1: this.cid,
      ext2: 1,
      ext3: this.currentTime,
      userid: getApp().globalData.UserId
    }
    getApp().sendNote(send)
  },
  //视频报错
  error(){
    wx.showToast({
      title: '视频地址出错',
      icon:'none'
    })
  },
  animationend() {
    if (this.data.src == 'sk') {
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 500)

    }
  },
  goOnBK() {
    wx.navigateBack({
      delta: 1
    })
    // if(this.data.src=="sk")
    // {
    //   wx.setStorageSync('showCJ', true)
    // }
  },
  updateEvent({detail}){
    let { currentTime } = detail;
    this.currentTime = currentTime
  }
  
})