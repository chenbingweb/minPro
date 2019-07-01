// components/word-detail/word-detail.js
let _interface=require("../../utils/interface.js")
import { Index } from "../../model/index.js";
import {User} from "../../model/user.js";
var WxParse = require("../../wxParse/wxParse.js");

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wordDetail:{
      type:Object,
      value:{},
      observer: function (newVal, oldVal) {
        var that = this;
        console.log(newVal)
        if(Object.keys(newVal).length)
        {
          this.setCollectState();
        //  let arr= newVal.instance.fin(newVal.name);
       //  console.log(arr)
          let reg = new RegExp(newVal.name,'gi');
          let str = newVal.instance;
          
          if (str)
          {
            str = str.replace(reg, ` <span style="color:#009588"> ${newVal.name}</span>`) 
          }
          WxParse.wxParse('article', 'html', str, that, 5);
          // this.setData({
          //   wordDetail: newVal
          // })
        }
        else
        {
          // this.setData({
          //   wordDetail:{}
          // })
        }
        
        
      }
    }
  },
  ready(){
    this.setData({
      isShow: false
    })
  },
  detached:function(){
    
    //  this.setData({
    //         wordDetail:{}
    //       })
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    isCollect:false,
    imgUrl:'',
    isLock:true,
    wordDetail:{}
  },
  ready(){
    //收藏id
    this.cid = ''
    this.setData({
      isLock: User.isLock,
      imgUrl: getApp().globalData.imgUrl
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setCollectState(){
      if (this.properties.wordDetail && this.properties.wordDetail.collection_id) {
        //收藏id
        this.cid = this.properties.wordDetail.collection_id
        this.setData({
          isCollect: true
        })
      }
      else
      {
        this.setData({
          isCollect: false,
          
        })
      }
      
    },
    // 切换
    onSwitch({ detail: { value } }) {
      console.log(value)
      this.setData({
        isShow: value
      })
    },
    // 收藏或取消收藏
    onCollect({currentTarget:{dataset:{wid}}}){
      if(this.data.isCollect)
      {
        
        Index.doCollectOrCancelCollect(this.cid, res => {
          this.setData({
        
            isCollect: false
          })
        }, _interface.removeCollection)
        
      }
      else
      {
        Index.doCollectOrCancelCollect(wid,res=>{
          if(res)
          {
            this.cid=res;
            this.setData({
            
              isCollect: true
            })
          }
        })
       
      }
    }
  }
  
})
