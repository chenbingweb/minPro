// components/recorder/recorder.js
import Power from "../../libs/getUserPower.js"
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
  
  },
  queryMultipleNodes: function () {
    var query = wx.createSelectorQuery().in(this)
    query.select('#rec').boundingClientRect(function (res) {
      res.top // 这个组件内 #the-id 节点的上边界坐标
    }).exec()
  },
  created:function(){
    let myEventOption = {
      bubbles: false,
      composed: false,
      capturePhase: false
    }
    this.power=new Power();
    //是否可点
    this.isClick=false;
    this.sendFlag=true
    this.recorderManager = wx.getRecorderManager()

    this.recorderManager.onStart(() => {
      console.log('recorder start')
     
    })
    this.recorderManager.onResume(() => {
      console.log('recorder resume')
    })
    this.recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    this.recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res;
     
      if (this.sendFlag)
      {
        this.triggerEvent('recordStop', res)
        this.triggerEvent('status', { status: 'up' })
      }
      else
      {
        this.triggerEvent('status', { status: 'stop' })
      }
     
    })
    this.recorderManager.onFrameRecorded((res,isd) => {
      const { frameBuffer } = res
      console.log(frameBuffer)
      console.log(isd)
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    this.options = {
      duration: 60000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }

  },
  /**
   * 组件的方法列表
   */
  methods: {
    startRecord:function(e){
      if (!this.isClick) return 
      var query = wx.createSelectorQuery().in(this)
      query.select('#rec').boundingClientRect(res=> {
        this.top=res.top;
        this.left=res.left;
        this.right=res.right;
        this.bottom=res.top+res.height;
        
      }).exec()
      let self=this;
          // wx.showLoading({
          //   title: '录音中',
          // })
        this.triggerEvent('status', { status:'start' })
      self.recorderManager.start(self.options)
      // this.power.resolveEvent({
      //   auth: 'scope.record',
      //   succ(res) {//成功
      //     // console.log(e.touches)
      //     wx.showLoading({
      //       title: '录音中',
      //     })
      //     self.recorderManager.start(self.options)
      //   },
      //   fail(err) {//失败
      //     // self.power.openSetting({
      //     //   auth: 'scope.record',
      //     //   succ(res) {//成功
      //     //     //self.recorderManager.start(self.options)
      //     //   },
      //     //   fail(err) {//失败
      //     //     console.log(err)
      //     //   }
      //     // })
      //     console.log(err)
      //   }
      // })
     
    },
    move:function(e){
     
      let title ="录音中";
      let btn = e.touches[0];
      let clientX = btn.clientX;
      let clientY = btn.clientY;
      let status ='recording';
      if (clientY < this.top || clientY > this.bottom || clientX < this.left || clientX>this.right)
      {
        title = "停止录音";
        if (this.sendFlag)
        {
          // wx.hideLoading()
          // wx.showLoading({
          //   title: title,
          // })
          
          this.sendFlag = false;
        }
        status = "cancel"
        console.log('out')
        //this.recorderManager.pause() //
       
        this.sendFlag=false;
        
      }
      else
      {
        title = "录音中";
        if (!this.sendFlag) {
          // wx.hideLoading()
          // wx.showLoading({
          //   title: title
          // })
          status = "recording"
        }
        this.sendFlag = true;
      //  this.recorderManager.resume() //reStatus
      }
      this.triggerEvent('status', { status})
     
      // let sendM = {};
      // let ev = { bubbles: false, composed: false, capturePhase: false }
      // this.triggerEvent('record', sendM, ev) // 只会触发 pageEventListener2
    },
    //停止录音
    endRecord:function(){
      this.recorderManager.stop()     
      wx.hideLoading()
      this.triggerEvent('status', { status: 'stop' })
      
      if (!this.sendFlag ) 
      {
       
      }
    
    },
    //触摸开始
    start:function(){
    let self=this;
    let obj = {
      auth: 'scope.record',
      succ(res) {//成功
        self.sendFlag = true
        self.isClick=true
      },
      fail(err) {//失败
        console.log(err)
        self.isClick =false
      }
    }
    this.power.resolveEvent({
        auth: 'scope.record',
        succ(res) {//成功
          self.sendFlag = true;
          self.isClick = true
        },
        fail(err) {//失败
          self.isClick = false
          self.power.openSetting(obj)
          console.log(err)
        }
      })
      //this.sendFlag=true;
      
    },
    //取消录音
    cancelEvent:function(){
      this.sendFlag = false;
      this.recorderManager.stop()
      wx.hideLoading()
      this.triggerEvent('status', { status: 'stop' })
      console.log('------>cancel')
    }
  }
})
