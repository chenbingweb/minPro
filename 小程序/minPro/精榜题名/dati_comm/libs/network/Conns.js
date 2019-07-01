import {UIEvent} from 'UIEvent';
import {NSSocketPool} from './NSSocketPool'

import {loginLoading} from "./loginLoading";
import {txt} from "../../sdata/SDataID2"

class NSConn {
    constructor(name) {
       //提示信息事件
        this.OnNotify = new UIEvent()
        //连接服务器名 game pk
        this.name = name
        //一秒后，执行update方法
        setInterval(
          ()=>{
            this.Update()
          },
          1000
        )
        //this._ReLogin = reLogin
    }

    Update()
    {
      //
      if (this._Socket&&this._Socket.CheckConn()) 
      { 
        this._Socket.Update(this.name)
      }
      
    }

    //重建链接
    ReCreate(url, logicSid, sessionCode, callClose = true) {
      console.log(this.name+" ReCreate")
        this._url = url
        this._routeFlag = logicSid //路由标记
        this._sessionCode = sessionCode

        this._cacheRequests = []
        this._errorNum = 0//统计请求的错误数量

        if (callClose) {
            this._rertyCount = 0
            this.Close()
        }
        this._isClosed = false
        NSSocketPool.CreateConn(logicSid, sessionCode,(skt)=>{
            this.OnCreateSkt(skt)
        })
    }

    OnCreateSkt(skt)
    {
         console.log(this.name,"connSkt")
          if (this._isClosed) {
              console.log(this.name,"connSkt_close")
              skt.Close()
              return
          }
          var bkLoaders = this._Socket?  this._Socket._loaders:{}

          this._Socket =skt
          this._Socket.onConn.On(this, this._OnConn)
          this._Socket.onClose.On(this, this._OnClose)
          this._Socket.onRecv.On(this, this._OnRecv)
          this._Socket.Conn(this._url)

          //if(this.connTimeout){ clearTimeout(this.connTimeout);this.connTimeout=null}
          //this.connTimeout = setTimeout(
          //    ()=>{
          //           this._Socket       
          //    },
          //    5000
          //)

          for (var lid in bkLoaders) bkLoaders[lid]._setError()
    }
    //绑定套接字
    /*
     {
                sessionCode: data.scode, //用户在服务器上的会话标识
                logicSid: data.lgsid, //逻辑服id
                fighting: (data.r === 2), //当前是否处于战斗状态
                url: this.SeldGameSvrInfo.url, //服务器的地址 
                loginConn:this.loginConn
        }
        skt 当前连接对象
     */
     ReBindSocket(url, logicSid, sessionCode,skt,needclose=true) {
      console.log(this.name+" ReBindSocket")
        //服务器的地址 
        this._url = url
        //路由标记
        this._routeFlag = logicSid 
        //用户在服务器上的会话标识
        this._sessionCode = sessionCode
        //请求缓存数组
        this._cacheRequests = []
        this._errorNum = 0//统计请求的错误数量
 
        this._rertyCount = 0
        //关闭之前的连接
        if(needclose) this.Close() 
        //重置关闭状态为false
        this._isClosed = false;
        //如果存在连接, 返回所有连接
        var bkLoaders = this._Socket?  this._Socket._loaders:{}
        //当前连接对象
        this._Socket = skt
        //清除事件
        this._Socket.onConn.Off( this._OnConn)
        this._Socket.onClose.Off( this._OnClose)
        this._Socket.onRecv.Off( this._OnRecv)
        //添加监听事件
        this._Socket.onConn.On(this, this._OnConn)
        this._Socket.onClose.On(this, this._OnClose)
        this._Socket.onRecv.On(this, this._OnRecv)
        //触发网络等原因导致了异常
        for (var lid in bkLoaders) bkLoaders[lid]._setError()

        this.BindSessionCode(logicSid,sessionCode)


        //因为绑定的是一个已经连接好的套接字，因此立即抛出conn事件
        this._OnConn()
    }
    //绑定用户id
    BindSessionCode(sid, sessionCode) {
        this._routeFlag = sid //逻辑服id
        this._Socket.BindSessionCode(sid, sessionCode)
    }

