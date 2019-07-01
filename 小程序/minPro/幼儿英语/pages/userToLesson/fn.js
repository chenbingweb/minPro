let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取上课页面信息
function getSKBaseInfo(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: getApp().globalData.UserId,
    uid: that.uid,
    lid: that.lid,
    courseid:that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.getSKBaseInfo
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      if (res.data) {
        let isAll = res.data.is_all;
        //备课完成状态
        if (isAll == 1 && res.data.is_cartoon == 2 && res.data.is_practice == 2 && res.data.is_read_book == 2 && res.data.is_story == 2) {
          SKisOVer(that)
        }
        
     
        res.data.is_cartoon = res.data.is_cartoon == 1 && res.data.is_cartoon !=0 ? false : true;
        res.data.is_practice = res.data.is_practice == 1 && res.data.is_practice != 0? false:true;
        res.data.is_read_book = res.data.is_read_book == 1 && res.data.is_read_book != 0? false : true;
        res.data.is_story = res.data.is_story == 1 && res.data.is_story != 0? false : true;
        that.setData({
          SKInfo: res.data
        })
       
      }
      //已经上完课，再次上完课，跳转成绩页面
      if (wx.getStorageSync('showCJ') && res.data.is_all == 2) {
        setTimeout(() => {
          wx.redirectTo({
            url: `../schoolTeport/schoolTeport?src=cj&uid=${that.uid}&lid=${that.lid}&cid=${that.cid}`,
          })
        }, 1000)
        wx.removeStorageSync('showCJ')
        
      }
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//完成上课
function SKisOVer(that) {

  wx.showLoading({
    title: '加载中...',
  })
  let data = {
    userid: getApp().globalData.UserId,
    courseid: that.cid,
    "type": 'end'
  }
  let ajax = new Ajax({
    data,
    path: _interface.BKIsOver
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      if (res.data.is_ok) {
        wx.showToast({
          title: '上课完成',
          
        })
        // that.setData({
        //   showSKTip:true
        // })
        //两秒后跳转到成绩页面 navigateTo redirectTo
        setTimeout(()=>{
        
          // wx.navigateTo({
          //   url: `../schoolTeport/schoolTeport?src=cj&uid=${that.uid}&lid=${that.lid}&cid=${that.cid}`,
          // })
          wx.redirectTo({
            url: `../schoolTeport/schoolTeport?src=cj&uid=${that.uid}&lid=${that.lid}&cid=${that.cid}`,
          })
        },2000)
        
      }
    }
  })
  ajax.catch(err => {
    wx.showToast({
      title: '获取失败',
      icon: 'none'
    })
  })

}
//判断上课顺序
function SKClick(that){
  let { is_cartoon, is_read_book, is_story, is_practice } = that.data.SKInfo;
  let arr=[
    {
      item:1,
      flag:is_cartoon,
      msg:'请先看动画'
    },
    {
      item: 2,
      flag:is_read_book,
      msg: '请先读绘本'
    },
    {
      item: 3,
      flag: is_story,
      msg: '请先听故事'
    },
    {
      item: 4,
      flag: is_practice,
      msg: ''
    }
  ];
  let newarr = arr.slice(parseInt(that.item_select)-1, parseInt(that.item_select));

  let msg="";
  let isOK=true
  newarr.forEach(res=>{
    if (!res.flag )
    {
      msg = res.msg;
      isOK = res.flag
      return 
    }
  })


  console.log(isOK, msg)
  return { isOK, msg}
 

}
module.exports={
  getSKBaseInfo,
  SKClick
}