// pages/index/index.js
let app=getApp();
let _util = require('../../utils/util.js');
let _fn=require('./fn.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsData:false,//轮播图
    companyMember:false,//门店会员卡
    neareShopList:false,
    baseSet:{
      indicatorColor: 'rgba(255, 255,255, 0.5)',//指示点颜色
      indicatorActiveColor: 'white',//当前选中的指示点颜色
    },
    
    showIndex:false,//显示首页
    
    navBar: app.globalData.navBar,
    index:0,
    note: { showImg: true, text: '加载中...' },
    indexInfo:null,
    values:[0,0],
    cityName:'北京',
    showPicker:true,
    swiperList:true,
    showLoading:true,//第一次加载时不显示 加载更多
    imgUrl: app.globalData.imgUrl,//获取图片地址
    login:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.updateNav(0)
    //获取首页信息 
    _fn.getIndexInfo(this);
    //获取附近店铺
    _fn.getNearShop(this);
    this.setData({
      login: getApp().globalData.UserId == undefined ? false : true
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
    // _util.upDateNav(0, app.globalData.navBar, app);

    // this.setData({
    //   navBar: app.globalData.navBar
    // });
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading()
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
  //  return {
  //     title: '自定义转发标题',
  //     path: "pages/find/find",
  //     success: function(res) {
  //       // 转发成功
  //     },
  //     fail: function(res) {
  //       // 转发失败
  //     }
  //   }
  }, 
  //跳转文章详情
  toDetail(e) {
    let aid = e.detail.dataset.detail;
    if(!aid) return 
    wx.showLoading({
      title: '加载中...',
    })
    //获取文章详情id
    app.UserLogin(() => {
      wx.hideLoading()
      _fn.toArticle(aid)
    })

  },
  //手动获取附近店铺
  getNearShop(){
    _fn.clickGetNearShop(this)
  },
  //品牌会员
  toMember(e){
    //获取品牌id，和会员开id
    let { outstr, encryptcardid, cardbiz} = e.currentTarget.dataset
    console.log(e.currentTarget.dataset)
    wx.showLoading({
      title: '加载中...',
    })
    if (!getApp().globalData.UserId)
    {
      app.UserLogin(() => {
        wx.hideLoading()
        _fn.toMemberCard(e.currentTarget.dataset)
        this.setData({
          login: getApp().globalData.UserId==undefined?false:true
        })

      })
    }
    else
    {
      _fn.toMemberCard(e.currentTarget.dataset)
    }

    
  },
  //查看附近店铺
  toShopingDetail(e){
    wx.showLoading({
      title: '加载中...',
    })
    let { id } = e.currentTarget.dataset
    if (!getApp().globalData.UserId) {
      app.UserLogin(() => {
        wx.hideLoading()
       // _fn.shopeDetail(e.currentTarget.dataset)
        wx.navigateTo({
          url: `../shopDetail/shopDetail?id=${id}`,
        })
      })
    }
    else
    {
     // _fn.shopeDetail(e.currentTarget.dataset)
      wx.navigateTo({
        url: `../shopDetail/shopDetail?id=${id}`,
      })
    }
    
  },
  //领取优惠券
  toBuyCoupon(e){
    let canClick = Tool.canClick(100)()
    if (!canClick) return 
    let { company, id, canbuy } = e.currentTarget.dataset;
    
    wx.showLoading({
      title: '跳转中..',
    })
    if (!getApp().globalData.UserId) {
      app.UserLogin(() => {
        wx.hideLoading()

        wx.navigateTo({
          url: `../couponDetail/couponDetail?id=${id}`,
        })
        return 
        // _fn.toMemberCard(e.currentTarget.dataset)
        if (canbuy)//付费优惠券
        {
          //app.WXpay(e.currentTarget.dataset.id)
          wx.navigateTo({
            url: `../couponDetail/couponDetail?id=${id}`,
          })
        }
        else//免费优惠券
        {
         
          app.AddCoupon(id)
        }
        
        
      })
    }
    else {
      wx.hideLoading()
      wx.navigateTo({
        url: `../couponDetail/couponDetail?id=${id}`,
      })
      return 
      if (canbuy) {//付费优惠券
        wx.navigateTo({
          url: `../couponDetail/couponDetail?id=${id}`,
        })
        //app.WXpay(e.currentTarget.dataset.id)
      }
      else {//免费优惠券
       
        app.AddCoupon(id)
      }
    }

  },
  //跳转全部
  toAllShop(e){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let url = e.currentTarget.dataset.url;
    if (!getApp().globalData.UserId) {
      Fn()
    }
    else {
      Fn()
      //_fn.shopeDetail(e.currentTarget.dataset)
    }
     function Fn(){
       app.UserLogin(() => {
         wx.hideLoading()
         _fn.getCityList(() => {
           wx.navigateTo({
             url: url,
             success(){
               wx.hideLoading()
             }
           })
         })
        

       })
     }

  }
})