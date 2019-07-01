var _util=require('../../utils/util.js');
//获取首页轮播图，热门礼品，为您推荐信息
function getIndexInfo(userId,that)
{
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  var sendData={
    member_id:userId
  }
  _util.Ajax(sendData,(res)=>{
    wx.hideLoading();
    var scrollwidth=0;
    if (res.encode)
    {
      if (res.data.hotgifts.length && Array.isArray(res.data.hotgifts))
      { 
        scrollwidth = res.data.hotgifts.length;
      }
      that.setData({
        imgUrls: res.data.swiper,
        hotgifts: res.data.hotgifts,
        scrollwidth: scrollwidth,
        recommend: res.data.recommend,
        game: res.data.game,
        showPages: true
      })
      
    }

  },(err)=>{
    wx.hideLoading()
    }, 'shop/index', undefined, undefined)
}


module.exports = {
  getIndexInfo
};