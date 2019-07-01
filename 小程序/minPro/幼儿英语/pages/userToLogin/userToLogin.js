// pages/userToLogin/userToLogin.js
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPhone:false,
    showGetCodeBtn:true//显示获取验证码按钮
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
    //页面来源
    this.src = options.src;
    if (this.src =='mother')
    {
      this.setData({
        showPhone:true
      })
    }
    //单元id
    this.uid = options.uid||'';
    //课程id
    this.lid = options.lid||'';
    //手机号默认为空
    this.mobile='';
    //手机验证码默认为空
    this.code="";
    if(options.isBuy!=undefined)
    {
      this.isBuy = options.isBuy=="true"?true:false
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
   * 用户点击右上角分享*/
   
  onShareAppMessage: function () {
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/userToLogin/userToLogin",
      isBtn: false
    })
  },
  //获取手机号码
  getUserPhone({detail}){
    this.mobile=detail.value;
  },
  //获取用户输入的验证码
  getUserCode({ detail }){
    this.code = detail.value;
  },
  //获取验证码
  getCode(){
    this.callback=res=>{
      //显示获取验证码按钮
      if(res<0)
      {
        this.setData({
          showGetCodeBtn: true
        })
      }
      else//显示倒计时
      {
        this.setData({
          showGetCodeBtn: res + 's'
        })
      }
      
    }
   _fn.getCode(this)
  },
  //显示填写手机号注册
  toPhoneLogin(){
    this.setData({
      showPhone:true
    })
  },
  //提交注册
  formSubmit({detail}){
    let value=detail.value.code;
    if (this.mobile=='')
    {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        mask: true
      })
      return 
    }
    if (value=='')
    {
      wx.showToast({
        title: '验证码不为空',
        icon: 'none',
        mask: true
      })
      return 
    }
    this.code=value;
    if (this.src =='mother'){
      _fn.updatePhone(this)
    }
    else
    {
      //验证验证码
      _fn.checkCode(this)
    }
    

    
  },
  //通过微信获取手机号注册
  getPhoneNumber({detail}) {
    if (detail.errMsg=="getPhoneNumber:ok")
    {
      this.detail = detail;
      _fn.WXBindUser(this)
    }
    else
    {
      wx.showToast({
        title: '获取手机号码失败',
        icon:'none'
      })
    }
    
    console.log(detail)
   
  }
  
})