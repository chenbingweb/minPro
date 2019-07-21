// pages/index/index.js
import { User } from "../../model/user.js";
import { Location } from "../../model/map.js";
import { getNearList } from "./fn.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "116.313972",
    latitude: "39.980014",
    markers: [],
    includePoints:[],
    top: 600,
    isSign:false,
    loginPhone:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isPos=false;
    this.currentPos={}
    User.UserToLogin(res=>{
      this.setData({
        isSign: User.isSign
      })
    })
    //用户定位
    User.getPos(({ longitude, latitude})=>{
      wx.showLoading({
        title: '定位中...',
        mask:true
      })
      this.setData({
        markers: [],
        includePoints: [],
      })
      getNearList({ longitude, latitude },this)
      this.setData({
        longitude,
        latitude
      })

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
  //注册
  onGetUserInfo({detail}){
    if (detail.errMsg == 'getPhoneNumber:fail user deny') return 
    if(User.isSign==false)
    {
      detail.phone_iv = this.phoneInfor.iv;
      detail.phone_encryptedData = this.phoneInfor.encryptedData;
    }
  
    User.register(detail,()=>{
      User.scanningCode()
      // wx.scanCode({
      //   success:res=>{
      //     let { result } =res;
      //     console.log(res)
      //     if(User.isVip)
      //     {
      //       //余额不足，去充值
      //       if (User.balance==0)
      //       {
      //         wx.showModal({
      //           title: '温馨提示',
      //           content: '您的余额不足，请充值',
      //           showCancel:false,
      //           success:res=>{
      //             if(res.confirm)
      //             {
      //               wx.navigateTo({
      //                 url: '../doRecharge/doRecharge?cid=3',
      //               })
      //             }
      //           }
      //         })
              
      //       }
      //       else
      //       {
      //         User.doCharge(3, ()=>{
      //           wx.navigateTo({
      //             url: '../recharge/recharge?cid=3',
      //           })
      //         })
              
      //       }
            
      //     }
      //     else
      //     {
      //       wx.navigateTo({
      //         url: '../recharge/recharge?cid=3',
      //       })
      //     }
          
      //   }
      // })
    })
  },
  //手机号注册
  onSign({detail}){

    if (detail.errMsg == 'getUserInfo:fail auth deny') return 
    this.phoneInfor=detail;
    this.setData({
      loginPhone:true
    })
    wx.showToast({
      title:'手机号验证成功',
      mask:true
    })
    console.log(detail)
  },
  //移动到中心
  onMoveCenter(){
    Location.moveCenter()
  },
  //视野发生变化
  onRegionchange({ type}){
    if (!Location.getCenterLocation || !this.isPos) return
    if (type=='end')
    {
     // this.isPos = false
      try
      {
        Location.getCenterLocation()({
          success: res => {
          
            if (JSON.stringify(res) !== JSON.stringify(this.currentPos))
            {
              console.log(res)
             
              getNearList(res,this)
            }
            console.log(JSON.stringify(res) !== JSON.stringify(this.currentPos))
            this.currentPos=res;
            
           
      
          }
        })
      }catch(err){
        
      }
      
    }
    else
    {
      //this.isPos = false
    }

    
  },
  //点击marker
  onMarkertap({ markerId}){
    console.log(markerId)
    console.log(this.data.includePoints[markerId])
    this.setData({
      top:0,
      shopInfo: this.data.includePoints[markerId]
    })
  },
  //关闭店铺信息
  onTab(){
    this.setData({
      top:600
    })
  },
  //跳转到附近网点
  onNavTo(){
    if (this.data.markers.length == 0) return
    wx.navigateTo({
      url: '../nearShop/nearShop',
    })
  },
  //确认搜索
  onConfirm({detail}){
    let { value } = detail;
    wx.navigateTo({
      url: '../search/search?content='+value,
    })
  },
  //跳转到店铺详情
  onNavToShop({currentTarget:{dataset:{sid}}}){
    wx.navigateTo({
      url: '../shopDetail/shopDetail?sid='+sid,
    })
  },
  //跳转个人中心
  onNavToCenter(){
    wx.navigateTo({
      url: '../myCenter/myCenter',
    })
  },
  onHelp(){
    wx.navigateTo({
      url: '../help/help',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})