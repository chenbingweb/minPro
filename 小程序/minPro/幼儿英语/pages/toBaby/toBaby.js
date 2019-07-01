// pages/toBaby/toBaby.js
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    staticUrl: getApp().globalData.staticUrl,
    info: null,
    dflag: true,
    BabyPageTip:''
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
      BabyPageTip: getApp().globalData.BECConf.Text.BabyPageTip.Value
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
  onShow: function () {
    _fn.getBabyInfo(this)
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
      sharePath: "pages/toBaby/toBaby",
      isBtn: false
    })
  },
  tip(){
    wx.showModal({
      title: '提示',
      //content: '完成全部BEC亲子课程的学习，您的宝宝可获得超级学霸的称谓',
      content: getApp().globalData.BECConf.Text.BabyLevelPopup.Value,
      showCancel:false
    })
  },
  updatePhoto(){
    this.type = 'baby';
    this.userid = getApp().globalData.UserId;
    //修改头像
    this.callBack = res => {
      this.setData({
        ['info.head_img']: res.img_url
      })
    }
    getApp().UpdatePhoto(this)
  }
})