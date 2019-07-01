// pages/orderDetail/orderDetail.js
let _interface = require('../../utils/interface.js');
import Ajax from "../../libs/Ajax.js";
import { User } from "../../model/user.js";
import Tool from "../../libs/Tool.js"
function getDetail(options){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  let ajax = new Ajax({
    path: _interface.orderDetail,
    data: { id: options.oid, token: User.token }
  })
  ajax.then(res => {
    wx.hideLoading();
    if (res.errcode == 0) {
      res.data.create_at = Tool.formatTime(new Date(res.data.create_at * 1000), '-', true)
      if (res.data.pick_at) {
        res.data.pick_at = Tool.formatTime(new Date(res.data.pick_at * 1000), '-', true);
      }

      this.setData({
        detail: res.data,
        oid: options.oid
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading();
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    oid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options
    getDetail.bind(this)(options)
  },
  onRefresh(){

    getDetail.bind(this)(this.options)
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
  onPhoneCall({currentTarget:{dataset:{mobile}}}){
    wx.makePhoneCall({
      phoneNumber: mobile,
    })
  },
  onLookPoster({currentTarget:{dataset:{lng,lat}}}){
    wx.navigateTo({
      url: `../loactionPos/loactionPos?lng=${lng}&lat=${lat}&oid=${this.data.oid}`,
    })
  },
  //退款
  onRefund({currentTarget:{dataset:{oid}}}){
    wx.showModal({
      title: '提示',
      content: '确认申请退款？',
      success:res=>{
        if(res.confirm)
        {
          wx.showLoading({
            title: '加载中...',
            mask: true
          })
          let ajax = new Ajax({
            path: _interface.refund,
            data: { id: oid, token: User.token }
          })
          ajax.then(res => {
            wx.hideLoading();
            if (res.errcode == 0) {
              wx.showToast({
                title: '提交审核中',
                mask:true
              })
              this.setData({
                ['detail.order_status']: 'in_refund'
              })
              getCurrentPages().forEach(item=>{
                if (item.route== "pages/myOrderList/myOrderList")
                {
                  let list = item.data.orderList;
                  list.forEach((child,index)=>{
                    if (parseInt(child.id) == parseInt(oid))
                    {
                      item.setData({
                        [`orderList[${index}].order_status`]: 'in_refund'
                      },()=>{
                        setTimeout(() => {
                          wx.navigateBack({
                            delta:1
                          })
                        }, 2000)
                      })
                    }
                  })
                }
              })

              
            }
            else
            {
              wx.showToast({
                title: res.msg,
                icon:'none'
              })
            }
            console.log(res)
          })
          ajax.catch(err => {
            wx.hideLoading();
          })
        }
      }
    })


  }
})