let _util = require('../../utils/util.js');
let _interface=require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import UserPower from "../../libs/getUserPower.js";
import Login from "../../libs/Login.js";
//获取首页信息
function getIndexInfo(that){
  wx.showLoading({
    title: '加载中',
  })
  Promise.all([getBanner(that), getMember(that), getCouponList(that)]).then(res=>{
    let one=[];
    that.setData({
      showIndex: true
    })
    wx.hideLoading();
    //banner图
    if (res[0].errcode==0)
    {
      if (Array.isArray(res[0].data) && res[0].data.length) {
        that.setData({
          imgsData: res[0].data
        })
      }

    }
    console.log(res[1])
     //品牌会员
    if (res[1].errcode == 0) {
      if (Array.isArray(res[1].data) && res[1].data.length) {
        that.setData({
          companyMember: res[1].data
        })
      }
     
    }
    //会员推荐
    if (res[2].errcode == 0) {
      if (Array.isArray(res[2].data) && res[2].data.length) {
        that.setData({
          couponList: res[2].data
        })
      }
    }
 
  

    console.log(res)

  }).catch(err=>{
  console.log(err)
  })
}
//获取banner
function getBanner(that) {
  let promise=new Promise((resolve,reject)=>{
    var data = {
      brandId : 1
    }
    var ajax = new Ajax({
      data,
      path: _interface.getBanner
    })
    ajax.then(res => {
      console.log(res)


      resolve(res)
      console.log(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
 return promise 
}
//获取品牌会员卡
function getMember(that) {
  let promise = new Promise((resolve, reject) => {
    var data = {
      brandId: 1
    }
    var ajax = new Ajax({
      data,
      path: _interface.getMemberList
    })
    ajax.then(res => {
      console.log(res)
      wx.hideLoading();
      resolve(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
  return promise
}
//获取推荐优惠券
function getCouponList(that) {
  let promise = new Promise((resolve, reject) => {
    var data = {
      brandId: 1
    }
    var ajax = new Ajax({
      data,
      path: _interface.getCoupon
    })
    ajax.then(res => {
      console.log(res)
      wx.hideLoading();
      resolve(res)
    })
    ajax.catch(err => {
      reject(err)
      console.log(err)
    })
  })
  return promise
}

//根据地理位置，获取附近店铺
function getNearShop(that){
  Tool.getLocation({}).then(res=>{
    getApp().globalData.location = res
    //获取地理位置
    nearShop(res,that)
  }).catch(err=>{
    //获取地理位置失败
    wx.showToast({
      title: '获取附近店铺失败',
      icon: "none",
      mask: true
    })
    console.log(err)
  })
}

//获取附近店铺
function nearShop(location,that) {
  wx.showLoading({
    title: '加载中...',
  })
  var data = location;
  var ajax = new Ajax({
      data,
      path: _interface.getNearShop
    })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode==0)
    {
      let data=res.data;
      that.setData({
        neareShopList:data
      })
    }
    else
    {

    }
    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })

}
//手动获取店铺
function clickGetNearShop(that){
  let up=new UserPower();
  up.openSetting({
    auth: 'scope.userLocation',
    succ(res) {//成功
    console.log(res)
      getNearShop(that)
    },
    fail(err) {//失败
      wx.showToast({
        title: '获取附近店铺失败',
        icon:"none",
        mask:true
      })
    }
  })
}
//手动登录
function userLogin(succ){
  let login = new Login(); 
  if (!getApp().globalData.UserId) {
      login.resolveLogin({
        path: _interface.login,//接口地址，默认为空(必传)
        loginSucc(res) { //登录成功(必传)
          //设置用户UserId
          getApp().globalData.UserId = res.data;
          //userClick({ types, aid })
         // countTimes(aid)
          succ()
        },
        loginFail(err) { //登录失败(必传)
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })

        }
      })
  } 
  else
  {
    succ()
  }
  
}
//查看文章详情
function toArticle(aid){
    wx.navigateTo({
      url: `../articleDetail/articleDetail?aid=${aid}`,
    })
  
}

//获取会员卡组件参数，并跳转会员卡界面
function toMemberCard(sendData){
  
  wx.showLoading({
    title: '加载中...',
  })
  let { outstr, encryptcardid, cardbiz } = sendData;
  let param={
    encrypt_card_id: encryptcardid, outer_str:outstr + '', biz:cardbiz
  }
  console.log(param)
  Tool.memberComponent(param).then(res => {
    console.log(res)
  }).catch(err => {
    wx.showToast({
      title: '打开失败',
      icon: 'none'
    })
  })
  // var data = sendData;
  // data.UserId=getApp().globalData.UserId;
  // var ajax = new Ajax({
  //   data,
  //   path: _interface.getMemBerData
  // })
  // ajax.then(res => {
  //   wx.hideLoading()
  //   if (res.errcode==0)
  //   {
  //     let param = res.data;
  //     console.log(param)
  //     Tool.memberComponent(param).then(res=>{
  //       console.log(res)
  //     }).catch(err=>{
  //       wx.showToast({
  //         title: '打开失败',
  //         icon:'none'
  //       })
  //     })
  //   }
  //   console.log(res)
  //   //
    
  // })
  // ajax.catch(err => {
  //   console.log(err)
  // })

}
//跳转微店小程序
function shopeDetail(sendData){
  wx.showLoading({
    title: '加载中...',
  })
  var data = sendData;

  console.log(data)
  data.path = `pages/store/store?poi_id=${sendData.polid}`
  Tool.toMiniPro(data).then(res => {
    console.log(res)
    wx.hideLoading()
  }).catch(err => {
    wx.showToast({
      title: '打开失败',
      icon: 'none'
    })
  })

  // data.UserId = getApp().globalData.UserId;
  // var ajax = new Ajax({
  //   data,
  //   path: _interface.toMiniProgram
  // })
  // ajax.then(res => {
  //   wx.hideLoading()
  //   if (res.errcode == 0) {
  //     let param = res.data;
  //     Tool.toMiniPro(param).then(res => {
  //       console.log(res)
  //     }).catch(err => {
  //       wx.showToast({
  //         title: '打开失败',
  //         icon: 'none'
  //       })
  //     })
  //   }
  //   console.log(res)
  //   //

  // })
  // ajax.catch(err => {
  //   console.log(err)
  //})
}


//获取城市列表
function getCityList(callback) {
  wx.showLoading({
    title: '加载中...',
  })
  var data = {
    AccessToken: getApp().globalData.UserId
  };

  var ajax = new Ajax({
    data,
    path: _interface.getCityList
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      getApp().globalData.cityList = res.data
      callback()
      // that.setData({
      //   cityList: res.data,
      //   disabled: false
      // })
    }


    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })
}
//发起微信支付
function WXpay(id){
  var data = {
    UserId: getApp().globalData.UserId,
    Id: id
  }
  var ajax = new Ajax({
    data,
    path: _interface.paydata
  })
  ajax.then(res => {
    if (res.errcode==0)
    {
      Tool.WXpay(res.data).then(res=>{
          console.log(res)
          
      }).catch(err=>{
          console.log(err)
      })
    }
    //wx.hideLoading()
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
  })
}

module.exports={
  getIndexInfo,
  getNearShop,
  clickGetNearShop,
  toArticle,
  toMemberCard,
  shopeDetail,
  userLogin,
  WXpay,
  getBanner,
  getCityList
}























//加载首页信息，搜索关键字， search:that.search||''
function getIndexInfo_(that){
  if (!that.page)
  {
    that.setData({
      beadhouse: []
    })
  }
  else
  {
    var beadhouse = that.data.beadhouse
  }
 
  wx.showLoading({
    title: '加载中...',
  })
  //梅州that.city_name
  var data={
    city_name: that.city_name,//that.city_name,//城市名(市级)
    content:that.content||'',
    page_size:that.pageSize,
    page_num: that.pageNum,
    page: that.page||undefined
  }
  
  _util.Ajax(data, res=>{
    wx.hideLoading();
  
    if (res.errcode==0)
    {
     
      var data=res.data;
      if (that.page) {
        //如果没有数据，显示没有更多提示
        if (!data.beadhouse.length)
        {
          that.setData({
            note: { showImg: false, text: '没有更多' },
            showLoading: true
          })
        }
        else
        {
          that.setData({
            note: {showImg: true, text: '加载中...' },
            showLoading: false
          })
        }
        
      }
      
      //不分页
      if (!that.page)
      {
       
        that.setData({
         
        })
      }
      else//分页
      {
        beadhouse.push(...data.beadhouse);
        that.setData({
          
        })
      }
      
    }
    else//没有数据则不显示页面信息
    {
      that.setData({
        beadhouse: false
      })
    }

  }, err=>{
    wx.hideLoading()
    }, _interface.institutions)
}



function exameple(){
  wx.showLoading({
    title: '加载中...',
  })
  var data = {
    city_name: '北京市',//that.city_name,//城市名(市级)
    content: '',
    page_size: 6,
    page_num: 1
  }
  var ajax = new Ajax({
    data,
    path: 'v1/institutions/institutions_list'
  })
  ajax.then(res => {
    wx.hideLoading()
    console.log(res)
  })
  ajax.catch(err=>{
    console.log(err)
  })

}
// module.exports={

//   getIndexInfo,
//   exameple
// }