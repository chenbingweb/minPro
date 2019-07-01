// dati_comm/components/user-info/user-info.js
import { Player } from "../../../modules/Player"
import { Msg } from "../../libs/oosync/OOMsg.js"
let qc_levle=[
        '初出茅庐',
        '小试牛刀',
        '后起之秀',
        '锋芒毕露',
        '行侠仗义',
        '名动一方',
        '武林豪杰',
        '战无不胜',
        '斗战胜佛'
        ]
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showMsg:{
      type:Boolean,
      value:true
    },
    msg:{
      type:String,
      value:'',
      observer:function(n,o){
        if(n)
        {
          // let list = this.data.testList;
          // if (list.length > 10) {
          //   list = list.slice(10)
          // }
          // list.push(n)
          this.setData(
            {
              testList: [n]
            }
          )
        }
      }
    },
    money:{
      type:Number,
      value:0
    },
    gkStar:{
      type:Number,
      value:0,
      observer: function (n, o){
        if(n)
        {
          this.setData({
            StarNum: new Array(n),
            noStarNum:new Array(8-n)
          })

        }
       
      }
    },
    
    name:{
      type:String,
      value:''
    },
    //切磋等级
    qcLevel:{
      type:Number,
      value:1
    },
    //切磋等级图标
    LevelIcon:{
      type:String,
      value:''
    },
    //赶考图片
    gankaoIcon:{
      type:String,
      value:''
    },
    nowPage: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 1000,
    duration: 1000,
    money: Player.Score,
    testList:[],
    level1:'',
    StarNum:[],
    noStarNum:[],
    qc_levle: qc_levle,
    showExplain:false,
    opacity:0,
    MsgList:[],
    A:'',
    B:''
  },
  pageLifetimes:{
    hide:function(){
      clearInterval(this.timmer)
      console.log('23323')
    },
    show:function(){
      MSGfn.call(this, Msg)
      if (Msg.MsgArr.length) {
       
      }
     
    }
  },
  detached() {
 //   clearInterval(this.timmer)
    
  },
  moved:function(){
  //  clearInterval(this.timmer)
  },
  ready:function(){
    this.index=0
    // 切磋等级
    // this.setData({
    //   StarNum: new Array(Player.Level2)
    // })
    Msg.OnMsg.Off(this.Msg)
    //绑定消息事件
    Msg.OnMsg.On(this, this.Msg);
    
    this.setData({
      MsgList: Msg.MsgArr
    })
    ;
    this.timmer=null;
    clearInterval(this.timmer)
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTransitionend2(){
     
    },
    Msg(res){
      console.log(res)

      this.setData({
        MsgList: Msg.MsgArr
      })
      if (Msg.MsgArr.length==0) return
    // MSGfn.call(this, Msg)
     
  
      
    },
    OnChange({ detail}){
      let { current}=detail;
      console.log(current)
      // if (current==4)
      // {
      //   this.setData({
      //     ['MsgList']: Msg.MsgArr
      //   })

      // }
    },
    onTransitionend(){

      this.index += 1
      
      
      this.setData({
        msg:'',
        A: Msg.MsgArr[this.index+1] ? Msg.MsgArr[this.index].msg : '',
        B: Msg.MsgArr[this.index + 1] ? Msg.MsgArr[this.index + 1] : ''
      // B: this.index + 1 == Msg.MsgArr.length ? Msg.MsgArr[0].msg : Msg.MsgArr[this.index + 1].msg,//
      })

     // if (Msg.MsgArr[this.index]) Msg.MsgArr[this.index].flag = false
      
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('sendMsg', {n:'msg'}, myEventOption)
    },
    OnToCenter(){
      getApp().globalData.wnds.Wnd_MyCenter.Show()
    },
    //打开游戏说明
    OnOpen() {
      this.setData({
        showExplain: true
      })
      setTimeout(() => {
        this.setData({
          opacity: 1
        })
      }, 500)

    },
    //关闭游戏说明
    OnClose(){
      this.setData({
        opacity:0
      })
      setTimeout(()=>{
        this.setData({
          showExplain: false
        })
      },500)
      
    }
  }
})
function MSGfn(Msg){
  this.timmer = setInterval(() => {
    if (Msg.MsgArr.length==0){
        return 
    }
  //if (Msg.MsgArr[this.index]) Msg.MsgArr[this.index].flag = false
   this.setData({
     MsgList: Msg.MsgArr,
      A: Msg.MsgArr[this.index] ? Msg.MsgArr[this.index].msg : '',
      B: Msg.MsgArr[this.index + 1] ? Msg.MsgArr[this.index + 1].msg : '',
      msg: true
    })
    // if (Msg.MsgArr[this.index]) {
    //   Msg.MsgArr[this.index].flag = false;
    // }

    console.log(this.index)
    if (this.index == Msg.MsgArr.length - 1) {
      this.index = 0
      // Msg.MsgArr = []
      // this.setData({

      //   MsgList: Msg.MsgArr
      // })
      // clearInterval(this.timmer)
    }
 
   


  }, 2000)
}
