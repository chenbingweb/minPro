import {SDataShare} from "../../sdata/SDataShare";
import {Player} from "../../modules/Player";
import {GameConn} from "../libs/network/Conns";
import * as gcfg from "../../gamecfg"

let share = { 
  //获取分享信息
    getShareInfo(tp)
    {
      tp=tp-1;
        getApp().globalData.isFromCheckShare = true
      /*
        1  1v1
        2 3v3
        3 通天塔
        4 赶考
        5 通用
      
      */
      
       let shareInfo = JSON.parse(Player.ShareInfo)[tp]
      //  var row = SDataShare.GetRow(tp)
      //   var icon = row[SDataShare.I_Icon]
      //   var useName = row[SDataShare.I_UserName]
      //   var note = row[SDataShare.I_Note]
       
        //if(useName==1)   note = note.format( Player.Name() )
        
        //var iconPath = Player.ArticleServerUrl().MergePath("/").MergePath(icon)
        var re = { 
          Note: shareInfo.note,
          Icon: Player.ArticleServerUrl()+shareInfo.icon
        }
        return re
    },

  // 通天塔分享
    getTTTMessage() {
        var info = this.getShareInfo(3)
        let parms = {
            title:  info.Note,
            path: "pages/index/index?share=true",
            imageUrl: info.Icon,
            //success: this._onShareSuccess,
            //fail: this._onShareFail,
        };
        console.log(parms);

        return parms;
    },
    // 通天塔次数
    getTTTCISHUMessage(joinCode) {
        var info = this.getShareInfo(3)
        let parms = {
            title:  info.Note,
            path: "pages/index/index?share=true&m6=" + joinCode,
            imageUrl: info.Icon,
            success: ()=>{
              console.log('分享成功')
            },
            fail: ()=>{
              console.log('分享失败')
            },
        };
        console.log(parms);

        return parms;
    },
     // 通天塔分享复活
    getTTTFuHuoMessage() {
        var info = this.getShareInfo(3)
        let parms = {
            title:  info.Note,
            path: "pages/index/index?share=true",
            imageUrl: info.Icon,
            // success: ()=>{
            //   console.log('分享成功')
            //   success && success()
            // },
            // fail: ()=>{
            //   console.log('分享失败')
            // },
        };
        console.log(parms);

        return parms;
    },
    // 普通分享
    getPTMessage() {
        var info = this.getShareInfo(5)
        let parms = {
            title:  info.Note,
            path: "pages/index/index?share=true",
            imageUrl: info.Icon,
            success: this._onShareSuccess,
            //fail: this._onShareFail,
        };
        console.log(parms);

        return parms;
    },
    // 转发普通分享的参数数据
    getCommonShareContent(options,useScreenImg = false) {

        var info = this.getShareInfo(5)
 
        var parms = {
            title: info.Note,
            path: "pages/index/index?share=true",
          //path:"pages/home/homePage?share=true",
            success: res => {
              // if (typeof options=="function" && options) {
              //  options(res)
              // }
              this._onShareSuccess()
            },
            fail: this._onShareFail,
        };
        console.log("parmsparmsparmsparmsparmsparmsparmsparmsparmsparms", parms)
        parms.imageUrl = info.Icon
  
        // 如果按钮指定了页面则设置
        /*
        if (options.target && options.target.dataset) {
            let dataset = options.target.dataset;
            if (dataset.page) {
                parms.path = dataset.page;
            }
        } */
        return parms;
    },

    
    // 根据入口类型转发
    getShareContent(options,tp) {

        var info = this.getShareInfo(tp)
 
        var parms = {
            title: info.Note,
            path: "pages/index/index?share=true",
            success:res=>{
              if (options){
                options(res)
              }
            },
            fail: this._onShareFail,
        };
 
        parms.imageUrl = info.Icon
  
        // 如果按钮指定了页面则设置
        /*
        if (options.target && options.target.dataset) {
            let dataset = options.target.dataset;
            if (dataset.page) {
                parms.path = dataset.page;
            }
        }*/ 

        return parms;
    },

    // 转发挑战分享的参数数据
    getPKShareMessage(joinCode) {
        var info = this.getShareInfo(1)
        let parms = {
            title: info.Note,
         // path: "pages/home/homePage?share=true&m8=" + joinCode,
           path: "pages/index/index?share=true&m8=" + joinCode,
            imageUrl:info.Icon,
          //  success: this._onShareSuccess,
            fail: this._onShareFail,
        };
        console.log(parms);

        return parms;
    },
    // 转发组队分享的参数数据
    getTeamShareMessage(joinCode) {
        var info = this.getShareInfo(2)
        let parms = {
            title:  info.Note,
            path: "pages/index/index?share=true&m9=" + joinCode,
            imageUrl: info.Icon,
            //success: this._onShareSuccess,
            //fail: this._onShareFail,
        };
        console.log(parms);

        return parms;
    },

    getCheckLockShareMessage(scallback, fcallback){
        var info = this.getShareInfo(8)
        let parms = {
            title:  info.Note,
            path: "pages/index/index?share=true",
            imageUrl: info.Icon,
            success: res =>{
              console.log("成功", scallback)
                if(scallback){
                    scallback(res)
                }
            },
            fail: res => {
              console.log("失败", scallback)
                if(fcallback){
                    fcallback(res)
                }
            },
        };
        return parms;
    },

    getCheckGiveShareMessage(scallback, fcallback){
        var info = this.getShareInfo(9)
        var parms = {
            title: info.Note,
            path: "pages/index/index?share=true",
            success: res =>{
                GameConn.Request({n: "ssc"}, data => {
                    if(scallback){
                        scallback(data)
                    }
                })
            },
            fail: res =>{
                if(fcallback){
                    fcallback()
                }
            },
        };
        parms.imageUrl = info.Icon
        return parms;
    },
    // 
    getoverShareMessage(scallback, fcallback) {
      var info = this.getShareInfo(4)
      var parms = {
        title: info.Note,
        path: "pages/index/index?share=true",
        success: res => {
          if (scallback){
            scallback(res)
          }

        },
        fail: res => {
          if (fcallback) {
            fcallback()
          }
        },
      };
      parms.imageUrl = info.Icon
      return parms;
    },
    hasShareReward() {
      var sharedTimes =  Player.Backpack.ShareGerenNum//分享给个人的次数
       return sharedTimes < Player.Sharelimit;
        // Player.SharedTimes()
    },

    _onShareSuccess(res) {
      console.log("#_onShareSuccess#",res)
        GameConn.Request(
            {n: "fx"},
            (data) => {
                if(data.r==0)
                {
                  getCurrentPages().forEach(item=>{
                    item.setData({
                      ['data.Score']:data.score
                    })
                  })
                }
                console.log("炫耀成功，获得金币");
                // this.times = parseInt(data.cs);
            }
        );
    },

    _onShareFail() {
        console.log('Share failed!!!')
    },
    // 分享到群————通用
    sharenewqun(res) {
      console.log("进入群分享", res)

      wx.getShareInfo({
        shareTicket: res[0],
        success: (res) => {
          var ediv = {}
          ediv.ed = res.encryptedData
          ediv.iv = res.iv;

          console.log("获取到ediv", ediv)
          GameConn.Request({ n: 'sqsc', m: 1, wxg: ediv }, data => {
            if (data.r == 0) {
            } else if (data.r == 1) {

              wx.showModal({
                title: '分享提醒',
                content: '这个群已经分享，请换个群分享',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                }
              })
            } else {
              wx.showModal({
                title: '分享失败',
                content: '未知错误',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                  return 
                }
              })
            }
          })
        }
      })
    },
    // 分享到群————通用
    sharenewquna(res) {
      console.log("进入群分享",res)
      
      wx.getShareInfo({
        shareTicket: res.shareTickets[0],
        success: (res) => {
          var ediv = {}
          ediv.ed = res.encryptedData
          ediv.iv = res.iv;

          console.log("获取到ediv", ediv)
          GameConn.Request({ n: 'sqsc', m: 1, wxg: ediv }, data => {
            if (data.r == 0) {

            } else if (data.r == 1) {

              wx.showModal({
                title: '分享提醒',
                content: '这个群已经分享，请换个群分享',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                }
              })
            } else {
              wx.showModal({
                title: '分享失败',
                content: '未知错误',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                }
              })
            }
          })
        }
      })
    }, 
    // 商城群分享
    shareshopqun(res) {
      wx.getShareInfo({
        shareTicket: res[0],
        success: (res) => {
          var ediv = {}
          ediv.ed = res.encryptedData;
          ediv.iv = res.iv;
          GameConn.Request({ n: 'sqsc', m: 2, wxg: ediv }, data => {
            
          })
        }
      })
    },
    // 闯关群分享
    sharequn(res) {
      wx.getShareInfo({
        shareTicket: res[0],
        success: (res) => {
          var ediv = {}
          ediv.ed = res.encryptedData
          ediv.iv = res.iv;
          GameConn.Request({ n: 'sqsc',m: 1, wxg: ediv }, data => {
            if (data.r == 0) {
              GameConn.Request({ n: 'cg', fl: gcfg.xieyi }, data => {
                GameConn.Request({ n: 'cgplay' }, data => { })
              })
            } else if (data.r == 1) {
              
              wx.showModal({
                title: '分享提醒',
                content: '这个群已经分享，请换个群分享',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                  GameConn.Request({ n: 'cg', fl: gcfg.xieyi }, data => {
                    GameConn.Request({ n: 'cgplay' }, data => { })
                  })
                }
              })
            } else {
              wx.showModal({
                title: '分享失败',
                content: '未知错误',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                  GameConn.Request({ n: 'cg', fl: gcfg.xieyi }, data => {
                    GameConn.Request({ n: 'cgplay' }, data => { })
                  })
                }
              })
            }
          })
        }
      })
    },
    // 闯关分享到个人
     sharegeren() {
          GameConn.Request({ n: 'ssc' }, data => {
            if (data.r == 0) {
              GameConn.Request({ n: 'cg', fl: gcfg.xieyi }, data => {
                GameConn.Request({ n: 'cgplay' }, data => { })
              })
            } else {
              wx.showModal({
                title: '分享失败',
                content: '未知错误',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                  GameConn.Request({ n: 'cg', fl: gcfg.xieyi }, data => {
                    GameConn.Request({ n: 'cgplay' }, data => { })
                  })
                }
              })
            }
          })
    }, 
    
     sharenewqun(res, data, geren, qun){
       var than = this
       var shareTickets = res.shareTickets
       if (!shareTickets) {
         wx.showModal({
           title: '分享提醒',
           content: '需要分享到微信群',
           showCancel: false,
           confirmText: '确定',
           success: function (res) {
             GameConn.Request({ n: 'ssc' }, data => {
               if (data.r == 0) {
                 var shareMoneya = Player.Money()
                 shareMoneya += data.jb
                 than.setData({ [data]: parseInt(shareMoneya) })
                 geren = geren + 1
                 than.fenxiang(qun, geren)
                 GameConn.Request({ n: 'cg', fl: gcfg.xieyi }, data => {
                   GameConn.Request({ n: 'cgplay' }, data => {
                   })
                 })
               } else {
                 wx.showModal({
                   title: '分享失败',
                   content: '未知错误',
                   showCancel: false,
                   confirmText: '确定',
                   success: function (res) {
                   }
                 })
               }
             })
           }
         })
       } else {
         wx.getShareInfo({
           shareTicket: shareTickets[0],
           success: (res) => {
             var ediv = {}
             ediv.ed = res.encryptedData
             ediv.iv = res.iv;
             GameConn.Request({ n: 'sqsc', m: 1, wxg: ediv }, data => {
               if (data.r == 0) {
                 var shareMoneya = Player.Money()
                 shareMoneya += data.jb
                 this.setData({ [data]: parseInt(shareMoneya) })
                 qun = parseInt(qun + 1)
                 this.fenxiang(qun, geren)
                 GameConn.Request({ n: 'cg', fl: gcfg.xieyi }, data => {
                   GameConn.Request({ n: 'cgplay' }, data => {
                   })
                 })
               } else if (data.r == 1) {
                 wx.showModal({
                   title: '分享提醒',
                   content: '这个群已经分享，请换个群分享',
                   showCancel: false,
                   confirmText: '确定',
                   success: function (res) {
                   }
                 })
               } else {
                 wx.showModal({
                   title: '分享失败',
                   content: '未知错误',
                   showCancel: false,
                   confirmText: '确定',
                   success: function (res) {
                   }
                 })
               }
             })
           }
         })
       }

    },
    // 分享到个人————通用
    sharenewgeren() {
      GameConn.Request({ n: 'ssc' }, data => {
        if (data.r == 0) {
          return data.jb
        } else {
          wx.showModal({
            title: '分享失败',
            content: '未知错误',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
            }
          })
        }
      })
    }
};

export {share};