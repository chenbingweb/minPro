// pages/foodDetail/foodDetail.js this.restaurantInfo.name
import { FoodDetail } from "../../model/foodDetail.js";
import { RestaurantDetail } from "../../model/restaurantDetail.js";
import { User } from "../../model/user.js";
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],//banner
    title:'',
    baseSet: {
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#000000',//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
      vertical: false//滑动方向是否为纵向
    },
    foodDetail:{},
    love:false,
    hate:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { fid, quantity}=options;
    this.quantity = quantity;
    this.fid=fid;
    FoodDetail.getResDetail(fid)
    this._offEvent();
    this._bindEvent();
  },
  //取消绑定事件
  _offEvent() {
    FoodDetail.foodDetailEvent.Off(this.foodDetailEvent);
    User.cartInfo.Off(this.cartInfo);

  },
  _bindEvent() {
    //绑定登录事件
    FoodDetail.foodDetailEvent.On(this, this.foodDetailEvent);
    User.cartInfo.On(this,this.cartInfo);
  },
  foodDetailEvent(res){
   WxParse.wxParse('article', 'html', FoodDetail.foodDetail.details, this, 5);
   this.setData({
     love: res.love,
     hate: res.hate,
     title: RestaurantDetail.restaurantInfo.name||'',
     foodDetail: FoodDetail.foodDetail,
    // quantity: this.quantity 
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //更新购物车世界
  cartInfo(){
    this.setData({
      quantity: 0
    })
    if (User.cartList.length)
    {
      //设置数量
      User.cartList.forEach(item => {
        if (item.activity_id)
        {
          if (item.food_id == this.fid) {
            this.setData({
              quantity2: item.quantity
            })
          }
        }
        else
        {
          if (item.food_id == this.fid) {
            this.setData({
              quantity: item.quantity
            })
          }
        }
       
       
      })
    }
    else
    {
     
    }
    
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
    RestaurantDetail.getResDetailInfo();
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
  //点赞
  onThumb({currentTarget}){
    let { status, thumbs, ty, voteid }=currentTarget.dataset;

    console.log(status, thumbs, ty, voteid)
    //取消点赞
    if (voteid && this.data.foodDetail.vote_type && status)
    {
      FoodDetail.cancelThumbs(thumbs, voteid)
    }
    else
    {
     
    }
    FoodDetail.doThumbs(thumbs, ty)
  }
})