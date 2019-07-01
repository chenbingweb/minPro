// pages/releaseHistory/releaseHistory.js
let _interface=require("../../utils/interface.js");
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTop:'fb',
    childBtn:'company',
    dataObj:{},
    middPerList:[],
    imgUrl: getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.xjType = 'house'// boss招聘 self 自荐 house 房源
    this.setData({
      dataObj: {
        url: _interface.getHistoryReleaseHouse,
        outData: {
          userId:getApp().globalData.userId,
          "type":'company',
          src:'fb'
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
  selectTopBtn({currentTarget}){
    let { t } = currentTarget.dataset;
    console.log(t)
    this.setData({
      middPerList: [],
      selectTop:t,
      childBtn: 'company',
      ['dataObj.url']: _interface.getHistoryReleaseHouse,
      ['dataObj.outData.src']:t,
      ['dataObj.outData.type']: 'company',
    })

  },
  childSelectBtn({ currentTarget }){
    let { child } = currentTarget.dataset;
    console.log(child)
    this.setData({
      childBtn: child,
      middPerList:[]
    })
    //房源
    if (child == 'person' || child =='company')
    {
      this.xjType = 'house'// boss招聘 self 自荐 house 房源
      this.setData({
        dataObj: {
          url: _interface.getHistoryReleaseHouse,
          outData: {
            userId: getApp().globalData.userId,
            "type": child,
            src: this.data.selectTop
          }
        }
      })

    }
    else//
    {
      this.xjType = child;
      this.setData({
        dataObj: {
          url: _interface.getHistoryReleaseBoss,
          outData: {
            userId: getApp().globalData.userId,
            "type": child,
            src: this.data.selectTop
          }
        }
      })
    }

  },
  pageData({detail}){
    //中介 个人 发布历史列表
    if (this.data.childBtn == 'conpany' || this.data.childBtn=='person')
    {
      let middPerList = this.data.middPerList;
      middPerList.push(...detail)
      this.setData({
        middPerList
      })
      console.log(detail)
    }
    else//boss 毛遂自荐 发布历史列表
    {
      let middPerList = this.data.middPerList;
      middPerList.push(...detail)
      this.setData({
        middPerList
      })
    }
    
  },
  //跳转详情
  navToDetail({ currentTarget }){
    let { did, src, category } = currentTarget.dataset;
    let url=''
    if (src == 'company' || src =='person')
    {
      var t ='midd'
      if (src == 'company')
      {
        t ='midd'
      }
      else
      {
        t = 'person'
      }
      wx.navigateTo({
        url: `../sellHouseDetail/sellHouseDetail?type=${t}&src=${category}&bid=${did}`,
      })
      console.log(`../sellHouseDetail/sellHouseDetail?type=${t}&src=${category}&bid=${did}`)
    }
    else if(src=='')
    {

    }

   

  },
  //跳转毛遂自荐 boss招聘详情
  navToDetailNoImg({ currentTarget}){
    let { id, src } = currentTarget.dataset;
    console.log(id,src)
    if(src=='self')
    {
      wx.navigateTo({
        url: `../workDetail/workDetail?sid=${id}`,
      })
    }
    else
    {
      wx.navigateTo({
        url: `../jobDetail/jobDetail?id=${id}`,
      })
    }

  },
  //下架
  XJEvent({ currentTarget }) { 
    let { did } = currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确认下架?',
      success:res=>{
        if(res.confirm)
        {
          this.type='xj';
          this.did=did;
          _fn.DoSJXJ(this)
        }
      }
    })
    console.log(did)
  },
  //上架
  SJEvent({ currentTarget }){
    let { did } = currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确认上架?',
      success: res => {
        if (res.confirm) {
          this.type = 'sj';
          this.did = did;
          _fn.DoSJXJ(this)
        }
      }
    })
    console.log(did)
  }
})