// pages/find/find.js
let _fn=require('./fn.js');
import Tool from "../../libs/Tool.js";
let app=getApp();
function initData(){
  this.page = 1;//默认为第一页
  this.pageSize = getApp().globalData.pageSize;//每次加载数量
  this.morePage = false;//是否获取更多
  this.searchContent = "";//搜索内容
  this.Id = "";//行业Id

  this.pid = "";//省id
  this.cid = "";//市id
  this.did = "";//区id
  this.brandId = "";//品牌id
  this.shopId = "";//门店id
  this.setData({
    couponList: [],
  })
  this.setData({
    couponList: false
  })
  // this.src = null;
  // this.srcId=null;
 
}
function filterInit(){
  this.setData({
    couponList: [],
  })
  this.setData({
    couponList: false
  })
  this.page = 1;//默认为第一页
  this.pageSize = 6;//每次加载数量
  this.morePage = false;//是否获取更多
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    showTip:false,
    markTip:false,
    couponList:false,
    industryList:false,
    imgUrl: app.globalData.imgUrl,//获取图片地址
    showMore:false,
    showFind:false,
    showCity:'城市',
    uid: true,
    focus:false,
    selectObj: {
      all: 'select_other',
      city: '',
      pingpai: '',
      shop: ''
    },
    showPanel:false,
    showFilter:false,
    show:false,//城市列表隐藏
    cityList:[],
    userSelect:'',//用户当前操作,
    shopList:[],//门店列表,
    brand:'品牌',
    shopName:'门店',
    login:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
   
    _fn.updateNav(2)
    initData.bind(this)()
    if (options.src) {
      this.src = options.src;
    }
    if (options.id) {
      this.srcId = options.id
    } 
    this.shopId = options.shopId || '';//门店id
    this.setData({
      couponList:[],
      cityList: [],
    })
    this.setData({
      couponList:false,
      login: getApp().globalData.UserId == undefined ? false : true
    })

    // if (app.globalData.UserId){
    //   this.UserId = app.globalData.UserId;
    //   //加载发现页面
    //   _fn.findPageInfo(this)
    //   //获取行业列表
    //   _fn.getIndustryList(this)
    //   this.setData({
    //     uid:false
    //   })
    //   // 获取城市列表
    //   _fn.getCityList(() => {
    //     this.setData({
    //       cityList: getApp().globalData.cityList,
    //       disabled: false
    //     })
    //   })
    //   //获取门面
    //   _fn.shopList(this) 
    // }
    // else
    // {
    //   //登陆，获取用户绑定信息
    //   app.UserLogin((res) => {
    //     this.UserId = app.globalData.UserId;
    //     this.setData({
    //       uid: false
    //     })
    //     //加载发现页面
    //     _fn.findPageInfo(this)
    //     //获取行业列表
    //     _fn.getIndustryList(this)
    //     // 获取城市列表
    //     _fn.getCityList(()=>{
    //       this.setData({
    //         cityList: getApp().globalData.cityList,
    //         disabled: false
    //       })
    //     })
    //     //获取门面
    //     _fn.shopList(this) 
    //   })
    // }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      couponList:[],
      showTip: false,
      showFilter:false
    })
    if (this.sid)
    {
      hidden.bind(this)(this.sid)
      
    }
    
    this.setData({
      couponList: false
    })
    //加载发现页面
    if (app.globalData.UserId) {
      this.UserId = app.globalData.UserId;
      
      if (this.src != 'brand') {
        //加载发现页面
        _fn.findPageInfo(this)
      }
      //获取行业列表
      _fn.getIndustryList(this)
      this.setData({
        uid: false
      })
      // 获取城市列表
      _fn.getCityList(() => {
        this.setData({
          cityList: getApp().globalData.cityList,
          disabled: false
        })
      })
      //获取门面
      _fn.shopList(this)
      this.setData({
        login: getApp().globalData.UserId == undefined ? false : true
      })
    }
    else {
      //登陆，获取用户绑定信息
      app.UserLogin((res) => {
        this.UserId = app.globalData.UserId;
        this.setData({
          uid: false
        })

        if (this.src != 'brand')
        {
          //加载发现页面
          _fn.findPageInfo(this)
        }
        //获取行业列表
        _fn.getIndustryList(this)
        // 获取城市列表
        _fn.getCityList(() => {
          this.setData({
            cityList: getApp().globalData.cityList,
            disabled: false
          })
        })
        //获取门面
        _fn.shopList(this)
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    initData.bind(this)()
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    initData.bind(this)()
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
  
  onPullDownRefresh: function () {
  
  }, */

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
  
  onShareAppMessage: function () {
  
  }, */
  //分页
  paginationEvent(){
    if (!this.morePage) return 
    this.page += 1;
    this.setData({
      showMore:true
    })
    _fn.findPageInfo(this)
  },
  //隐藏搜索提示
  hideTipMark(){
    console.log('ll')
    let canClick = Tool.canClick(600)()
    if (!canClick) return 
    this.setData({
      markTip:true,
      focus: true
    })
  },
  //显示提示
  cancleSearch(){
  
    
    this.searchContent = '';
    this.page = 1;
    this.morePage = false;

    this.pid = "";//省id
    this.cid = "";//市id
    this.did = "";//区id
    this.brandId = "";//品牌id
    this.shopId = "";//门店id

    this.setData({
      couponList: [],
      searchContent: '',
      value: '',
      markTip: false,
      focus: false,
      showFilter: false,

      selectObj: {
        all: 'select_other',
        city: '',
        pingpai: '',
        shop: ''
      },
      userSelect: '',
      showCity: '城市',
      brand: '品牌',
      shopName: '门店'
    })

    //加载发现页面
    _fn.findPageInfo(this)
  },
  //搜索确认
  confirmSearch({detail}){
    this.searchContent = detail.value;
    this.setData({
      couponList: [],
      showTip:false
    })
    this.page = 1;
    _fn.findPageInfo(this)
  },
  //行业筛选
  selectItem(e){
    if (!Tool.canClick()) return 
    this.page = 1;//默认为第一页
    this.pageSize = 6;//每次加载数量
    this.morePage = false;//是否获取更多
    this.setData({
      couponList:[],
      showTip: false,
    })
    //行业id
    this.Id=e.currentTarget.dataset.id
    let list = this.data.industryList
    for (let i = 0; i < list.length;i++){
      if (list[i].Id==this.Id)
      {
        list[i].flag=true;
      }
      else
      {
        list[i].flag = false;
      }
    }
    this.setData({
      industryList: list
    })
    //获取行业列表
    _fn.findPageInfo(this)
  },
  //领取优惠券
  toBuyCoupon(e){
    wx.showLoading({
      title: '跳转中...',
      mask:true
    })
    let { company, id, canbuy } = e.currentTarget.dataset;
    
    if(!getApp().globalData.UserId) {
      app.UserLogin(() => {
        wx.hideLoading()
        wx.navigateTo({
          url: `../couponDetail/couponDetail?id=${id}`,
        })
        return 
       
        // _fn.toMemberCard(e.currentTarget.dataset) 
        if (canbuy)//付费优惠券
        {
          //app.WXpay(id)
          wx.navigateTo({
            url: `../couponDetail/couponDetail?id=${id}`,
          })
        }
        else//免费优惠券
        {
          wx.showLoading({
            title: '领取中..',
          })
          app.AddCoupon(id)
        }


      })
    }
    else 
    {
      wx.hideLoading()
      wx.navigateTo({
        url: `../couponDetail/couponDetail?id=${id}`,
      })
      return
      if (canbuy) {//付费优惠券
      //  app.WXpay(id)
        wx.navigateTo({
          url: `../couponDetail/couponDetail?id=${id}`,
        })
     //   return 
      }
      else {//免费优惠券
        wx.showLoading({
          title: '领取中..',
        })
        app.AddCoupon(id)
      }
    }

  },
  //手动获取店铺
  getAllShop(e){
    wx.showLoading({
      title: '加载中...',
    })
    app.UserLogin(()=>{
      this.setData({
        uid: false
      })
      this.UserId = app.globalData.UserId;
      //获取行业列表
      _fn.getIndustryList(this)
      _fn.findPageInfo(this)
    })
    console.log(e)
  },
  focus(){
    this.setData({
      markTip:true
    })
  },
  //筛选按钮
  selectBtnFilter(e){
    this.src = null;
  this.srcId=null;
    let id=e.currentTarget.id;
    this.sid=id;
    console.log(this.sid)
    if(id=="all"){
      this.setData({
        selectObj: {
          all: 'select_other',
          city: '',
          pingpai: '',
          shop: ''
        },
        showFilter: false,
        userSelect: '',
        showCity: '城市',
        brand: '品牌',
        shopName: '门店',
        markTip:false
      })
     // this.onLoad()
      initData.bind(this)()
       //加载发现页面
     _fn.findPageInfo(this);

     // 重置 品牌
     this.brandId = "";//品牌id
     let lists = this.data.industryList
     for (let i = 0; i < lists.length; i++) {
       lists[i].flag = false
     }
     this.setData({
       industryList: lists,
       brand: '品牌'
     })

     // 重置 门店i
     this.shopId = "";//门店id
     let list = this.data.shopList
     for (let i = 0; i < list.length; i++) {
       list[i].flag = false
     }
     this.setData({
       shopList: list,
       shopName: '门店'
     })
      
    
    }
    if (id == "city") {
      this.setData({
        selectObj: {
          all: '',
          city: 'select_other',
          pingpai: '',
          shop: '',
          
        },
        show: true,
        showFilter:false,
        userSelect: ''
      })
      
    }
    if (id == "pingpai") {

      if (this.data.selectObj.pingpai =="selected_btn")
      {
        this.setData({
          selectObj: {
            all: '',
            city: '',
            pingpai: 'select_other',
            shop: ''
          },
          showPanel: id,
          showFilter: false,
          userSelect: 'pingpai'
        })
      }
      else
      {
        this.setData({
          selectObj: {
            all: '',
            city: '',
            pingpai: 'selected_btn',
            shop: ''
          },
          showPanel: id,
          showFilter: true,
          userSelect: 'pingpai'
        })
      }

      

    }
    if (id == "shop") {
      if (this.data.selectObj.shop == "selected_btn")
      {
        this.setData({
          selectObj: {
            all: '',
            city: '',
            pingpai: '',
            shop: 'select_other'
          },
          showPanel: id,
          showFilter: false,
          userSelect: 'shop'
        })
      }
      else
      {
        this.setData({
          selectObj: {
            all: '',
            city: '',
            pingpai: '',
            shop: 'selected_btn'
          },
          showPanel:id,
          showFilter:true,
          userSelect: 'shop'
        })
      }
    }
    
  },
  // 取消筛选
  cancel(){
    this.setData({
      showFilter: false
    })
    hidden.bind(this)(this.sid)
  },
  //筛选 
  checkboxChange({ detail}){
    this.detail=detail;
    _fn.ppFilter(this);
    console.log(detail)
  },
  //门店
  shopCheckChange({ detail }){
    this.detail=detail;
    _fn.shopFilter(this)
    console.log(detail)
  },
  //取消
  cancelCity() {
    this.setData({
      cityDeg: 0
    })
  },
  //城市选择
  citySelect({ detail }) {
    //设置选择的城市
    this.setData({
      showCity: detail.selectCity.name,
      cityDeg: 0
    })

    if (detail.selectCity.code == '') {
      this.setData({
        showCity: '城市'
      })
    }
    this.pid = detail.codes.proCode;
    this.cid = detail.codes.cityCode;
    this.did = detail.codes.countryCode
    this.page = 1;
    this.morePage = false;
    this.setData({
      couponList: [],
      showTip: false,
      showCity: detail.selectCity.name == '' ? '城市' : detail.selectCity.name
    })
    console.log(detail)
    _fn.findPageInfo(this)
   // _fn.searchShopList(this)
  },
  //重置
  repeat(e){
    let id=e.currentTarget.id;
    if (id =='pingpai')
    {
      this.brandId = "";//品牌id
      let list = this.data.industryList
      for (let i = 0; i < list.length;i++){
        list[i].flag=false
      }
      this.setData({
        industryList: list,
         brand: '品牌'
      })
      
     
    }
    if (id == 'shop') {
      this.shopId = "";//门店id
      let list = this.data.shopList
      for (let i = 0; i < list.length; i++) {
        list[i].flag = false
      }
      this.setData({
        shopList: list,
        shopName: '门店'
      })
    }
      
  },
  //确认筛选
  confirmCoup(e){
    let id = e.currentTarget.id;
    this.setData({
      showFilter: false,
    })
    filterInit.bind(this)()
    _fn.findPageInfo(this)
    hidden.bind(this)(id)
  }
})

// 选中后品牌和门店，隐藏面板
function hidden(id){
  if(id=="pingpai")
  {
    this.setData({
      selectObj: {
        all: '',
        city: '',
        pingpai: 'select_other',
        shop: ''
      }
    })
  }
  else if (id == "shop")
  {
    this.setData({
      selectObj: {
        all: '',
        city: '',
        pingpai: '',
        shop: 'select_other'
      }
    })
  }
}

