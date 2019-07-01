// pages/couponDetail/couponDetail.js
let _fn=require('./fn.js')
let app=getApp();
import Tool from "../../libs/Tool.js";
let _plate=require("./plateData.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBox:false,
    value:-1,
    plateList: _plate,
    detail:false,
    imgUrl: getApp().globalData.imgUrl,//获取图片地址
    showBoxFlag:false,
    plate:'',
    showLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.src = options.src
    this.Id = options.id;
    getApp().globalData.pay=false;
    this.setData({
      Id:this.Id
    })
    
    getApp().globalData.isOk=false;

    //设置车牌号
    this.callBack = function (res){
      console.log('车牌号', res)
      // this.setData({
      //   VehLicense: res
      // })
      if(res)
      {
        //车牌地方
        let types = res.slice(0, 1);
         let platenumber = res.slice(1)
        // _plate.forEach((item,index)=>{
        //   if (item.code == types)
        //   {
        //     this.setData({
        //       value: index,
        //       platenumber: platenumber
        //     })
        //   }
        // })
        this.setData({
          plate: types,
          platenumber: platenumber
        })
        console.log('车牌号',res)
      }
    }
    if (this.src == 'mycoupon') {
      _fn.getMyDetail(this)
      _fn.getUserInfo(this)
    }
    else {
      console.log(getApp().globalData.UserId)
      if (!getApp().globalData.UserId)
      {
        getApp().UserLogin((res) => {
          console.log(res)
          if(res=='err')
          {
            this.setData({
              showLogin:true
            })
          }
          else
          {
            _fn.getDetail(this);
            _fn.getUserInfo(this)
          }
         
        })
      }
      else
      {
        _fn.getDetail(this);
        _fn.getUserInfo(this)
      }
     
      
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

    console.log('show')
    // if (this.src == 'mycoupon') {
    //   _fn.getMyDetail(this)
    // }
    // else
    // {
    //   _fn.getDetail(this);
    // }
    
    if (getApp().globalData.isOk)
    {
      wx.navigateBack({
        delta:1
      })
      getApp().globalData.isOk=false
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide')
    if (this.data.detail.Price && getApp().globalData.pay) {
      getApp().globalData.isOk = true;
    }
    this.setData({
      showBox: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
    if (this.data.detail.Price) {
      getApp().globalData.isOk = true;
    }
    this.setData({
      showBox: false
    })
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
  
  onShareAppMessage: function () {
  
  } */
  toBuy(e){
    let { id, canbuy, plate } = e.currentTarget.dataset;
    //显示添加车牌号
    if (plate =='bdl')
    {
      this.setData({
        showBox: true
      })
      return 
    }
    this.cardId=id;
    this.canbuyCard = canbuy;
    if (canbuy)//付费优惠券
    {
      app.WXpay(e.currentTarget.dataset.id)
    }
    else//免费优惠券
    {

      app.AddCoupon(id)
    }
    if (!this.data.detail.Price || this.data.detail.PayInShop)
    {
      getApp().globalData.isOk = true;
    }
   
  },
  //去使用
  toUse(e){
    let { cardid, code } = e.currentTarget.dataset;
    let param = [
      {
        cardId: cardid,
        code: code
      }
    ]
    Tool.openCard(param).then(res => {
      console.log(res)
    }).catch(err => {

    })
  },
  //选择车牌
  selectPlate({detail}){
    let {value}=detail;
    this.setData({
        value
      })
    console.log(value)
  },
  //提交车牌
  formSubmit(e){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let {value}=e.detail;
    let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/u;

    let { plateType, platenumber } = value;
    let plateAll = plateType + platenumber.toUpperCase();
    if (plateAll=='')
    {
      wx.showToast({
        title: '请输入车牌号',
        icon: 'none'
      })
      return 
    }
    if (platenumber.length!=6)
    {
      wx.showToast({
        title: '请输入正确的车牌号',
        icon:'none'
      })
      return 
    }
    // if (!reg.test(plateAll))
    // {
    //   wx.showToast({
    //     title: '请输入正确的车牌号',
    //     icon:'none'
    //   })
    //   return 
    // }

    console.log(plateAll)
    let { id, canbuy } = e.currentTarget.dataset;

    if (canbuy)//付费优惠券
    {
      app.WXpay(e.currentTarget.dataset.id, plateAll)
    }
    else//免费优惠券
    {

      app.AddCoupon(id,'', plateAll)
    }
    if (!this.data.detail.Price || this.data.detail.PayInShop) {
      getApp().globalData.isOk = true;
    }
    
  },
  cancelBox(){
    this.setData({
      showBox:false
    })
  },
  showSelectBox(){
    this.setData({
      showBoxFlag:true
    })
  },
 
  selectOk({detail}){
    let { plate } = detail
    this.setData({
      plate
    })
  
  },
  //手动登录
  onGotUserInfo(){
    getApp().UserLogin((res) => {
      console.log(res)
      if (res == 'err') {
        wx.showToast({
          title: '登录失败',
          icon:'none'
        })
      }
      else {
        this.setData({
          showLogin: false
        })
        _fn.getDetail(this);
        _fn.getUserInfo(this)
      }

    })
  }
})