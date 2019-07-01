// components/reply/reply.js
let _interface=require("../../utils/interface.js");
import Ajax from "../../libs/Ajax.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    eid:{
      type:String,
      value:''
    },
    showBox:{
      type:Boolean,
      value:false
    }
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
      if (!getApp().isBlack()) return 
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
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
 
      this.triggerEvent('toggle', { showBox: this.data.showBox,component:this}, myEventOption)
    }, 
    onSend:function({detail}){
      let {value}=detail;
      if (value.replay=='')
      {
        wx.showToast({
          title: '请输入回复内容',
          icon:'none'
        })
        return 
      }
      wx.showLoading({
        title: '发送中...',
        mask:true
      })
      value.content = value.replay
      value.id = this.data.eid;
      value.userId=getApp().globalData.userId;
      let ajax = new Ajax({
        path: _interface.replayEval,
        data: value
      })
      ajax.then(res=>{
       
        if(res.errcode!=0)
        {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return 
        }
        wx.hideLoading()
        var myEventDetail = { eid: this.data.eid, replay: value.replay }  // detail对象，提供给事件监听函数
        var myEventOption = {
          bubbles: false,
          composed: false,
          capturePhase: false
        } // 触发事件的选项
        this.setData({
          showBox: false
        })
        this.triggerEvent('sendReplay', myEventDetail, myEventOption)
      })
      ajax.catch(err=>{
        wx.hideLoading()
        wx.showToast({
          title: '服务器错误',
          icon:'none'
        })
      })
      console.log(value)
    }
  }
})
