// pages/sendImg/sendImg.js
import {Index} from "../../model/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petImg:[],
    src:'normal'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tempFilePaths=[]
    this.oid=options.oid;
    this.setData({
      src: options.src
    })
    if (options.src =='complete')
    {
      wx.setNavigationBarTitle({
        title:'到店照片'
      })
      Index.getArriveImg(this.oid,res=>{
        this.setData({
          petImg:res
        })
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
  onUploadImg(){
    let petImg = this.data.petImg;
    wx.chooseImage({
      count: 9 - petImg.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        petImg.push(...tempFilePaths);
        this.setData({
          petImg
        })
        this.tempFilePaths = petImg
      }
    })
  },
  //删除宠物照片
  onDel({ currentTarget: { dataset: { img } } }) {
    let petImg = this.data.petImg;
    petImg.splice(img, 1);
    this.setData({
      petImg
    })
  },
  //提交确认送达
  onSubmit(){
    let petImg = this.data.petImg;
    if(petImg.length==0)
    {
      wx.showToast({
        title: '请添加宠物照片',
        icon:'none'
      })
      return
    }
    
    this.callBack=res=>{
      console.log(res)
      Index.isArrive(res, this.oid,result=>{
        if(result)
        {
          wx.reLaunch({
            url: '../index/index',
          })
        }
      })
    }
    wx.showModal({
      title: '提示',
      content: '您已经送达目的地？',
      success:res=>{
        if(res.confirm)
        {
          getApp().uploadImgs(this)()
        }
      }
    })
  
  },
  //图片预览
  onViewImg({currentTarget:{dataset:{index}}}){
    wx.previewImage({
      current: this.data.petImg[index],
      urls: this.data.petImg,
    })
  }
})