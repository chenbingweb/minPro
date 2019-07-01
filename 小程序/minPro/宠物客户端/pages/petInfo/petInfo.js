// pages/myInfo/myInfo.js
import Check from "../../libs/check.js";
import { PetInfo } from "../../model/petInfo.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    range: [
      { id: '', name: '请选择' },
      { id: 0, name: '公' },
      { id: 1, name: '母' }
    ],
    genderIndex: 0,
    pets_breeds:'',
    pets_age:'',
    pets_sex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    PetInfo.getPetInfo(res=>{
      if(!res)
      {
        return
      }
      let range = this.data.range;
      let genderIndex=0;
      range.forEach((item,index)=>{
        if (item.id!=='' && item.id == res.pets_sex)
        {
          genderIndex=index;
        }
      })
      this.setData(
        {
          pets_breeds: res.pets_breeds,
          pets_age: res.pets_age,
          genderIndex: genderIndex
        }
      )


      console.log(res)
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
  //性别选择
  onGenderChange({ detail: { value } }) {
    this.setData({
      genderIndex: parseInt(value)
    })
  },
  //提交
  onSubmit({ detail: { value } }) {
    if (value.pets_breeds == '') {
      wx.showToast({
        title: '请输入宠物品种',
        icon: 'none',
        mask: true
      })
      return
    }
 
    if (value.pets_age == '') {
      wx.showToast({
        title: '请输入宠物年龄',
        icon: 'none',
        mask: true
      })
      return
    }
    if (value.pets_sex == '') {
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
        mask: true
      })
      return
    }
    PetInfo.savePetInfo(value, res=>{
      wx.showToast({
        title: '保存成功',
        mask: true
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
    })

    console.log(value)
  }
})