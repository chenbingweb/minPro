// pages/makeCoin/makeCoin.js
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskLists:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _fn.getTaskList(this)
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
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
      }
    })
    return {
      title: '自定义转发标题',
      path: '../index/index',
      success:res=>{
        _fn.shareFn(this)
        //分享到群
        // if (res.shareTickets)
        // {

        // }
        // else//分享到个人
        // {

        // }

        console.log(res)
      },
      fail:err=>{

      }
    }
  },
  //点击分享
  shareBtn({currentTarget}){
    let { share } = currentTarget.dataset;
    this.share=share
    console.log(share)
  },
  //任务完成
  toNav({ currentTarget}){
    let { share, btn } = currentTarget.dataset;
    console.log(share)
    for (let i = 0; i < this.data.taskLists.taskList.length;i++)
    {
      let item = this.data.taskLists.taskList[i]
      if (parseInt(item.id) == parseInt(share)) {
        if (item.status)
        {
          wx.showToast({
            title: '已完成',
            icon: 'none'
          })
          return
        }
     
      }

    }

    if(btn=='去完善')
    {
      wx.navigateTo({
        url: '../personInfo/personInfo?src=self',
      })
    }
    if (btn == '去注册') {
      wx.navigateTo({
        url: '../personInfo/personInfo?src=center',
      })
    }
    if (btn == '去发布') {
      wx.reLaunch({
        url: '../index/index',
      })
      wx.setStorage({
        key: 'src',
        data: 'makecoin',
      })
    }
  }
})