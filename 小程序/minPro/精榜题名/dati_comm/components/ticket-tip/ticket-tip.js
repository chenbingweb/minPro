// dati_comm/components/ticket-tip/ticket-tip.js

import { Player } from "../../../modules/Player"
import { AutoJump } from "../../modules/LoginJump"
import { wxAccount } from "../../libs/network/wxAccount.js"
import { ServerLogin } from "../../../modules/ServerLogin"
import * as AppColor from "../../modules/AppColor.js"
import * as MsgBox from "../../modules/MsgBox"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //显示一键登录
    authorize:{
      type:Boolean,
      value:false,
      observer:function(n,o){
          if(n)
          {
            // this.setData({
            //   opacity:1
            // })
          }
      }
    },
    showTicket: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    opacity:1
  },
  ready:function(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    OnClose(){
      this.setData({
       opacity: 0
      })
      setTimeout(()=>{
        this.setData({
          show: false,
          authorize:false
        })
      },500)
    },
    // 一键登录
    logina(res) {
      console.log(res)
      if (
        !res.detail ||
        !res.detail.errMsg ||
        res.detail.errMsg != "getUserInfo:ok"
      ) {
        //MsgBox.ShowOK("","")
        return
      }
      ServerLogin.login()
      //设置是否是新人
      if (Player.getIsNewPeople){
        this.showTicket()
      }
    },
    //显示新人领取红包票
    showTicket(){
      this.setData({
        show: true,
        opacity: 0
      })
      setTimeout(() => {
        this.setData({
          opacity: 1
        })
      }, 500)
    }
  }
})
