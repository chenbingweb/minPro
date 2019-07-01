// components/item/item.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String,
      value:''
    },
    tid:{
      type: String,
      value: ''
    },
    item:{
      type:Object,
      value:{}
    },
    playFlag:{
      type:Boolean,
      value:false
    },
    tab:{//tab类型
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playFlag:false
  },
  created:function(){

  },
  ready:function(){

   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onToDetail:function({currentTarget}){
      let { url } = currentTarget.dataset;
      if (this.properties.tab !='audio')
      {
        wx.navigateTo({
          url: `../toolDetail/toolDetail?tid=${this.properties.tid}&tab=${this.properties.tab}&src=${this.properties.src}`,
        })
        if (this.properties.tab =='video')
        {
            wx.setStorage({
              key: 'url',
              data: url,
            })
        }
      }
    },
    onPlayMusic:function({currentTarget}){
     // this.audio.stop();
      let { audio,aid } = currentTarget.dataset;
     
     
      var myEventDetail = { audio: audio,aid:aid }  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项

      this.triggerEvent('playAudio', myEventDetail, myEventOption)

    }
  }
})
