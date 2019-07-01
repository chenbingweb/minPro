// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    
    inputShowed: true,
    inputVal: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
       // inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
      var myEventDetail = { value: '' }  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项

      this.triggerEvent('clearInput', myEventDetail, myEventOption)
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    //搜索
    confirm:function({detail,currentTarget}){
      let {value}=detail;
      let { key } = currentTarget.dataset;
      if(key)
      {
        value = key
      }
      
      var myEventDetail = { value: value}  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项

      this.triggerEvent('startSearch', myEventDetail, myEventOption)
    }
  }
})
