import OOSyncObj from "./OOSyncObj"

let OOSyncClient  

class SvrNodeData {
  constructor(sid) {
      this._rootObj = null
      this._sid = sid
      this.Reset();
  }

  RootObj(){return this._rootObj} 

  Sid(){return this._sid}

  Reset(){  
    this._rootObj = new OOSyncObj()
    this._rootObj.Init(this._sid)
  } 
}


class _OOSyncClient {
  constructor() {
    this._valueChangedEvents = {}
    this._objs = {}
  }
  
  /// 执行封包分发
  DoDispatcher(doc)
  { 
    //doc 为null 返回false
    if (null == doc) return false;
    //这不是一个同步包
    if ("_Sync" != doc["n"]) return false;

    console.log(doc)
   //默认键值为0
    var sid = 0
    //获取tm 值
    var tm = doc["tm"];
    //如果为null 返回false
    if (tm == null) return false; 
    //如果不存在SvrNodeData对象，则重新创建
    if (this._objs[sid]==null) this._objs[sid] = new SvrNodeData(sid);
    //获取o表
    var paths = doc["o"];
    //不存在则 返回
    if (paths == null) return false;//不是正确的同步消息
    //遍历 paths 表
    for (var path in paths)
    {
      var objs = paths[path];
     //如果为null 直接跳过执行下一个
      if (objs == null) continue;//错误的协议 

      //获取本路径对应的对象
      //（0,Player,true)
      var pathObj = this.GetObject(sid, path, true);

      for(var key in objs) 
      { 
        var objInfo = objs[key]
        if (objInfo == null) return false;

        //取得对象id 
        var name = objInfo["n"]
        //获取当前对象
        var currObj = pathObj.GetChild(name);

        if (objInfo["d"] != null) //本对象被删除 
          pathObj.RemoveChild(name);
        else //变更属性
        {
          //获取表中m节点表
          var mNode = objInfo["m"];
          //存在属性
          if (mNode != null) 
          {
            //发送事件属性列表
            var PostEventList = [];
            //遍历mNode节点
            for (var attName in mNode) 
            {  
              //获取mNode节点值
              var attValue = mNode[attName];
              //如果为null 则跳出此节点
              if (attValue == null) continue;  
              //当前对象赋值
              currObj.SetValue(attName, attValue); 
              //将属性添加到发送事件列表
              PostEventList.push(attName); 
            }
            //遍历事件属性列表
            for (var i = 0; i < PostEventList.length;i++) 
            {
              //事件属性
              var currEvent = PostEventList[i]
              //抛出事件
              OOSyncClient.PostEvent(currObj, currEvent);
            }
          }
        }//end else
      }//end  for(var key in objs) 
    }//end  for (var path in paths)  
    return true;
  }

  PostEvent(obj,attrName)
  {
    //var path = obj.Path()
    //console.log("PostSyncEvent##", path, attrName)
    //精确绑定的事件
    {
      //获取触发回调函数
      var evt = this.GetValueChangedEvent(obj.Sid(), obj.Path(), attrName);
      //执行触发回调函数
      if (evt != null) evt(attrName);//.Emit
    }

    //模糊绑定的事件
    {
      var evts = this.GetValueChangedEvents(obj.Sid(), obj.Path());
      if (evts != null)
      { 
        for (var kvAttrName in evts) 
        { 
          var evt = evts[kvAttrName]
          if (kvAttrName == "" && evt != null) evt(attrName);//.Emit
        }
      }
    }

    //同时监听子对象的事件
    {
      var fullPath = obj.Path() + "@" + attrName;
      var path = obj.Path();
      do {
        var evts = this.GetValueChangedEvents(obj.Sid(), path);
        if (evts != null)
        { 
          for (var kvAttrName in evts)
          { 
            var evt = evts[kvAttrName];
            if (kvAttrName == "*" && evt != null) evt(fullPath);//.Emit
          }
        }

        if (path == "")
          path = null;
        else {
          var idx = path.lastIndexOf('/');
          if (idx < 0)
            path = "";
          else
            path = path.substr(0, idx);
        }
      } while (path != null);
    }
  }



// 11 Players
// （0,Player,true)
  GetObject(sid, objPath, autoCreate = false)
  {
    if (this._objs[sid]==null) return null;
    //返回根表
    var pathObj = this._objs[sid].RootObj();
    //如果不等于空 
    if (objPath != "") {
      //创建pNames数组
      var pNames = objPath.split('/');
      //遍历pNames数组
      for (var i = 0; i < pNames.length; i++)
      {
        //返回 OOSyncObj 对象
        pathObj = pathObj.GetChild(pNames[i], autoCreate);
        //如果pathObj==null 则返回 null
        if (pathObj == null) return null;
      }
    }
    //查询到OOSyncObj对象 则返回 OOSyncObj对象
    return pathObj;
  }

  RootObj() { 
    for (var key in this._objs) return this._objs[key]
    return null
  }


  /// 绑定值改变事件 
  /// attrName 支持通配符 *
  /// objPath支持相对路径，可以从某个子路径开始表达
  /// (0, "Player/Params", "*" ,fn)
  BindValueChangedEvent(sid, objPath, attrName, evt)
  {
    //如果没有事件对象，则默认赋值为空对象{}
    if (this._valueChangedEvents[sid]==null) this._valueChangedEvents[sid] = {}
    //获取事件对象
    var l1 = this._valueChangedEvents[sid];
    //如果没有找到objpath对象，则赋值为空对象{}
    if (l1[objPath]==null) l1[objPath] = {}
      /*
        _valueChangedEvents={
          'Player/Params':{
              *:()=>{}
          }
        }


       */
    var l2 = l1[objPath];
    if (l2[attrName] == null) l2[attrName] = evt
  }
/*
  RemoveValueChangedEvent(sid,objPath,attrName)
  {
    if (this._valueChangedEvents[sid]==null) return;

    var l1 = this._valueChangedEvents[sid];
    if (l1[objPath]==null) return;

    var l2 = l1[objPath];
    if (l2[attrName]==null) return;

    delete l2[attrName]
  }

      //清除某属性绑定的所有事件
    RemoveValueChangedEvent(sid, objPath)
  {
    if (this._valueChangedEvents[sid]==null) return;

    var l1 = this._valueChangedEvents[sid]
    if (l1[objPath]==null) return;
    delete l1[objPath]
    var l1Count = Object.getOwnPropertyNames(l1).length 
    if (l1Count < 1) delete this._valueChangedEvents[sid]
}*/
  //获取值触发事件
  //(0,Player,2)
  GetValueChangedEvent(sid, objPath, attrName)
  {
    /*
      _valueChangedEvents={
          'Player/Params':{
              *:()=>{}
          }
        }

     */
    //如果没有添加触发事件对象，则返回 null
    if (this._valueChangedEvents[sid]==null) return null;

    var l1 = this._valueChangedEvents[sid];
    if (l1[objPath]==null) return null;

    var l2 = l1[objPath];
    if (l2[attrName]==null) return null;

    return l2[attrName]
  }

  GetValueChangedEvents(sid,objPath)
  {
    if (this._valueChangedEvents[sid]==null) return null;

    var l1 = this._valueChangedEvents[sid]
    if (l1[objPath]==null) return null;

    return l1[objPath]
  }

  Clean()
  {
    this._valueChangedEvents = {}
    this._objs = {}
  }
}
OOSyncClient = new _OOSyncClient() 
module.exports = { OOSyncClient }