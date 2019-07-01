let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"

//签到
function toSign(that){
  let data={
    userId:getApp().globalData.userId
  }
  let ajax=new Ajax({
    path:_interface.signPage,
    data
  })
  ajax.then(res=>{
    if(res.errcode==0)
    {
      that.setData({
        signList: res.data
      }) 
      setTimeout(()=>{
        wx.showToast({
          title: '签到成功',
        })
        //获取签到记录
        that.setData({
          dataObj: {
            url: _interface.getSignList,
            outData: {
              userId: getApp().globalData.userId
            }
          }
        })
      },2000)
    }
  })
  ajax.catch(err=>{

    wx.showToast({
      title: '服务器报错',
      icon:"none"
    })
  })
}

module.exports={
  toSign
}