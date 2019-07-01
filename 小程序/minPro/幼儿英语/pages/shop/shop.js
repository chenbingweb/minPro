// pages/shop/shop.js
let inputBox = [
  {
    focuse: false,
    id: 1,
    content: ''
  },
  {
    focuse: false,
    id: 2,
    content: ''
  },
  {
    focuse: false,
    id: 3,
    content: ''
  }, {
    focuse: false,
    id: 4,
    content: ''
  }, {
    focuse: true,
    id: 12,
    content: ''
  },
  {
    focuse: false,
    id: 5,
    content: ''
  },
  {
    focuse: false,
    id: 6,
    content: ''
  }, {
    focuse: false,
    id: 7,
    content: ''
  }, {
    focuse: false,
    id: 8,
    content: ''
  }
]
let _fn=require("./fn.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code1focus: false,
    code2focus: false,
    ActivationCodeSegment1: "", //用户输入的激活码的前半段
    ActivationCodeSegment2: "", //用户输入的激活码的后半段
    ActivationCode: ""   ,       //用户输入的激活码拼接的完整字符串
    code_1:'',
    code_2: '',
    focus: false,
    shopInfo:null,
    imgsData: [{
      ImgUrl: '../../images/img/book_1.jpg',
      Id: '1'
    }, {
      ImgUrl: '../../images/img/book_1.jpg',
      Id: '1'
    }
    ],
    baseSet: {
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#956729',//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
      vertical: false//滑动方向是否为纵向
    },
    userIntegral: {},
    inputBox: inputBox,
    imgUrl: getApp().globalData.imgUrl,//获取图片地址
    StorePageTip:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      StorePageTip: getApp().globalData.BECConf.Text.StorePageTip.Value,
      showTip: getApp().globalData.BECConf.Text.RedeemCodePopup.Show
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })
    // this.setData({
    //   userIntegral: getApp().globalData.userIntegral,
    // })
    this.code='';
    this.userid=getApp().globalData.UserId||0
    _fn.getShopInfo(this)
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
   */
  onShareAppMessage: function () {
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/shop/shop",
      isBtn: false
    })
  },
  focusEvent({ currentTarget }) {
    let id = currentTarget.dataset.id;
    let inputBox = this.data.inputBox;
    for (let i = 0; i < inputBox.length; i++) {
      if (inputBox[i].content == '') {
        this.setData({
          ['inputBox.[' + i + '].focuse']: true
        })
        break
      }
      else
      {
        this.setData({
          ['inputBox.[' + i + '].focuse']: false
        })
      }

    }
    console.log(inputBox)
  },
  inputEvent({ detail }) {
    
    let val = detail.value+'';
    val = val.toUpperCase();
    this.code=val;
   
    let inputBox = this.data.inputBox;
    for (let k = 0; k < inputBox.length;k++){
      this.setData({
        ['inputBox[' + k + '].content']:''
      })
    }
    for (let i = 0; i < val.length; i++) {
      for (let k = 0; k < inputBox.length; k++) {
        if (inputBox[k].id==(i+1))
        {
          this.setData({
            ['inputBox[' + k + '].content']: val[i]
          })
          break
        }
      
      }
    }
    if(val.length==8)
    {
      this.setData({
        focus: false
      })
    }
  },
  doInputEvent(){
    this.setData({
      focus:true
    })
  },
  toDlogin({detail}){
    console.log(detail)
    //获取课本id
    let { uid, cid } = detail.dataset
    
    wx.navigateTo({
      url: `../selectBook/selectBook?uid=${uid}&cid=${cid}`,
    })
  },
  //购买魔药 
  doBuyEvent({ currentTarget}){
    wx.showLoading({
      title: '购买中...',
    })
    if (!getApp().globalData.UserId) {
      getApp().UserLogin(res => {

        if (res == 'err') {
          return
        }
        this.userid = res;
        _fn.getShopInfo(this)
        InnerFn.bind(this)()
      })
    }
    else {
      InnerFn.bind(this)()
    }
    function InnerFn(){
      let {id}=currentTarget.dataset;
      getApp().WXpay(id,res=>{
        wx.hideLoading()
        console.log(res)
        //更新魔药
        _fn.payBack(this)
      })
      console.log(id)
    }
  },
  //兑换学贝
  exchangeMY({currentTarget}){
    if (!getApp().globalData.UserId)
    {
      getApp().UserLogin(res => {

        if (res == 'err') {
          return
        }
        this.userid = res;
        _fn.getShopInfo(this)
        InnerFn.bind(this)()
      })
    }
    else
    {
      InnerFn.bind(this)()
    }
   
   function InnerFn(){
     this.adfloor = currentTarget.dataset.id;
     let self = this
     wx.showModal({
       title: '提示',
       content: '确定要兑换？',
       success(res) {
         if (res.confirm) {
           _fn.exchangeMY(self)
         }
       }
     })
   }
   
  },
  //兑换码
  exchangeCode(e){
    let reg = /[A-Za-z0-9]{8}/g
    console.log(this.code)
    if (this.code=='')
    {
      wx.showToast({
        title: '请输入兑换码',
        icon:'none'
      })
      return 
    }
    
    if (this.code.length<8)
    {
      wx.showToast({
        title: '输入的兑换码位数不正确',
        icon: 'none'
      })
      return 
    }
    if (!reg.test(this.code))
    {
      wx.showToast({
        title: '输入的兑换码不正确',
        icon: 'none'
      })
      return 
    }

   
    _fn.exchangeCode(this)
    // for (let i = 0; i < this.code.length;i++){
    //   if (!reg.test(this.code[i]))
    //   {
    //     wx.showToast({
    //       title: '请输入字母和数字',
    //       icon: 'none'
    //     })
    //     return 
    //   }
    // }
  },
  tip() {
    wx.showModal({
      title: '提示',
      content: getApp().globalData.BECConf.Text.RedeemCodePopup.Value,
      showCancel: false
    })
  },
  bindCodeBoxInput:function (e) {
    //将文本转化为大写字母
    var code = e.detail.value.toUpperCase()

    // 根据触发的来源设定页面数据源
    if (e.target.id == "code1") {
      this.data.ActivationCodeSegment1 = code;
    } else {
      this.data.ActivationCodeSegment2 = code;
    }
    this.code=this.data.ActivationCode = this.data.ActivationCodeSegment1 + this.data.ActivationCodeSegment2

    if (this.data.ActivationCodeSegment1.length == 4) {
      this.setData({
        code1focus: false,
        code2focus: true
      })
    }
    return code
  },
  bindCheckFocus: function (e) {
    if (this.data.ActivationCodeSegment1.length < 4)
      this.setData({
        code1focus: true,
        code2focus: false
      })
  }
  
})