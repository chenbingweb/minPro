import * as XML from '../xmldom/dom-parser'
import {UIEvent} from 'UIEvent';
import {NSSocket} from "./NSSocket";
//import { GameConn, WorldConn } from "./Conns";
import { ServerList } from "./NSServerList";
import { PubConfig } from "../../modules/PubConfig";

//import { loginLoading } from "./loginLoading";
import { txt } from "../../sdata/SDataID2"
import * as gcfg from "../../../gamecfg"
let retryCount = 0 //
let retryTimer
let timer = null

class NSLoginSys {
    constructor() {
        this.OnLoginSuccess = new UIEvent(); //登录成功事件
        this.OnLoginFail = new UIEvent(); //登录失败事件
        this.OnStep = new UIEvent(); //步进，主要用于调试
        this._Step = 0; //登录步骤 
    }

    //开始登陆
    Begin(wxData) {

        //if (this._Step !== 0) return; //正在登陆中

        this._Step = 0
        //清除定时器
        if(timer) {clearTimeout(timer); timer=null;}
        //重置登录连接
        if(this.loginConn) {this.loginConn.Close(); this.loginConn = null;}
        //重置账号
        if(this.aconn) {this.aconn.Close(); this.aconn = null;} 

        //登录参数
        this.wxData = wxData;
        //设置Step +1
        this._NextStep('Begin');
        //等待公共配置信息
        this.WaitPubConfig()
    }
    //等待服务器配置信息
    WaitServerList()
    {
        timer = setTimeout(
            ()=>{
              console.log("WaitServerList Begin")
              //获取网关地址错误为true 提示 获取网关地址失败
                if(ServerList.ExistError) 
                {
                    this._PostErrorMsg("获取网关地址失败！");
                }else if(ServerList._ExistList) //成功获取到网关地址列表 
                {
                    //执行登录账号服务
                    this.LoadServerListOK()
                }else //重新执行 等待服务器配置信息
                    this.WaitServerList()
                console.log("WaitServerList End")
            },
            50
        )
    }

    WaitPubConfig()
    {
      timer = setTimeout(
        () => {
          // console.log("WaitPubConfig Begin")
          //公共配置信息错误信息为真，提示配置信息获取失败
          if (PubConfig.ExistError) {
            this._PostErrorMsg("获取配置信息失败！");
          } else if (PubConfig._ExistList) {//获取配置信息成功
            //this.LoadServerListOK()
            //等待服务器列表加载成功
            this.WaitServerList()
          } else//如果 服务器列表加载失败，再次检查配置信息是否获取成功
            this.WaitPubConfig()
          // console.log("WaitPubConfig End")
        },
        50
      )
    }

    LoadServerListOK()
    {
      //(getApp().globalData.ServerLogin.LoginOK && 
      
      // if(ServerList.Notice && ServerList.Notice != "") //需要显示公告
      // {
      //   loginLoading.hide();
      //   wx.showModal({
      //     title: '公告',
      //     showCancel: false,
      //     content: ServerList.Notice,
      //     success:(res)=> {
            
      //       if (res.confirm) {
      //         console.log('用户点击确定')
      //       } else if (res.cancel) {
      //         console.log('用户点击取消')
      //       }
      //       loginLoading.show(txt(1020), true);
      //       this._ConnAccSvr()
      //     }
      //   })
      //   ServerList.Notice = null
      // }else//不需要显示公告
      // 执行账号服务
        this._ConnAccSvr()


       
    }
    //创建账号连接
    _ConnAccSvr()
    {
      this._AccConnStep = this._Step;

      //随机一个账号服，并建立请求登录
      this.aconn = new NSSocket();
      //监听账号连接事件
      this.aconn.onConn.On(this, this.OnAccConn);
      //监听账号关闭事件
      this.aconn.onClose.On(this, this.OnAccClose);
      //获取账号网关地址
      let aconnUrl=ServerList.AccountSvrList[0].url;
      console.log(ServerList.AccountSvrList[0].url)
      //建立连接
      this.aconn.Conn(aconnUrl);
    }
    //请求登录
    _RequestCK()
    {
      wx.showLoading({
        title: '正在登陆...',
        mask:true
      })
      wx.login({
        success:res=>{
          //获取最新的code
          this.wxData.code=res.code;
          //发送请求
          let loader = this.aconn.Request(
            {
              n: 'ck',
              tp: 'wxg',
              wxg: {
                a: gcfg.ProjectID, //程序ID ZQDT
                c: this.wxData.code,
                ed: this.wxData.encryptedData,
                iv: this.wxData.iv
              }
            }
          );
          //监听 成功返回结果
          loader.OnComplete.On(this, this.OnAccCheckOK);
          //监听返回失败结果
          loader.OnError.On(this, this.OnAccCheckError);
        }
      })
        
    }
  //请求Ck函数
    TrackCK()
    {
        this._RequestCK() 
    }
    //成功建立账号连接回调函数
    OnAccConn() {
        //
        this._NextStep('OnAccConn');
        retryCount = 0
        //调用监测ck函数
        this.TrackCK()
    }

