// pages/inforRelease/inforRelease.js
let _fn=require("./fn.js");
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
    regionIndex: 0,
    infoList:[],
    iList:[],
    infoIndex:0,
    dataObj:{},
    imgUrl:getApp().globalData.imgUrl,
    sort: 'desc',
    filterList:[
      {
        name:'筛选',
        sort: 0,

      },
      {
        name:'3天',
        sort:3
      },
      {
        name: '7天',
        sort: 7
      },
      {
        name: '15天',
        sort: 15
      },
      {
        name: '30天',
        sort: 30
      }
    ],
    filterIndex:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let areaList = this.data.areaList;
    this.idInfo=''
    if(options.id)
    {
      this.idInfo = options.id
    }
    areaList.push(...getApp().globalData.areaList);
    this.setData({
      areaList,
      dataObj: {
        url: _interface.getInfoList,
        outData: {
          sort: 0,
          area: '',
          category_id: this.idInfo,
          key: options.keys ? options.keys : ''
        }
      }
      })
    _fn.getInfoClass(this)
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
      iList: []
    })

    this.setData({
      regionIndex: value,
      ['dataObj.outData.area']: this.data.areaList[value].id
    })
  },
  //类别
  infoAllClass({ detail}){
    let { value } = detail;
    this.setData({
      infoIndex: value,
    })
    this.setData({
      iList: [],
      ['dataObj.outData.category_id']: this.data.infoList[value].id == -1 ? '' : this.data.infoList[value].id
    })
  },
  //资讯列表
  pageData({ detail}){
    let list = this.data.iList;
    list.push(...detail)
    this.setData({
      iList: list
    })
  },
  //获取资讯详情，缓存到本地
  getInfoDetail({currentTarget}){
    let {id}=currentTarget.dataset;
    console.log(id)
    this.data.iList.forEach(item=>{
      if(item.id==id)
      {
        wx.setStorage({
          key: 'infoDetai',
          data: item ,
        })
        return 
      }
    })
   
  },
  sortEvents({detail}){
    let {value}=detail;
    this.setData({
      filterIndex:value,
      iList: [],
      ['dataObj.outData.sort']: this.data.filterList[value].sort
    })
  
    console.log(value)
  },
  sortEvent() {
    if (this.data.sort == 'asc') {
      this.setData({
        iList: [],
        sort: 'desc',
        ['dataObj.outData.sort']: 'desc'
      })
    }
    else {
      this.setData({
        iList: [],
        sort: 'asc',
        ['dataObj.outData.sort']: 'asc'
      })
    }
  }
})