    //发起一个请求
    Request(jsonObj, onSuccess = null, routeFlag = null) {
        //this.Retry()

        if (!this.Connected()) { 
            if (this._cacheRequests == null) return
 
            //缓存
            this._cacheRequests.push(
                {
                    data: jsonObj,
                    onSuccess: onSuccess,
                    routeFlag: routeFlag
                }
            )
            return
        }
 
        var loader = this._Socket.Request(jsonObj, routeFlag == null ? this._routeFlag : routeFlag)
        loader.OnComplete.On(this, (data) => { 
            this._errorNum = 0//清错误次数
            console.log(this.name,"clear errorNum", this._errorNum)
            if (onSuccess != null) onSuccess(data) //执行回调
        })
        loader.OnError.On(this, () => {
            this._errorNum++
            console.log("==================Conns  loader.OnError================")
            if(this.ErrorNum()>50)
            {
              console.log("==================_showLoginBox#1================",this.name )
              getApp().globalData.ServerLogin._showLoginBox()

            }else

            //console.log(this.name,"_errorNum", this._errorNum)
            loader.ReRequest()
        })
    }

    //获取请求错误的次数
    ErrorNum() {
        return this._errorNum
    }

    //主动关闭连接
    Close() {
      console.log(this.name,"close")
        //如果存在连接，则关闭
        if(this._Socket) {
          this._Socket.Close()
        }
        //标记已经关闭
        this._isClosed = true
    }

    //用于检查当前连接是否可用
    Connected() {
        return !this._isClosed &&!this._isTemporaryClose && this._Socket && this._Socket.CheckConn()
    }

    _OnConn() {
        if(this.reTryTimeout) {clearTimeout(this.reTryTimeout);this.reTryTimeout=null}
      console.log(this.name,"Conns onconn", this._cacheRequests.length)
        this._isClosed = false
        this._isTemporaryClose = false
        this._rertyCount = 0;
        loginLoading.hide();
        //发起缓存的请求
        if (this._cacheRequests.length > 0) {
            var list = this._cacheRequests
            this._cacheRequests = []
            for (var i = 0; i < list.length; i++) {
                var request = list[i]
                this.Request(request.data, request.onSuccess, request.routeFlag)
            }
        }
    }

    _OnClose() {
      console.log(this.name,"NSConns Onclose")
      if(this.reTryTimeout) {clearTimeout(this.reTryTimeout);this.reTryTimeout=null}
        loginLoading.hide();
        {
            if (
                this._isClosed ||//用户手动关闭了链接
                this._rertyCount > 3//重试次数
            ) {
                console.log(this.name,"NSConns clear loaders")
                this._cacheRequests = []//清空缓存的请求

                this._Socket.Close()
                this._Socket = null


                //不是手动关闭的
                if (!this._isClosed) {
                    console.log("==================_showLoginBox#2================",this.name )
                    getApp().globalData.ServerLogin._showLoginBox()
                }
            } else {
                console.log(this.name,"retry conn...")
                if(!this._isTemporaryClose)
                {
                    loginLoading.show(txt(1019), false);
                    this._Retry()

                
                    this.reTryTimeout = setTimeout( 
                        () =>{
                         console.log("重连超时")
                         this._rertyCount = 1000
                         this._OnClose()
                        }, 
                        15000
                    );
                }
            }
        }
    }
    

    _Retry()
    {
        this._rertyCount++
        this._Socket.Close()
        this.ReCreate(this._url, this._routeFlag, this._sessionCode, false)
    }

    _OnRecv(jsonDoc) {
        console.log("_conn OnRecv====================",jsonDoc)
       if(this._isClosed) 
       {
        console.log("==================_OnRecv isClosed================",this.name ) 
        return
       }

/*
        if (jsonDoc.n =="bdscerror")
        {
            console.log("==================_showLoginBox#3================",this.name )
          getApp().globalData.ServerLogin._showLoginBox()
          this.Close()
          return
        }*/
        //console.log(this.name,"_OnRecv", jsonDoc)
        this.OnNotify.Emit(jsonDoc)
    }
}

let GameConn = new NSConn("game");
let WorldConn = new NSConn("pk");

export {GameConn, WorldConn}
