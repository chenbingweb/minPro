// pages/bossList/bossList.js
let _interface=require("../../utils/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    areaList: [{
      name: '区域',
      id: ''
    }],
    valueArr:[0,0,0],
    regionIndex:0,
    dataObj: {},
    bossList:[],
    shows: false,
    selectPay:{},
    jobShows:false,
    jobName:'类型',
    sort: 'desc',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let areaList = this.data.areaList;
    areaList.push(...getApp().globalData.areaList);
    this.valueArr=[0,0,0]
    console.log(_interface)
    this.setData({
      areaList,
      dataObj: {
        url: _interface.getBossList,
        outData: {
          sort: 'desc',
          area:'',
          category:'',
          pay_start:'',
          pay_end:'',
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
  bindRegionChange({ detail}){
    let { value } = detail;
    console.log(this.data.areaList[value].id);
    this.setData({
      bossList:[]
    })

    this.setData({
      regionIndex: value,
      ['dataObj.outData.area']: this.data.areaList[value].id
    })
  },
  //获取页面数据
  pageData({detail}){
    let bossList = this.data.bossList;
    bossList.push(...detail)
    this.setData({
      bossList
    })

    console.log(detail)
  },
  //打开薪资
  showPayList(){
    this.setData({
      shows:true
    })
  },
  //选择薪资
  selectPayEvent({ detail }){
    /*
     pay_start:'',
          pay_end:'',
    */ 
   this.setData({
     bossList: [],
     selectPay: detail.selectPay,
     ['dataObj.outData.pay_start']: detail.selectPay.pay_start,
     ['dataObj.outData.pay_end']: detail.selectPay.pay_end
   })
  },
  //关键词搜索
  confirmEvent({detail}){
    let {value}=detail;
    this.setData({
      bossList: [],
      ['dataObj.outData.key']:value
    
    })
  },
  //职位类型
  jobStyleEvent(){
    this.setData({
      jobShows:true,
      valueArr: this.valueArr
    })
  },
  selectJob({ detail }){
    let { name } = detail.selectJob;
    let { valueArr } = detail;
    this.valueArr = valueArr
    this.setData({
      jobName:name
    })
    if(name=='类型')
    {
     name=""
    }
    this.setData({
      bossList: [],
      ['dataObj.outData.category']: name

    })
    console.log(detail)
  },
  sortEvent() {
    if (this.data.sort == 'asc') {
      this.setData({
        bossList: [],
        sort: 'desc',
        ['dataObj.outData.sort']: 'desc'
      })
    }
    else {
      this.setData({
        bossList: [],
        sort: 'asc',
        ['dataObj.outData.sort']: 'asc'
      })
    }
  }
  
})