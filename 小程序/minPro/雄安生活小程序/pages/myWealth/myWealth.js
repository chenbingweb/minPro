// pages/myWealth/myWealth.js
let _fn=require("./fn.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectItem:'',
    shopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _fn.getMyWealthList(this)
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
  //提交
  toBuy({detail}){
    let {value}=detail
    console.log(value)
    this.payId = value.selectItm;
    getApp().WXpay(this.payId,res=>{
      console.log('ok')
      _fn.getMyWealthList(this)
    })
    //_fn.order(this)
  },
  //选择
  radioChange({detail}){
    let { value } = detail;
    this.setData({
      selectItem:value
    })
    
 
  }
})