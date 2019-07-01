// pages/shoppingEvaluate/shoppingEvaluate.js
let start=[
  {
    id:0,
    num:1,
    status:false
  },
  {
    id: 1,
    num: 2,
    status: false
  },
  {
    id: 2,
    num: 3,
    status: false
  },
  {
    id: 3,
    num: 4,
    status: false
  },
  {
    id: 4,
    num: 5,
    status: false
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: start
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  //选择
  onSelectStar({currentTarget}){
    let { id, status } = currentTarget.dataset;
    let list = this.data.start;
    list.forEach((item,index)=>{
      if(index<=id)
      {
        item.status=true
      }
      else
      {
        item.status = false
      }
    })
    this.setData({
      start: list
    })
  }
  
})