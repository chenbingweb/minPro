// pages/middleExamine/middleExamine.js
let _fn=require("./fn.js");
import Tool from "../../libs/Tool.js";
import Check from "../../libs/check.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:'',
    time:'获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tempFilePaths ='';
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
  //选择图片
  selectPhoto(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:res=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        this.tempFilePaths = res.tempFilePaths;
        this.setData({
          tempFilePaths: this.tempFilePaths[0]
        })
      }
    })
  },
  //失去焦点
  blurEvent({detail}){
    let { value } = detail;
    console.log(value)
    this.userphone = value;
  },
  //获取手机短信验证码
  getCode(){
    Tool.countDown(res=>{
      if(res<0)
      {
        this.setData({
          time:'获取验证码'
        })
        return
      }
      this.setData({
        time:res+'s'
      })
    })()
    //发送手机验证
    getApp().getCode({
      userphone: this.userphone
    })
  },
  doReSelect(){
    this.tempFilePaths ='';
    this.setData({
      tempFilePaths: ''
    })
  },
  //用户提交
  formSubmit({detail}){
    let {value}=detail;
    for (let key in value) {
      if (value[key] == '') {
        let tip = ''

        switch (key) {
          case 'company':
            tip = "请输入公司名称";
            break;
          case 'license':
            tip = "请输入营业执照号码";
            break;
          case 'username':
            tip = "请输入联系人姓名";
            break;
          case 'userphone':
            tip = "请输入手机号";
            break;
          case 'code':
            tip = "请输入验证码";
            break;
        }
        wx.showToast({
          title: tip,
          icon: 'none'
        })
        return
      }
      //验证手机号码
      if (key == 'userphone' && !Check.checkPhoneNum(value[key])) {
        return
      }
    }


    this.value=value;
  //  _fn.submitEvent(this)
    console.log(this.tempFilePaths)
    console.log(value)
  //  return 
    getApp().checkCode({
      code: value.code,
      userphone: value.userphone
    }, ()=>{
      _fn.submitEvent(this)
    })
    
    
  }
})