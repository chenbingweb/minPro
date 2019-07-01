// pages/exersiceSK/exersiceSK.js
let _fn=require("./fn.js");
import InnerAudio from "../../libs/InnerAudio.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticUrl: getApp().globalData.staticUrl,
    practiceList:[],
    practiceItem:null,
    showEvent:false,
    showStatue:0,//0 默认提示图 1 回答正确 2 回答错误
    gold:0,
    showMark: false,
    isplay:false,
    imgUrl: getApp().globalData.imgUrl,//获取图片地址
    currentQ:1,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      StudyQuestionPageTip: getApp().globalData.BECConf.Text.StudyQuestionPageTip.Value,
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })
    this.userid = getApp().globalData.UserId;
    this.uid = options.uid;
    this.lid = options.lid;
    this.index=0;//默认显示第一题
    this.practice_id='';
    this.cid=options.cid;
    this.lesson_type = 'end';
    this.class_type ="practice_status";
    this.startTime=0;
   //上课结束回调
    this.callBack = res => {
      console.log(res)
      if (res.gold) {
        this.setData({
          gold: res.gold
        })
      }
      wx.hideLoading()
      this.setData({
        showMark: true
      })
    }
    this.audio = new InnerAudio({
      onEnded: _fn.listenEnd(this),
      onPlay: _fn.playAudio(this),
      onStop: _fn.playStop(this),
    });
    _fn.getPracticeList(this)
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.audio.stop()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.audio.stop()
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
      sharePath: "pages/exersiceSK/exersiceSK",
      isBtn: false
    })
  },
 
  radioChange({detail}){

    this.id=detail.value;
    this.setData({
      showEvent: true
    })
    _fn.userSelect(this)
  },
  playAudio({currentTarget}){
    let {url}=currentTarget.dataset;
    this.audio.play(url)
  },
  animationend() {
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 500)

    
  },
  goOnBK() {
    wx.navigateBack({
      delta: 1
    })
    wx.setStorageSync('showCJ', true)
  
  }
})