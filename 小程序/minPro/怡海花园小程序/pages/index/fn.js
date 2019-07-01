let _interface=require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取首页信息
function getIndexInfo(that){
  wx.showLoading({
    title: '加载中',
  })
  Promise.all([getInforAndBanner(that)]).then(res=>{
    
    wx.hideLoading();
    //获取banner,推荐楼盘，推荐房源
    if (res[0].errcode==0)
    {
      let data = res[0].data||{};
      
       that.setData({
         imgsData: data.banner,
         plateList: data.plateList
       })
     
    }
    console.log(res)

  }).catch(err=>{
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错啦~~',
      icon:'none'
    })
    console.log(err)
  })
}
//获取banner 板块 列表
function getInforAndBanner(that) {
  let promise=new Promise((resolve,reject)=>{
    var data = {
      userId: getApp().globalData.userId,
      village_id: getApp().globalData.village_id
    }
    var ajax = new Ajax({
      data,
      path: _interface.getIndexList
    })
    ajax.then(res => {
      console.log(res)


      resolve(res)
      console.log(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
 return promise 
}
function getRecomInfo(that) {
  let promise = new Promise((resolve, reject) => {
    var data = {
      areaId: that.areaId
    }
    var ajax = new Ajax({
      data,
      path: _interface.getRecomInfor
    })
    ajax.then(res => {
      console.log(res)


      resolve(res)
      console.log(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
  return promise
}
//推荐职位
function getRecomJob(that) {
  let promise = new Promise((resolve, reject) => {
    var data = {
      areaId: that.areaId
    }
    var ajax = new Ajax({
      data,
      path: _interface.recomJob
    })
    ajax.then(res => {
      console.log(res)


      resolve(res)
      console.log(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
  return promise
}

module.exports={
  getIndexInfo,
  getRecomInfo
}



