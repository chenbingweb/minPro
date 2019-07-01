// pages/lessonList/lessonList.js
let _interface = require('../../utils/interface.js')
function reLoadFn(){
  this.reload = true
  this.setData({
    reload: false
  })
  this.setData({
    lessonList: []
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:'lesson',
    staticUrl: getApp().globalData.staticUrl,
    // url: _interface.getLessonList,
    // sendData: {
    //   userid: ''
    // },
    lessonList:[],
    reload:false,//重载课程
    dataObj:{ },
    imgUrl: getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    this.reload=false
    if (options.src =='mylesson')
    {
      // this.setData({
      //   selected:'my',
        
      //   url: _interface.getMyLesson
      // })
      this.setData({
        selected: 'my',
        ['dataObj']: {
          url: _interface.getMyLesson,
          outData: { userid: getApp().globalData.UserId||0}
        }
      })
    }
    else
    {
      this.setData({
        ['dataObj']: {
          url: _interface.getLessonList,
          outData: { userid: getApp().globalData.UserId||0 }
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
   * 生命周期函数--监听页面显示sendData
   */
  onShow: function () {
    this.setData({
      ['sendData.userid']: getApp().globalData.UserId
    })
    if(this.reload)
    {
      this.setData({
        reload:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    reLoadFn.bind(this)()
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
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/lessonList/lessonList",
      isBtn: false
    })
  },
  // 选择
  selectBtn(e){
    let id=e.currentTarget.id;
    this.setData({
      lessonList: []
    })
    this.setData({
      selected:id,
      ['dataObj']: {
        url: id == 'my' ? _interface.getMyLesson : _interface.getLessonList,
        outData: { userid: getApp().globalData.UserId }
      }
      })
  
  },
  //分页数据
  pageData({ detail}){
    wx.hideLoading()
    let list = this.data.lessonList;
    list.push(...detail)
    this.setData({
      lessonList: list
    })
  }
})