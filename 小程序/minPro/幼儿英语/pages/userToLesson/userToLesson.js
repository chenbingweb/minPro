// pages/userToLesson/userToLesson.js
import Tool from "../../libs/Tool.js";
let _fn=require("./fn.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticUrl: getApp().globalData.staticUrl,
    src:'sk',
    SKInfo:null,
    uid:'',
    lid:'',
    showSKTip:false
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
    this.userid = getApp().globalData.UserId;
    this.uid = options.uid;
    this.lid = options.lid;
    this.cid=options.cid;
    this.item_select='';
    this.setData({
      uid: this.uid,
      lid: this.lid,
      cid: this.cid
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
    _fn.getSKBaseInfo(this)
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
      sharePath: "pages/userToLesson/userToLesson",
      isBtn: false
    })
  },
  //读绘本
  toSKRead({currentTarget}){
    
    let { url, item}=currentTarget.dataset;
    this.item_select=item;
    let obj = _fn.SKClick(this)
    if (!obj.isOK)
    {
      console.log(obj)
      wx.showToast({
        title: _fn.SKClick(this).msg,
        icon:"none"
      })
      return 
    }

    wx.navigateTo({
      url
    })
  },

  //返回主页
  goIndex() {
    // let indexPage = Tool.getPageObj('pages/index/index')
    // indexPage.data.loading = true
    // console.log(indexPage.data.loading=true)
    wx.reLaunch({
      url: '../index/index',
    })
  },
  animationend_(){
    setTimeout(() => {
      wx.navigateTo({
        url: `../schoolTeport/schoolTeport?src=cj&uid=${this.uid}&lid=${this.lid}&cid=${this.cid}`,
      })
      this.setData({
        showSKTip:false
      })
    }, 500)
  }
})