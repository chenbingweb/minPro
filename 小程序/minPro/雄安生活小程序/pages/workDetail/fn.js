let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取貌似自荐详情
function getSelfDetail(that){
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  let data={
    id:that.sid
  }
  let ajax=new Ajax({
    path: _interface.getSelftDetail,
    data
  })
  ajax.then(res=>{
    wx.hideLoading()
    console.log(res)
    if(res.errcode==0)
    {
      //头像转换
      let reg = /^[a-zA-z]+:/;
      let imgUrl = getApp().globalData.imgUrl;
      res.data.head_img = reg.test(res.data.head_img) ? res.data.head_img : (imgUrl + res.data.head_img);
      //时间转换
      console.log(res.data.experienceList)
      res.data.experienceList.forEach(item=>{
        item.end_time = Tool.formatTime(new Date(parseInt(item.end_time) * 1000),'.',false,true)
        item.start_time = Tool.formatTime(new Date(parseInt(item.start_time) * 1000), '.', false, true )
      })  
      res.data.educationList.forEach(item => {
        item.end_time = Tool.formatTime(new Date(parseInt(item.end_time) * 1000), '.', false, true)
        item.start_time = Tool.formatTime(new Date(parseInt(item.start_time) * 1000), '.', false, true)
      })
      //渲染页面
      that.setData({
        selfDetail:res.data
      })
     
    }
    else
    {
      wx.showToast({
        title: '获取数据失败',
        icon:'none'
      })
    }
  }).catch(err=>{

  })
}

module.exports={
  getSelfDetail
}