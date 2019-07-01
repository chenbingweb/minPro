let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import UserPower from "../../libs/getUserPower.js";
import Login from "../../libs/Login.js";
//获取小程序店面列表 AccessToken=f&keyword=&provinceId=&cityId=&districtId=&brandId=&offset=&limit=
function getAllShopList_(that) {
  wx.showLoading({
    title: '加载中...',
  })
  var data ={
    AccessToken:'',
    keyword:'',
    provinceId:'',
    cityId:'',
    districtId:'',
    brandId:'',
    offset: (that.page - 1) * that.pageSize,//当前页 
    limit: that.pageSize//总共页数
  }
  
  
  var ajax = new Ajax({
    data,
    path: _interface.getLoactShopList
  })
  let list = that.data.shopList||[];
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode==0)
    {
      
      if(res.data.length>=that.pageSize)
      {
        that.morePage=true
      }
      else 
      { 
        if (that.morePage && res.data.length==0)
        {
            that.setData({
              showTip:true
            })
        }
        
        that.morePage = false
      }
      list.push(...res.data) ;
      //提示
      if(list.length==0){
        that.setData({
          showTip: true
        })
      }
      that.setData({
        shopList: list
       })
    }
    
    
    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })

}
//搜索小程序店面列表
function searchShopList(that) {
  if (!that.data.showMore)
  {
    wx.showLoading({
      title: '加载中...',
    })
  }
  

  var data = {
    AccessToken:getApp().globalData.UserId,
    keyword: that.searchContent,
    provinceId:that.pid,
    cityId: that.cid,
    districtId: that.did,
    brandId: that.comId,
    offset: (that.page - 1) * that.pageSize,//当前页 
    limit: that.pageSize//总共页数
  }
  // if (that.cityCode == '' && that.searchContent == '' && that.comId=='')
  // {
  //   data = Object.assign(data, that.app.globalData.location)
  // }
  
  data = Object.assign(data, getApp().globalData.location)
  var ajax = new Ajax({
    data,
    path: _interface.getLoactShopList
  })
  
  let list = that.data.shopList || [];
  ajax.then(res => {
    that.setData({
      showMore: false
    })
    wx.hideLoading()
    if (res.errcode == 0) {

      if (res.data.length >= that.pageSize) {
        that.morePage = true
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
          showTip: true
        })
      }
      that.setData({
        shopList: list
      })
    }


    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })

}
//获取品牌
function getCompanyList(that){
  wx.showLoading({
    title: '加载中...',
  })
  var data ={
    brandId: 1
  };
  var ajax = new Ajax({
    data,
    path: _interface.getMemberList
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      let list=[{
        Id:'',
        Name:'全部'
      }]
      list.push(...res.data);
      that.setData({
        companyList: list,
        disabled:false
      })
    }


    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })

}
//获取城市列表
function getCityListd(that){
  wx.showLoading({
    title: '加载中...',
  })
  var data = {
    AccessToken:getApp().globalData.UserId
  };

  var ajax = new Ajax({
    data,
    path: _interface.getCityList
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.setData({
        cityList: res.data,
        disabled: false
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
  // wx.showLoading({
  //   title: '加载中...',
  // })
  var data = sendData;
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
  // var ajax = new Ajax({
  //   data,
  //   path: _interface.toMiniProgram
  // })
  // ajax.then(res => {
  //   wx.hideLoading()
  //   if (res.errcode == 0) {
  //     let param = res.data;
  //     Tool.toMiniPro(param).then(res => {
  //       console.log(res)
  //     }).catch(err => {
  //       wx.showToast({
  //         title: '打开失败',
  //         icon: 'none'
  //       })
  //     })
  //   }
  //   console.log(res)
  //   //

  // })
  // ajax.catch(err => {
  //   console.log(err)
  // })
}

module.exports={
  // getAllShopList,
  searchShopList,
  shopeDetail,
  getCompanyList
  
  
}