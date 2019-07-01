// dati_comm/components/right-1v1/right-1v1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playRight:{
      type:Object,
      value:{}
    },
    score:{
      type:Number,
      value:0
    },
    //进度条是否显示
    showprocess: {
      type: Boolean,
      value: true
    },
    //百分比
    progress: {
      type: Number,
      value: 0
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
    setProgress(value) {
      this.setData({
        progress:value
      })
    },
  }
})
