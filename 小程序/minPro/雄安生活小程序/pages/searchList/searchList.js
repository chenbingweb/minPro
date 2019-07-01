// pages/searchList/searchList.js
let _fn=require("./fn")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'searchList',
      success: res=>{
        if(res.data)
        {
          this.setData({
            resultList: res.data
          })
        }
      },
    })
  //  _fn.getResultList(this)
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
  //查看更多
  onToList({currentTarget}){
    let {key,src}=currentTarget.dataset;
    console.log(key)
    let url="";
    if (src == 'middle')//中介房源
    {
      url = `../houseMidd/houseMidd?src=midd&keys=${key}`
    }
    else if (src == 'person')//个人房源
    {
      url = `../houseMidd/houseMidd?src=person&keys=${key}`
    }
    else if (src == 'build') {//售房
      url = `../sellBuld/sellBuld?keys=${key}`
    }
    else if (src == 'boss') {//boss发布
      url = `../bossList/bossList?keys=${key}`
    }
    else if (src == 'info') {//资讯发布
      url = `../inforRelease/inforRelease?keys=${key}`
    }
    else if (src == 'self') {
      url = `../ownServices/ownServices?keys=${key}`
    }
    wx.navigateTo({
      url: url
    })
  },
  //查看详情
  navToDetail({ currentTarget }) {
    // middle person build boss self info
    /*
    
    //src 租房（rent）、售房sell
    //type 中介(midd)  个人(person)
    wx.navigateTo({
      url: `../sellHouseDetail/sellHouseDetail?type=${type}&src=${src}&bid=${bid}`,
    })
    */
    let { cid, src, category } = currentTarget.dataset;
    let url = ''
    if (src == 'middle')//中介房源
    {
      url = `../sellHouseDetail/sellHouseDetail?type=midd&src=${category}&bid=${cid}`
    }
    else if (src == 'person')//个人房源
    {
      url = `../sellHouseDetail/sellHouseDetail?type=person&src=${category}&bid=${cid}`
    }
    else if (src == 'build') {//售房
      url = `../buildDetail/buildDetail?id=${cid}`
    }
    else if (src == 'boss') {//boss发布
      url = `../jobDetail/jobDetail?id=${cid}`
    }
    else if (src == 'info') {//资讯发布../infoRelDetail/infoRelDetail?id={{item.id}}
      url = `../infoRelDetail/infoRelDetail?id=${cid}`
    }
    else if (src == 'self') {
      url = `../workDetail/workDetail?sid=${cid}`
    }
    wx.navigateTo({
      url: url
    })
  }

})