// pages/personInfo/personInfo.js
import Tool from "../../libs/Tool.js"
let _fn=require("./fn.js");
import Check from "../../libs/check.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'center',
    userInfo:null,
    time: '获取验证码',
    birthday:'',
    work_time:'',
    live:'请选择',
    register:'请选择',
    sexList:[
      {
       id:-1,name:'请选择'
      },
      {
        id: 0, name: '女'
      },
      {
        id: 1, name: '男'
      }
    ],
    sexIndex:0,
    userAllInfo:{},
    head_img:'',
    educationList: ['初中', '高中', '中专', '大专', '本科', '研究生', '博士', '硕士'],
    eduIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //头像地址
    this.tempFilePaths=[]
    this.src = options.src;
    this.setData({
      src: this.src,
      userInfo:getApp().globalData.userInfo
    })
    this.img_url ='';
    if (this.src =='self')
    {
      _fn.getUserAllInfo(this)
    }
    else if (this.src=='center'){
      this.setData({
        src:'center'
      })
      _fn.getUserBaseInfo(this)
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
  //失去焦点
  blurEvent({ detail }) {
    let { value } = detail;
    this.userphone = value;
  },
  //获取手机短信验证码
  getCode() {
    Tool.countDown(res => {
      if (res < 0) {
        this.setData({
          time: '获取验证码'
        })
        return
      }
      this.setData({
        time: res + 's'
      })
    })()
    console.log(this.userphone)
    //发送手机验证
    getApp().getCode({
      userphone: this.userphone
    })
  },
  //生日选择
  birthEvent({detail}){
    let {value} = detail;
    this.setData({
      birthday:value
    })
  },
  //选择性别
  sexEvent({ detail }){
    let { value } = detail;
    this.setData({
      sexIndex: value
    })
  },
  //选择参加工作时间
  workTimeEvent({ detail }){
    let { value } = detail;
    this.setData({
      work_time: value
    })
  },
  //现居住城市
  liveEvent({ detail }){
    let { value } = detail;
    console.log(value)
    this.setData({
      live: value
    })

  },
  //户口所在第
  RegEvent({ detail }){
    let { value } = detail;
    this.setData({
      register: value
    })
  },
  //保存信息
  formSubmit({detail}){
    let {value}=detail;
    for (let key in value) {
      if (value[key] == '') {
        let tip = ''

        switch (key) {
          case 'name':
            tip = "请输入姓名";
            break;
          case 'sex':
            tip = "请选择性别";
            break;
          case 'code':
            tip = "请输入验证码";
            break;
          case 'birthday':
            tip = "请选生日";
            break;
          case 'info':
            tip = "请输入自我介绍";
            break;
          case 'work_time':
            tip = "请选择工作时间";
            break;
          case 'education':
            tip = "请选择学历";
            break;
          case 'email':
            tip = "请输入邮箱地址";
            break;
          case 'phone':
            tip = "请输入手机号";
            break;
          case 'userphone':
            tip = "请输入手机号";
            break;
        }
        wx.showToast({
          title: tip,
          icon: 'none'
        })
        return
      }
      if (key == 'live' && value['live'] =='请选择')
      {
        wx.showToast({
          title: '请选择现居住城市',
          icon: 'none'
        })
        return
      }
      if (key == 'register' && value['register'] =='请选择') {
        wx.showToast({
          title: '请选择户口所在地',
          icon: 'none'
        })
        return
      }
      //邮箱地址验证
      if (key == 'email' && !Check.checkEmail(value[key]))
      {
        return 
      }
      //验证手机号码
      if (key == 'phone' && !Check.checkPhoneNum(value[key])) {
        return
      }
      //验证手机号码
      if (key == 'userphone' && !Check.checkPhoneNum(value[key])) {
        return
      }



    }
    this.value=value;

   
    if(this.src=='self')
    {
      _fn.submitEvent(this)
    }
    //保存个人信息
    else if (this.src == 'center'){
      console.log(this.value)
      //_fn.submitEvent(this)
      _fn.AuthUser(this)
    }
    else
    {
      getApp().checkCode({
        code: value.code,
        userphone: this.userphone
      }, res => {
        _fn.AuthUser(this)
      })
    }
   
    console.log(value)
  },
  //跟换图片
  changePhoto(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        this.tempFilePaths=res.tempFilePaths;
       this.setData({
         ['userInfo.avatarUrl']: res.tempFilePaths[0],
         head_img: res.tempFilePaths[0]
         })
      }
    })
  },
  //学历选择
  educationEvent({ detail }) {
    let { value } = detail;
    this.setData({
      eduIndex: value
    })
  },
})