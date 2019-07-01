// components/wordPannel/wordPannel.js
var WxParse = require("../../wxParse/wxParse.js");
import {User} from "../../model/user.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    panelDetail:{
      type:Object,
      value:{},
      observer: function (newVal, oldVal) {
        var that = this;
        
        if (Object.keys(newVal).length) {
      
          //  let arr= newVal.instance.fin(newVal.name);
          //  console.log(arr)
          let reg = new RegExp(newVal.name, 'gi');
          let str = newVal.instance
          if (str) {
            str = str.replace(reg, `<span style="color:#009588"> ${newVal.name}</span>`)
          }
          console.log(str)
          WxParse.wxParse('article', 'html', '<div style="color:#666">'+str+'</div>', that, 5);
        }

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPanel:false,
    isLock:false
  },
  ready(){
    this.setData({
      isLock: User.isLock
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    openShow(){
      this.setData({
        showPanel:true
      })
    },
    onClose(){
      this.setData({
        showPanel: false
      })
    }
  }
})
