let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取签到信息
function getSignPageInfo(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  Promise.all([getUserSign()]).then(res=>{
    wx.hideLoading()
    console.log(res)
    if (res[0].errcode==0)
    {
      // dataExchange(res[0].data,that)
      that.day = res[0].data.day;
      that.gold = res[0].data.gold;
      that.setData({
        signInfo:res[0].data,
        day: that.day-1,
        gold: that.gold 
      })
      console.log(res[0].data)
    }
    else
    {
      wx.showToast({
        title: '获取数据失败',
        icon:'none'
      })
    }
    


  }).catch(err=>{
    wx.hideLoading()
  })
}
//用户签到
function getUserSign(){
  let pro=new Promise((resolove,reject)=>{
    var data = {
      userid: getApp().globalData.UserId
    }
    var ajax = new Ajax({
      data,
      path: _interface.getSignPage
    })
    ajax.then(res => {
      resolove(res)
    })
    ajax.catch(err => {
      reject(err)
    })
  })
  return pro
}

//签到
function toSignEvent(that){
  wx.showLoading({
    title: '签到中...',
    mask:true
  })

  var data = {
    userid: getApp().globalData.UserId,
    day: that.day,
    gold: that.gold 
  }
  var ajax = new Ajax({
    data,
    path: _interface.toSign
  })
  ajax.then(res => {
    wx.hideLoading()
    if(res.errcode==0)
    {
      that.setData({
        signInfo: res.data
      })
      getTodaySign(that)
    }
  })
  ajax.catch(err => {
   wx.showToast({
     title: '签到失败',
     icon:'none'
   })
  })

}
//添加当天获取的学贝
function getTodaySign(that){
  let list = that.data.signHisList;
  let signList = that.data.signInfo.signdays;
  let today=null;
  for(let i=0;i<signList.length;i++)
  {
    //最后一天并且已经签到
    if (i == (signList.length - 1) && signList[i].signed)
    {
      today = {
        date: Tool.formatTime(new Date, '.'), //签到日期
        gold: that.gold//signList[i].gold //获取学贝
      }
      break;
    }
    if (!signList[i].signed)
    {
      today ={
       
        date: Tool.formatTime(new Date, '.'), //签到日期
        gold: that.gold//signList[i - 1].gold //获取学贝
      } 
      break;
    }
  }
  list.unshift(today)

  that.setData({
    signHisList: list
  })
  
}
module.exports={
  getSignPageInfo,
  toSignEvent
}