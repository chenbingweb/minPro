// pages/index/index.js
let app=getApp();
let _util = require('../../utils/util.js');
let _fn=require('./fn.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"
import {User} from "../../model/user.js";
import {Index} from "../../model/index.js";
let _interface = require('../../utils/interface.js')
Page({

  /**
   * 页面的初始数据'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
   */
  data: {
    studyRate:{},//学习进度
    words:[],
    bannerImg:'',
    isSelectLesson:false,//未选课程
    banner:[],
    baseSet:{
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#000000',//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
      vertical: false//滑动方向是否为纵向
    },
    isPower:true,
    isRegister:true,
    
    imgUrl: getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //选择的单词库
    this.selectWordId=''
    if(User.token!=='')
    {
      this.loginSuccess(true)
    }
    getApp().updataNav(0)
    this.bottomNav = this.selectComponent('#bottomNav');

  },
  onPageData({ detail }) {
    let list = this.data.orderList;
    list.push(...detail);
    this.setData({
      orderList: list
    })
    console.log(detail)
  },
  //取消绑定事件
  _offEvent(){
    User.login.Off(this.loginSuccess);
    User.getStudyInfoEvent.Off(this.getStudyInfoEvent)
    
  },
  _bindEvent(){
    //绑定登录事件
    User.login.On(this, this.loginSuccess);  
    User.getStudyInfoEvent.On(this, this.getStudyInfoEvent)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // getApp().UserToLogin(res=>{
    //   console.log(res)
    // })
  },
  onRefresh(){
    User.UserToLogin()
  },
  //登录成功
  loginSuccess(res){
  
      Index.getIndex(result=>{
        let list = result;
        list.forEach(item=>{
          if (item.id == User.thesaurus_id)
          {
            item.checked=true;
            //显示描述
            this.setData({
              description: item.description ? item.description :''
            })
          }
          else
          {
            item.checked = false
          }
        })
        this.setData({
          words: list,
          studyRate: User.studyInfo
        })
      })
    
    this.setData({
      isSelectLesson: User.thesaurus_id !=''?true:false
    })
    this.setData({
      isRegister: res
    })
  },
  //学习情况
  getStudyInfoEvent(res){
    console.log(res)
   // if(res==false) return;
    // if(res==null)
    // {
    //   this.setData({
    //     studyRate: {}
    //   })
    // }
    if (Object.keys(res).length==0) {
      this.setData({
        studyRate: {},
         
      })
    }
    else
    {
      
      this.setData({
        studyRate: res,
       
      })
    }
    this.setNav(res);
  },
  setNav(res){
    let Btn_1 = [{
      url: '',//../rangePage/rangePage
      id: 0,
      name: '机器人开发中'
    },
    {
      url: '../words/words',
      id: 1,
      name: '继续复习旧词'
    },
    {
      url: '../newWord/newWord',
      id: 2,
      name: '浏览生词本'
    }]
    let Btn_2 = [{
      url: '',
      id: 0,
      name: '机器人开发中'
    },
    {
      url: '../words/words',
      id: 1,
      name: '今日新词复习'
    },
    {
      url: '../newWord/newWord',
      id: 2,
      name: '浏览生词本'
    }
    ]
    let Btn_3 = [{
      url: '',
      id: 0,
      name: '机器人开发中'
    },
    {
      url: '../words/words',
      id: 1,
      name: '开始背单词'
    },
    {
      url: '../newWord/newWord',
      id: 2,
      name: '浏览生词本'
    }]

    if (res.mode == 'review') {
      this.bottomNav.setNav(Btn_1)
    }
    else if (res.mode == 'restudy') {
      this.bottomNav.setNav(Btn_2)
     
    }
    else {
      this.bottomNav.setNav(Btn_3)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._offEvent()
    this._bindEvent()
    _fn.getInforAndBanner(this)
    // Index._getPageInfo(false)
    //this.setBaner();
   // this.rangeEvent();
   // this.recommendEvent()
    //用户登录
    // getApp().UserToLogin((res) => {
    
    // })
    // if (Object.keys(User.studyInfo).length)
    // {
    //   User.getStudyInfo() 
    // }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
    //this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();
    this._offEvent()
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

    let imageUrl=undefined;
    console.log(getApp().shareInfo)
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
    })
  },
  //设置回调
  onOpenSetting({detail}){
    let { authSetting }=detail;
    if (authSetting['scope.userLocation'])
    {
      setTimeout(() => { User.getNearShopList();},500)
     // User.getNearShopList();
      this.setData({
        isPower: true
      }) 
    }

  },
  //选择词库
  onRadioChange({ detail: { value }}){
    if (!this.data.isRegister) return 
    let words = this.data.words;
    this.selectWordId = value;
    if (User.thesaurus_id!=='')
    {
      wx.showModal({
        title: '提示',
        content: '切换词库后，新计划将替代旧计划',
        success:res=>{
          if(res.confirm)
          {
            innerFn.bind(this)()
          }
        }
      })
    }
    else
    {
      innerFn.bind(this)()
    }
    function innerFn(){
    
      words.forEach(item => {
        if (item.id == parseInt(value)) {
          item.checked = true;
          console.log(item)
          User.setThesaurus(item.id,()=>{
            User.thesaurus_id = item.id;
            this.setData({
               isSelectLesson: true,
              description: item.description
            })
          })
        }
        else {
          item.checked = false
        }
      })
      this.setData({
        words
      })
    }
  },
  //注册
  onGotUserInfo({ detail, currentTarget: { dataset:{wid}}}){
    
    if (detail.errMsg=="getUserInfo:fail auth deny") return
    detail.thesaurus_id=wid;
    debugger
    User.UserToLogin(()=>{
      // wx.navigateTo({
      //   url: '../setPlan/setPlan?wid=' + this.selectWordId,
      // })
      User.thesaurus_id=wid;
    }, detail, _interface.register)
  },
  //添加计划
  
  onSetPlan(){
   let checked= this.data.words.some(item=>{
       return item.checked==true
    })
    if (!checked)
    {
      wx.showToast({
        title: '请选择词库',
        icon:'none'
      })
      return 
    }
    wx.navigateTo({
      url: '../setPlan/setPlan?wid=' + this.selectWordId
    })
  }
 
})