let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import UserPower from "../../libs/getUserPower.js";
import Login from "../../libs/Login.js";

// 查看店铺详情
function shopInfoAll(that){
  wx.showLoading({
    title: '加载中',
  })
  Promise.all([shopDetail(that)]).then(res=>{
    wx.hideLoading()
    if (res[0].errcode==0)
    {
      that.setData({
        shopDetail:res[0].data
      })
    }
    console.log(res)
  }).catch(err=>{

  })
}
//获取店铺信息
function shopDetail(that) {
  var data = {
    id: that.sid,
    AccessToken:getApp().globalData.UserId
  }
  let promise=new Promise((resolive,reject)=>{
    var ajax = new Ajax({
      data,
      path: _interface.shopDetail
    })
    ajax.then(res => {
      resolive(res)
    })
    ajax.catch(err => {
      reject(err)
    })
  })

  return promise
}
//获取当前店铺优惠券
function getCouponList(that) {
  if (!that.data.showMore) {
    wx.showLoading({
      title: '加载中...',
    })
  }
  var data = {
    provinceId: '',
    cityId:'',
    districtId: '',

    keyword: '',//搜索关键词
    industryId: '',//行业品牌id
    AccessToken: getApp().globalData.UserId,
    offset: (that.page - 1) * that.pageSize,//当前页 
    limit: that.pageSize,//总共页数
    brandId: '',
    shopId: that.sid
  }
  
  var ajax = new Ajax({
    data,
    path: _interface.findPage
  })

  let list = that.data.couponList || [];
  ajax.then(res => {
    wx.hideLoading()
    that.setData({
      showMore: false
    })
    if (res.errcode == 0) {

      if (res.data.length >= that.pageSize) {
        that.morePage = true;
      }
      else {
        if (that.morePage && res.data.length < that.pageSize) {
          that.setData({
            showTip: true
          })
        }

        that.morePage = false
      }
      list.push(...res.data)
      //提示
      if (list.length == 0) {
        that.setData({
          showNodata: true
        })
      }
      that.setData({
        couponList: list
      })
    }


    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })

}
//跳转微店小程序
function shopeDetail(sendData) {
  wx.showLoading({
    title: '加载中...',
  })
  var data = sendData;

  console.log(data)
  data.path = `pages/store/store?poi_id=${sendData.polid}`
  Tool.toMiniPro(data).then(res => {
    console.log(res)
    wx.hideLoading()
  }).catch(err => {
    wx.showToast({
      title: '打开失败',
      icon: 'none'
    })
  })

}

module.exports={
  shopInfoAll,
  getCouponList,
  shopeDetail
}