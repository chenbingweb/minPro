// components/accounts/accounts.js
import Ajax from "../../libs/Ajax.js";
import { User } from "../../model/user.js"
let _interface = require("../../utils/interface.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      User.getCartList()
    },
    hide: function () { },
    resize: function () { },
  },
  /**
   * 组件的初始数据 this.cartList=[];//购物车列表
    this.totalCount=0;//购物车数量
   */
  data: {
    show:false,
    cartList:[],
    totalCount:0,
    totalPrce:0.00
  },
  created(){
    // User.cartInfo.Off(this.cartInfo)
    User.cartInfo.On(this, this.cartInfo)
   
  },
  ready(){
    User.getCartList()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //购物车信息
    cartInfo(){
      this.setData({
        cartList: User.cartList,
        totalCount: User.totalCount,
        totalPrce: User.totalPrce
      })
      if (User.cartList.length==0)
      {
        this.setData({
          show: false,
        })
      }
      // if (User.totalCount==0)
      // {
      //   this.setData({
      //     show: false
      //   })
      // }
    },
    //清空购物车
    onClearAll(){
      User.clearCart(()=>{
        this.setData({
          show:false
        })
      })

    },
    onShowList(){
      if (this.data.totalCount==0)
      {
      
        return
      }
      if(this.data.show==false)
      {
        this.setData({
          show: true
        })
      }
      else
      {
        this.setData({
          show: false
        })
      }
      
    },
    onHideList(){
      this.setData({
        show: false
      })
    },
    //跳转下单页面 confirmOrder
    onToConfirm(){
      wx.navigateTo({
        url: '../confirmOrder/confirmOrder',
      })
    }
  }
})
