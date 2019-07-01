// pages/testList/testList.js
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList:[],
    showTip:{
      show:false,
      text:'加载更多'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '加载中',
    })
    this.page=1;
    _fn.getTestList(this)
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
    this.page+=1;
    let list = this.data.testList;
    this.setData({
      ["showTip.show"]:true
    })
    this.callback=(res)=>{
      list.push(...res)
      this.setData({
        testList: list
      })
      this.setData({
        ["showTip.show"]: false
      })
      if(res.length==0)
      {
        this.setData({
          ["showTip.show"]: true,
          ["showTip.text"]: '没有更多'
        })
      }
      if (list.length==0&&res.length == 0)
      {
        this.setData({
          ["showTip.show"]: true,
          ["showTip.text"]: '没有数据'
        })
      }
    }
    _fn.getTestList(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})