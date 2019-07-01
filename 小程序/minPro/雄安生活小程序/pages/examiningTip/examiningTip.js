// pages/examiningTip/examiningTip.js
import Tool from "../../libs/Tool.js";
import _interface from "../../utils/interface.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRelease:false,
    isPersonal:false,
    info:false,
    tip:'',
    dataObj: {},
    houseList:[],//中介发布 个人房源发布 
    imgUrl:getApp().globalData.imgUrl,
    getCoin:0,
    "type":'midd'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getCoin: getApp().globalData.getCoin
    })
    if (options.tip =='middreleasetip')
    {
      this.setData({
        tip: options.tip
      })
    }
    //来自房产中介发布
    else if (options.src =='release')
    {
      this.type = "company";
      this.setData({
        "type":'midd',
        showRelease:true,
        dataObj: {
          url: _interface.getCommList,
          outData: {
            "type": this.type,
            category: options.category
          }
        }
      })
      wx.setNavigationBarTitle({
        title: '房产中介发布',
      })
      
   
    }
    //来自个人房源发布
    else if (options.src =='personal')
    {
      this.type = "person"
      wx.setNavigationBarTitle({
        title: '发布成功',
      })
      this.setData({
        "type": 'person',
        showRelease: true,
        isPersonal: true,
        dataObj: {
          url: _interface.getCommList,
          outData: {
            "type": this.type,
            category: options.category
          }
        }
      })
      
    }
   
    
    //来自资讯发布
    // else if (options.src == 'info') {
    //   wx.setNavigationBarTitle({
    //     title: '发布成功',
    //   })
    //   this.setData({
    //     showRelease: true,
    //     info: true
    //   })
    //   this.type = "person"
    // }
     //来自资质审核
    else
    {
      wx.setNavigationBarTitle({
        title: '资质审核',
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
  nextStep(){
    wx.navigateBack({
      delta:1
    })
  },
  //获取推荐数据
  pageData({detail}){
    let list = this.data.houseList;
    list.push(...detail)
    this.setData({
      houseList:list
    })
    console.log(detail)
  },
  //跳转
  toDetal({ currentTarget }) {

    let { src, type, bid } = currentTarget.dataset;
    console.log(src, type)
    //src 租房（rent）、售房sell
    //type 中介(midd)  个人(person)
    wx.navigateTo({
      url: `../sellHouseDetail/sellHouseDetail?type=${type}&src=${src}&bid=${bid}`,
    })

  },
})
