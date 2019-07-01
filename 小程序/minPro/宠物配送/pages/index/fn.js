let _interface=require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取首页信息
function getIndexInfo(that){
  wx.showLoading({
    title: '加载中',
  })
  Promise.all([getInforAndBanner(that), getRecomInfo(that), getRecomJob(that)]).then(res=>{
    let one=[];
    that.setData({
      showIndex: true
    })
    wx.hideLoading();
    //获取banner,推荐楼盘，推荐房源
    if (res[0].errcode==0)
    {
      let data = res[0].data||{};
      
       that.setData({
         banner: data.banner,
         recom_building: data.recom_building,
         recom_housing: data.recom_housing
       })
     
    }
    //获取推荐资讯
    if (res[1].errcode == 0) {
      let data = res[1].data ||[];
      console.log(data)
      that.setData({
        recomInfo:data
      })

    }
    //推荐职业
    if (res[2].errcode == 0) {
      let data = res[2].data ||{};
      console.log(data)
      let reg = /^[a-zA-z]+:/;
      let imgUrl = getApp().globalData.imgUrl;
      data.recom_resume.forEach(item=>{
        console.log(item.head_img)
        // console.log(reg.test(item.head_img) )
        // console.log(reg.test(item.head_img) ? item.head_img : (imgUrl + item.head_img))
        // if (!reg.test(item.head_img) )
        // {
        //   item.head_img = imgUrl + item.head_img
        // }
        item.head_img=reg.test(item.head_img) ? item.head_img : (imgUrl + item.head_img)
      })
      console.log('llllllllllllll',data.recom_resume)
      that.setData({
        recomJob: data
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
//获取banner 用户头像信息
function getInforAndBanner(that) {
  let promise=new Promise((resolve,reject)=>{
    var data = {
      areaId: that.areaId
    }
    var ajax = new Ajax({
      data,
      path: _interface.getIndexInfo
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
//推荐资讯
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



