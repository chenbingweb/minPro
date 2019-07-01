// pages/remarkPage/remarkPage.js
import { ConfirmOrder } from "../../model/confirmOrder.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markList:[],
    content:'',
    focus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      content: ConfirmOrder.remark,
      markList: ConfirmOrder.markList
    })
  },
  onFocuse(){
    this.setData({
      focus: true
    })
  },
  onInput({detail}){
    let {value}=detail;
    if (value.length >= 50) {
      wx.showToast({
        title: '最多输入50个字',
        icon:'none'
      })
      return
    }
    
    this.setData({
      content:value
    })
   
  },
  onSelectMark({detail}){
    if (this.data.content.length >= 50) {
      wx.showToast({
        title: '最多输入50个字',
        icon: 'none'
      })
      return
    }
    let {value}=detail;
    let content=''
    let list=this.data.markList;
    list.forEach(item=>{
      if (value.includes(item.id+''))
      {
       // item.checked = true;
        content = item.name;

      }
      else
      {
        item.checked=false
      }
    })
    
    
    this.setData({
      markList:list,
      content: this.data.content.length ? this.data.content + ',' + content : content
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
  onOver(){
    ConfirmOrder.remarkContent = this.data.content;
    wx.navigateBack({
      delta:1
    })
  }
})