// pages/fillPetInfo/fillPetInfo.js
import { PetInfo } from "../../model/petInfo.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    time:'',
    date:'',
    uploadImgs:[],
    petInfo:{},
    start:'',
    end:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.time=undefined;
    let start=new Date();
    let year=start.getFullYear()
    let month= start.getMonth()+1;
    let day=start.getDate();
    let end = start.getTime()+6*24*60*60*1000;
    end = new Date(end);
    let yearEnd = end.getFullYear()
    let monthEnd = end.getMonth() + 1;
    let dayEnd = end.getDate();
    this.setData({
      start: `${year}-${month}-${day}`,
      end: `${yearEnd}-${monthEnd}-${dayEnd}`
    })
    console.log(year,month,day)
    console.log(yearEnd, monthEnd, dayEnd)
    if (PetInfo.petInfo){
      //时间
     // this.time = PetInfo.petInfo.time;
      //更新
      this.setData({
        date: PetInfo.petInfo.expect_pick_at.split(' ')[0],
        time: PetInfo.petInfo.expect_pick_at.split(' ')[1],
        petInfo: PetInfo.petInfo,
        uploadImgs: PetInfo.petInfo.uploadImgs
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
  // 删除
  onDel({currentTarget}){
    let {img} =currentTarget.dataset;
    let uploadImgs=this.data.uploadImgs;
    uploadImgs.splice(img,1);
    this.setData({
      uploadImgs
    })
    console.log(img)
  },
  //上传图片
  onUpload(){
    let uploadImgs = this.data.uploadImgs;
    let that=this;
    wx.chooseImage({
      count: 9 - uploadImgs.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res=>{
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        uploadImgs.push(...tempFilePaths);
        that.setData({
          uploadImgs
        })
      }
    })
  },
  //预览图片
  onViewImg({currentTarget:{dataset:{index}}}){
    console.log(index)
    wx.previewImage({
      current: this.data.uploadImgs[index], // 当前显示图片的http链接
      urls: this.data.uploadImgs // 需要预览的图片http链接列表
    })
  },
  onDate({ detail :{value}}){
    console.log(value)
    this.setData({
      date:value
    })
  },
  onTime({ detail: { value } }){
    this.setData({
      time: value
    })
  },
  //提交
  onSubmit({detail:{value}}){
    // if (this.time==undefined)
    // {
    //   wx.showToast({
    //     title: '请选择取件时间',
    //     icon: 'none'
    //   })
    //   return
    // }
    if (value.date == '') {
      wx.showToast({
        title: '请选择取件日期',
        icon: 'none'
      })
      return
    }
    if (value.time == '') {
      wx.showToast({
        title: '请选择取件时间',
        icon: 'none'
      })
      return
    }
    if (value.petNum == '') {
      wx.showToast({
        title: '请输宠物数量',
        icon: 'none'
      })
      return
    }
    
    if (value.petName == '') {
      wx.showToast({
        title: '请输入宠物名称',
        icon: 'none'
      })
      return
    }
    if (value.petDis == '') {
      wx.showToast({
        title: '请输入宠物描述',
        icon: 'none'
      })
      return
    }
    if(this.data.uploadImgs.length==0)
    { 
      wx.showToast({
        title: '请添加宠物照片',
        icon: 'none'
      })
      return
    }
    value.expect_pick_at = value.date + ' ' + value.time
    value.uploadImgs = this.data.uploadImgs
    PetInfo.setPetInfo(value);
    wx.navigateBack({
        delta:1
    })
    console.log(value)
  },
  //取消
  onCancelCity(){
    console.log(3)
  },
  //显示piker
  OnShow(){
    this.setData({
      show:true
    })
  },
  //时间选择
  onSelectCity({detail}){
    let {str}=detail;
    this.time=detail;
    this.setData({
      time:str
    })
    console.log(detail)
  }

})