let _interface = require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js"
import { User } from "./user.js"
import {Index} from "../model/index.js"
class Restaurant {
  constructor() {
   this.restList=[];
   this.restArr={};
   this.currentPage=1;
   this.PageObj=null;
   this.initEvent()
  }
  //初始化绑定事件
  initEvent() {
    this.shopListEvent = new UIEvent();
  }
  
  set List(val) {
    
    if (val.length)
    {
      this.restArr['_'+this.currentPage] = val;
      
      // this.restList.push(...this.update());
      this.restList=this.update();

      this.shopListEvent.Emit(this.restList);
      
      this.currentPage += 1;
      setTimeout(()=>{
       // this.update()
       
      },1000)
     
      
    }
    else
    {
      this.currentPage=1
    }
  }
  list(){
    this.PageObj.setData({
      dataObj: {
        url: _interface.getNearShop || '',
        outData: {
          token: User.token,
          ...User.location
       //   page: this.currentPage
          // village_id: getApp().globalData.village_id,
          // key: '',
          // collect: ''//
        }
      }
    })
  }
  //设置餐厅id
  setRestaurantId(restaurant_id){
    User.restaurant_id = restaurant_id
    let ajax = new Ajax({
      path: _interface.setRestaurantId,
      data: {
        id:restaurant_id,
        token:User.token
      }
    })
    ajax.then(res => {
      if(res.errcode==0)
      {
        User.restaurant_id = restaurant_id
        Index._getPageInfo(false)
      }
    })
    ajax.catch(err=>{
      console.log(err)
    })
  }




  update(){
    let arr=[];
    let arrs=[]
    for (let key in this.restArr){
      arrs.push(this.restArr[key])
    }
    arrs.forEach(item=>{
      arr.push(...item)
    })
    
    return arr
  }
  //更新数据
  _update(){

    let that=this;
    (function data(i){
      if (i >= that.currentPage){

        return 
      }
      let ajax = new Ajax({
        path: _interface.getNearShop,
        data: {
          page_num: that.currentPage,
          page_size:10
        }
      })
      ajax.then(res => {
        if (res.errcode==0)
        {
          that.restList.forEach(item => {
            res.data.forEach(child => {
              if (item.id == child.id) {
                item = child;
              }
            })
          })
          that.shopListEvent.Emit(that.restList);
        }
       
        i++;
        data(i)
      })
      ajax.catch(err => {
        i++;
        data(i)
      })
    })(0)
  }
 
}
let restaurant = new Restaurant();
export { restaurant as Restaurant }