// pages/myInfo/myInfo.js
import Check from "../../libs/check.js";
import { User } from "../../model/user.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    range: [
      { id: 0, name: '请选择' },
      { id: 1, name: '男' },
      { id: 2, name: '女' }
    ],
    genderIndex: 0,
    birthday: '',
    name: '',
    mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    User.getUserInfo(res => {
      if (res == false) {
        return
      }
      let { range } = this.data;
      let { birthday, gender, mobile, name } = res;
      let genderIndex = 0;
      range.forEach((item, index) => {
        if (item.id == gender) {
          genderIndex = index
        }
      })

      this.setData({
        genderIndex,
        birthday: birthday||'',
        name,
        mobile: mobile||''
      })
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
  //日期选择
  onDateChange({ detail: { value } }) {
    this.setData({
      birthday: value
    })
    console.log(value)
  },
  //提交
  onSubmit({ detail: { value } }) {
    if (value.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        mask: true
      })
      return
    }
    if (value.gender == '') {
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
        mask: true
      })
      return
    }
    if (value.birthday == '') {
      wx.showToast({
        title: '请选择出生日期',
        icon: 'none',
        mask: true
      })
      return
    }
    if (value.mobile == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        mask: true
      })
      return
    }
    if (!Check.checkPhoneNum(value.mobile)) {
      return
    }
    User.saveUserInfo(value, () => {
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