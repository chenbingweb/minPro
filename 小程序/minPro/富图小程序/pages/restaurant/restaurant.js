// pages/restaurant/restaurant.js
import { User } from "../../model/user.js";
import { Index } from "../../model/index.js";
import { Restaurant } from "../../model/restaurant.js"
import { RestaurantDetail } from "../../model/restaurantDetail.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTy:'navigate',
    dataObj:{},
    shopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.src =='change')
    {
      this.setData({
        navTy:'navigateBack'
      })
    }
       
    Restaurant.PageObj=this;
    Restaurant.list();
    this._offEvent();
    this._bindEvent();
    console.log(User.location)
  },
  
  onPageData({ detail }) { 
    detail.forEach(item => {
      item.img_url = getApp().globalData.imgUrl + item.img_url
    })
    Restaurant.List=detail
  },  
  _offEvent() {
    Restaurant.shopListEvent.Off(this.shopListEvent);
  },
  _bindEvent() {
    Restaurant.shopListEvent.On(this, this.shopListEvent);
  },
  shopListEvent(){
    this.setData({
      shopList: Restaurant.restList
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
    this.shopListEvent()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   // Restaurant.currentPage=1
   this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this._offEvent();
    Restaurant.currentPage = 1;
    
    Restaurant.restArr = {'_1':Restaurant.restArr['_1']};
    console.log(Restaurant.restList)
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
  //更新菜品排行
  onUpdata({currentTarget}){
    let { restaurant_id, status, isvip, ot, url}=currentTarget.dataset;
    if (isvip == false && status =='hide')
    {
      
      wx.showModal({
        title: '提示',
        content: '对不起，您当前不属于此餐厅的VIP,请选择其他餐厅',
        showCancel:false
      })
      return
    }
    if (ot == 'navigate') {
      wx.navigateTo({
        url: url,
      })
      
    }
    else {
      wx.navigateBack({
        delta: 1
      })
    }
    Index.upDataRange(restaurant_id);
    Restaurant.setRestaurantId(restaurant_id);
    RestaurantDetail.getResDetailInfo();
   
  },
  onNavTo({ currentTarget }){
    let { status, isvip, ot, url } = currentTarget;
    if (ot =='navigate')
    {
      wx.navigateTo({
        url: url,
      })
    }
    else
    {
      wx.navigateBack({
        delta:1
      })
    }
    console.log(status, isvip, ot, url )
  }
})