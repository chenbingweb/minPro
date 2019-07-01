// pages/bossList/bossList.js
let _fn=require("./fn.js")
let _interface = require('../../utils/interface.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionIndex:0,
    filterList:{},//赛选类别
    lopan:'',
    amount:'',
    houseType:'',
    dataObj:{},
    buildList:[],
    areaList: [{
      name: '区域',
      id: ''
    }],
    imgUrl:getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   * area：’区域’，
		 name:”楼盘’
		amount:’均价’，
		selling_door:’户型’
		key:’搜索关键字’，

   */
  onLoad: function (options) {
    _fn.getBuildFilterList(this);
    let areaList = this.data.areaList;
    areaList.push(...getApp().globalData.areaList)
    this.setData({
      areaList: areaList,
      dataObj: {
        url: _interface.getBuildList,
        outData: {
            area:'',
            name:'',
            amount:'',
            selling_door:'',
            key: options.keys ? options.keys:''
         }
      }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //城市选择
  bindRegionChange({ detail }) {
    let { value } = detail;
    this.setData({
      regionIndex: value,
      buildList: [],
      ['dataObj.outData.area']: this.data.areaList[value].id
    })
  },
  //楼盘
  LopanChange({ detail,currentTarget}){
    let { value } = detail;
    let { filter } = currentTarget.dataset;

    this.setData({
      lopan: this.data.filterList[filter][value],
      buildList: [],
      ['dataObj.outData.name']: this.data.filterList[filter][value] == '全部' ? '' : this.data.filterList[filter][value]
    })
  },
  //均价
  amountChange({ detail, currentTarget }) {
    let { value } = detail;
    let { filter } = currentTarget.dataset;
    console.log(filter, value)
   // this.data.filterList[filter]
    this.setData({
      amount: this.data.filterList[filter][value],
      buildList: [],
      ['dataObj.outData.amount']: value// this.data.filterList[filter][value]
    })
  },
  //户型
  houseTypeChange({ detail, currentTarget }){
    let { value } = detail;
    let { filter } = currentTarget.dataset;
    console.log(filter)
    this.setData({
      houseType: this.data.filterList[filter][value].name,
      buildList: [],
      ['dataObj.outData.selling_door']: this.data.filterList[filter][value].id
    })
  },
  //楼盘列表
  pageData({detail}){
    let buildList = this.data.buildList;
    console.log(buildList)
    detail.forEach(item=>{
      item.tag = item.tag.join(' | ')
    })
    buildList.push(...detail);
    this.setData({
      buildList:[]
    })
    this.setData({
      buildList
    })
    console.log(detail)
  },
  //确认搜索
  confirmEvent({detail}){
    let { value } = detail;
    console.log(value)
    this.setData({
      buildList: [],
      ['dataObj.outData.key']: value
    })
  }
})