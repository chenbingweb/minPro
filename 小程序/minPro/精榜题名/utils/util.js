//获取手机信息
function getPhoneInfor() {
  var sysInfo = null;
  wx.getSystemInfo({
    success: function (res) {
      console.log(res)
      sysInfo = res;
      //getApp().globalData.model = res.model
    }
  })
  return sysInfo
}
module.exports = {
  getPhoneInfor
}
