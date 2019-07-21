import _interface from "../../interface"
import Ajax from "../../libs/ajax";
import { User } from "../../model/user.js";
//获取banner 
export function getNearList(sid, that) {
  my.showLoading({
    title: '加载中...',
  })
  var data = {
    id:sid,
    ...User.location
  }
  var ajax = new Ajax({
    data,
    path: _interface.getNearList  // _interface.get_shop_banner //
  })
  ajax.then(res => {
    my.hideLoading()
    if (res.errcode == 0) {
     
      that.setData({
        detail:res.data[0]
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