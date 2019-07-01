let _interface = require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js"
import { User } from "./user.js"
class Index {
  constructor() {
    console.log('index')
    this.isSign = false;//默认未注册
    this.banner = [];//banner图
    this.foodRange = [];//菜品排行
    this.recommendFood = [];//推荐菜品
    this.initEvent();

  }
  //初始化绑定事件
  initEvent(){
    this.bannerEvent = new UIEvent();
    this.rangeEvent = new UIEvent();
    this.recommendEvent = new UIEvent();
    this.getStorageInfo()
  }
  //获取本地缓存
  getStorageInfo(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    wx.getStorage({
      key: 'indexInfor',
      success:res=>{
        wx.hideLoading()
        if(res.data)
        {
          //获取banner图
          if (res.data[0].errcode == 0) {
            this.banner = res.data[0].data||[];

            this.bannerEvent.Emit()
          }
          //获取菜品排行
          if (res.data[1].errcode == 0) {
            this.foodRange = res.data[1].data||[];

            this.rangeEvent.Emit()
          }
          //获取推荐菜品
          if (res.data[2].errcode == 0) {
            this.recommendFood = res.data[2].data||[];

            this.recommendEvent.Emit()
          }
        }
        
      },
    })
  }
  //获取首页
  _getPageInfo(showloading=true){
    
    if (showloading)
    {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
  
    Promise.all([this._getBanner(), this._foodRange(), this._recommontFood()]).then(res=>{
      
      wx.hideLoading()
      //获取banner图
      if (res[0].errcode == 0)
      {
        this.banner =res[0].data||[];
        this.banner.forEach(item=>{
          item.img_url = getApp().globalData.imgUrl + item.img_url 
        })
        this.bannerEvent.Emit()
      }
      //获取菜品排行
      if (res[1].errcode == 0) {
        this.foodRange = res[1].data||[];
        this.foodRange.forEach(item => {
          item.img_url = getApp().globalData.imgUrl + item.img_url
        })
        this.rangeEvent.Emit()
      }
      //获取推荐菜品
      if (res[2].errcode == 0) {
        this.recommendFood = res[2].data||[];
        this.recommendFood.forEach(item => {
          item.img_url = getApp().globalData.imgUrl + item.img_url
        })
        this.recommendEvent.Emit()
      }
      
      wx.setStorage({
        key: 'indexInfor',
        data: res,
      })
    }).catch(err=>{
      
      wx.showToast({
        title: '系统繁忙',
        icon: 'none'
      })
      console.log('')
    })
  }
  //获取首页banner图
  _getBanner(){
    let promise = new Promise((resolve, reject) => {
      
      var data = {
        token: User.token
      }
      var ajax = new Ajax({
        data,
        path: _interface.getBanner
      })
      ajax.then(res => {
        resolve(res)
        console.log(res)
      })
      ajax.catch(err => {
        reject(err)
        console.log(err)
      })
    })
    return promise
  }
  //获取菜品排行
  _foodRange(restaurant_id) {
    let promise = new Promise((resolve, reject) => {
      var data = {
        token: User.token,
        restaurant_id:restaurant_id || User.restaurant_id
      }
      var ajax = new Ajax({
        data,
        path: _interface.foodRange
      })
      ajax.then(res => {
        resolve(res)
        console.log(res)
      })
      ajax.catch(err => {
        reject(err)
        console.log(err)
      })
    })
    return promise
  }//获取菜品排行
  _recommontFood() {
    let promise = new Promise((resolve, reject) => {
      var data = {
        token: User.token
      }
      var ajax = new Ajax({
        data,
        path: _interface.recommontFood
      })
      ajax.then(res => {
        resolve(res)
        console.log(res)
      })
      ajax.catch(err => {
        reject(err)
        console.log(err)
      })
    })
    return promise
  }
  //更新菜品排行
  upDataRange(restaurant_id){
    this._foodRange(restaurant_id).then(res=>{
      if (res.errcode == 0) {
        //修改所属餐厅id
        User.restaurant_id = restaurant_id;
        this.foodRange = res.data;
        this.rangeEvent.Emit()
      }
    }).catch(err=>{

    })
  }
}
let index = new Index();
export { index as Index }