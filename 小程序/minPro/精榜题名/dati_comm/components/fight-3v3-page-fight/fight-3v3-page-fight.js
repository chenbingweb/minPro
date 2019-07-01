// dati_comm/components/fight-3v3-page-fight/fight-3v3-page-fight.js
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
  ready:function(){
    this.option = { bubbles: false, composed: false, capturePhase:false }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    Back(){
      // WorldConn.Close()//关闭世界链接
      wx.navigateBack({ delta: 1 })
    },
    OnButtonClick(){
      this.triggerEvent('ButtonClick', {}, this.option ) 
    },
    OnShopTouchStart() {
      this.triggerEvent('ShopTouchStart', {}, this.option)
    },
    OnShopTouchEnd() {
      this.triggerEvent('ShopTouchEnd', {}, this.option)
    },
    onAniEnd() {
      this.triggerEvent('AniEnd', {}, this.option)
    }
    
  }
})
