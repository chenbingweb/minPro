import {UIEvent} from './UIEvent';
import {NSLoader} from "./NSLoader"; 
import {OOSyncClient} from '../oosync/OOSyncClient'
import { Msg } from "../oosync/OOMsg.js"
//连接数
let connCount = 0
class NSSocket {
    constructor(sid = null, sessionCode = null) {
        this._socketHandle = null
        this._connd = false // //设置连接断开标记
        this.onConn = new UIEvent() //添加连接事件
        this.onRecv = new UIEvent()// 
        this.onClose = new UIEvent()//关闭事件
        this._loaders = {}//登录装载对象
        this._sessionCode = sessionCode//客户端唯一标识符
        this._sid = sid//默认通信的服务器节点
        this.SetHeartbeatTime() //设置心跳时间
    }

    SetHeartbeatTime()
    {
        this._lastHeartbeatTime =  Date.parse(new Date()) / 1000//上次心跳时间
    }

    Update(name)
    {
      var now = Date.parse(new Date()) / 1000

      if(this._lastHeartbeatTime+20<now)
      {
        //心跳
        let nm = {n: "hbeat"}
        this._Send(JSON.stringify(nm), this._sid)
        console.log("=====心跳=====",name)
      }

      
      //console.log("socket Update")
      var needClose = false
      var loaders = this._loaders 
      for (var lid in loaders) 
      { 
          var loader = loaders[lid]
          if (loader.needRequest)  
          { 
            console.log("Update ReRequest")
              loader.ReRequest()
          }


          if(
            loader.requestTime&&
            loader.requestTime + 10 < now
          )//请求超时
          {
            needClose = true
            console.log("请求超时", name) 
          }
      }

      if(needClose)
      {
        this.Close()
        this._loaders = {}
        console.log("_showLoginBox#10", name) 
        getApp().globalData.ServerLogin._showLoginBox()
      }
    }
    

    //检查链接是否可用
    CheckConn() {
      return this._connd && this._socketHandle
    }

    Conn(url) {
        this._url = url //网关地址
        //创建微信socket
        this._socketHandle = wx.connectSocket({
          url: url,
            fail:err=>{
              //console.log('err',this._url)
              this._Close()
              console.log(err)

              //this._Close()
            },
            success:res=>{
              //console.log('ok',res)
            }
        });
        //连接数加1
        connCount++
        console.log("Conn count:",connCount)
        //监听WebSocket连接打开事件。
        this._socketHandle.onOpen((evt) => {
            console.log("NSSocket Onopen",evt)
            this._connd = true

            //绑定sessionCode
            this.BindSessionCode(this._sid, this._sessionCode)

            //抛出连线成功
            this.onConn.Emit()
        });
        //监听WebSocket关闭。
        this._socketHandle.onClose((evt) => {
            //console.log("NSSocket Onclose",evt)
            this._Close()
        });
        //监听WebSocket接受到服务器的消息事件。
        this._socketHandle.onMessage((evt) => { 
            console.log('evt',evt)
            console.log('evt.data',evt.data)
            this.OnMessage(evt.data)
        });
        //监听WebSocket错误。
        this._socketHandle.onError((evt) => { 
            console.log("NSSocket onError",evt)
            this._Close()
        });
    }
    //绑定用户id 无返回
    BindSessionCode(sid, sessionCode) {
        console.log('+++',sid, sessionCode,'++++')
        this._sid = sid
        this._sessionCode = sessionCode
        console.log("###BindSessionCode####")
        //如果_sessionCode不为 null 发送信息
        if (this._sessionCode != null) {
            console.log("###send bdsc####")
            let nm = {n: "bdsc", code: this._sessionCode}
            //发送信息
            this._Send(JSON.stringify(nm), this._sid)
        }
    }

