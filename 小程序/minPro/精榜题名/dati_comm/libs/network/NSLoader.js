import {UIEvent} from 'UIEvent';
// lidseed 标记，
let _lidseed = 1

class NSLoader {
    constructor(ownerSocket, jsonObj, routeFlag) {
        //登录者的账号socket连接
        this._socket = ownerSocket 
        //lid 加一
        this._lid = _lidseed++
        //转载完成事件
        this.OnComplete = new UIEvent()
         //转载错误事件
        this.OnError = new UIEvent()
        //发送后台的json数据
        this.jsonObj = jsonObj
        //路由标记
        this.routeFlag = routeFlag
        //是否成功返回请求结果 默认为false
        this._existResult = false
        //默认需要请求为false
        this.needRequest = false
        //调用请求方法
        this.ReRequest()
    }

    //重新发起请求
    ReRequest() {
        //已经返回结果了，就不再之前请求
        if (this._existResult)
        { 
          return//非法的重复请求 
        }
        //请求时间
        this.requestTime = Date.parse(new Date())/1000
        //console.log("当前时间戳" + this.requestTime)
        this.needRequest = !this._socket._Send(JSON.stringify(this.jsonObj), this.routeFlag, this._lid)
        this._socket._loaders[this._lid] = this
    }

    //服务器返回了结果
    _setResult(data, result) {
        if (result === 1) //成功执行了loader
        { 
            this._existResult = true
            console.log(data)
          let json ={}
            //触发完成请求结果事件
            try{
              json = JSON.parse(data)
            }catch(e){
              
            }
        
          this.OnComplete.Emit(json)
        }
        else //否则调用请求失败
            this._setError()//服务器执行时遇到了异常    
    }

    //网络等原因导致了异常
    _setError() {
        this.OnError.Emit()
    }
}

export {NSLoader}