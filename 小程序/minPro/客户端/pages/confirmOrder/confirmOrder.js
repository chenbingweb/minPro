// pages/confirmOrder/confirmOrder.js
import { ConfirmOrder } from "../../model/confirmOrder.js";
import { User } from "../../model/user.js";
import { RestaurantDetail } from "../../model/restaurantDetail.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    amount:'0.00',
    pay: '0.00',
    totalPrce:0.00,
    checked:true,
    remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._offEvnent();
    this._onEvent();
    ConfirmOrder.showCartList(true, User.currentAmount)
   
  },
  _offEvnent(){
    ConfirmOrder.confirmEvent.Off(this.confirmEvent);
    ConfirmOrder.remarkEvent.Off(this.remarkEvent);
  },
  _onEvent(){
    ConfirmOrder.confirmEvent.On(this,this.confirmEvent);
    ConfirmOrder.remarkEvent.On(this,this.remarkEvent)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  remarkEvent(){
    this.setData({
      remark: ConfirmOrder.remark
    })
   
  },
  confirmEvent(res){
    this.setData({
      cartList: User.cartList,
      amount: User.currentAmount,//RestaurantDetail.currentAmount, //User.amount,
      pay:res,
      totalPrce: User.totalPrce
    })
  },
  onChangeBox({detail}){
    let {value}=detail;
    if(value.length)
    {
      this.setData({
        checked:true
      })
      ConfirmOrder.showCartList(true, User.currentAmount)
    }
    else
    {
      this.setData({
        checked: false,
        
      })
      ConfirmOrder.showCartList(false)
    }
    console.log(detail)
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
  onToMark(){
    wx.navigateTo({
      url: '../remarkPage/remarkPage',
    })
  },
  //支付
  onPay(){
    let tip = this.data.cartList.filter(item=>{

      return item.activity_type == 'xl' && item.activity_status && item.is_now_join_activity!=true
    })
    if(tip.length)
    {
      wx.showModal({
        title: '拼单提示',
        content: '当前所付为原价，拼单成功后退回差价',
        showCancel:false,
        success:res=>{
          if(res.confirm)
          {
            ConfirmOrder.wxPay(() => {

              // wx.redirectTo({
              //   url: '../paySucc/paySucc',
              // })

            })
          }
        }
      })
    }
    else
    {
      ConfirmOrder.wxPay(() => {

        // wx.redirectTo({
        //   url: '../paySucc/paySucc',
        // })

      })
    }
    
    //console.log(User.payFood)
    return 
    wx.redirectTo({
      url: '../paySucc/paySucc',
    })
  }
})