let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取任务列表
function getTaskList(that){
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  let data={
    userId:getApp().globalData.userId
  }
  let ajax=new Ajax({
    path: _interface.getMakeCoin,
    data
  }).then(res=>{
    wx.hideLoading()
    if(res.errcode==0)
    {
      console.log(res.data)
      res.data.taskList.forEach(item=>{
        if (item.name =='分享微信群')
        {
          item.btnname ='去分享'
        }
        if (item.name == '邀请好友') {
          item.btnname = '去邀请'
        }
       
        if (item.name == '完善联系方式') {
          item.btnname = '去完善'
        }
        if (item.name == '发布信息') {
          item.btnname = '去发布'
        }
        if (item.name == '首次注册') {
          item.btnname = '去注册'
        }
      })
      that.setData({
        taskLists:res.data
      })
     
    }
    else
    {
      wx.showToast({
        icon: 'none',
        title: '获取数据失败',
      })
    }

  }).catch(err=>{
    wx.hideLoading();
    wx.showToast({
      icon:'none',
      title: '服务器报错了...',
    })
  })
}
//分享
function shareFn(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  let data = {
    userId: getApp().globalData.userId,
    id: that.share
  }
  let ajax = new Ajax({
    path: _interface.shareFunction,
    data
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.setData({
        ['taskLists.amount']: res.data.amount,

      })   
      that.data.taskLists.taskList.forEach((item,index)=>{
        if (parseInt(item.id) == parseInt(that.share))
        {
          that.setData({
            [`taskLists.taskList[${index}].status`]:true
          }) 
        }
      })
      wx.showToast({
        title: '分享成功',
      })
    }
    else {
      wx.showToast({
        icon: 'none',
        title: '已完成过该任务',
      })
    }

  })
  ajax.catch(err => {
    wx.hideLoading();
    wx.showToast({
      icon: 'none',
      title: '服务器报错了...',
    })
  })
}
module.exports={
  getTaskList,
  shareFn
}