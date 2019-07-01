// pages/selfRelease/selfRelease.js
let _fn = require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    experienceList: [],//工作经历
    educationList: [],//教育经历
    wantjobList: [],
    thinkJob: '',
    isTop: 0,
    checked: false,
    head_img:'',
    price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      price:getApp().globalData.price,
      userInfo: getApp().globalData.userInfo || null
    })
    this.isFillInfo=false
   
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
    //获取用户信息
    _fn.getUserAllInfo(this)
    //工作性质
    wx.getStorage({
      key: 'wantjobList',
      success: res => {
        if (res.data) {
          console.log(res.data)
          this.setData({
            thinkJob: res.data
          })
          let thinkJobList=[]
          res.data.forEach(item => {
            let wantjobList = [];
            let typeJobData = item
            typeJobData.pay_start = typeJobData.pay_start + 'k';
            typeJobData.pay_end = typeJobData.pay_end + 'k';
            typeJobData.pay = typeJobData.pay_start + '~' + typeJobData.pay_end
            
            for (let key in typeJobData) {
              if (key != 'pay_start' && key != 'pay_end' && key != 'place') {
                wantjobList.push(typeJobData[key])
              }
            }
            thinkJobList.push(wantjobList.join(','))
          })
          
          // let typeJobData = res.data
          // typeJobData.pay_start = typeJobData.pay_start+'k';
          // typeJobData.pay_end = typeJobData.pay_end + 'k';
          // typeJobData.pay = typeJobData.pay_start + '~' + typeJobData.pay_end
          // let wantjobList=[];
          // for (let key in typeJobData)
          // {
          //   if (key != 'pay_start' && key != 'pay_end' && key !='place')
          //   {
          //     wantjobList.push(typeJobData[key])
          //   }

          // }
          this.setData({
            wantjobList: thinkJobList
          })
        }
      },
    })
    //工作经历
    wx.getStorage({
      key: 'experienceList',
      success: res => {
        if (res.data) {
          this.setData({
            experienceList: res.data
          })
        }
      },
    })
    //教育经历
    wx.getStorage({
      key: 'educationList',
      success: res => {
        if (res.data) {
          this.setData({
            educationList: res.data
          })
        }
      },
    })


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
  //是否顶置
  switchEvent({ detail }) {
    let { value } = detail;
    this.setData({
      isTop: value ? 1 : 0
    })

  },
  //免责声明
  agreeEvent({ detail }) {
    let { value } = detail;
    this.setData({
      checked: value
    })
  },
  //查看编辑详情
  toDetail({ currentTarget}){
    let {url } = currentTarget.dataset;
    wx.navigateTo({
      url: url,
    })
  
  },
  submitEvent({ detail }) {
    let { value, formId } = detail;
    
    getApp().setFormId(getApp().globalData.userId, formId)
    if (!this.isFillInfo)
    {
      wx.showModal({
        title: '提示',
        content: '您的个人信息尚未完善，请完善您的个人信息',
        success:res=>{
          if(res.confirm)
          {
            wx.navigateTo({
              url: '../personInfo/personInfo?src=self',
            })
          }
        }
      })
      return 
    }
 
    //工作性质
    value.thinkJob = this.data.thinkJob;
    //工作经历
    value.experienceList = this.data.experienceList;
    //教育经历
    value.educationList = this.data.educationList;
    for (let key in value) {
      if (value[key].length==0) {
        let tip = ''

        switch (key) {
          case 'thinkJob':
            tip = "请添加求值意向";
            break;
          case 'experienceList':
            tip = "请添加工作经历";
            break;
          case 'educationList':
            tip = "请添加教育经历";
            break;
        }
        wx.showToast({
          title: tip,
          icon: 'none'
        })
        return

      }
    }
    if (!this.data.checked) {
      wx.showToast({
        title: '请阅读免责声明',
        icon: 'none'
      })
      return
    }
    this.value = value;
    _fn.selfRelease(this)
    console.log(value)
  }
})