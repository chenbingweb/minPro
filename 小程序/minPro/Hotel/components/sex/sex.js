// components/sex/sex.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    checked:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange:function({detail}){
      let {value}=detail;
      this.setData({
        checked:value=='1'?false:true
        })
      var myEventDetail = { sex: value}  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项

      this.triggerEvent('sex', myEventDetail, myEventOption)
      console.log(value)
    }
  }
})
