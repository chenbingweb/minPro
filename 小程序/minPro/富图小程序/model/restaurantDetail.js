let _interface = require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js"
import { User } from "./user.js"
import { Restautant } from "./restaurant.js"
class RestaurantDetail {
  constructor() {
    this.restaurantInfo={}
    this.foodList = [];
    this.food_category = [];
    this.cid=''
    this.timmer=null;
    //当前餐厅于额
    this.currentAmount=0
    this.initEvent()
  }
  //初始化绑定事件
  initEvent() {
    this.resDetailEvent = new UIEvent();
  }
  set foodListValue(val){
    this.foodList = val;
    this.resDetailEvent.Emit()
  }
  //获取店铺详情信息
  getResDetailInfo(showLoading=true,cid) {
    if (showLoading)
    {
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
    }
    let ajax = new Ajax({
      path: _interface.getResDetailInfo,
      data: {
        ...User.location,
        id: User.restaurant_id ,
        token: User.token
      }
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        res.data.food_category = [{ id: 'all', name: '全部', sort: 0 }, ...res.data.food_category]
        this.restaurantInfo=res.data;
        console.log(this.restaurantInfo.food_category)
        this.currentAmount = res.data.amount;
        this.restaurantInfo.logo_url = getApp().globalData.imgUrl + this.restaurantInfo.logo_url
        this.restaurantInfo.img_url = getApp().globalData.imgUrl + this.restaurantInfo.img_url
        if (this.restaurantInfo.food && this.restaurantInfo.food.length)
        {
          this.restaurantInfo.food.forEach(item => {
            item.img_url = getApp().globalData.imgUrl + item.img_url
          })
          
          this.getFood(cid || res.data.food_category[0].id)

        }
        else
        {
          this.foodListValue =[]
        }
       
        //this.setCategory(res.data.food_category[0].id) 
     
        wx.setNavigationBarTitle({
          title: this.restaurantInfo.name,
        })
      }
      
    })
    ajax.catch(err => {
      console.log(err)
    })
  }
  //根据分类，获取菜品列表
  getFood(cid){
    this.foodList = [];
    this.cid=cid
    this.setCategory(cid)
    
    this.restaurantInfo.food.forEach(item=>{
      item.quantity=0;
      if (cid == 'all') {
        this.foodList.push(item)
        
      }else if(item.category_id==cid)
      {
        this.foodList.push(item)
        
      }
     
      
    })
    this.foodListValue = this.foodList 
    this.upDataFood() 
  }
  //选择菜品种类
  setCategory(cid){
    this.restaurantInfo.food_category.forEach(item => {
      if (item.id == cid) {
        item.selected = true
      }
      else {
        item.selected = false
      }
    })

  }
  //修改菜品列表信息
  upDataFood() {
   // this.timmer =setInterval(()=>{
      if (this.foodList.length)
      {
        clearInterval(this.timmer);
        this.timmer=null;
        this.foodList.forEach(item=>{
          item.quantity=0
          if (User.cartList.length)
          {
            User.cartList.forEach(child => {
              if (item.activity)
              {
                if (item.activity.id == child.activity_id) {
                  item.quantity = child.quantity
                }
              }
              else
              {
                if (item.id == child.food_id) {
                  item.quantity = child.quantity
                }
              }
              
              
            })
          }
          else
          {
            item.quantity=0;
          }
         
        })
        this.foodListValue = this.foodList
      }
   // },500)
  }
  //修改当前

}
let restaurantdetail = new RestaurantDetail();
export { restaurantdetail as RestaurantDetail }