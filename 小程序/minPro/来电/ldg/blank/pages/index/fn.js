import _interface from "../../interface"
import Ajax from "../../libs/ajax"
import  Location  from "../../model/map.js";
import { User } from "../../model/user.js";
export function getNearList(pos,that) {
my.showNavigationBarLoading();
  var data = {
    ...pos
  }
  var ajax = new Ajax({
    data,
    path: _interface.getNearList  // _interface.get_shop_banner //
  })
  ajax.then(res => {
    my.hideNavigationBarLoading();
    if (res.errcode == 0) {
      let pos = [];
      let includePoints=[]
      // that.setData({
      //   markers: [],
      // })
      my.getImageInfo({
        src: 'images/cc_icon.png',
        success({ width, height }) {
          res.data.forEach((item, index) => {
            let { latitude, longitude } = item;
            pos.push(Location.createMarker(latitude, longitude, index, width * 0.7, height * 0.7, '/images/cc_icon.png'));
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
        },
        fail:err=>{
          console.log(err)
        }
      })
    

    }
    else {
      
      my.showToast({
        title: res.msg,
        icon: 'none'
      })
    }


  })
  ajax.catch(err => {

    console.log(err)
  })
}