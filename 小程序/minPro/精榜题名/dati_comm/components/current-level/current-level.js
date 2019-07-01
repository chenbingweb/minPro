// dati_comm/components/current-level/current-level.js

import { FightRoom, StopFight } from "../../modules/FightRoom"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dwItems: {
      type: Object,
      value: {},
      observer:function(n,o){
        if (n.Level2)
        {
          this.setData({
            StarNum:new Array(parseInt(n.Level2)),
            noStarNum: new Array(n.star - parseInt(n.Level2)),
            totalStar: n.star
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    js_middle_width:'',
    StarNum:[],
    noStarNum:[],
    totalStar:8
  },
  ready:function(){
    setTimeout(()=>{
      this.setData({ js_middle_width: 'js_middle_width' })
    },1000)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    OnToFight({ currentTarget }) {
      let { mp } = currentTarget.dataset;
      FightRoom.StartPK(7, 0, 200)
      //传入信息
      getApp().globalData.wnds.Wnd_Ready.info = {
        mp: mp||0,
        dwItems: this.properties.dwItems
      }
      
    }
  }
})
