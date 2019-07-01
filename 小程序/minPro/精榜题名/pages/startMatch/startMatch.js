import { Player } from "../../modules/Player"
import { share } from "../../dati_comm/modules/share";
import { buttonDisabler } from "../../dati_comm/modules/buttonDisabler";
import { GameConn, WorldConn } from "../../dati_comm/libs/network/Conns";
import { FightRoom } from "../../dati_comm/modules/FightRoom"
import * as JSHelper from "../../dati_comm/modules/JSHelper"
import { txt } from "../../dati_comm/sdata/SDataID2"
// pages/startMatch/startMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Tip01:"",
    SeasonStartTitle:"",
    SeasonNum:1,
    PlyName:"",
    PlyIcon: "",
    datestr:"",
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        ['data.opacity']: 1
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var numstr = JSHelper.Num2Chinese(Player.SeasonNum)

    var sjs = FightRoom.SeasonJS

    var datestr = 
      "{0}年{1}月{2}日".format(sjs.sy, sjs.sm, sjs.sd) +
      "—" +
      "{0}年{1}月{2}日".format(sjs.ey, sjs.em, sjs.ed)

    var SeasonStartTitle = txt(2030, numstr)//第{0}赛季开始

    // console.log("Tip01", data.Tip01)
    this.setData(
      { 
        Tip01:txt(2031),
        SeasonStartTitle: SeasonStartTitle,
        SeasonNum: numstr,
        PlyName: Player.Name() ,
        PlyIcon: Player.IconUrl(),
        datestr: datestr
      }
    )
  },

  OnNextClick(event){
    if (!buttonDisabler.canClick()) return;
    
    //请求进入新赛季
    GameConn.Request(
      { n: "NextSeason" },
      (data) => {
        if(data.r==0)
        {
          //等待赛季状态切换过来
          var timeid = setInterval(
            ()=>
            {
              if (Player.SeasonJLST==0)
              { 
                 clearInterval(timeid)
                 FightRoom.Jump3V3()
              }
            },
            50
          )
          
        }else//失败了
          FightRoom.Jump3V3()
      }
    )
  },

  onShareAppMessage(options) {
      if (options.from == 'button') 
            return share.getShareContent(options,9)
      else
            return share.getCommonShareContent(options); 
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
  
  } 
 
})