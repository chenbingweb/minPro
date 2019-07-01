// pages/brand/brand.js
let _fn=require('./fn.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: getApp().globalData.imgUrl,//获取图片地址
    showBrand:false,
    baseSet: {
      indicatorColor: 'rgba(255, 255,255, 0.5)',//指示点颜色
      indicatorActiveColor: 'white',//当前选中的指示点颜色
    },
    login:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().updateNav(1)
   // _fn.getBanner(this)
    _fn.getBrandListAll(this)
    this.setData({
      login: getApp().globalData.UserId == undefined ? false : true
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
  navTo({currentTarget}){
      let {id,url}=currentTarget.dataset;
      wx.navigateTo({
        url: url,
      })
    
  },
  toDetail(e) {
    let aid = e.detail.dataset.detail;
    if (!aid) return
    wx.showLoading({
      title: '加载中...',
    })
    //获取文章详情id
    getApp().UserLogin(() => {
      wx.hideLoading()
      wx.navigateTo({
        url: `../articleDetail/articleDetail?aid=${aid}`,
      })
    })

  },
})