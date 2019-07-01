// pages/subPackages/components/level-succ/level-succ.js
//import { Player } from "../../../../modules/Player.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSucc:{
      type: Boolean,
      value:false,
      observer:function(n,o){
     
      }
    },
    img:{
      type: String,
      value: '',
    },
    cc:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },  

  /**
   * 组件的方法列表
   */
  methods: {
    OnBack(){
      this.setData({
        showSucc:false
      })
    },
    OnFight(){
      this.triggerEvent('fight', {})
    }
  }
})
