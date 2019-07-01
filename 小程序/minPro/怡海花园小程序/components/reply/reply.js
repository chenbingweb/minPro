// components/reply/reply.js
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
    showBox:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShowReply:function(){
      if (this.data.showBox)
      {
        this.setData({
          showBox: false
        })
      }
      else
      {
        this.setData({
          showBox: true
        })
      }
    }
  }
})
