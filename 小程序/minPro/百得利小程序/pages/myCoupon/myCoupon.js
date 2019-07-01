// pages/myCoupon/myCoupon.js
import Tool from "../../libs/Tool.js";
let _fn=require("./fn.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMore:false,
    userCard:false,//是否使用优惠券
    couponList:[],
    showTip:true,
    types: 2,
    imgUrl: getApp().globalData.imgUrl,//获取图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.page = 1;
    this.pageSize = getApp().globalData.pageSize;
    this.morePage = false;
    this.status=0;//
    this.UserId = getApp().globalData.UserId;
    this.sta=false;
 
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
    if (!this.sta)
    {
      this.setData({
        couponList: [],
      })
      _fn.getCouponList(this)
    }
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.page = 1;
    this.pageSize = 6; 
    this.morePage = false;
    this.status = 0;//
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.page = 1;
    this.pageSize = 6;
    this.morePage = false;
    this.status = 0;//
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
  
  onReachBottom: function () {
   
  }, */
  scrolltolower(){
    if (!this.morePage) return
    this.page += 1;
    this.setData({
      showMore: true,
    })
    _fn.getCouponList(this)
  },
  /**
   * 用户点击右上角分享

  onShareAppMessage: function () {
  
  }   */
  /*****点击事件*******/
  checkMyCoupon(e){
    let bty = e.currentTarget.dataset.bt;
    let canClick = Tool.canClick(100)()
    if (!canClick) return 
    this.setData({
      couponList: []
    })
    this.page = 1;
    this.pageSize = 6;
    this.morePage = false;
    
    //没有使用优惠券
    if (bty =='no_use' )
    { 
      // this.setData({
      //   userCard: false,
      //   types: 2
      // })
      // this.status = 0;
      Fn.bind(this)(2, false, 0,'我的优惠券')

    }
    else
    {
      Fn.bind(this)(1, true, 1,'已核销的券')
      // this.setData({
      //   userCard: true,
      //   types: 1
      // })
      // this.status = 1;//
    }
    //内部方法
    function Fn(types, userCard, status,title){
      this.setData({
        userCard: userCard,
        types: types
      })
      this.status = status;
      let that=this;
      wx.setNavigationBarTitle({
        title,
        success(){
          _fn.getCouponList(that)
        }
      })
    
    }
    
  },
  //使用卡券
  toUserCard(e){
    let { cardid, code, id, couponid}=e.currentTarget.dataset;
    let param=[
      {
        cardId: cardid,
        code: code
      }
    ]
    //卡券详情
    // wx.navigateTo({
    //   url: `../couponDetail/couponDetail?id=${id}&src=mycoupon`,
    // })
    this.sta=false;
   // return 
    Tool.openCard(param).then(res=>{
      console.log(res)
     }).catch(err=>{

    })
  },
  //查看已核销
  checkUsed(e){
    let { id, status} = e.currentTarget.dataset;
    this.sta = status
    wx.navigateTo({
      url: `../couponDetail/couponDetail?id=${id}&src=mycoupon`,
    })

  }
})