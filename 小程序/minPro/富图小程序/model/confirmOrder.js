let _interface = require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js"
import { User } from "./user.js"
import { Restautant } from "./restaurant.js";
import { RestaurantDetail } from "./restaurantDetail.js"
class ConfirmOrder {
  constructor() {
    this.markList=[];
    this.remark='';
    this.use_amount=true;
    this.useAmount=0
    this.initEvent()
    // this.getMarkList();
  }
  //初始化绑定事件
  initEvent() {
    this.confirmEvent = new UIEvent();
    this.remarkEvent=new UIEvent();
    
  }
  set remarkContent(value){
    this.remark=value;
    this.remarkEvent.Emit()
  }
  

  //获取购物车列表信息
  showCartList(isReduce=true,current=0){
    this.useAmount = 0;
    let total=0;
    let amount = parseFloat(current);
    User.cartList.forEach(item=>{
      total += parseInt(item.quantity) * parseFloat(item.price);
    })
    let pay =0;
    if (isReduce)
    {
      //User.amount
      pay = (total - amount <= 0) ? 0 : total - amount;
      this.useAmount = total >= amount ? amount : total;
      this.use_amount = true;
    }
    else
    {
      pay = total;
      this.use_amount = false;
    }
    pay = pay.toFixed(2)

    this.confirmEvent.Emit(pay)
  }

  //获取标签
  getMarkList() {
    let ajax = new Ajax({
      path: _interface.getMarkList,
      data: {
        token: User.token
      }
    })
    ajax.then(res => {

      if (res.errcode == 0) {
        this.markList=res.data;
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
  //微信支付
  wxPay(callBack) {
    wx.showLoading({
      title: '支付中...',
      mask:true
    })
    let ajax = new Ajax({
      path: _interface.wxPay,
      data: {
        token: User.token,
        amount: this.useAmount.toFixed ? this.useAmount.toFixed(2) : this.useAmount,
        id: User.restaurant_id,
        //foods: User.payFood,
        remark: this.remark
      }
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        let data = res.data;
        //微信支付
        if (data.order.status =='wait_pay')
        {
          Tool.WXpay(data.parameters).then(res => {
            console.log(res)
            // this.globalData.isOk=true;
            this.confirmPayment(data.order.id)
            callBack(res)
          }).catch(err => {
            // wx.hideLoading()
            wx.redirectTo({
              url: '../orderDetail/orderDetail?oid=' + data.order.id,
            })
            return 
            wx.showToast({
              title: '取消支付',
              icon: 'none'
            })

            setTimeout(()=>{
               
            },2000)

            console.log(err)
          })
        }
        else //余额支付成功
        {
          this.confirmPayment(data.order.id)
          callBack()
        }
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
  //确认支付接口 
  confirmPayment(id){
    let ajax = new Ajax({
      path: _interface.confirmPayment,
      data: {
        token: User.token,
        id
      }
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        let data=res.data;
        this.remarkContent=''
        //已经支付
        if (data.status =='wait_confirm')
        {
          wx.redirectTo({
            url: '../paySucc/paySucc?oid='+id,
          })
        }
        //支付错误
        else if (data.status == 'pay_error')
        {
          wx.showModal({
            title: '提示',
            content: '支付处理中，请点击确认查看最新结果',
            showCancel:false,
            success:res=>{
              if(res.confirm)
              {
                wx.showLoading({
                  title: '下单中...',
                })
                this.confirmPayment(id)
              }
            }
          })
        }
        //未支付
        else
        {
          wx.redirectTo({
            url: '../orderDetail/orderDetail?oid=' + id,
          })
        }
        
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
let confirmOrder = new ConfirmOrder();
export { confirmOrder as ConfirmOrder }