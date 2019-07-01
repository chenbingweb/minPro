// pages/bossList/bossList.js
let _interface = require("../../utils/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    areaList: [{
      name: '区域',
      id: ''
    }],
    dataObj: {},
    regionIndex: 0,
    selfList:[],
    imgUrl:getApp().globalData.imgUrl,
    jobShows:false,
    valueArr:[0,0,0],
    jobName: '类型',
    shows:false,
    selectPay:{},
    sort: 'desc',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let areaList = this.data.areaList;
    areaList.push(...getApp().globalData.areaList);
    this.setData({
      areaList,
      dataObj: {
        url: _interface.getSelfList,
        outData: {
          sort:'desc',
          area: '',
          category: '',
          pay_start: '',
          pay_end: '',
          key: options.keys ? options.keys : ''
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
    console.log(this.data.areaList[value].id);
    this.setData({
      selfList: []
    })

    this.setData({
      regionIndex: value,
      ['dataObj.outData.area']: this.data.areaList[value].id
    })
  },
  pageData({detail}){
    let selfList = this.data.selfList;
    let reg = /^[a-zA-z]+:/;
    let imgUrl = getApp().globalData.imgUrl;
    detail.forEach(item => {
      console.log(item.head_img)
      item.head_img = reg.test(item.head_img) ? item.head_img : (imgUrl + item.head_img)
    })
    selfList.push(...detail)
    this.setData({
      selfList: selfList
    })
    console.log(detail)
  },
  //职位类型
  selectJob({detail}){
    let { name } = detail.selectJob;
    let { valueArr } = detail;
    this.valueArr = valueArr
    console.log(valueArr)
    if (name == '类型') {
      name = "类型"
    }
    this.setData({
      valueArr: valueArr,
      selfList: [],
      jobName: name,
      ['dataObj.outData.category']: name =='类型'?'':name
    })

  },
  jobStyleEvent(){
    this.setData({
      jobShows: true
    })
  },
  //选择薪资
  selectPayEvent({ detail }) {

    this.setData({
      selfList: [],
      selectPay: detail.selectPay,
      ['dataObj.outData.pay_start']: detail.selectPay.pay_start,
      ['dataObj.outData.pay_end']: detail.selectPay.pay_end
    })
  },
  //打开薪资
  showPayList() {
    this.setData({
      shows: true
    })
  },
  //关键词搜索
  confirmEvent({ detail }) {
    console.log('ss')
    let { value } = detail;
    this.setData({
      selfList: [],
      ['dataObj.outData.key']: value

    })
  },
  sortEvent(){
    if (this.data.sort=='asc')
    {
      this.setData({
        selfList:[],
        sort:'desc',
        ['dataObj.outData.sort']: 'desc'
      })
    }
    else
    {
      this.setData({
        selfList: [],
        sort: 'asc',
        ['dataObj.outData.sort']: 'asc'
      })
    }
  }
})