    _NextStep(msg) {
      //step 加 1
        this._Step++;
        //触发step 事件
        this.OnStep.Emit(msg);
    }

    OnAccClose() {
        if (this._AccConnStep === this._Step) //正在执行账号服连接
        {
            this._PostErrorMsg('连接账号服失败！');
        }
    }
    //获取账号token成功
    OnAccCheckOK(data) {
      //清除定时器
        clearTimeout(retryTimer)

        this._NextStep('OnAccCheckOK');
        //如果 r 不等于 0 返回结果错误
        if (data.r !== 0) {
            this._PostErrorMsg("账号或密码错误！");
            return
        }

        this._LoginConnStep = this._Step;
        //关闭清空账号连接对象
        this.aconn.Close();
        //创建登录连接
        this.loginConn = new NSSocket(); //登录游戏服务器用的连接
        //连接成功后，执行登录连接方法
        this.loginConn.onConn.On(this, () => this.OnLoginConn(data.tk, Number(data.rid)));
        //关闭登录
        this.loginConn.onClose.On(this, this.OnLoginClose);
        //获取game ws连接 （随机一个）
        /*
          {
              id:"1",
              url:"wss://svr03.quwenyx.com/game3_1"
          }

         */
        var gsInfo
        for (var i = 0; i < ServerList.GameSvrList.length;i++)
        {
          gsInfo = ServerList.GameSvrList[i];
          //游戏连接对象id与服务器fq相等，则退出循环
          if (gsInfo.id == data.fq) break
        }
        

        this.SeldGameSvrInfo = gsInfo
        console.log("gameurl", gsInfo.url, "zone", data.fq)
        this.loginConn.Conn(gsInfo.url);
    }

    OnLoginClose() {
        if (this._LoginConnStep === this._Step) {
            this._PostErrorMsg("与游戏登录服务器断开连接！");
        }
    }

    _RequestLG(token, sid)
    {
        let nm = {n: "lg", t: token, rid: sid};
        //向游戏服的登录节点请求验证
        let loader = this.loginConn.Request(nm, 1); 
        //监听登录成功事件
        loader.OnComplete.On(this, this.OnLoginCheckOK);
        //监听登录失败事件
        loader.OnError.On(this, this.OnLoginCheckError);
    }

    OnLoginConn(token, sid) {
      //拿到token 后，进入登录
        this._NextStep("OnLoginConn");

        retryCount = 0
        this.TrackLG(token, sid)
    }

    TrackLG(token, sid)
    {
        this._RequestLG(token, sid) 
    }
    //token 验证成功
    OnLoginCheckOK(data) {
      console.log(data)
        this._NextStep("OnLoginCheckOK");
        //清除定时器
        clearTimeout(retryTimer)
        //如果 r 不等于 0 切不等于 2 则 token 失效
        if (data.r !== 0 && data.r !== 2) {
            this._PostErrorMsg("token已失效");
            return
        }

        //清理事件
        this.loginConn.onConn.Clear()
        this.loginConn.onClose.Clear()

        
        //this.loginConn.Close();
        this.OnLoginSuccess.Emit({
            sessionCode: data.scode, //用户在服务器上的会话标识
            logicSid: data.lgsid, //逻辑服id
            fighting: (data.r === 2), //当前是否处于战斗状态
            url: this.SeldGameSvrInfo.url, //服务器的地址 
            loginConn:this.loginConn //登录socket对象
        });
        //重置执行步骤
        this._Step = 0;
    }
    OnLoginCheckError() {
        this.loginConn.Close();
        this._PostErrorMsg("账户验证超时！");
    }

    OnAccCheckError() {
        this.aconn.Close();
        this._PostErrorMsg("连接账号服失败！");
    }

    _PostErrorMsg(msg) {
        this._NextStep("_PostErrorMsg");
        let step = this._Step;
        this._Step = 0;
        this.OnLoginFail.Emit({step: step, msg: msg});
    }

   


}

let loginSysInstance = new NSLoginSys();

export {loginSysInstance as NSLoginSys};
 