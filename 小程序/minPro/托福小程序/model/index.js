let _interface = require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import { UIEvent } from "../libs/UIEvent.js";
import {User} from "./user.js"
export default class Index{
  constructor(){
    this.wordsList=[];//词库列表
    this._initEvent()
  }
  _initEvent() {
    //开始配送
    this.doCollectEvent = new UIEvent();
    
  }
  //获取单词列表
  getIndex(callBack) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    
    var data = {
      token: User.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.thesaurusList
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        this.wordsList=res.data||[]
        callBack && callBack(res.data)
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //收藏 取消收藏
  doCollectOrCancelCollect(id, callBack, path= _interface.collection){
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })

    var data = {
      token: User.token,
      id
    }
    var ajax = new Ajax({
      data,
      path: path
    })
    ajax.then(res => {
      //wx.hideLoading()
      if (res.errcode == 0) {
        
        callBack && callBack(res.data);
        this.doCollectEvent.Emit(res.data)
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //获取生成本
  getCollectList(page, callBack){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    var data = {
      token: User.token,
      page
    }
    var ajax = new Ajax({
      data,
      path: _interface.collectList
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack && callBack(res.data);
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //获取生成本
  getPosterInfo(callBack) {
    
    var data = {
      token: User.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.getPoster
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack && callBack(res.data);
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
}
let index = new Index();
export { index as Index }