// pages/index/index.js
let app=getApp();
let _util = require('../../utils/util.js');
let _fn=require('./fn.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"
import {User} from "../../model/user.js";
import { Location } from "../../libs/map/map.js";
import { PetInfo } from "../../model/petInfo.js";

Page({

  data: {
    polyline: [],
    longitude: "116.313972",
    latitude: "39.980014",
    markers: [],
    start: {
      address:'',
      sendMobile:''
    },
    end: {
      address: '',
      receiveMobile: ''
    },
    isFillInfo:false,
    isLogin: false,
    loginPanel: false,
    isPower:false,//获取地理位置授权
    includePoints:[],
    price:0,
    time:'',//取件时间
    agress:false,
    canLogin:true,
    isIphoneX:false,
    top:'top:906rpx',
    top2:'top:640rpx',
    ready:false,
    showGetCard:false,
    cardNum:0,
    priceFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.detail={}
    this.setData({
      isIphoneX: Tool.isIphoneX(),
      top: Tool.isIphoneX() ? 'top:1142rpx' :'top:906rpx',
      top2: Tool.isIphoneX() ? 'top:872rpx' : 'top:640rpx',
    })
    this.navFlag = false;//支付成功，弹出领取优惠券，点击后跳转详情
    this.oid='';
  
  },
  //取消绑定事件
  _offEvent(){
     User.login.Off(this.loginSuccess);
     User.isLocationPower.Off(this.isLocationPower);
     User.getLocalSucc.Off(this.getLocalSucc);
     User.setStart.Off(this.setStart);
    User.setEnd.Off(this.setEnd);
     User.isFillInfo.Off(this.isFillInfo);
    PetInfo.setPetEvent.Off(this.setPetEvent)
    // Index.bannerEvent.Off(this.setBaner);
    // Index.rangeEvent.Off(this.rangeEvent);
    // Index.recommendEvent.Off(this.recommendEvent)
    
  },
  _bindEvent(){
     //绑定登录事件
     User.login.On(this, this.loginSuccess);  
     User.isLocationPower.On(this, this.isLocationPower);
     //获取地理坐标成功
     User.getLocalSucc.On(this, this.getLocalSucc);
     User.setStart.On(this,this.setStart);
     User.setEnd.On(this, this.setEnd);
     User.isFillInfo.On(this,this.isFillInfo);
     PetInfo.setPetEvent.On(this,this.setPetEvent);
    
    
    // //设置banner
    // Index.bannerEvent.On(this,this.setBaner);
    // //获取推荐菜品
    // Index.recommendEvent.On(this,this.recommendEvent)
    // //菜品排行
    // Index.rangeEvent.On(this,this.rangeEvent);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // getApp().UserToLogin(res=>{
    //   console.log(res)
    // })
  },
  //是否授权
  isLocationPower(res){
    if (res == false) {
      this.setData({
        ready: true
      })
    }
    this.setData({
      isPower:res
    },()=>{
     
    })
  },
  //登录成功
  loginSuccess(res){
    if(res==false){
      this.setData({
        ready:true
      })
    }
  
    this.setData({
      isLogin: res,
      loginPanel:false
    })

  },
  //获取地理坐标成功后，跳转附近餐厅列表 createMarker
  getLocalSucc(res){
    Location.getCoder(res).then(result=>{
      //解析当前地址
      if (result.status==0)
      {
        let { result: { address } } = result;
        User.start.address = address;
        User.start.latitude = res.latitude;
        User.start.longitude = res.longitude;
        /*
         latitude: send_lat,
          longitude: send_lng
        */
        this.setData({
          ['start.address']: address,
          ['start.latitude']: res.latitude,
          ['start.longitude']: res.longitude
        })
      }
      
    }).catch(err=>{
      console.log(err)
    })
   
    this.setData({
      ...res
    })
    User.getNearPostPos(res, markers=>{
      if (!Array.isArray(markers) && markers==false)
      {
        this.setData({
          canLogin: false,
        })
        return
      }
     this.setData({
       markers: markers,
       includePoints:User.includsPoints
     })
      console.log(markers)
      
    })
    

    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._offEvent();
    this._bindEvent();
    if (User.token == '') {
      User.isPower()
    }

 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
    this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();
   // this._offEvent()
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

    let imageUrl=undefined;
    console.log(getApp().shareInfo)
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
    })
  },
  //设置回调
  onOpenSetting({detail}){
    let { authSetting }=detail;
    if (authSetting['scope.userLocation'])
    {
      User.getNearPost()
      this.setData({
        isPower: true
      }) 
    }

  },
  /**************************************************/ 
  //定位到当前位置
  onToCenter(){
    Location.moveCenter()
  
  },
  onMakePhone(){
    wx.makePhoneCall({
      phoneNumber: '4009100180',
    })
  },
  //直接注册
  onGetUserInfo2({ detail }){
    if (this.data.canLogin == false) {
      wx.showToast({
        title: '不在服务范围内',
        icon: 'none'
      })
      return;
    }
    if (detail.errMsg == 'getUserInfo:fail auth deny') return;
    this.detail = detail;
    //注册
    User.register2(this.detail,(res)=>{
      //新用户注册领取优惠券
      if (res.couponInfo){
        res.couponInfo.end_time = Tool.formatTime(new Date(res.couponInfo.end_time*1000), '-') 
        this.setData({
          showGetCard:true,
          couponInfo: res.couponInfo
        })
      }
    })
  },
  //手机注册
  onGetUserInfo({ detail }){
    if (this.data.canLogin==false)
    {
      wx.showToast({
        title: '不在服务范围内',
        icon:'none'
      })
      return;
    }
    if (detail.errMsg =='getUserInfo:fail auth deny') return ;
    this.detail=detail;
    User.userDetail=detail;
    this.setData({
      loginPanel:true
    })
  },
  onNoLogin(){
    this.setData({
      loginPanel: false
    })
  },
  // 选择地址
  onToAddInfo({ currentTarget: { dataset}}){
    let{ty}=dataset;
    wx.navigateTo({
      url: '../send/send?ty='+ty,
    })
    console.log(ty)
  },
  //个人中心
  onToMyCenter(){
    wx.navigateTo({
      url: '../myCenter/myCenter',
    })
  },
  //跳转登录
  onToLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  //宠物信息
  onToFillInfo(){
    wx.navigateTo({
      url: '../fillPetInfo/fillPetInfo',
    })
  },
  //设置发货地址
  setStart(res, resmarkers){
    console.log(resmarkers)
    this.setData({
      start: res,
      markers: resmarkers
    })

  },
  //设置收件地址
  setEnd(res, resmarkers){
    console.log(resmarkers)
    this.setData({
      end: res,
      markers: resmarkers
    })
  },
  //寄送信息是否填写已经完成路线
  isFillInfo(res, polyline,price){
    this.setData({
      isFillInfo:res,
      polyline: [],
      price:price ||0,
      priceFlag:0?false:true
    },()=>{
      this.setData({
        polyline: polyline,
      })
    })
    if(res)
    {
      User.getCardList((result) => {
        this.setData({
          cardNum: result.length
        })
      })
    }
   
  },
  //获取手机号码
  onGetphonenumber({ detail}){
    if (!detail.iv || detail.errMsg=='getPhoneNumber:fail user deny') return 
    let data = Object.assign(this.detail,{wxMobile:detail});
    User.register(data,()=>{
      
    })
    console.log(data)
  },
  //设置宠物信息
  setPetEvent(val){
    this.setData({
      time: val.expect_pick_at
    })
    console.log(val)
  },
  //同意条款
  onAgress(){
    if(this.data.agress)
    {
      this.setData({
        agress:false
      })
    }
    else
    {
      this.setData({
        agress: true
      })
    }
  },
  //免责声明
  onToDisclaimer(){
    wx.navigateTo({
      url: '../disclaimer/disclaimer',
    })
  },
  //获取优惠券
  getCard(){
  if (this.navFlag)
  {
    wx.showToast({
      title: '领取成功',
      mask: true
    })
    this.setData({
      showGetCard: false
    }, () => {
     setTimeout(()=>{
       inner.bind(this)(this.oid)
     },2000)
    })
   
   return 
  }
   this.setData({
     showGetCard: false
   },()=>{
     wx.showToast({
       title: '领取成功',
       mask:true
     })

   })
  },
  //提交订单信息
  onSubmit(){
    let { 
          address: startAddress,
          sendAddressDetail: send_address,
          sendMobile: send_mobile,
          sendName: send_name,
          latitude: send_lat,
          longitude: send_lng
      }=this.data.start;
    let {
          address:endAddress,
          receiveAddressDetail: receive_address,
          receiveMobile: receive_mobile,
          receiveName: receive_name,
          latitude: receive_lat,
          longitude: receive_lng
        }=this.data.end;
    let { 
      expect_pick_at,
        petName:pets_name,
        petNum:pets_number,
        petDis: pets_info,
        uploadImgs
        }=PetInfo.petInfo||{};

    if (this.data.start.sendMobile=='')
    {
      console.log(this.data.start)
      wx.showToast({
        title: '请补全寄件信息',
        icon:'none'
      })
      return
    }

    if (startAddress !== '' && endAddress !== '' && pets_info)
    {
      if (!this.data.agress) {
        wx.showToast({
          title: '请阅读免责声明',
          icon: 'none'
        })
        return
      }
      wx.showLoading({
        title: '正在提交...',
        mask:true
      })
      this.tempFilePaths = uploadImgs;
      let subOrder={
        startAddress,
        endAddress,
        send_address,
        send_mobile,
        send_name,
        send_lat,
        send_lng,
        receive_address,
        receive_mobile,
        receive_name,
        receive_lat,
        receive_lng,
        expect_pick_at: expect_pick_at,
        pets_name,
        pets_number,
        pets_info,
        imgs: uploadImgs,
        distance: User.distance,
        coupon_id: User.coupon_id
      } 
     
      this.callBack=(res)=>{
        subOrder.imgs=res;
        console.log(subOrder);
        
        //调起微信支付
        getApp().WXpay(subOrder, (res,oid) => {
          wx.hideLoading()
          this.oid=oid;
          //测试
          if (res || res == 'mf') {
            User.sendCard((result)=>{
              console.log(result)
              if (result.couponInfo){
                result.couponInfo.end_time = Tool.formatTime(new Date(result.couponInfo.end_time * 1000), '-') 
                this.setData({
                  showGetCard: true,
                  couponInfo: result.couponInfo
                })
                this.navFlag=true

              }
              else
              {

                inner.bind(this)(oid)
             
              }
            })
          }
         
          else
          {
            wx.showToast({
              title: '下单失败，请重新下单',
              icon:'none'
            })
          }
        })

       
      }
      
      getApp().uploadImgs(this)() 
    }
    else 
    {
      wx.showToast({
        title: '请填写宠物信息',
        icon: 'none'
      })
      
    }
  },
  //跳转优惠券列表
  onNavTo(){
    wx.navigateTo({
      url: '../cardList/cardList',
    })
  }

})
function inner(oid) {
  wx.navigateTo({
    url: '../orderDetail/orderDetail?oid=' + oid,
    success: () => {
      User.inintPrice = 0;//不打折价格
      User.coupon_id = '';//优惠券id
      this.oid='';
      this.navFlag=false;
      User.start = {
        address: '',
        sendMobile: ''
      }

      User.end = {
        address: '',
        receiveMobile: ''
      }
      PetInfo.petInfo = null;
      let markers = this.data.markers;
      // let indexs=[];
      // markers.forEach((item,index)=>{
      //   if (!item.ty)
      //   {
      //     indexs.push(item);
      //   }
      // })
      // console.log(indexs)  
      markers = markers.filter(item => {
        return !item.ty
      })
      User.markers = markers;
      User.distance = 0;
      this.setData({
        cardNum: 0
      })

      this.setData({
        polyline: [],
        longitude: "116.313972",
        latitude: "39.980014",
        markers: markers,
        start: {
          address: '',
          sendMobile: ''
        },
        end: {
          address: '',
          receiveMobile: ''
        },
        isFillInfo: false,

        loginPanel: false,

        includePoints: [],
        price: 0,
        time: ''//取件时间

      })
    }
  })
}