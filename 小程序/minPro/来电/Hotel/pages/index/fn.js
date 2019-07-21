let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
import { User } from "../../model/user.js";
import { Location } from "../../model/map.js";
//获取banner 
export function getNearList(pos,that) {
  wx.showNavigationBarLoading()
  var data = {
    latitude: pos.latitude,
    longitude: pos.longitude
  }
  var ajax = new Ajax({
    data,
    path: _interface.getNearList  // _interface.get_shop_banner //
  })
  ajax.then(res => {
    wx.hideNavigationBarLoading()
    wx.hideLoading()
    if (res.errcode == 0) {
      let pos = [];
      let includePoints=[]
      that.setData({
        markers: [],
        includePoints: [],
      })
      wx.getImageInfo({
        src: '../../images/cc_icon.png',
        success({ width, height }) {
          res.data.forEach((item, index) => {
            let { latitude, longitude } = item;
            pos.push(Location.createMarker(latitude, longitude, index, width * 0.7, height * 0.7, '../../images/cc_icon.png'));
            includePoints.push({
              latitude,
              longitude
            })
          })
          that.setData({
           
            markers: pos,
            includePoints: res.data
          })
          User.posArr=res.data;
           setTimeout(()=>{
             that.isPos = true;
           },500)
          
        }
      })
    

    }
    else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }


  })
  ajax.catch(err => {
    that.isPos = true;
    console.log(err)
  })
}