let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取用户备课状态
function getBKInfo(that){
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  var data = {
    userid:getApp().globalData.UserId||0,
    courseid:that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.getBKInfo
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
     if(res.data)
     {
       that.setData({
         BKInfo: res.data
       })
       that.isBuy = res.data.is_buy;
       that.diamonds = parseInt(res.data.diamonds);
       if (res.data['is_read_book'] != 0 && res.data['is_cartoon'] != 0 && res.data['is_story'] != 0 && res.data['is_practice'] != 0) {

         that.setData({
           BKOK: true
         })
       }
     }
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//用户没有购买课程，引导用户去购买
function toExchangeLesson(that){
  wx.showModal({
    title: '提示',
    content: that.UnlockPopup2,
    success(res){
      if(res.confirm)
      {
        //兑换
        exchangeFn(that, res=>{
          //兑换成功
          if (res.is_buy)
          {
            wx.showToast({
              title: '兑换成功',
              mask:true
            })
            that.isBuy = res.is_buy
            setTimeout(()=>{
              let src = that.innerSrc;
              let url=''
              if (src == 'bkPageRead') {
            
                url = `../readRecord/readRecord?src=bk&uid=${that.uid}&lid=${that.lid}&cid=${that.cid}`
              }
              else if (src == 'bkPagelook') {
              
                url = `../lookAnimation/lookAnimation?src=bk&uid=${that.uid}&lid=${that.lid}&cid=${that.cid}`
              }
              else if (src == 'bkPageStory') {
            
                url = `../listenStory/listenStory?src=bk&uid=${that.uid}&lid=${that.lid}&cid=${that.cid}`
              }
              else if (src == 'bkPagePractice') {
             
                url = `../exersiceBK/exersiceBK?src=bk&uid=${that.uid}&lid=${that.lid}&cid=${that.cid}`
              }
              that.setData({
                showTip: false
              })
              wx.navigateTo({
                url: url,
              })

            },2000)
           
            //修改魔药数量
            getApp().globalData.userIntegral.diamonds = res.diamonds;
            that.setData({
              ['BKInfo.m_diamonds']: that.data.BKInfo.m_diamonds- res.diamonds
            })
            
          }
          else//魔药不足，引导用户去商城
          {
            that.isBuy = res.is_buy
            isToShop(that)
          }

        })
       
      }
      else
      {
        that.setData({
          showTip: false
        })
      }
    }
  })
}
//兑换课程
function exchangeFn(that,callback){
  wx.showLoading({
    title: '兑换中...',
    mask: true
  })
  var data = {
    userid: getApp().globalData.UserId,
    courseid: that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.exchangeLesson
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      callback(res.data)
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
//跳转商城
function isToShop(that){
  let selfDiamonds = that.data.userIntegral.diamonds;
  //魔药不够，则提示用户跳转到商城
  if (selfDiamonds< that.diamonds) {
    wx.showModal({
      title: '提示',
      content: '对不起，您的魔药不够，请到商城购买或兑换',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../shop/shop',
          })
        }
        else {
          that.setData({
            showTip: false
          })
        }
      }
    })
  }
  else //去兑换课程
  {

  }
}
//完成备课
function BKisOVer(that){
  wx.showLoading({
    title: '加载中...',
  })
  let data = {
    userid: getApp().globalData.UserId,
    courseid: that.cid,
    "type":'prepare'
  }
  let ajax = new Ajax({
    data,
    path: _interface.BKIsOver
  })
  ajax.then(res=>{
    wx.hideLoading()
    if (res.errcode == 0) {
      if (res.data.is_ok)
      {
        if (res.data.gold)
        {
          that.setData({
            showBKTip:true,
            gold: res.data.gold
          })
        }
        else
        {
          // wx.showToast({
          //   title: '备课完成',
          // })
          that.setData({
            showBKTip: true,
            gold:0
          })
          // setTimeout(() => {
          //   wx.navigateBack({
          //     delta: 1
          //   })
          // }, 2000)
        }
       
      }
    }
  })
  ajax.catch(err=>{
    wx.showToast({
      title: '获取失败',
      icon: 'none'
    })
  })

}
module.exports={
  getBKInfo,
  toExchangeLesson,
  BKisOVer
}