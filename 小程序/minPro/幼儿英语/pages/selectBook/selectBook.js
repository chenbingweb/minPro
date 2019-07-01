// pages/selectBook/selectBook.js
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson:[],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current:0,//当前第几课
    lessonInfo:null,
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

    if(options.src)
    {
      this.src=options.src;
    }
    //获取单元id
    this.uid = options.uid;
    //获取每节课id
    this.lid=options.lid;
    this.cid = options.cid
    
    
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
    this.userid = getApp().globalData.UserId || 0
    _fn.getUnitLessonList(this)
    wx.removeStorageSync('showCJ')
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
   * 用户点击右上角分享*/
   
  onShareAppMessage: function () {
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/selectBook/selectBook",
      isBtn: false
    })
  },
  //切换swiper
  swiperChange(e){
    let { detail}=e;
    let current = detail.current;
    this.setData({
      lessonInfo: this.data.lesson[current],
      current: detail.current
    })
    console.log(e)
  },
  userControl({currentTarget}){
    let { url, status, btn,cid}  = currentTarget.dataset;
    this.cid=cid;
    //当为备课时，点击上课，成绩，则提示没有备课
    if ((status == 0 && btn == 'sk') || (status == 0 && btn == 'cj'))
    {
      // wx.showToast({
      //   title: '您还没有备课',
      //   icon:'none'
      // })
      return 
    }
    //当为上课时，点击成绩，则提示您还没有上完课
    else if (status == 1 && btn == 'cj')
    {
      // wx.showToast({
      //   title: '您还没有上完课',
      //   icon: 'none'
      // })
      return 
    }
   
    wx.navigateTo({
      url
    })
  },
 //跳转其他课程
  navToOther(){
    if (this.src =='lessonlist')
    {
      wx.navigateBack({
        delta: 1
      })
    }
    else
    {
      
      wx.redirectTo({
        url: '../lessonList/lessonList',
      })
    }
  },
  navTo({currentTarget}){
    let { current } = currentTarget.dataset;
    if (this.data.current == this.data.lesson.length - 1) {
      wx.redirectTo({
        url: '../lessonList/lessonList?src=all',
      })
    }
    console.log(current)
  },
  animationFinish_(){
    if (this.data.current == this.data.lesson.length-1)
    {
      wx.showToast({
        title: '此课程为本单元最后一节课程，去课程中心学习其他课程',
        icon:'none',
        duration:3000
      })
    }
    
  }
  
})