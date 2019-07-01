// pages/orderDetail/orderDetail.js
let _interface = require('../../utils/interface.js');
import {Index} from "../../model/index.js";
import Ajax from "../../libs/Ajax.js";
import { User } from "../../model/user.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    oid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let ajax = new Ajax({
      path: _interface.orderDetail,
      data: {
        id: parseInt(options.oid),
        token: User.token}
    })
    ajax.then(res => {
      wx.hideLoading();
      if (res.errcode == 0) {
        this.setData({
          detail: res.data,
          oid: options.oid
        })
        let title="等待接单"
        if (res.data.delivery_status == 'no' )
        {
          title = "等待接单"
        }
        if (res.data.delivery_status == 'yes' && res.data.pick_status == 'no') {
          title = "等待取货"
        }
        if (res.data.order_status == 'normal' && res.data.dispatch_status == 'yes' && res.data.delivery_status == 'yes' && res.data.pick_status == 'yes')
        {
          title = "正在配送"
        }
        if (res.data.order_status == 'in_refund') {
          title = "退款中"
        }
        if (res.data.order_status == 'has_refund') {
          title = "已退款"
        }
        wx.setNavigationBarTitle({
          title: title,
        })
      }
      console.log(res)
    })
    ajax.catch(err => {

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
    Index.sendEvent.Off(this.sendEvent)
    Index.sendEvent.On(this,this.sendEvent)
  },
  //开始配送
  sendEvent(res){
    console.log(res);
    User.getOrderList(false, () => {
      wx.navigateBack({

      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    Index.clearPetInfo()
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
  //复制
  onCopy({currentTarget:{dataset:{copy}}}){
    console.log(copy)
    wx.setClipboardData({
      data: copy,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  //开始配送
  onStart(){
    if (!Index.petInfo.pet_img.length)
    {
      wx.showToast({
        title: '请上传宠物照片',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title: '正在提交...',
      mask:true
    })

    Index.startSendFn(this.data.oid)
    
  },
  //确认订单
  onConfirmOrder(){
    wx.showModal({
      title: '提示',
      content: '确认接单',
      success: res=>{
        if(res.confirm)
        {
          
          User.confirmOrder(this.data.oid,res=>{
            User.getOrderList(false, ()=>{
              wx.navigateBack({

              })
            })
            
          })
        }
      }
    })
  }

})