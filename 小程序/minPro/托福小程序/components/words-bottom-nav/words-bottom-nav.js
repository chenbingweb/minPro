// components/nav-bar-bottom/nav-bar-bottom.js
import Tool from "../../libs/Tool.js"
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
 
  },
  ready(){
    this.setData({
      islongP: Tool.isLongP()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
  
  }
})
