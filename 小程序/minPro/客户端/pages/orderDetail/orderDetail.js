// pages/orderDetail/orderDetail.js
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
import { User } from "../../model/user.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {oid}=options;
    this.pages=[]
    this.oid=oid;
    this.getOrderDetail()
  },
  getOrderDetail(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    var data = {
      token:User.token,
      id: this.oid
    }
    var ajax = new Ajax({
      data,
      path: _interface.getOrderDetail
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
     
        let data=res.data;
        data.items.forEach(item=>{
          item.img_url = getApp().globalData.imgUrl + item.img_url
        })
        if (data.lattices.length)
        {
          data.lattice = data.lattices.join(',')
        }
        else
        {
          data.lattice=''
        }
        
       
        //是否可以取消订单
        if (data.is_cancel == false && (data.status == 'wait_confirm' ))
        {
          data.cancel = (data.curr_time - data.pay_time) <5*60 ?true : false 
        }
        this.setData({
          detail:data
        })
      
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      else  if (parseInt(res.errcode) == 404) {
        wx.redirectTo({
          url: '../myOrder/myOrder',
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: 'none'
        })
     
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: 'none'
      })
     
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.pages = getCurrentPages();
 
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
  onPay(){
    wx.showLoading({
      title: '支付中...',
      mask:true
    })
    getApp().WXpay(this.oid,()=>{
      wx.hideLoading();
      this.update('wait_confirm', '已支付')
    })
  },

  //取消订单
  onCancelOrder(){
    wx.showModal({
      title: '提示',
      content: '您要取消订单？',
      success:res=>{
        if(res.confirm)
        {
          this.cancel()
        }
      }
    })
  },
  cancel(){
    wx.showLoading({
      title: '正在取消...',
      mask: true
    })
    let that=this;
    var data = {
      token:User.token,
      id: this.oid
    }
    var ajax = new Ajax({
      data,
      path: _interface.cancelOrder
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

        wx.showToast({
          title: '成功取消',
        })
        that.update('wait_confirm', '已取消')
        this.getOrderDetail()
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: 'none'
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: 'none'
      })
    })
  },
  //修改状态
  update(status, status_name){
    let pages = getCurrentPages();
    pages.forEach(item=>{
      if (item.route =='pages/myOrder/myOrder'){
        item.data.list.forEach((child,index)=>{
          if (this.oid==child.id)
          {

            item.setData({
              [`list[${index}].status_name`]: status_name,
              [`list[${index}].status`]: status
            })
          }
        })
      }
    })
  },
  //开柜
  openCG({currentTarget}){
    
    let {fid}=currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确认取餐？',
      success:res=>{
        if(res.confirm)
        {
          wx.showLoading({
            title: '开柜中...',
          })

          openCG((detail) => {
            // wx.showToast({
            //   title: '开柜成功' 
            // })
            wx.showModal({
              title: '开柜成功',
              content: `餐柜名称：${detail.cabinet}\r\n格子编号:${detail.lattices.join(',')}`,
              showCancel:false,
              success:res=>{
                this.setData({
                  ['detail.status']:'has_complete'
                })
                getCurrentPages().forEach(item => {
                  if (item.route == "pages/myOrder/myOrder") {
                    let list = item.data.list;
                    list.forEach(item => {
                      if (item.id == fid) {
                        item.status_name = '已完成',
                        item.status ='has_complete'
                      }
                    })
                    item.setData({
                      list: list
                    })
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })
              }
            })

           
            
          }, (res) => {
            wx.showToast({
              title: res,
              icon: "none"
            })
            }, fid)
        }
      }
    })


    
  }
})
//打开餐柜
function openCG(callBack, errBack, id){
  wx.showLoading({
    title: '正在打开餐柜中',
    mask: true
  })

  var data = {
    token: User.token,
    id: id// getApp().globalData.gid
  }

  var ajax = new Ajax({
    data,
    path: _interface.cabinet
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      callBack(res.data)
    }
    else if (res.errcode == 1) {
      // wx.showToast({
      //   title: res.msg,
      //   icon: 'none'
      // })
      errBack(res.msg)
    }
    else {
      wx.showToast({
        title: '系统繁忙',
        icon: 'none'
      })
      errBack()
    }
  })
  ajax.catch(err => {
    wx.showToast({
      title: '系统繁忙',
      icon: 'none'
    })
    errBack()
  })
}