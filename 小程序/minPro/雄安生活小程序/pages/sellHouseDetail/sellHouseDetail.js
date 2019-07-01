// pages/sellHouseDetail/sellHouseDetail.js
let _fn=require("./fn.js")
let Arr = [
  {
    img: '../../images/tv.png',
    selected: false,
    id: '1',
    name: '电视'
  },
  {
    img: '../../images/bx.png',
    selected: false,
    id: '2',
    name: '冰箱'
  },
  {
    img: '../../images/xyj.png',
    selected: false,
    id: '3',
    name: '洗衣机'
  },
  {
    img: '../../images/bed.png',
    selected: false,
    id: '4',
    name: '床'
  },
  {
    img: '../../images/kt.png',
    selected: false,
    id: '5',
    name: '空调'
  },
  {
    img: '../../images/pc.png',
    selected: false,
    id: '6',
    name: '电脑'
  },
  {
    img: '../../images/yyj.png',
    selected: false,
    id: '7',
    name: '抽烟机'
  },
  {
    img: '../../images/shafa.png',
    selected: false,
    id: '8',
    name: '沙发'
  },
  {
    img: '../../images/wife.png',
    selected: false,
    id: '9',
    name: '无线'
  }

]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'rent',
    houseDetail:null,
    imgUrl: '',
    collectType:'middle',
    baseSet: {
      hiddDefinedDots: true,
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#000000',//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
      vertical: false//滑动方向是否为纵向
    },
    arrList: Arr
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //type=${type}&src=${src}&bid=${bid}
    this.setData({
      'type':options.type,
    })
      //src 租房（rent）、售房sell
    //type 中介(midd)  个人(person)
    /*
      build:楼盘
      middle：中介
      person：个人
      boss boss招聘
      self 毛遂自荐
    
    */
    this.src=options.src;
    if (this.src=='lease')
    {
      this.src ='rent'
    }
    this.setData({
      src: this.src,
      imgUrl:getApp().globalData.imgUrl,
      collectType: options.type == 'midd' ? 'middle' :'person'
    })
    this.type=options.type;
    this.bid=options.bid;//id
    _fn.getHouseDetail(this)
    console.log(options)
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
  
  }
})