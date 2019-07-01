// pages/fillCompany/fillCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'',
    detail:'',
    key:'company_detail'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let src=options.src;
    this.src=src;
    //来自公司介绍
    if(src=='company')
    {
      wx.setNavigationBarTitle({
        title: '公司介绍',
      })
      this.setData({
        placeholder: '请输入公司简介',
        key: 'company_detail'
      })
      wx.getStorage({
        key: 'company_detail',
        success: res => {
          if (res.data) {
            this.setData({
              detail: res.data.company_detail
            })
          }

        },
      })
    }
    else //来自岗位要去
    {
      wx.setNavigationBarTitle({
        title: '岗位要求',
        key:'detail'
      })
      this.setData({
        placeholder: '请详细描述职责范围、工作内容、福利待遇等'
      })
      //获取本地岗位要求
      wx.getStorage({
        key: 'detail',
        success: res=>{
          if(res.data){
            this.setData({
              detail: res.data.company_detail
            })
          }
          
        },
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
  cancelEvent(){
    wx.navigateBack({
      delta: 1
    })
  },
  //填写岗位要求
  workEvent({detail}){
    let {value} = detail;
    if (this.src =='company')
    {
      wx.setStorage({
        key: 'company_detail',
        data: value,
        success: () => {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
    else
    {
      wx.setStorage({
        key: 'detail',
        data: value ,
        success:()=>{
          wx.navigateBack({
            delta:1
          })
        }
      })
    }
  }
})