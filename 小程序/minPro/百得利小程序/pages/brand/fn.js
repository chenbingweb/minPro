let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import UserPower from "../../libs/getUserPower.js";
import Login from "../../libs/Login.js";

//获取首页信息
function getBanner_(that) {
  var data = {
    brandId: 3
  }
  var ajax = new Ajax({
    data,
    path: _interface.getBanner
  })
  ajax.then(res => {
    console.log(res)
    wx.hideLoading();
   
    //获取成功
    if (res.errcode == 0) {
      //轮播
      console.log(res)
      if (res.data.length)
      {
        
        that.setData({
          ImgUrl: res.data//[0].ImgUrl
        })
        that.setData({
          showBrand: true
        })
      }
    }
    else 
    {
      that.setData({
        showBrand: false
      })
    }

    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })
}
//获取品牌
function getBrand() {

  let promise = new Promise((resolve, reject) => {

    var data = {
      brandId: 2
    }
    var ajax = new Ajax({
      data,
      path: _interface.getBanner
    })
    ajax.then(res => {
      console.log(res)
      wx.hideLoading();
      resolve(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
  return promise
}
//获取品牌
function getBrandList(){
  
  let promise = new Promise((resolve, reject) => {
    var data = {
      brandId: 1
    }
    var ajax = new Ajax({
      data,
      path: _interface.getMemberList
    })
    ajax.then(res => {
      console.log(res)
      wx.hideLoading();
      resolve(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
  return promise
}
//获取品牌列表
function getBrandListAll(that){
  Promise.all([getBrand(), getBrandList()]).then(res=>{
    console.log(res)
    that.setData({
      showBrand: true
    })
    wx.hideLoading()
    //获取banner图
    if (res[0].errcode == 0) {
      //轮播
      setTimeout(()=>{
        that.setData({
          ImgUrl: res[0].data//[0].ImgUrl
        })
      },500)
      
    }
    else 
    {

    }

    //获取品牌logo
    if (res[1].errcode == 0) {
      //轮播
      console.log(res[1].data)
      let list=[
       
      ]
      let lists = res[1].data;
      lists.push(...list)
      setTimeout(()=>{
        that.setData({
          logoList: lists
        })
      },500)
      
    }
    else 
    {

    }
  }).catch(err=>{
    wx.hideLoading()
  })
}
module.exports={
  getBrandListAll
}