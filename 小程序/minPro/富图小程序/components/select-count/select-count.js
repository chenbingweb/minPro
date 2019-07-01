// components/select-count/select-count.js
import Ajax from "../../libs/Ajax.js";
import { User } from "../../model/user.js"
let _interface = require("../../utils/interface.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    quantity:{
      type:Number,
      value:0
    },
    fd:{
      type:String,
      value:''
    },
    ad:{//活动id
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count:0
  },
  created(){
    this.canClick=true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //添加购物车
    onAdd(){
      if (this.canClick==false) return
      this.canClick = false
      let counts = this.properties.quantity
      counts+=1
      
      let data={
        quantity: counts,
        id: this.data.fd,
        activity: this.data.ad || ''
      }
      User.addFoodToCart(data,(res)=>{
        this.setData({
          quantity: counts
        })
        if (res == false) {
          counts -= 1;
          this.setData({
            quantity: counts
          })
        }
        this.canClick = true
      })
    },
    //减少
    onReduce(){
      if (this.canClick == false) return
      let counts = this.properties.quantity;
      counts -= 1;
      // if(counts<=0) 
      // {
      //   //User.clearCart([this.data.fd])
      //   this.setData({
      //     quantity: counts
      //   })
      //  // return
      // }
      
      let data = {
        quantity: counts,
        id: this.data.fd,
        activity:this.data.ad || ''
      }
      User.addFoodToCart(data, (res) => {
        this.setData({
          quantity: counts
        })
      
        this.canClick = true
      })
    
    }
  }
})
