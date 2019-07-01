// pages/toMum/toMum.js
let _fn=require("./fn.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticUrl: getApp().globalData.staticUrl,
    info:null,
    dflag: true,
    ParentPageTip:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ParentPageTip: getApp().globalData.BECConf.Text.ParentPageTip.Value
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
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
    _fn.getMumInfo(this)
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
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/toMum/toMum",
      isBtn: false
    })
  },
  //退出登录
  signOut({currentTarget}){
    let {url}=currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确认要退出登录？',
      success(res){
          if(res.confirm)
          {
            let send = {
              message: 'logout',
              userid: getApp().globalData.UserId
            }
            getApp().sendNote(send)
            
            wx.redirectTo({
              url: url,
              success(){
                getApp().globalData.UserId = null;
                getApp().globalData.signOut = true;
                getApp().globalData.userIntegral = {};
              }
            })
            //退出登录
            getApp().globalData.isLogin = false;
            wx.setStorageSync('signOut', true)
          }
      }
    })
   


  },
  //修改妈妈头像
  updatePhoto(e){
    this.type='mother';
    this.userid = getApp().globalData.UserId;
    //修改头像
    this.callBack=res=>{
      this.setData({
        ['info.head_img']: res.img_url
      })
    }
    getApp().UpdatePhoto(this)
  }
})