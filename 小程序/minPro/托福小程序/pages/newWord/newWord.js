// pages/newWord/newWord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectTip:null,
    tipConent:{},
    isMeanShow:true,
    panelDetail:{},
    pageObj:{},
    hideBtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      collectTip: this.collectTip,
      pageObj:this
    })
  },
  collectTip(res){
    
    this.setData({
      tipConent:res
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.wordList = this.selectComponent('#wordList');
    this.wordPanel = this.selectComponent('#wordPanel');
  },
  //提示上一组单词没有了
  setBtn(flag){
   
    this.setData({
      hideBtn: flag
    })
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
  
  onShareAppMessage: function () {
    
  }, */
  //下一组
  onNextPage(){
    if (this.data.tipConent.total_pages>1)
    {
      this.wordList.createFn()
    }
   
  },
  //上一组
  onUpPage(){
    if (this.data.tipConent.total_pages > 1)
    {
      this.wordList.createFn(true)
    }
   
  },
  onBackIndex(){
    let leng=getCurrentPages().length-1;
    wx.navigateBack({
      delta:leng
    })
  },
  //显示词义
  onMeanShow({ detail: { value } }) {
    this.setData({
      isMeanShow: value
    })
  },
  onPanelDetail({detail}){
    this.wordPanel.openShow();
    
    if (detail.audio_url && detail.audio_url.indexOf('http')<0)
    {
      detail.audio_url = getApp().globalData.imgUrl + detail.audio_url
    }
    for(let key in detail){
      if (!detail[key])
      {
        detail[key]=''
      }
    }
    console.log(detail.audio_url)
    this.setData({
      panelDetail: detail
    })
  }
})