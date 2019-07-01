// pages/restaurantDetail/restaurantDetail.js
import { User } from "../../model/user.js";
import { Index } from "../../model/index.js";
import { RestaurantDetail } from "../../model/restaurantDetail.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restaurantInfo:{},
    foodList:[],
    rgb:'255,255,255'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Index._getPageInfo(false);

    this._offEvent();
    this._bindEvent()
    //获取餐厅详情
  //  RestaurantDetail.getResDetailInfo();
   // let {rid}=options;
    //console.log(rid)
  },
  //取消绑定事件
  _offEvent() {
    RestaurantDetail.resDetailEvent.Off(this.resDetailEvent);
   

  },
  _bindEvent() {
    //绑定登录事件
    RestaurantDetail.resDetailEvent.On(this, this.resDetailEvent);
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取餐厅详情
  resDetailEvent(){
    console.log(RestaurantDetail.foodList)
    this.setData({
      
      foodList: RestaurantDetail.foodList,
      restaurantInfo: RestaurantDetail.restaurantInfo
    })
    const query = wx.createSelectorQuery()
    query.selectAll('.h_1').boundingClientRect()
    query.exec(res=>{
      //console.log(res)
      if(res[0].length==0) return
      let w_1=res[0][0].width;
      let h_1 = res[0][0].height;
      let w_2 = res[0][1].width;
      
      let h_2 = res[0][1].height;
    //  let {w_1:width,h_1:height}=res[0];
      let { top, left } = res[0][1];
      // console.log(w_1, h_1, w_2, h_2, top, left)
      this.drawImgs(w_1, h_1, w_2, h_2, top, left);
      //change_btn
      
    })
  },
  drawImgs(w, h, w1, h2, top, left){
    console.log(w,h)
    const ctx = wx.createCanvasContext('firstCanvas');
    //console.log(ctx)
    wx.getImageInfo({
      src: RestaurantDetail.restaurantInfo.logo_url,
      success: res => {
        let { height, width, path } = res;
        this.setData({
          cw: 750,
          ch: (height / width) * 750
        })
        ctx.drawImage(path, 0, 0,w,h)
        ctx.draw();
        setTimeout(() => { this.imgData(w1, h2, top, left)},1000)
       
      }
    })
  },
  imgData(w,h,x,y){
    let that=this;
    // console.log(x, y, w, h)
    wx.canvasGetImageData({
      canvasId: 'firstCanvas',
      x: x,
      y: y,
      width:w,
      height:h,
      success(res) {
        var r=0;
        var g=0;
        var b=0;
        var n=0;
       // console.log(res.data)
        for(let i=0;i<res.data.length;i+=4){
          n++;
          r+=res.data[i];
          g += res.data[i+1];
          b += res.data[i+2];
        }
        that.setData({
          rgb:` ${255-parseInt(r / n) },${255-parseInt(g / n )},${255-parseInt(b / n)}`
        })

  
      }
    })
  },
  onSelect({currentTarget}){
    let { category } = currentTarget.dataset;
    RestaurantDetail.getFood(category)
    
    console.log(category)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    RestaurantDetail.getResDetailInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  //  this._offEvent()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
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

  },
  onChangeShop(){
    wx.navigateTo({
      url: '../restaurant/restaurant?src=change',
    })
  }
})