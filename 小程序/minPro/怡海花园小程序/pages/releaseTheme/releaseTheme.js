// pages/releaseTheme/releaseTheme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startBMDate:'',
    startBMTime: '',
    endBMDate:'',
    endBMTime:'',
    startHDDate: '',
    startHDTime: '',
    endHDDate: '',
    endHDTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  onBMStartDate({detail}){
    let {value}=detail;
    this.setData({
      startBMDate: value
    })
    console.log(value)
  },
  onBMStartTime({ detail}){
    let { value } = detail;
    this.setData({
      startBMTime: value,
    })
    console.log(value)
  },
  onBMEndtDate({ detail }) {
    let { value } = detail;
    this.setData({
      endBMDate: value,
    })
    console.log(value)
  },
  onBMEndTime({ detail }) {
    let { value } = detail;
    this.setData({
      endBMTime: value,
    })
    console.log(value)
  },
  onHDStartDate({ detail }) {
    let { value } = detail;
    this.setData({
      startHDDate: value
    })
    console.log(value)
  },
  onHDStartTime({ detail }) {
    let { value } = detail;
    this.setData({
      startHDTime: value,
    })
    console.log(value)
  },
  onHDEndtDate({ detail }) {
    let { value } = detail;
    this.setData({
      endHDDate: value,
    })
    console.log(value)
  },
  onHDEndTime({ detail }) {
    let { value } = detail;
    this.setData({
      endHDTime: value,
    })
    console.log(value)
  },
})