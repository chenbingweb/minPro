// pages/analysis/analysisPage.js

import { AutoJump } from "../../modules/LoginJump" 
import { Player } from "../../../modules/Player"  
import {FightRoom} from "../../modules/FightRoom"
import {share} from "../../modules/share";


let datas = {
  wndname: "analysis",//窗体名称
  display: true,//block none  
  wndAlpha: 1,
  wndPosX: 0,
  jx_bg: {
    w: 634, h: 960, split: [28, 28, 28, 38], img: [
      "../../imgs/analysis/a_d_1.png",
      "../../imgs/analysis/a_d_2.png",
      "../../imgs/analysis/a_d_3.png",
      "../../imgs/analysis/a_d_4.png",
      "../../imgs/analysis/a_d_5.png",
      "../../imgs/analysis/a_d_6.png",
      "../../imgs/analysis/a_d_7.png",
      "../../imgs/analysis/a_d_8.png",
      "../../imgs/analysis/a_d_9.png",
    ]
  },
  zjt_bg: {
    w: 590, h: 400, split: [24, 4, 24, 24], img: [
      "../../imgs/analysis/1.png",
      "../../imgs/analysis/2.png",
      "../../imgs/analysis/3.png",
      "../../imgs/analysis/1.png",
      "../../imgs/analysis/2.png",
      "../../imgs/analysis/3.png",
      "../../imgs/analysis/4.png",
      "../../imgs/analysis/5.png",
      "../../imgs/analysis/6.png",
    ]
  },
  jx_up_bg: {
    w: 579, h: 500, split: [24, 0, 24, 24], img: [
      "../../imgs/analysis/s_db_1.png",
      "../../imgs/analysis/s_db_2.png",
      "../../imgs/analysis/s_db_3.png",
      "../../imgs/analysis/s_db_4.png",
      "../../imgs/analysis/s_db_5.png",
      "../../imgs/analysis/s_db_6.png",
    ]
  },
  
  //一堆问题
  wenti:[ ]
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:datas
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (AutoJump("analysis", options)) return
  },
 
  _IsRight:function(zq,sel){
      for(var i=0;i<zq.length;i++)
      {
        if(zq[i]==sel) return true
      }
      return false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (AutoJump("analysis")) return
    if (FightRoom.Chengji==null) return
    // 动画
    setTimeout(()=>{
      this.setData({
        ['data.Ani_show']:'Ani_show'
      })
    },500)
    datas.wenti = []

    var tk = FightRoom.Chengji.tk
    for(var i=0;i<tk.length;i++)
    {
      var ti = tk[i]

      var item = { 
        img:ti.img,
        tm:ti.wt,
        jiexi:ti.jx,
        daan:[]
      }

      for(var ii=0;ii<ti.daan.length;ii++)
      {
        var btn = { 
          style:"",
          txt:ti.daan[ii],
          licon:null,
          ricon:null,
        }

        var leftX = FightRoom.IsA?ti.ax:ti.bx
        var rightX = FightRoom.IsA?ti.bx:ti.ax

        //按钮风格
        for(var plyName in leftX) 
        {
          var sel = leftX[plyName]
          if(sel-1==ii) //用户选择了这个按钮
          {
            if(!this._IsRight(ti.zq,sel)) btn.style = "err"
            //显示用户头像
            btn.licon =  FightRoom.LeftPly(plyName).iconurl
          }
        }

        for(var plyName in rightX) 
        {
          var sel = rightX[plyName]
          if(sel-1==ii) //用户选择了这个按钮
          {
            if(!this._IsRight(ti.zq,sel)) btn.style = "err"
            //显示用户头像
            btn.ricon =  FightRoom.RightPly(plyName).iconurl
          }
        }

        //正确答案的标识符
        if(this._IsRight(ti.zq,ii+1)) btn.style = "ok"
      
        item.daan.push(btn)
        
      }//end for daan 

      item.img = item.img ? Player.ArticleServerUrl().MergePath( "/public/uploads/ProblemImg/").MergePath( item.img):null
      datas.wenti.push(item)
    }//end for tk

    this.setData({ ["data.wenti"]:  datas.wenti }) 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return share.getCommonShareContent(options);
  }
})