// pages/tongTianTa/component/fight-success-tip/fight-success-tip.js
import { GameConn, WorldConn } from "../../../../dati_comm/libs/network/Conns.js";
import { CGRoom, StopFight } from "../../../../dati_comm/modules/CGRoom"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSucc:{
      type:Boolean,
      value:false,
      obserber:function(){
        
      }
    },
    //金币
    score:{
      type:Number,
      value:0
    },
    //当前闯关关卡
    gk:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据showSucc:false
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

    OnBack() {
      this.setData({
        showSucc: false
      },()=>{
        getApp().globalData.wnds.Wnd_FightTT.back()
        //StopFight()

        CGRoom.DoLeaveRoom()
      })
      
    },
    //继续调整
    OnGoOnFight(){
      GameConn.Request({n:'jxcg'},res=>{
        if (res.r==2)
        {
          wx.showModal({
            title: '提示',
            content: '您已闯关到最高层',
            showCancel: false,
            success:res=>{
              if(res.confirm)
              {
                getApp().globalData.wnds.Wnd_FightTT.back()
                //StopFight()
                CGRoom.DoLeaveRoom()
              }
            }
          })
          return
        }
        this.setData({
          showSucc: false
        })
        
      })
    }
  }
})
