
import { UIEvent } from '../network/UIEvent.js';
class OOMsg{
  constructor(){
    this.MsgArr = [];
    this.callBack=null;
    this.OnMsg = new UIEvent()// 
    this.msg=true
    let i=0
    // setInterval(()=>{
    //   i++
     
    //   console.log(this.MsgArr)
    //   var doc = { msg: '有消息' + i }
    //   this.MsgArr.push(doc);
    //   doc.flag = true
    //   this.MsgArr = this.MsgArr.filter(item => {
    //     return item.flag == true
    //   })
      
    // },2000)
  }
  MsgDispatcher(doc){
    //doc 为null 返回false
    if (null == doc) return false;
    //这不是一个同步包
    if ("_Msg" != doc["n"]) return false;
    // this.MsgArr = this.MsgArr.filter(item=>{
    //   return item.flag == true
    // })

    // console.log(this.MsgArr)
    // doc.flag=true
    this.MsgArr.push(doc);
    if (this.MsgArr.length==1)
    { 
     
      this.MsgArr.unshift({ msg: '消息提示' })
      this.MsgArr.unshift({ msg: '' })
    }
    this.OnMsg.Emit(doc)
 
    
   // this.getMsg(this.callBack)
  }
  getMsg(callBack){

    callBack && callBack(this.MsgArr)
  }
}
let Msg = new OOMsg()

module.exports = { Msg }