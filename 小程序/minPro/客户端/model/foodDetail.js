let _interface = require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js"
import { User } from "./user.js"
import { Restautant } from "./restaurant.js";
import { RestaurantDetail } from "./restaurantDetail.js"
class FoodDetail {
  constructor() {
    this.foodDetail={};
    this.foodId=''
    this.initEvent()
  }
  //初始化绑定事件
  initEvent() {
    this.foodDetailEvent = new UIEvent();
  }
  
  //获取菜品详情信息
  getResDetail(food_id,showLoading = true,) {
    this.foodId=food_id;
    if (showLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    let ajax = new Ajax({
      path: _interface.getResDetail,
      data: {
        token:User.token,
        id: food_id
      }
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

        this.foodDetail = res.data;
        this.foodDetail.food_img=[];
        res.data.images.forEach(item=>{
          this.foodDetail.food_img.push({
            img_url:getApp().globalData.imgUrl + item
          })
        })
        wx.setNavigationBarTitle({
          title: this.foodDetail.name,
        })
        let status={
          love: res.data.vote_type == 'love'? true :false,//true 已经点赞 false 为没有点赞
          hate: res.data.vote_type == 'hate' ? true : false,//true 已经点赞 false 为没有点赞

        }
        this.foodDetailEvent.Emit(status)
        //获取用户是否点赞
      //  this.getThumbs()
        
      }
      else if(res.errcode==1)
      {
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
      else
      {
        wx.showToast({
          title:'系统繁忙',
          icon: 'none'
        })
      }
    })
    ajax.catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  }
  //获取用户点赞状态
  getThumbs(){
    let ajax = new Ajax({
      path: _interface.getThumbs,
      data: {
        token:User.token,
        food_id: this.foodId
      }
    })
    ajax.then(res => {

      if (res.errcode == 0) {
        this.foodDetailEvent.Emit(res.data)
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: 'none'
        })
      }
    })
    ajax.catch(err => {
      console.log(err)
    })
  }
  //点赞
  doThumbs(thumbs, tp){
    if (this.foodDetail.vote_type)
    {
      return 
    }
    let ajax = new Ajax({
      path: _interface.doThumbs,
      data: {
        token: User.token,
        id:this.foodId,//菜品id，
        type:thumbs   // love 喜欢 hate 不喜欢

        //food_id: this.foodId,
        //thumbs: thumbs,// love 喜欢 hate 不喜欢
        //'type': tp//1 点赞 2 取消点赞
      }
    })
    ajax.then(res => {

      if (res.errcode == 0) {
       // let data=res.data; foodDetail.love_count
        // let status = {
        //   love: this.foodDetail.vote_type == 'love' ? true : false,//true 已经点赞 false 为没有点赞
        //   hate: this.foodDetail.vote_type == 'hate' ? true : false,//true 已经点赞 false 为没有点赞

        // }
        if (thumbs=='love')
        {
          this.foodDetail.love_count +=1;
        }
        else
        {
          this.foodDetail.hate_count +=1 
        }
        this.getResDetail(this.foodId)
       
        //this.foodDetailEvent.Emit(status)
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: 'none'
        })
      }
    })
    ajax.catch(err => {
      console.log(err)
    })
  }
  //取消点赞
  cancelThumbs(thumbs,vid){
    // if (this.foodDetail.vote_type) {
    //   return
    // }
    let ajax = new Ajax({
      path: _interface.cancelThumbs,
      data: {
        token: User.token,
        id: vid,//菜品id，
       

        //food_id: this.foodId,
        //thumbs: thumbs,// love 喜欢 hate 不喜欢
        //'type': tp//1 点赞 2 取消点赞
      }
    })
    ajax.then(res => {

      if (res.errcode == 0) {
        // let data=res.data; foodDetail.love_count
        // let status = {
        //   love: this.foodDetail.vote_type == 'love' ? true : false,//true 已经点赞 false 为没有点赞
        //   hate: this.foodDetail.vote_type == 'hate' ? true : false,//true 已经点赞 false 为没有点赞

        // }
        if (thumbs == 'love') {
          this.foodDetail.love_count -= 1;
        }
        else {
          this.foodDetail.hate_count -= 1
        }
        this.getResDetail(this.foodId)

       // this.foodDetailEvent.Emit(status)
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: 'none'
        })
      }
    })
    ajax.catch(err => {
      console.log(err)
    })
  }

}
let foodDetail = new FoodDetail();
export { foodDetail as FoodDetail }