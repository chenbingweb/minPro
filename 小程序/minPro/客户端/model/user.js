let _interface=require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js";
import { Index } from "./index.js";
import { RestaurantDetail } from "./restaurantDetail.js";
import { ConfirmOrder } from "./confirmOrder.js"
import UserPower from "../libs/getUserPower.js";


class User{
  constructor(){
    this.power = new UserPower();
    this.isPower()
    this.isSign=false;//默认未注册
    this.token='';//用户id
    this.restaurant_id = '';//所属餐厅
    this.mobile='';//手机号码
    this.birthday="";//生日
    this.amount=0;//金额
    this.location='';//用户当前坐标
    this.is_vip=false;//是否是餐厅会员
    this.cartList=[];//购物车列表
    this.payFood=[];//需要支付的菜品;
    this.clearFood=[];//清空所有菜品
    this.totalCount=0;//购物车数量
    this.totalPrce=0.00;//总价格
    this._initEvent()
    this.UserToLogin()
    this.time =30*60*1000;// 60 * 1000 * 1000;
    this.CanClick=false;
    this.currentAmount=0;
  }
  _initEvent(){
    //登录
    this.login = new UIEvent();
    this.getLocalSucc=new UIEvent();
    this.getLocalFail=new UIEvent();
    this.isLocationPower=new UIEvent();
    this.amountEvent=new UIEvent();
    this.cartInfo=new UIEvent()
  }
  //获取用户地理位置是否授权
  isPower(){
    let that=this;
    this.power.resolveEvent({
      auth: 'scope.userLocation',
      succ(res) {//成功
        console.log(res)
        that.isLocationPower.Emit(true)
      },
      fail(err) {//失败
        console.log(err)
        that.isLocationPower.Emit(false)
      }

    })
  }
  //第一次登录
  UserToLogin(callback) {
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        if (parseInt(res.errcode) == 0) {
          that.CanClick=true;
          //用户id
          that.token = res.data.token||'';
          //是否注册
          that.isSign = res.data.mobile==''?false:true;
          //点餐店铺
          that.restaurant_id = res.data.restaurant_id || "";
          //手机号码
          that.mobile = res.data.mobile||'';
          //生日
          that.birthday = res.data.birthday||'';
          //金额
          that.amount = res.data.amount||0;
          if(that.amount)
          {
            that.amountEvent.Emit()
          }
          //是否是vip
          that.is_vip=res.data.is_vip;
          //触发事件
          that.login.Emit(that.isSign);
          //初始化首页
          Index._getPageInfo();
          ConfirmOrder.getMarkList()
          callback && callback(that.token)

          that.UserToLoginTwo()
        }
        if (parseInt(res.errcode) == 404){
          //触发事件
          that.login.Emit(that.isSign);
          wx.removeStorage({
            key: 'indexInfor',
            success: function(res) {},
          })
        }
        else if (parseInt(res.errcode) == 1){
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
        }
        else 
        {
          if (that.token  == '') {
            wx.showToast({
              title: '系统繁忙',
              icon: "none",
              mask: true
            })
          }

        }

      },
      loginFail(err) { //登录失败(必传)
        that.UserToLoginTwo()
        if (that.token  == '') {
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })
        }
        console.log(err)
        callback && callback(err)

      }
    })
  }
  //第一次登录
  UserToLoginTwo(callback) {
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        if (parseInt(res.errcode) == 0) {
          that.CanClick = true;
          //用户id
          that.token = res.data.token || '';
          //是否注册
          that.isSign = res.data.mobile == '' ? false : true;
          //点餐店铺
          that.restaurant_id = res.data.restaurant_id || "";
          //手机号码
          that.mobile = res.data.mobile || '';
          //生日
          that.birthday = res.data.birthday || '';
          //金额
          that.amount = res.data.amount || 0;
          if (that.amount) {
            that.amountEvent.Emit()
          }
          //是否是vip
          that.is_vip = res.data.is_vip;
          //触发事件
          that.login.Emit(that.isSign);
          //初始化首页
        //  Index._getPageInfo();
          //ConfirmOrder.getMarkList()
          callback && callback(that.token)
          setTimeout(() => {
            that.UserToLoginTwo()
            console.log(0)
          }, that.time)
        }
        // if (parseInt(res.errcode) == 404) {
        //   //触发事件
        //   that.login.Emit(that.isSign);
        // }
        // else if (parseInt(res.errcode) == 1) {
        //   wx.showToast({
        //     title: res.msg,
        //     icon: "none"
        //   })
        // }
        // else {
        //   if (that.token == '') {
        //     wx.showToast({
        //       title: '系统繁忙',
        //       icon: "none",
        //       mask: true
        //     })
        //   }

        // }

      },
      loginFail(err) { //登录失败(必传)
        if (that.token == '') {
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })

        }
        setTimeout(() => {
          that.UserToLoginTwo()
          console.log(0)
        }, that.time)
        console.log(err)
        callback && callback(err)

      }
    })
  }
  //获取附近店铺列表
  getNearShopList(){
    if (this.restaurant_id!=='')
    {
      this.getLocalSucc.Emit()
      return
    }
    wx.showLoading({
      title: this.restaurant_id==''? '定位中...':'加载中...',
    })
    
    Tool.getLocation({}).then(res=>{
      wx.hideLoading()
      this.location=res;
      this.getLocalSucc.Emit(res)
    }).catch(err=>{
     this.getLocalSucc.Emit(true)
     return
      this.getLocalFail.Emit(false)
      wx.showToast({
        title: err.errMsg,
        icon:'none'
      })
      console.log(err)
     
    })
  }
  //添加购物车
  addFoodToCart(data,callBack){
    // wx.showLoading({
    //   title: '添加中...',
    //   mask:true
    // })
    var data = {
      token: this.token,
      ...data
    }
    var ajax = new Ajax({
      data,
      path: _interface.addCart
    })
    ajax.then(res => {
      wx.hideLoading()
      if(res.errcode==0)
      {
        // wx.showToast({
        //   title: '添加成功',
        //   mask: true
        // })
        this.getCartList()
        callBack()
      } else if (parseInt(res.errcode) == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        callBack(false)
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })
        callBack(false)

      }

      console.log(res)
    })
    ajax.catch(err => {
      callBack()
      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //获取购物车列表
  getCartList(){
    let that=this;
    var data = {
      token: this.token,
      id: this.restaurant_id,
    }
    var ajax = new Ajax({
      data,
      path: _interface.getCartList
    })
    ajax.then(res => {

      if (res.errcode == 0) {
        let data=res.data;
        that.currentAmount = res.amount;
        that.computeCount(data)
      }
      else if(res.errcode==1)
      {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
      else
      {
        wx.showToast({
          title: '系统繁忙',
          icon:"none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {

      console.log(err)
    })
  }
  //计算数量和价格
  computeCount(data){
    this.cartList = [];
    this.clearFood=[]
    this.payFood=[]
    this.totalCount=0;
    this.totalPrce=0;
    if(data.length)
    {  //更新菜品数量
     
      data.forEach(item=>{
        item.img_url=getApp().globalData.imgUrl+item.img_url;
        this.payFood.push({
          food_id:item.food_id,
          quantity: item.quantity
        })
        this.clearFood.push(item.food_id)
        this.totalCount += parseInt(item.quantity);
        this.totalPrce += parseInt(item.quantity) * parseFloat(item.price);
        item.totalPrice = (parseInt(item.quantity)*parseFloat(item.price)).toFixed(2)
      })
      this.cartList = data;//购物车列表;
     
      this.totalPrce = parseFloat(this.totalPrce).toFixed(2)
      
    }
    RestaurantDetail.upDataFood()
    this.cartInfo.Emit()

  }
  //清除购物车
  clearCart(callBack){
    wx.showLoading({
      title: '正在清除中...',
      mask:true
    })
    var data = {
      token: this.token,
      id: this.restaurant_id,
     // food_id: food_id || this.clearFood
    }
    var ajax = new Ajax({
      data,
      path: _interface.clearCart
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack && callBack()
        this.getCartList()
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
  //保存个人信息
  saveInfo(birthday){
    wx.showLoading({
      title: '保存中...',
      mask:true
    })
    var data = {
      token: this.token,
      birthday: birthday
    }
    var ajax = new Ajax({
      data,
      path: _interface.saveInfo
    })
    ajax.then(res => {
      if (res.errcode == 0) {
        wx.showToast({
          title: '保存成功',
        })
        this.UserToLogin(()=>{
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        })
       
       
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
let user=new User();
export { user as User }