// pages/bossReleasSucc/bossReleasSucc.js
let _interface=require("../../utils/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    dataObj: {},
    imgUrl: getApp().globalData.imgUrl,
    selfList:[],
    infoList:[],//资讯列表
    jobList:[],//推荐职位
    getCoin:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getCoin: getApp().globalData.getCoin
    })
    if(options.src)
    {
      this.setData({
        src:options.src
      })
      if(options.src=='info')
      {
        wx.setNavigationBarTitle({
          title: '资讯发布',
        })
        this.setData({
          dataObj: {
            url: _interface.getCommInfoList,
            outData:{
              category_id: options.category_id
            }
            
          }
        })
      }
    }
    
    if (options.src == 'selfRelease') {
      wx.setNavigationBarTitle({
        title: '毛遂自荐发布成功',
      })
      this.setData({
        dataObj: {
          url: _interface.getCommSelfList,
          outData: {
            category: options.category.split(',')
          }

        }
      })

    }
    if (options.src =='bossrelease')
    {
      this.setData({
        dataObj:{
          url: _interface.getCommBossList,
          outData: {
            category: options.category
          }
,
        }
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
  
  },
  pageData({detail}){
    let reg = /^[a-zA-z]+:/;
    let imgUrl = getApp().globalData.imgUrl;
    //资讯发布成功后
    if (this.data.src == 'info')
    {
    
      let list = this.data.infoList;
      list.push(...detail)
      this.setData({
        infoList: list
      })
      console.log(detail)
    }
    //毛遂自荐成功后
    if (this.data.src == 'selfRelease') {

      let list = this.data.jobList;
      list.push(...detail)
      this.setData({
        jobList: list
      })
      console.log(detail)
    }
    //boss发布成功后
    if (this.data.src == 'bossrelease') {
      detail.forEach(item => {
        console.log(item.head_img)
        item.head_img = reg.test(item.head_img) ? item.head_img : (imgUrl + item.head_img)
      })
      let list = this.data.jobList;
      list.push(...detail)
      this.setData({
        selfList: list
      })
      console.log(detail)
    }
  }
  
})