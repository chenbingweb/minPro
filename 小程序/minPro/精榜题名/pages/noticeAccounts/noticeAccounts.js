import { Player } from "../../modules/Player"
import { share } from "../../dati_comm/modules/share";
import { buttonDisabler } from "../../dati_comm/modules/buttonDisabler";
import { GameConn, WorldConn } from "../../dati_comm/libs/network/Conns";
import { FightRoom } from "../../dati_comm/modules/FightRoom"
import * as JSHelper from "../../dati_comm/modules/JSHelper"
import { txt } from "../../dati_comm/sdata/SDataID2"
// pages/noticeAccounts/noticeAccounts.js
var datas={
  opacity:0,
 
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:datas,
     title:"",//标题
    preface:"",//前言
    opentxt:"",//关于开启的说明
    jltxt:"",//奖励文本
    jlst:0,//赛季奖励状态
    //money:0,//奖励金币
    //xuefen:0,//奖励学分
    gztitle:"",//规则标题
    breaktitle:"",//中断标题 
    breakcontent:"",//中断内容
    jlnr:[]//奖励内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        ['data.opacity']:1
      })
    },500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var snum
    var snum2

    if(Player.SeasonJLST==0) //提前通知
    { 
      snum = Player.SeasonNum
      snum2 = Player.SeasonNum+1
    }else //结算完后的通知
    {
      snum = Player.SeasonNum - 1
      snum2 = Player.SeasonNum
    }


    if (snum < 1) snum = 12
    if (snum > 12) snum = 1


    if (snum2 < 1) snum2 = 12
    if (snum2 > 12) snum2 = 1


    var numstr = JSHelper.Num2Chinese(snum)
    var numstr2 = JSHelper.Num2Chinese(snum2)


    var sjs = FightRoom.SeasonJS
    if(!sjs) return

    console.log("sjs",sjs)

    var datestr
    var openDatestr
    
    if(Player.SeasonJLST==0)
    {
        datestr = "{0}年{1}月{2}日".format(sjs.sy, sjs.sm, sjs.sd) +
        "—"+
        "{0}年{1}月{2}日".format(sjs.ey, sjs.em, sjs.ed)

        openDatestr = "{0}年{1}月{2}日".format(sjs.ey, sjs.em, sjs.ed) 
    }else
    { 
       datestr = "{0}年{1}月{2}日".format(sjs.oy, sjs.om, sjs.od) +
        "—"+
        "{0}年{1}月{2}日".format(sjs.sy, sjs.sm, sjs.sd)

        openDatestr = "{0}年{1}月{2}日".format(sjs.sy, sjs.sm, sjs.sd) 
    }


    
    
    var jlcontent = ""
    for(var i=0;i< sjs.jl.length;i++)
    {
      var jl = sjs.jl[i]
       jlcontent+=txt(2041).format("|"+jl.dw+"|", "|"+jl.jb+"|", "|"+jl.xf+"|")+"\n"
    }

    /*.replace(/\<br \/\>/g, "\n") */

console.log(sjs.jl)
    var colorArr = [
      "#26aa72", //青铜
      "#2087cb",//白银
      "#ea7211",//黄金
      "#a7160c",//铂金
      "#204272",//钻石
      "#5e300e",//大师
      "#771289",//王者
    ]
    
    var cidx = 0

    var jlnr = []
    var strArray = jlcontent.split("|")
    for(var i=0;i<strArray.length;i++)
    {
      var c
      if(i%2==0)
      {
        c = "#000"
      }else
      {
        c = colorArr[ parseInt(cidx++/3)]
      }

      var strs = strArray[i].split("\n")
      if(strs.length>1)
      {
        
        for(var k=0;k<strs.length;k++)
        {          
          if(strs[k]!='') jlnr.push(  {  str:strs[k], c:c }  )
          if(k<strs.length-1) jlnr.push(  {   str:"br", c:c } )//放入换行标记
        }

      }else
      { 
        
        if(strArray[i]!='')  jlnr.push(   {  str:strArray[i],  c:c } )
        
      }
    }

    var opentxt = txt(2038).format(openDatestr, numstr2,"", numstr2, openDatestr)
    opentxt = opentxt.replace(/\<br \/\>/g, "\n")
    this.setData(
      {
        title: txt(2028).format(numstr),//标题
        preface: txt(2025).format(numstr, datestr ),//序言
        opentxt: opentxt,//赛季开启说明
        jltxt: txt(2027).replace(/\<br \/\>/g, "\n"),//奖励文本
        jlnr:jlnr,//奖励内容
        //money: sjs.jb,//奖励金币
        //xuefen: sjs.xf,//奖励学分
        gztitle: txt(2026).format(numstr, numstr2),
        jlst: Player.SeasonJLST
      }
    ) 
  },
//
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

  OnNextClick(event) {
    if (!buttonDisabler.canClick()) return;

    //通知服务器已经点击了通知
    FightRoom.RequestCloseSNotify()


    if(Player.SeasonJLST==10 )//有奖励可以领取
    { 
      FightRoom.RequestSJPH(
          ()=>{
            if (getCurrentPages().length > 1)
              getApp().globalData.wnds.Wnd_MatchJieSuan.TemporaryJumpMode = 3
              
            getApp().globalData.wnds.Wnd_MatchJieSuan.Show()
          }
      )
    }else{ //不可以领取奖励
       wx.navigateBack({ delta: 1})
    }
  }
  ,
   onShareAppMessage(options) {
    
      if (options.from == 'button') 
            return share.getShareContent(options,7)
      else
            return share.getCommonShareContent(options); 

  },
})