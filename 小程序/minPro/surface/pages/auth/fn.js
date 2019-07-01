let _util=require('../../utils/util.js')
//用户认证
function authUser(that)
{
  wx.showLoading({
    title: '认证中...',
  })
  var sendData = {
    company_id: that.company_id,
    	member_id:that.uid
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();

    if (res.encode ==-1) {
      that.setData({
        show:true,
        temp_name:'fail',
        msg:res.msg
      })
    }
    else if (res.encode==1)
    {
      that.setData({
        show: true,
        temp_name: 'succ',
        msg: ''
      })
    }

  }, (err) => {
    wx.hideLoading()
    that.setData({
      show: true
    })
    }, 'member/auth-manage', undefined, undefined)
  
}
module.exports={
  authUser
}