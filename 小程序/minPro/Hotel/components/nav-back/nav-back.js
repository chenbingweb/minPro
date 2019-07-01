// components/nav-back/nav-back.jsim
import Ajax from "../../libs/Ajax.js";
let _interface=require("../../utils/interface.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
    userName:{
      type: String,
      value:''
    },
    userphone: {
      type: String,
      value: ''
    },
    bid: {
      type: String,
      value: ''
    },
    collectType: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCollect:false
  },
  ready:function(){
    setTimeout(()=>{
      this.isCollectFlag()
    },1000)
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    callPhone:function({currentTarget}){
      console.log(userphone)
      let { userphone } = currentTarget.dataset;
      wx.makePhoneCall({
        phoneNumber: userphone//仅为示例，并非真实的电话号码
      })
    },
    navHome:function(){
      wx.reLaunch({
        url: '../index/index',
      })
      console.log('32341234')
    },
    collectEvent:function(){
      wx.showLoading({
        title: '收藏中...',
      })
      /**
       * id:’’//楼盘id
      userId:’’,
      collectType:’收藏类型’//
      
        build:楼盘 
        middle：中介 
        person：个人 
        boss boss招聘  
        self 毛遂自荐
        info 资讯
      * 
      */
      if (this.data.isCollect == false) {
        let ajax = new Ajax({
          data: {
            id: this.data.bid,
            userId: getApp().globalData.userId,
            collectType: this.data.collectType
          },
          path: _interface.collect
        })
        ajax.then(res => {
          wx.hideLoading()
          if (res.errcode == 0) {
            wx.showToast({
              title: '收藏成功',
              mask: true
            })
            this.setData({
              isCollect: true
            })
          }
          else {
            wx.showToast({
              title: '收藏失败',
              icon: 'none'
            })
          }
        })
        ajax.catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '服务器报错了',
            icon: 'none'
          })
        })
      }
      else
      {
        let ajax = new Ajax({
          data: {
            id: this.data.bid,
            userId: getApp().globalData.userId,
            "type": this.data.collectType
          },
          path: _interface.cancelCollect
        })
        ajax.then(res => {
          wx.hideLoading()
          if (res.errcode == 0) {
            wx.showToast({
              title: '取消收藏',
              mask: true
            })
            this.setData({
              isCollect:false
            })
          }
          else {
            wx.showToast({
              title: '取消收藏失败',
              icon: 'none'
            })
          }
        })
        ajax.catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '服务器报错了',
            icon: 'none'
          })
        })
      }
    },
    //判断用户是否收藏
    isCollectFlag:function(){
      let ajax = new Ajax({
        data: {
          id: this.data.bid,
          userId: getApp().globalData.userId,
          "type": this.data.collectType
        },
        path: _interface.getCollectStatus
      })
      ajax.then(res => {
        wx.hideLoading()
        console.log(res)
        if (res.errcode == 0) {
          
          this.setData({
            isCollect: res.data.status
          })
        }
        else {
          wx.showToast({
            title: '服务器报错了!',
            icon: 'none'
          })
        }
      })
      ajax.catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '服务器报错了',
          icon: 'none'
        })
      })
    }
  }
})
