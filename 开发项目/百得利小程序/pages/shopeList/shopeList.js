// pages/shopeList/shopeList.js
let _fn = require('./fn.js')
function searchFn() {
  this.page = 1;
  this.morePage = false;
  this.setData({
    shopList: [],
    showTip: false
  })
  _fn.searchShopList(this)
}
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    companyList: false,
    disabled: true,
    show: false,
    showCity: '城市',
    showTip: false,
    cityDeg: 0,
    allDeg: 0,
    hiddenMark: false,
    imgUrl: app.globalData.imgUrl,//获取图片地址
    showMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.page = 1;//默认为第一页
    this.pageSize = getApp().globalData.pageSize;//每次加载数量
    this.morePage = false;//是否获取更多
    this.searchContent = "";//搜索内容
    //this.cityCode="";//城市id
    this.pid = '';
    this.cid = '';
    this.did = '';
    this.comId = "";//品牌id
    //this.
    this.app = getApp();
    
    //获取品牌列表
    _fn.getCompanyList(this);
    //获取全部店铺列表
    _fn.searchShopList(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   // console.log(getApp().globalData.cityList)
    this.setData({
      cityList: getApp().globalData.cityList,
      disabled: false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
  
  onShareAppMessage: function () {
  
  } */
  //跳转小程序
  toShopingDetail(e) {
    let { id } = e.currentTarget.dataset
    wx.showLoading({
      title: '加载中...',
    })
    if (!getApp().globalData.UserId) {
      this.app.UserLogin(() => {
        wx.hideLoading()
        wx.navigateTo({
          url: `../shopDetail/shopDetail?id=${id}`,
        })
         //  _fn.shopeDetail(e.currentTarget.dataset)
      })
    }
    else {
      wx.navigateTo({
        url: `../shopDetail/shopDetail?id=${id}`,
        success(){
          wx.hideLoading()
        }
      })
     // _fn.shopeDetail(e.currentTarget.dataset)
    }

  },
  //城市选择
  showPicker(e) {
    this.setData({
      show: true,
      cityDeg: 180
    })
  },
  //取消
  cancelCity(){
    this.setData({
      cityDeg: 0
    })
  },
  //品牌选择
  bindPickerChange(e) {
    let { value } = e.detail;
    let companyList = this.data.companyList;
    if (Array.isArray(companyList) && companyList.length) {
      this.setData({
        value: companyList[value].Name,
        allDeg:0
      })
    }
    this.comId = companyList[value].Id;
    searchFn.bind(this)()
    console.log(companyList[value].Id)
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
    console.log(detail)
    //this.cityCode = detail.selectCity.code;
    // provinceId: that.pid,
    //   cityId: that.cid,
    //     districtId: tnat.did,proCode: "110000", cityCode: "110100", countryCode: "110101"
    this.pid = detail.codes.proCode;
    this.cid = detail.codes.cityCode;
    this.did = detail.codes.countryCode
    this.page = 1;
    this.morePage = false;
    this.setData({
      shopList: [],
      showTip: false
    })
    console.log(detail)
    _fn.searchShopList(this)
  },
  //分页事件
  paginationEvent(e) {
    //禁止上拉
    if (!this.morePage) return
    this.page += 1;
    this.setData({
      showMore: true
    })
    _fn.searchShopList(this)
    // if (this.searchContent != "" || this.cityCode != "" || this.comId != "")
    // {

    // }
    // else//无任何筛选
    // {
    //   //获取全部店铺列表
    //   _fn.getAllShopList(this);
    // }

    // console.log(e)
  },
  //隐藏搜索
  hideSearchMark() {
    this.setData({
      hiddenMark: true,
      
    })
  },
  //搜索
  confirmSearch({ detail }) {
    this.searchContent = detail.value;
    this.setData({
      shopList: [],
      showTip: false
    })
    this.page = 1;
    _fn.searchShopList(this)
    console.log(this.searchContent)
  },
  //取消搜索按钮事件
  cancleSearch() {
    this.searchContent = '';
    this.page = 1;
    this.morePage = false;
    this.setData({
      hiddenMark: false,
      shopList: [],
      searchContent: '',
      showTip: false,
     
    })
    _fn.searchShopList(this)
    // if (this.cityCode != "" || this.comId != "") {

    // }
    // else//无任何筛选
    // {
    //   //获取全部店铺列表
    //   _fn.getAllShopList(this);
    // }
  },
  //失去焦点事件
  blurEvents() {
    if (this.searchContent == '') {
      this.cancleSearch()
    }

  },
  //键盘输入事件
  bindKeyInput({ detail }) {
    this.searchContent == detail.value;
  },
  focus() {

  },
  //打开品牌
  openComList() {
    this.setData({
      allDeg: 180
    })
  },
  //关闭品牌
  cancleCity() {
    this.setData({
      allDeg: 0
    })
  }
})