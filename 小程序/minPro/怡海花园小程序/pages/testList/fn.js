let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"

function getTestList(that){
 
  let data={
    page:that.page
  }
  let ajax=new Ajax({
    path: _interface.getTestList,
    data
  })
  ajax.then(res=>{
    wx.hideLoading();
    if (parseInt(res.errorCode)==0)
    {
      if (that.callback)
      {
        that.callback(res.body.data)
      }
      else
      {
        that.setData({
          testList: res.body.data
        })
        if(res.body.data.length==0)
        {
          that.setData({
            ["showTip.show"]: true,
            ["showTip.text"]: '没有数据'
          })
        }
      }
       
    }
    else
    {

    }
    console.log(res)
  })
  ajax.catch(err=>{
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错',
      icon:'none'
    })
  })
}
module.exports={
  getTestList
}