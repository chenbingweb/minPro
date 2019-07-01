let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import UserPower from "../../libs/getUserPower.js";
import Login from "../../libs/Login.js";
//修改底部导航状态
function updateNav(index){
  let navList = getApp().globalData.navBar;
  if(!navList) return 
  for(let i=0;i<navList.length;i++){
    if (i == index)
    {
      navList[i].selected=true;
    }
    else
    {
      navList[i].selected = false;
    }
  }
}
//加载发现页面信息
function findPageInfo(that) {
  if (!that.data.showMore)
  {
    wx.showLoading({
      title: '加载中...',
    })
  }
  /**
   * 
   * string keyword, 
   * string provinceId,
   *  string cityId, 
   * string districtId, 
   * int? brandId = null, 
   * int? shopId = null,
   *  int offset = 0, 
   * int limit = 10
   * this.pid = "";
    this.cid = "";
    this.did = "";
   */

  var data = {
    provinceId: that.pid ,
    cityId: that.cid,
    districtId: that.did,

    keyword: that.searchContent,//搜索关键词
    industryId: that.Id,//行业品牌id
    AccessToken: that.UserId,
    offset: (that.page - 1) * that.pageSize,//当前页 
    limit: that.pageSize,//总共页数
    brandId: that.brandId,
    shopId: that.shopId
  }


  var ajax = new Ajax({
    data,
    path: _interface.findPage
  })

  let list = that.data.couponList || [];
  ajax.then(res => {
    wx.hideLoading()
    that.setData({
      showMore: false,
      showFind:true
    })
    if (res.errcode == 0) {

      if (res.data.length >= that.pageSize) {
        that.morePage = true;
      }
      else 
      {
        if (that.morePage && res.data.length < that.pageSize) {
          that.setData({
            showTip: true
          })
        }

        that.morePage = false
      }
      list.push(...res.data)
      //提示
      if (list.length == 0) {
        that.setData({
          showTip: true
        })
      }
      that.setData({
        couponList:list
      })
    }


    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })

}
//加载品牌列表
function getIndustryList(that) {
  wx.showLoading({
    title: '加载中...',
  })
  var data = {
    //AccessToken: getApp().globalData.UserId,
    brandId: 1
  };
  var ajax = new Ajax({
    data,
    path: _interface.getMemberList//_interface.industry
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      // let list = [{
      //   Id: '',
      //   Name: '全部',
      //   flag:true
      // }]
      let list=[]
      for (let i = 0; i < res.data.length;i++){
        if (that.src=='brand' )
        {
          if (res.data[i].Id == that.srcId)
          {
            res.data[i].flag = true;//选中
            that.brandId = res.data[i].Id;//设置品牌id
            that.setData({
              brand: res.data[i].Name,
              ['selectObj.all']:'',
              ['selectObj.pingpai']: 'select_other',
            })
            findPageInfo(that)
          }
          else
          {
            res.data[i].flag = false
          }
        }
        else
        {
          res.data[i].flag = false
        }
        
      }
      list.push(...res.data);
      console.log('list', list)
      that.setData({
        industryList: list
      })
      console.log(list)
    }


   
  })
  ajax.catch(err => {
    console.log(err)
  })

}
// 品牌筛选
function ppFilter(that){
  let detail = that.detail.value;
  let list = that.data.industryList;
  let brand='品牌';
  for (let i = 0; i < list.length;i++)
  {
    //if (detail.includes(list[i].Id+''))
    if (detail == list[i].Id + '')
    {
      list[i].flag=true;
      brand = list[i].Name;
      that.brandId = detail;
    }
    else
    {
      list[i].flag = false;
    }
  }
  that.setData({
    industryList: list,
    brand: brand
  })
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
//店面列表
function shopList(that) {
  if (!that.data.showMore) {
    wx.showLoading({
      title: '加载中...',
    })
  }


  var data = {
    AccessToken: getApp().globalData.UserId,
    keyword:'',
    provinceId: '',
    cityId:'',
    districtId: '',
    brandId: '',
    // offset: (that.page - 1) * that.pageSize,//当前页 
    // limit: 1000//总共页数
  }



  var ajax = new Ajax({
    data,
    path: _interface.getLoactShopList
  })

  let list = that.data.shopList || [];
  ajax.then(res => {
    if (res.errcode == 0) {
      console.log(res)
      let newlist=[];
      let list=res.data;
      for (let i = 0; i < list.length;i++){
        if (that.shopId == list[i].Id)
        {
          list[i].flag = true;
          that.setData({
            selectObj: {
              all: '',
              city: '',
              pingpai: '',
              shop: 'select_other'
            },
            shopName: list[i].Name

          })
        }
        else
        {
          list[i].flag = false;
        }
       
      }
      that.setData({
        shopList: list
      })
    }
    // that.setData({
    //   showMore: false
    // })
    // wx.hideLoading()
    // if (res.errcode == 0) {

    //   if (res.data.length >= that.pageSize) {
    //     that.morePage = true
    //   }
    //   else {
    //     if (that.morePage && res.data.length < that.pageSize) {
    //       that.setData({
    //         showTip: true
    //       })
    //     }

    //     that.morePage = false
    //   }
    //   list.push(...res.data)
    //   //提示
    //   if (list.length == 0) {
    //     that.setData({
    //       showTip: true
    //     })
    //   }
    //   that.setData({
    //     shopList: list
    //   })
    // }


    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })

}
//店面筛选
function shopFilter(that){
  let detail = that.detail.value;
  let list = that.data.shopList;
  let shopName='门店';
  for (let i = 0; i < list.length; i++) {
    //if (detail.includes(list[i].Id+''))
    if (detail == list[i].Id + '') {
      list[i].flag = true;
      shopName = list[i].Name;
      that.shopId = detail;
    }
    else {
      list[i].flag = false;
    }
  }
  that.setData({
    shopList: list,
    shopName: shopName
  })
}
module.exports={
  updateNav,
  findPageInfo,
  getIndustryList,
  ppFilter,
  getCityList,
  shopList,
  shopFilter
}