let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取房源信息
function getHouseDetail(that) {
  wx.showLoading({
    title: '加载中...',
  })
  let data = {
    id:that.bid
  }
  let ajax = new Ajax({
    data,
    path: _interface.getHouseDetail
  })
  ajax.then(res=>{
    wx.hideLoading()
    if(res.errcode==0)
    {
      // res.data.otherRecomm.forEach(item => {
      //   getApp().globalData.areaList.areaList.forEach(child => {
      //     if (parseInt(item.area) == parseInt(child.id)) {
      //       item.area = child.name
      //     }
      //   })
      // })
      res.data.tag = res.data.tag.join(' | ')
      //转换图片
      res.data.img_url = res.data.img_url.map((item, index) => {
        return {
          img_url: item,
          id: index
        }
      })
      let alist = that.data.arrList
      alist.forEach((item,index)=>{
        if (res.data.cof.includes(item.id))
        {
          item.selected=true
        }
        else
        {
          item.selected = false
        }
      })
     let creatDate = Tool.formatTime(new Date(parseInt(res.data.create_at)*1000),'-');
     res.data.create_at_time = creatDate
     res.data.create_at = creatDate.split('-')[0] + '年' + creatDate.split('-')[1] +'月'+ creatDate.split('-')[2]+'日'
      that.setData({
        arrList: alist,
        houseDetail:res.data
      })
    }
  })
  ajax.catch(err=>{
    wx.hideLoading()
    wx.showToast({
      title: '服务器报错了',
      icon:'none'
    })
  })
}
module.exports = {
  getHouseDetail
}