let _interface = require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import { UIEvent } from "../libs/UIEvent.js";
import {User} from "./user.js"
class PetInfo{
  constructor(){
    this.petInfo=null;
    this._initEvent();
    
  }
  _initEvent() {
    //登录
    this.setPetEvent = new UIEvent();
  }
  setPetInfo(val){
    this.petInfo=val;
    this.setPetEvent.Emit(val)
  }
  //获取宠物信息
  getPetInfo(callBack){
    let data = {
      token: User.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.getPetInfo
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode === 0) {
        if (res.data.pets_breeds) {
          callBack(res.data)
        }
        else {
          callBack(false)
        }


      } else if (parseInt(res.errcode) == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })


      }

      console.log(res)
    })
    ajax.catch(err => {

      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //保存宠物信息
  savePetInfo(userInfo, callBack) {
    let data = {
      token: User.token,
      ...userInfo
    }
    var ajax = new Ajax({
      data,
      path: _interface.savePetInfo
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack(true)


      } else if (parseInt(res.errcode) == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })


      }

      console.log(res)
    })
    ajax.catch(err => {

      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
}
let petInfo = new PetInfo();
export { petInfo as PetInfo }