// pages/countFee/countFee.js
let _interface = require("../../utils/interface.js");
import { User } from "../../model/user.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    dataObj:{},
    start:'',
    end:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.setData({
      list: [],
      dataObj: {
        url: _interface.getNoteList || '',
        outData: {
          token: User.token,
          start_date:'',
          end_date:''
        }
      }
    })
  },
  onPageData({ detail }) {
    let list = this.data.list;
    list.push(...detail)
    this.setData({
      list
    })

  },
  onToDetail({currentTarget}){
    let {tid}=currentTarget.dataset;
    let list = this.data.list;
    list.forEach(item=>{
      if (item.id==tid)
      {
        wx.setStorage({
          key: 'node',
          data: item,
          success:()=>{
            wx.navigateTo({
              url: '../countFeeDetail/countFeeDetail',
            })
          }
        })
      }
    })
  },
  onStart({detail}){
    let {value}=detail;
    this.setData({
      start:value
    })
    if (this.data.start !== '' && this.data.end!=='')
    {
      this.setData({
        list: [],
        ['dataObj.outData.start_date']: this.data.start,
        ['dataObj.outData.end_date']: this.data.end
      })
    }
  },
  onEnd({detail}){
    let { value } = detail;
    this.setData({
      end: value
    })
    if (this.data.start !== '' && this.data.end !== '')
    {
      this.setData({
        list: [],
        ['dataObj.outData.start_date']: this.data.start,
        ['dataObj.outData.end_date']: this.data.end
      })
    }
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

  }
})