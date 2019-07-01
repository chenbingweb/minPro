// pages/companyAddress/companyAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList:[],
    areaIndex:0,
    addressInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.areaList)
    this.setData({
      areaList: getApp().globalData.areaList
    })
    wx.getStorage({
      key: 'address',
      success:res=>{
        if(res.data)
        {
          this.data.areaList.forEach((item,index)=>{
            if (item.id==res.data.id)
            {
              this.setData({
                areaIndex:index
              })
            }
          })
          this.setData({
            addressInfo: res.data
          })
        }
       
      },
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
  areaChange({detail}){
    let {value}=detail;
    this.setData({
      areaIndex:value
    })
  },
  //添加地址
  addAddress({ detail }){
    let {value}=detail;
    wx.setStorage({
      key: 'address',
      data: value,
      success:()=>{
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
  //取消
  cancel(){
    wx.navigateBack({
      delta: 1
    })
  }
})