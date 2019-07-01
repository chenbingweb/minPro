let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"

//获取楼盘筛选条件
function getBuildFilterList(that) {
  var data = {
    id: that.bid
  }
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var ajax = new Ajax({
    data,
    path: _interface.buildFilterList
  })
  ajax.then(res => {
    wx.hideLoading();
    if (res.errcode == 0) {
      console.log(res.data)
      let house_type=[{name:'不限',id:''}]
      for (let key in res.data.house_type){
        house_type.push({
          name: res.data.house_type[key],
          id: key
        })
      }
      res.data.house_type = house_type
      res.data.lou_pan_list.unshift('全部')
      console.log('ceshh',res.data.lou_pan_list)
      that.setData({
        filterList: res.data
      })
    }
  })
  ajax.catch(err => {
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错了...',
    })
  })
}

module.exports = {
  getBuildFilterList
}



