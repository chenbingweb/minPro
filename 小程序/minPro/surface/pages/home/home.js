// pages/home/home.js
var app = getApp();
//引入fn
var _fn=require('fn.js');
var _util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:null,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular:true,
    scrollwidth:0,
    indicatorColor:'rgba(0, 0, 0, .4)',
    indicatorActiveColor:'#fff',
    hotgifts:null,//热门
    recommend:null,//推荐
    tabbar: null,//导航
    showPages:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.uid = app.globalData.uid;
    //设置导航条
    this.setData({
      tabbar: app.globalData.tabbar,
      imgUrl: app.globalData.imgUrl
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
    var status=app.globalData.status;//是否申请经销员
    var power =app.globalData.power;//用户权限

    _util.getUserPowerNew('scope.userInfo', true, () => {

      app.getUserInfo(null, (res) => {
        wx.showLoading({
          title: '正在登录...',
        })
        //获取用户id
        this.uid = res.userId;
        //获取首页相关信息
        _fn.getIndexInfo(this.uid, this);
        if (res.type == 0) {//普通用户
          _util.upDateNav(0, app.globalData.tab_b, app)
          //app.globalData.tabbar = app.globalData.tab_b;
        }
        console.log(res.status)
        if (res.status == 1) {

          _util.upDateNav(0, app.globalData.tab_a, app)
          // app.globalData.tabbar = app.globalData.tab_a;
        }
        this.setData({
          tabbar: app.globalData.tabbar
        })
      });
    }, () => {
      _fn.getIndexInfo(this.uid, this);
    })

  
    _util.upDateNav(0, app.globalData.tabbar, app)
    this.setData({
      tabbar: app.globalData.tabbar
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
   
  onPullDownRefresh: function () {
  
  },*/

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
  //跳转到每日签到页面或如何赚取积分页面
  toNavPage:function(e){
    var url = e.currentTarget.dataset.url;
    if (this.uid=='')
    {
      return 
    }
    wx.navigateTo({
      url: url
    })
  },
  //跳转至全部礼品
  toAllGifts:function(){
    app.selectTabbar(this.data.tabbar, '1');
  },
  //跳转到详细
  navGiftDetail:function(e){
    //获取礼品id
    var gid=e.currentTarget.id;
    //跳转礼品详情
    wx.navigateTo({
      url: `../giftDetail/giftDetail?id=${gid}`,
    })
  },
  //提示框
  alert:function(){
    wx.showModal({
      title: '',
      content: '近期上线，敬请期待',
      showCancel:false
    })
  },
  //导航选择
  selectBar: function (e) {
    app.selectTabbar(this.data.tabbar, e.currentTarget.id);
    this.setData({
      tabbar:this.data.tabbar
    })
  }
})