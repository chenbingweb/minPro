// pages/shopDetail/shopDetail.js
let _fn=require('./fn.js')
import Tool from '../../libs/Tool.js'
function initData(){
  this.setData({
    couponList: [],
  })
  this.setData({
    couponList: false,
  })
  this.page = 1;//默认为第一页
  this.morePage = false;//是否获取更多
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNodata:false,
    showMore:false,
    couponList:false,
    showTip:false,
    shopDetail:false,
    imgUrl:getApp().globalData.imgUrl,//获取图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.page = 1;//默认为第一页
    this.pageSize =getApp().globalData.pageSize;//每次加载数量
    this.morePage = false;//是否获取更多
    this.sid=options.id;
   
    
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
    if (!getApp().globalData.UserId) {
      getApp().UserLogin(() => {
        _fn.shopInfoAll(this)
        _fn.getCouponList(this)
      })
    }
    else {
      _fn.shopInfoAll(this)
      _fn.getCouponList(this)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    initData.bind(this)()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    initData.bind(this)()
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
  //分页
  scrolltolower(){
    if (!this.morePage) return
    this.page += 1;
    this.setData({
      showMore: true
    })
    _fn.getCouponList(this)
  },
   //查看附近店铺
  toShopingDetail(e) {
    wx.showLoading({
      title: '加载中...',
    })
    let { id } = e.currentTarget.dataset
    if (!getApp().globalData.UserId) {
      app.UserLogin(() => {
        wx.hideLoading()
         _fn.shopeDetail(e.currentTarget.dataset)

      })
    }
    else {
       _fn.shopeDetail(e.currentTarget.dataset)
     
    }

  },//领取优惠券
  toBuyCoupon(e) {
    let canClick = Tool.canClick(100)()
    if (!canClick) return
    let { company, id, canbuy } = e.currentTarget.dataset;

      wx.showLoading({
        title: '跳转中..',
      })

      wx.navigateTo({
        url: `../couponDetail/couponDetail?id=${id}`,
        success(){
          wx.hideLoading()
        }
      })

  
  }
})