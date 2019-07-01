
//模拟c#的字符串格式化
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g,
    function (m, i) {
      return args[i];
    });
}

//var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
  
//字符串哈希值
String.prototype.hash = function(){
  var hash = 5381;
  var i = this.length - 1;
   
  for (; i > -1; i--)   hash += (hash << 5) + this.charCodeAt(i);
 
 var value = hash & 0x7FFFFFFF;
 /*
 var retValue = '';
 do{
  retValue += I64BIT_TABLE[value & 0x3F];
 }while(value >>= 6);
  
 return retValue;*/
 return value;
}

String.prototype.MergePath=function(subpath)
{
  var endfg = (this.length>0 && (this.charAt(this.length-1)=="/"||this.charAt(this.length-1)=="\\"))
  var startfg = (subpath.length>0&&(subpath.charAt(0)=="/"||subpath.charAt(0)=="\\"))
  if(endfg&&startfg) //两头都有分隔符
  {
    return this + subpath.substr(1,subpath.length-1);
  } else if(endfg||startfg)//只有一头有分隔符
  {
    return this + subpath;
  } else //两边都没有分隔符
  {
     return this + "/"+subpath;
  }
}