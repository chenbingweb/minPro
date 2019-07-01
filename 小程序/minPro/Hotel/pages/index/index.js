// pages/index/index.js
let app=getApp();
let _util = require('../../utils/util.js');
import { Login, check } from "./fn.js"
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"

Page({

  /**
   * 页面的初始数据'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
   */
  data: {
    showLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取地址列表
    // getApp().getAreaList((res) => {
    //   let areaList = this.data.areaList;
    //   areaList.push(...res)
    //   // 默认地址id
    //   this.areaId = areaList[9].id
    //   this.setData({
    //     areaList: areaList
    //   })
    //   _fn.getIndexInfo(this);
     
    // })
    Login(this)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // getApp().UserToLogin(res=>{
    //   console.log(res)
    // })
  },
  isLogin(){
    console.log('注册后重新登录')
    Login(this)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //用户登录
    // getApp().UserToLogin((res) => {
    
    // })

    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
    this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();

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

    let imageUrl=undefined;
    console.log(getApp().shareInfo)
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
    })
  },
  onToList(){
    wx.navigateTo({
      url: '../list/list',
    })
  },
  //扫描
  /*
  
  errMsg
:
"scanCode:ok"
result
:
"5cd827352aa62"
  
  */
  onScanle(){
    wx.scanCode({
      onlyFromCamera: true,
      success:(res)=> {
        if (res.errMsg =='scanCode:ok')
        {
          check(res.result, (result)=>{
            this.goodsInfo = result;
            wx.navigateTo({
              url: '../success/success',
            })
          })
        }
        console.log(res)
      }
    })
  }
})