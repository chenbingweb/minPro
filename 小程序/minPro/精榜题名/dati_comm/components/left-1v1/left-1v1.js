// dati_comm/components/left-1v1/left-1v1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //玩家信息
    playLeft:{
      type:Object,
      value:{}
    },
    //分数
    score:{
      type:Number,
      value:0
    },
    //进度条是否显示
    showprocess:{
      type:Boolean,
      value:true
    },
    //百分比
    progress:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  ready:function(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setProgress(value) {
     // this.properties.progress = value;
      this.setData({
        progress:value
      })
    },
  }
})
