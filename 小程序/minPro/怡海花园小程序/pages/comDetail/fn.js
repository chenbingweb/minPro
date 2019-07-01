let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
let WxParse = require('../../wxParse/wxParse.js');
function getDetail(that) {
  let data = {
    id: that.aid
  }
  let ajax = new Ajax({
    path: _interface.getDetail,
    data
  })
  ajax.then(res => {
    wx.hideLoading();
    if (parseInt(res.errorCode) == 0) {
      that.setData({
        richText: res.body.data
      })
      WxParse.wxParse('article', 'html', res.body.data.rich_content, that, 5);
    }
    else {

    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错',
      icon: 'none'
    })
  })
}
module.exports = {
  getDetail
}