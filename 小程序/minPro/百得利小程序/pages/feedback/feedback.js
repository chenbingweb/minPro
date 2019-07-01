// pages/feedback/feedback.js
let _fn=require('./fn.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    data:{}
  },
  
  //form表单提交 AccessToken=f841&contact=1&details=b
  formSubmit({ detail}){
    let { suggest, mobile } = detail.value;
    if (suggest=='')
    {
      wx.showToast({
        title: '请描述您的问题',
        icon:'none'
      })
      return 
    }
    if (mobile=='')
    {
      wx.showToast({
        title: '请输入您的联系方式',
        icon: 'none'
      })
      return 
    }
    let reg=/^\d/g;
    if(!reg.test(mobile))
    {
      wx.showToast({
        title: '请输入正确的联系方式',
        icon: 'none'
      })
      return 
    }
    this.suggest = suggest;
    this.mobile = mobile;
    _fn.userSuggest(this)
    console.log(suggest, mobile)
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.UserId = getApp().globalData.UserId;

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
  }
  
})