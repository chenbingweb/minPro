let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
function DoSJXJ(that){
  wx.showLoading({
    title: that.type=='sj'?'上架中...':'下架中...',
    mask: true
  })
  let data = {
    userId:getApp().globalData.userId,
    "type":that.type,
    id: that.did,
    category: that.xjType
  }
  let ajax = new Ajax({
    path: _interface.doSJXJ,
    data
  }).then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
        wx.showToast({
          title: that.type == 'xj' ? '上架成功' : '下架成功',

          mask:true,
          success:()=>{
            //移除数据
            let list = that.data.middPerList;
            if(list.length)
            {
              list.forEach((item,index)=>{
                if (item.id == that.did)
                {
                  list.splice(index, 1)
                  return 
                }
              })
              that.setData({
                middPerList: list
              })
            }
          }
        })
    }
    else {
      wx.showToast({
        icon: 'none',
        title: '获取数据失败'
      })
    }

  }).catch(err => {
    wx.hideLoading();
    wx.showToast({
      icon: 'none',
      title: '服务器报错了...',
    })
  })
}
module.exports={
  DoSJXJ
}