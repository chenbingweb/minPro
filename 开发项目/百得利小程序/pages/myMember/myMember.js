// pages/myMember/myMember.js
let _fn=require("./fn.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTip:true,
    memberList:[],
    imgUrl: getApp().globalData.imgUrl,//获取图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.page=1;
    this.pageSize = getApp().globalData.pageSize;
    this.morePage=false;
    this.UserId=getApp().globalData.UserId;
    _fn.getMemberList(this)
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
    if(!this.morePage) return 
    this.page+=1;
    _fn.getMemberList(this)
  },

  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {
  
  },*/
  //查看我的会员卡
  checkMyMember(e){
    _fn.toMyMember(e.currentTarget.dataset)
    // let memberId=e.currentTarget.dataset.id;
    // let sendData={
    //   UserId: this.UserId,//获取 id
    //   CompanyId: memberId,//所属品牌
    // }
    // getApp().ToMemberCard(sendData)
  }
})