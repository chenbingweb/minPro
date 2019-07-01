import {wxAccount} from '../dati_comm/libs/network/wxAccount';
import {NSLoginSys} from '../dati_comm/libs/network/NSLoginSys';
import {GameConn, WorldConn} from "../dati_comm/libs/network/Conns";
import {OOSyncClient} from "../dati_comm/libs/oosync/OOSyncClient"
import * as AudioPool from "../dati_comm/libs/core/AudioPool"
import {Player} from "./Player" 
import {FightRoom} from '../dati_comm/modules/FightRoom.js'
import {loginLoading} from "../dati_comm/libs/network/loginLoading";
import {txt} from "../dati_comm/sdata/SDataID2" 
import { ServerList } from "../dati_comm/libs/network/NSServerList";
import { PubConfig } from "../dati_comm/modules/PubConfig";
import {UIEvent} from "../dati_comm/libs/network/UIEvent.js"
console.log('===================================')
let loginTimeout = null
class serverLogin {
    constructor() {
        this.EvtLoginSuccess=new UIEvent();
        //监听登录成功事件
        NSLoginSys.OnLoginSuccess.On(this, this._onNSLoginSuccess);
        //监听登录失败事件
        NSLoginSys.OnLoginFail.On(this, this._onNSLoginFail);
        //简单step事件
        NSLoginSys.OnStep.On(this, this._onNSStep);

        // 用户信息更新事件
        wxAccount.getUserInfoSucceededEvent.On(this, (info) => {
            console.log('getUserInfoSucceededEvent');
            let wxData = {
                code: wxAccount.code,
                encryptedData: info.encryptedData,
                iv: info.iv
            };

            //开始登陆NS系统
            NSLoginSys.Begin(wxData);
        });
        //登录失败后弹出登录提示
        wxAccount.loginToWxFailedEvent.On(this, () => {
            console.log(`loginToWxFailedEvent`);
            getApp().globalData.ServerLogin._showLoginBox();
        });
        //获取用户信息失败后，弹出登录提示
        wxAccount.getUserInfoFailedEvent.On(this, () => {
            console.log(`getUserInfoFailedEvent`);
            getApp().globalData.ServerLogin._showLoginBox();
        });
        //弹出授权提示，清除登录定时器
        wxAccount.authorizeEvent.On(this,()=>{
            console.log(`authorizeEvent stop timer`);
            if(loginTimeout) {clearTimeout(loginTimeout);loginTimeout=null}
        })

    }
    //用户登录
    login() {
          //执行登录逻辑
       this._reLogin();
     
    }

    _hide() {
        //隐藏登录界面

        loginLoading.hide();

    }

    //显示重新登录框
    _showLoginBox(msg = "已和服务器失去联系！") {
        this._hide();
        wx.showModal(
            {
                title: "消息",
                content: msg,
                showCancel: "false",
                cancelText: "",
                confirmText: "重新登录",
                confirmColor: "#3cc51f",
                complete: (res) => {
                    //console.log("_showLoginBox ",res)
                    //res.confirm
                    this._reLogin();
                }
            }
        )
    }

