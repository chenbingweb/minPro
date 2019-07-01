// pages/houseMidd/houseMidd.js
let _interface = require('../../utils/interface.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObjMidd:{},
    src:'midd',
    middList:[],//中介房源,
    selectBtn:'',//
    imgUrl: getApp().globalData.imgUrl,
    areaList:[],
    doorList:[],
    showFilterBox:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      areaList: getApp().globalData.areaList,
      doorList: getApp().globalData.houseTypeList
    })
    //midd person
    this.src=options.src;
    //来自房产中介
    if(this.src=='midd')
    {
      wx.setNavigationBarTitle({
        title: '房产中介',
      })
      this.setData({
        src: 'midd',
        dataObjMidd: {
          url: _interface.getHouseList,
          outData: {
            'type':'company ',
            category: '',//lease
            sort:'',
            key: options.keys ? options.keys:'',
            area: "",
            door: ""
          }
        }
      })
    }
    //来自个人房源
    else if(this.src=='person')
    {
      wx.setNavigationBarTitle({
        title: '个人房源',
      })
      this.setData({
        src: 'person',
        dataObjMidd: {
          url: _interface.getHouseList,
          outData: {
            'type': 'person',
            category: '',//'sell','lease'
            sort: '',
            key: options.keys ? options.keys : '',
            area: "",
            door: ""
          }
        }
      })
    }
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
  //获取中介发布列表
  pageDataMidd({detail}){
    wx.hideLoading()
    let houseList = this.data.middList;
    houseList.push(...detail);
    houseList.forEach(item=>{
      this.data.areaList.forEach(child => {
        if (parseInt(item.area) == parseInt(child.id)) {
          item.area = child.name
        }
      })
    })
  
    this.setData({
      middList: houseList
    })
  },
  //跳转
  toDetal({currentTarget}){
    
    let { src, type, bid } = currentTarget.dataset;
    console.log(src, type)
    //src 租房（rent）、售房sell
    //type 中介(midd)  个人(person)
    wx.navigateTo({
      url: `../sellHouseDetail/sellHouseDetail?type=${type}&src=${src}&bid=${bid}`,
    })

  },
  //选择 租房 售房
  selectBtn({currentTarget}){
    wx.showLoading({
      title: '加载中...',
    })
    let { btn } = currentTarget.dataset;
    this.setData({
      selectBtn: btn
    })

    this.setData({
      middList: []
    })
    this.setData({
      ['dataObjMidd.outData.category']: btn
    })
  },
  //区域选择
  radioChange({detail}){
    console.log(detail)
  },
  //筛选
  filterEvent({detail}){
    let { value } = detail
    this.setData({
      middList: []
    })
    this.setData({

      ['dataObjMidd.outData.area']: value.area,
      ['dataObjMidd.outData.door']: value.door
    })
    console.log(value)
  },
  //重置
  resetEvent({ detail}){
    let { value } = detail;
    this.setData({
      middList: []
    })
    this.setData({

      ['dataObjMidd.outData.area']: value.area,
      ['dataObjMidd.outData.door']: value.door
    })
    console.log(value)
  },
  showFilter(){
    this.setData({
      showFilterBox:true
    })
  }
})