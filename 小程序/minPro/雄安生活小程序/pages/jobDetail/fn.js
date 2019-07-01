let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"

//获取职位详情
function getJobDetail(that){
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  let data={
    id: that.jid
  }
  let ajax=new Ajax({
    path: _interface.getJobDetail,
    data
  })
  ajax.then(res=>{
    wx.hideLoading()
    if(res.errcode==0)
    {
      let data=res.data;
      let areaList = getApp().globalData.areaList;
      //公司区域
      if (data.companyDetail.companySelf.length)
      {
        data.companyDetail.companySelf.forEach(item => {
          areaList.forEach(child=>{
            if ( parseInt(child.id) == parseInt(item.area))
            {
              item.area = child.name
            }
          })
        })
      }
     

      that.setData({
        jobDetail:data
      })
    }
    else
    {
      wx.showToast({
        title: '获取数据失败',
        icon: "none"
      })
    }
  })
  ajax.catch(err=>{
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错了',
      icon: "none"
    })
    console.log(err)
  })
}


module.exports={
  getJobDetail
}