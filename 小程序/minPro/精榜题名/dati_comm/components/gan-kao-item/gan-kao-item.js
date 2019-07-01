// dati_comm/components/gan-kao-item/gan-kao-item.js
import { FightRoom, StopFight } from "../../modules/FightRoom"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dwItems:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTip:false
  },
  ready:function(){
    //卷轴添加动画
    // setTimeout(()=>{
    //   this.setData({ js_middle_width: 'js_middle_width' })
    // },1000)
    
  },
  /**
   * 组件的方法列表 FightRoom.StartPK(7)
   */
  methods: {
    OnShow({currentTarget}){
      return 
      let {show}=currentTarget.dataset;
      if(show)
      {
        this.setData({
          showTip:true
        })
        setTimeout(()=>{
          this.setData({
            js_middle_width:"js_middle_width"
          })
        },500)
      }
    },
    OnToFight({currentTarget}){
      
      let {mp,show,s}=currentTarget.dataset;
      console.log(s)
      if(!show) return 
      FightRoom.StartPK(7,s,200)
      //传入信息
      getApp().globalData.wnds.Wnd_Ready.info={
        mp:mp
      }
    }
  }
})