    //重新开始登陆
    _reLogin() {
        console.log("reLogin#1")
        //设置登录失败状态
        this.LoginOK = false
        // loginLoading.show(txt(1020), true);
        // 关闭游戏服务器
        GameConn.Close()
        //关闭世界服务器
        WorldConn.Close()
        //重新装载服务器列
        ServerList.ReLoad()
        //重新装载公共配置
        PubConfig.ReLoad()
        //用户登录
        wxAccount.login(); 
        //清除登录定时器
        if(loginTimeout) {clearTimeout(loginTimeout);loginTimeout=null} 
        //15秒后显示登录
        loginTimeout = setTimeout(()=>{
            this._showLoginBox()
        },15000);
    }
    //登录成功回调
    _onNSLoginSuccess(res) {
          
        //GameConn.ReCreate(res.url, 100000000 + res.logicSid, res.sessionCode);
        /*
            {
                sessionCode: data.scode, //用户在服务器上的会话标识
                logicSid: data.lgsid, //逻辑服id
                fighting: (data.r === 2), //当前是否处于战斗状态
                url: this.SeldGameSvrInfo.url, //服务器的地址 
                loginConn:this.loginConn
        }

         */
        //绑定套接字
        GameConn.ReBindSocket(res.url,  100000000 + res.logicSid,  res.sessionCode,res.loginConn)


        let timeID = 0;
        timeID = setInterval(() => {
            console.log("_onNSLoginSuccess..")
            var existData = false

            if(OOSyncClient.RootObj() != null)
            {
                var rootObj = OOSyncClient.RootObj()
                var obj = OOSyncClient.GetObject(rootObj.Sid(), "Player")

                var paramsObj = obj.GetChild("Params",false)
                //var paramsObj = OOSyncClient.RootObj().RootObj().GetChild("Params",false)
              //paramsObj!=null&&paramsObj.GetValue("2")&&
                if(obj.GetValue&&obj.GetValue("Name")) 
                { 
                    existData = true
                    //console.log("money", paramsObj.GetValue("2"))
                    //console.log("xuefen", paramsObj.GetValue("1"))
                }
            }

            if (existData) {
                clearInterval(timeID); //关闭定时器
                
                //关闭登录超时定时器
                if(loginTimeout) {clearTimeout(loginTimeout);loginTimeout=null}

                loginLoading.hide(); 

                //绑定同步对象
                var rootObj = OOSyncClient.RootObj()
                var obj = OOSyncClient.GetObject(rootObj.Sid(), "Player")
                //player对象绑定OOSyncClient对象
                Player._BindSync(obj);

                this.LoginOK = true
                console.log("成功获取了用户信息");  
              
                this.EvtLoginSuccess.Emit()
                //播放登录音效
                //AudioPool.PlayAudio(  "/audios/login.mp3" );
                console.log(FightRoom)
                FightRoom.LoginClear()//清战斗相关信息
                FightRoom.LoginFighting = res.fighting
                //从分享页面过来
                {
                    let m6=getApp().globalData.query.m6;
                    
                    if(m6)
                    {
                        GameConn.Request({n:'cgfx',code:m6},res=>{

                        })
                        console.log('通天塔f次数')
                    }

                }

                //显示主界面
                {
                    
                  wx.hideLoading()
                  //调试页面
           getApp().globalData.wnds.Wnd_Home.Show()
          //getApp().globalData.wnds.Wnd_ActiveBM.Show()
           //getApp().globalData.wnds.Wnd_ActiveDetail.Show()
           //getApp().globalData.wnds.Wnd_ActiveList.Show()
         //getApp().globalData.wnds.Wnd_HBSOver.Show()
           //getApp().globalData.wnds.Wnd_HBSPK .Show()
           //getApp().globalData.wnds.Wnd_StartPageHBS.Show()
         //  getApp().globalData.wnds.Wnd_StartHBS.Show()
     //getApp().globalData.wnds.Wnd_FightOver.Show()
                //  getApp().globalData.wnds.Wnd_MatchOver.Show()
                 //   getApp().globalData.wnds.Wnd_Classify .Show()
                 //     //显示登录界面
     // getApp().globalData.wnds.Wnd_Home.Show()
  //getApp().globalData.wnds.Wnd_Fight.Show()
      //getApp().globalData.wnds.Wnd_Fight3v3.Show()
     
       //getApp().globalData.wnds.Wnd_TongTianTa.Show()
      //getApp().globalData.wnds.Wnd_FightTT.Show()
      //getApp().globalData.wnds.Wnd_WorldRank.Show()
     //getApp().globalData.wnds.Wnd_Ready.Show()
                 //getApp().globalData.wnds.Wnd_Ready.Show()
                } 
            }
            //else
            //{
              //  console.log("重新绑定game socket")
               // GameConn.ReBindSocket(res.url,  100000000 + res.logicSid,  res.sessionCode,res.loginConn,false)
            //}
        }, 100)

    }

    _onNSLoginFail(res) {
        console.log(res.msg)
        getApp().globalData.ServerLogin._showLoginBox(res.msg)
    }

    _onNSStep(msg) {
        console.log("step " + msg);
    }
}

let instance = new serverLogin();
export {instance as ServerLogin}