// pages/doRecharge/doRecharge.js
import { getRechangeList, pay } from "./fn.js"
import { User } from "../../model/user.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechange:[
      {
        fee:'10.00',
        id:10,
        select:true
      },
      {
        fee: '50.00',
        id: 50,
        select: false
      },
      {
        fee: '100.00',
        id: 100,
        select: false
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { cid }=options;
    this.cid=cid;
    getRechangeList(this)
  },
  onSelect({currentTarget:{dataset:{rid}}}){
    let { rechange } = this.data;
    rechange.forEach(item=>{
      if(item.id==rid)
      {
        item.select = true
      }
      else
      {
        item.select=false
      }
    })
    this.setData({
      rechange
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
  onPay(){
    let { rechange } = this.data;
    
    pay(rechange.filter(item => item.select)[0].id, res=>{
      User.updata()
      wx.showToast({
        title: '充值成功',
        mask:true
      })
    })
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