let _util = require('../../utils/util.js');
let _interface=require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取首页信息
function getIndexInfo(that){
  wx.showLoading({
    title: '加载中',
  })
  Promise.all([getUserAndBanner(that), getIndexLesson(that), getUserBaseLesson(that)]).then(res=>{
    let one=[];
    that.setData({
      showIndex: true
    })
    wx.hideLoading();
    //获取banner 用户头像信息 学贝 周学贝 学习魔药
    if (res[0].errcode==0)
    {
      let data = res[0].data||{};
    // if(data)
    // {
       that.setData({
         img_url: data.img_url||'',
         motherInfo: data.motherInfo||{},
         babyInfo: data.babyInfo||{},
         userIntegral: data.userIntegral||{},
         is_sign: data.is_sign||false
       })
       getApp().globalData.userIntegral = data.userIntegral||{}
    //}share_info
      // getApp().globalData.shareInfo = data.share_info
    }
    //获取最近课程和免费课程
    if (res[1].errcode == 0) {
      let data = res[1].data;
      if (data) {
        that.setData({
          lessonType: data.lessonType,//默认为免费课程
          lessonList: data.lessonList||[],//课程列表
        })

      }
      else
      {
        that.setData({
          lessonType: true,//默认为免费课程
          lessonList: [],//课程列表
        })
      }

    }
    //获取用户当前学习的课程基本信息
    if (res[2].errcode == 0) {
      let data = res[2].data;
      if (data) {
        that.setData({
          totalLesson: data.totalLesson, //全部课程数量
          bknum: data.bknum, //已经备课数量
          sknum: data.sknum //已近上课数量
        })
      }

    }
    getApp().globalData.isLoading=false;
    //显示页面
    setTimeout(() => {
      that.setData({
        loading:false
      })
      
    }, 1000)

    console.log(res)

  }).catch(err=>{
    wx.hideLoading();
    wx.showToast({
      title: '网络不给力呦，请检查网络连接并稍后再试！',
      icon:'none'
    })
    console.log(err)
  })
}
//获取banner 用户头像信息
function getUserAndBanner(that) {
  let promise=new Promise((resolve,reject)=>{
    var data = {
      userid: that.userid
    }
    var ajax = new Ajax({
      data,
      path: _interface.getUserAndBanner
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
//获取最近课程和免费课程
function getIndexLesson(that) {
  let promise = new Promise((resolve, reject) => {
    var data = {
      userid: that.userid
    }
    var ajax = new Ajax({
      data,
      path: _interface.getIndexLesson
    })
    ajax.then(res => {
      resolve(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
  return promise
}
//获取用户当前学习的课程基本信息
function getUserBaseLesson(that) {
  let promise = new Promise((resolve, reject) => {
    var data = {
      userid: that.userid
    }
    var ajax = new Ajax({
      data,
      path: _interface.getUserBaseLesson
    })
    ajax.then(res => {
      console.log(res)
      resolve(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
  return promise
}
// 更改图片
function changeImg(that){
 
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success:res=>{
      wx.showLoading({
        title: '正在上传...',
        mask: true
      })
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths[0];
      
      let upload = new Upload({
        path: _interface.changeIndexImg,
        filePath: tempFilePaths,
        formData:{
          userid:that.userid
        }
      })
      upload.then(res=>{
        wx.hideLoading()
        //let res = JSON.parse(res)
        // that.setData({
        //   img_url: app.globalData.imgUrl + res.img_url
        // })
        getIndexInfo(that)
        console.log(res)
        wx.showToast({
          title: '上传成功',
          mask:true
        })
      }).catch(err=>{
        console.log(err)
        wx.showToast({
          title: '上传图片失败',
          icon: 'none',
          mask: true
        })
        wx.hideLoading()
      })
    }
  })
}


module.exports={
  getIndexInfo,
  changeImg

}



