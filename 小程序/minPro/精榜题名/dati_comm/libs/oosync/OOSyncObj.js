  /// <summary>
  /// 同步对象
  /// </summary>
  export default class OOSyncObj {
    // Init(sid)
    // {
    //   this._sid = sid
    //   this._name = ""
    //   this._Parent = null;
    //   this._key_values = {}
    //   this._childs = {}
    // }
    //初始化Obj对象
    Init(sid,parent,name)
    {
      this._sid = sid
      this._name = name
      this._Parent = parent
      this._key_values = {}
      this._childs = {}
    }
    //根据key 获取值
    GetValue(attrName){ return this._key_values[attrName]  } 
    //获取属性数量
    ChildCount() { return Object.getOwnPropertyNames(this._childs).length }

    //设置_key_values值
    SetValue(attrName,value) {  
       this._key_values[attrName] = value 
    }
    //获取_childs[name]对象
    GetChild(name, autoCreate = true)
    {
      //如果已经存在，返回_childs[name]值
      if (this.HasChild(name)) return this._childs[name];
      //不允许自动创建，只能返回null
      if (!autoCreate) return null;
      //实例OOSyncObj对象
      var obj = new OOSyncObj()
      //初始化obj对象
      obj.Init(this._sid, this, name)
      //_childs赋值 
      this._childs[name] = obj
      //返回OOSyncObj对象
      console.log(obj)
      return obj
    }
    //移除
    Delete()  { this._Parent.RemoveChild(this) }

    RemoveChild(obj)
    {
      var n = obj._name;
      //根据_name 查询 如果不存在 就不用移除
      if (!this.HasChild(n) || this._childs[n] != obj) return;
      //调用移除方法
      this.RemoveChildN(n);
    }

    RemoveChildN(name) { this._childs.Remove(name); }
    //根据key,查看key 在_childs中是否存在值
    HasChild(name) { return this._childs[name]!=null }

    Path()
    { 
      //处理根对象
      if (this._Parent == null) return ""
      var p = this._Parent.Path();
      return p == null ? null : (p == "" ? this.Name() : p + "/" + this.Name()); 
    }

    Parent() { return _Parent } 
 
    Name() { return this._name}

    Sid() {return this._sid}
    //循环遍历属性
    Foreach(jsFun)
    {
      if (jsFun == null) {
        Log("OOSyncObj Foreach jsFun is null");
        return;
      }

      for (var key in this._childs) jsFun(key , this._childs[key])
    } 
}

    