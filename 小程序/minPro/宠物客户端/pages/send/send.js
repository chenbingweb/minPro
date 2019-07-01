// pages/send/send.js
let _interface=require('../../utils/interface.js')
import {User} from "../../model/user.js"
import Check from "../../libs/check.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:{},
    ty:'send',
    addressInfo:{},
    historyList:[],
    fillInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载 recetive
   */
  onLoad: function (options) {
  
    let { ty }=options;
    if (ty =='recetive')
    {
      wx.setNavigationBarTitle({
        title: '收货信息',
      })
      this.setData({
        addressInfo: User.end,
        fillInfo:User.end
      })
    }
    else
    {
      this.setData({
        addressInfo: User.start,
        fillInfo: User.start
      })
    }
    this.setData({
      ty,
      dataObj: {
        url: _interface.getHistory || '',
        outData: {
          status:ty,
          token:User.token
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
  onPageData({detail}){
    
    if (this.data.ty =='send')
    {

      detail.forEach(item=>{
        item.sendAddressDetail = item.addressDetail;
        item.sendMobile = item.mobile;
        item.sendName = item.name;
        item.close=true
      })
    }
    else
    {
      detail.forEach(item => {
        item.receiveAddressDetail = item.addressDetail;
        item.receiveMobile = item.mobile;
        item.receiveName = item.name;
        item.close = true
      })
    }
    
    let his=this.data.historyList;
    this.setData({
      historyList: his.concat(detail)
    })
  },  
  onLintap({currentTarget:{dataset:{index}}}){
    let historyList = this.data.historyList;
    historyList.forEach((item,i)=>{
      if(i==index)
      {
        item.close=false;
      }
      else
      {
        item.close = true;
      }
    })
    this.setData({
      historyList
    })
    
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
  onDel({ currentTarget: { dataset: { hid} }}){
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success:res=>{
        if(res.confirm)
        {
          let his=this.data.historyList;
          wx.showLoading({
            title: '删除中...',
            mask:true
          })
          User.delHistory(hid, this.data.ty, res=>{
            wx.hideLoading()
            if(res)
            {
              his.forEach((item,index)=>{
                if(item.id==hid)
                {
                    his.splice(index,1);
                }
              })
              this.setData({
                historyList:his
              })
            }
          })
        }
      }
    })
  },
  //提交信息
  onSubmit({detail:{value}}){
    if (this.data.ty == 'send')
    {
      if (!this.data.addressInfo.address) {
        wx.showToast({
          title: '请选择发货地址',
          icon: 'none'
        })
        return;
      }
      if (value.sendAddressDetail == '') {
        wx.showToast({
          title: '请输入详细信息（单元、门牌号）',
          icon: 'none'
        })
        return
      }
      if (value.sendName == '') {
        wx.showToast({
          title: '请输入发货人姓名',
          icon: 'none'
        })
        return
      }
      if (value.sendMobile == '') {
        wx.showToast({
          title: '请输入发货人电话',
          icon: 'none'
        })
        return
      }
      if (!Check.checkPhoneNum(value.sendMobile)) {

        return
      }
      let data = Object.assign(this.data.addressInfo, value);
      User.setStartVal(data);
    }
    else
    {
      if (!this.data.addressInfo.address) {
        wx.showToast({
          title: '请选择收货地址',
          icon: 'none'
        })
        return;
      }
      if (value.receiveAddressDetail == '') {
        wx.showToast({
          title: '请输入详细信息（单元、门牌号）',
          icon: 'none'
        })
        return
      }
      if (value.receiveName == '') {
        wx.showToast({
          title: '请输入收货人姓名',
          icon: 'none'
        })
        return
      }
      if (value.receiveMobile == '') {
        wx.showToast({
          title: '请输入收货人电话',
          icon: 'none'
        })
        return
      }
      if (!Check.checkPhoneNum(value.receiveMobile)) {

        return
      }
      let data = Object.assign(this.data.addressInfo, value);
      User.setEndVal(data);
    }
    wx.navigateBack({
      delta:1
    })

  }, //选择地址
  onToSelectPos() {
    let addressInfo = this.data.addressInfo;
    wx.chooseLocation({
      success: res => {
        let { address, latitude, longitude, name } = res;
        User.isAllowArea({ latitude, longitude}, flag=>{
          if (flag)
          {
            this.setData({
              addressInfo: Object.assign(addressInfo, res)
            })
          }
          else
          {
              wx.showToast({
                title: '您选择的地址不字服务范围，请重新选择',
                icon:'none'

              })
          }
        })
       
        console.log(res)
      },
      fail: err => {

      }
    })
  },
  onSelectHis({currentTarget}){
    let {hid}=currentTarget.dataset;
    if (this.data.ty =='recetive'){
      if (User.start.id == hid) 
      {
        wx.showToast({
          title: '当前地址已选为起始地了，请重新选择',
          icon:'none'
        })
        return 
      }
    }
    else
    {
      if (User.end.id == hid) {
        wx.showToast({
          title: '当前地址已选为目的地了，请重新选择',
          icon: 'none'
        })
        return
      }

    }
    let hisList=this.data.historyList;
    hisList.forEach((item)=>{
      if(item.id==hid)
      {
        this.setData({
          addressInfo:item
        })
      }
    })
    console.log(hid)
  }
})