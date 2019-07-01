// dati_comm/components/fight-3v3-page/fight-3v3-page.js
 import { GameConn, WorldConn } from "../../libs/network/Conns";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object,
      value:{}
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
    Back(){
       WorldConn.Close()//关闭世界链接
      wx.navigateBack({ delta: 1 })
    },
    OnStart(){
      this.option = { bubbles: false, composed: false, capturePhase:false }
      this.triggerEvent('startFighr', {}, this.option) 
    }
  }
})