    //处理消息接收事件
    OnMessage(data) { 
        console.log(data)
        /*
        {
          "l": 2,
          "r": 0
        }#E#1#E#{
          "scode": "4899914441283495995",
          "lgsid": 11,
          "r": 0
        }
         */
        //console.log("_socket onmessage",data)
        //console.log(data)
        //解码
        //let jsonDoc = JSON.parse(data)
        let idx = data.indexOf("#E#")// 47 
        let idx2 = data.indexOf("#E#", idx + 3)// 51
        /*{
          "l": 2,
          "r": 0
        }*/
        //获取头部json
        let head = JSON.parse(data.substr(0, idx)) 
        let body, result

        if (idx2 < 0)//不包含loader返回结果
        {
            //11#N#99#N#以后的字符串
            body = data.substr(idx + 3); 
        } else //包含loader返回的结果
        {
            //获取 #E#1#E#  1的位置
             result = Number(data.substr(idx + 3, idx2 - (idx + 3))); //1
             //截取body部分
            body = data.substr(idx2 + 3); 
        } 
        let lid = head.l
        let routeFlag = head.r 
        //lid 不为null 且不为"" 
        if (lid != null && lid != "")//loader返回
        { 
            //根据lid获取loaders对象中loader对象
            let loader = this._loaders[Number(lid)]
            //如果存在 则根据lid清除loader对象
            if (loader != null) { 
                delete this._loaders[Number(lid)]
                //设置loader 返回结果
                loader._setResult(body, result)
            }
        } else { 
            
            //返回接收成功 {sid: sid, lid: lid, data: data}
            let bodyDoc = this._parseNotify(body)
            //返回接收成功  
            let jsonstr = "$" + bodyDoc.lid; 
            //msg-> $99 routeflag->100000000 + bodyDoc.sid
            //通知服务器
            this.Notify(jsonstr, 100000000 + bodyDoc.sid);//大于10亿的编号，认为是去指定的sid

            //抛出用户事件
            //console.log("bodyDoc.data", bodyDoc.data)
            let userDoc = JSON.parse(bodyDoc.data)
            //console.log("_socket onRecv",userDoc)

          if (!OOSyncClient.DoDispatcher(userDoc) && !Msg.MsgDispatcher(userDoc)) this.onRecv.Emit(userDoc)
            
        } 
    }

    _parseNotify(body) {
        //11#N#99#N#以后的字符串
        let idx = body.indexOf("#N#")//2
        let idx2 = body.indexOf("#N#", idx + 3) //7

        let sid = Number(body.substr(0, idx))// 11
        let lid = body.substr(idx + 3, idx2 - (idx + 3))// 99
        let data = body.substr(idx2 + 3) 
        return {sid: sid, lid: lid, data: data}
    }

    //发起一个通知
    Notify(msg, routeFlag = 0) {
        this._Send(msg, routeFlag)
    }

    //发起一个请求  返回loader装载对象
    /*
        jsonObj :' json数据'
        routeFlag: 0 路径标准 默认为0 
     */
    Request(jsonObj, routeFlag = 0) {
        console.log('loader_send:',jsonObj)
        console.log('routeFlag:',routeFlag)
        //实例一个加载者，（登录者）
        /*
            this -->socket 连接对象
            jsonObj -->json数据
            routeFlag-->0 路径标准 默认为0 
         */
        let loader = new NSLoader(this, jsonObj, routeFlag)
        //添加登录装载对象 
        this._loaders[loader._lid] = loader 
        // loader.OnComplete.On(this,res=>{
        //     console.log(res)
        // })
        return loader
    }
    //断开连接 
    _Close() {
        let connd = this._connd
        //设置连接断开标记
        this._connd = false

        if (this._socketHandle != null) {  
            connCount--
            console.log("DConn count:",connCount)
            this._socketHandle.close() 
            this._socketHandle = null

            //抛出掉线事件
            this.onClose.Emit()
        }

        

        //清空loader,并通知失败
        this._ClearLoaders()
    }

    _ClearLoaders()
    {
      let loaders = this._loaders
      this._loaders = {}
      for (let lid in loaders) loaders[lid]._setError()
    }

    //关闭连接
    Close() {
        //如果存在连接 
        if (this._socketHandle) { 
            connCount--//减一 
            console.log("DConn count:",connCount)
        
          this._socketHandle.close() //关闭连接
          this._socketHandle = null //清空连接对象
        }
    }
    //发送消息到服务器，成功后返回真
    _Send(msg, routeFlag, lid = null) {
        console.log('--c---',msg, routeFlag, lid,'---b----')
        //设置心跳时间
        this.SetHeartbeatTime()
        //检查链接不存在 则返回
        if (!this.CheckConn()) 
        {  
          console.log("##_Send CheckConn ret##")
          return false
        }
        //r 参照
        let head = {r: routeFlag}
        //head 里添加 l 参数
        //head={r:0,l:1}
        if (lid != null) head.l = lid
        //拼接发送参数
        /*{r:0,l:1}#E#  {
              n: 'ck',
              tp: 'wxg',
              wxg: {
                a: gcfg.ProjectID, //程序ID ZQDT
                c: this.wxData.code,
                ed: this.wxData.encryptedData,
                iv: this.wxData.iv
              }
            }
        */
        let nmstr = JSON.stringify(head) + "#E#" + msg
        console.log('nmstr:',nmstr)
        //发送 数据到服务器
        this._socketHandle.send({data:nmstr})
        return true
    }

}

export {NSSocket}