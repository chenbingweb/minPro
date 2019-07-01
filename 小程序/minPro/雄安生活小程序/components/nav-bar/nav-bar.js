// components/nav-bar/nav-bar.js
/***************组件说明**************************************************************/
/**
 * (一) 在config.js中navBar添加底部导航配置内容，
 *  [//导航信息
      {
        name: '养老院查询',//标题
        selected: true,//默认第一个为选择
        icon: '../../images/search_bh.png',//未选择的图片路径
        icon_s: '../../images/search_bh_s.png',//已选的图片路径
        path: '../index/index'//跳转路径
      }
    ]
  (二) 在app.js文件中,添加globalData属性，为Object类型，
      globalData：{
        navBar：config.navBar
      }
 * 
 * 
 */
import Ajax from "../../libs/Ajax.js";
let _interface = require("../../utils/interface.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showReleaseBox:{
      type:Boolean,
      value:false,
      observer:function(newVal,oldVal){
        if(newVal)
        {
          setTimeout(() => {
            this.setData({
              showBox: true
            })
          }, 40)
        }
      }
    },
    height: {
      type: Number,
      value: 10.78
    },
    color: {
      type: String,
      value: '#333333',
    },
    navBarKey: {
      type: String,
      value: 'navBar',
    },
    navBar: {
      type: Array,
      value: getApp().globalData.navBar || [],
      observer: function (newVal, oldVal) {
        if (Array.isArray(newVal) && newVal.length) {
          let navBarKey = this.properties.navBarKey;
          newVal.forEach((item, index) => {
            item.nid = index;
          })
          getApp().globalData[navBarKey] = Object.assign(getApp().globalData[navBarKey], newVal)
        }

      }
    },
    navType: {
      type: String,
      value: 'reLaunch',
      observer: function (newVal, oldVal) {

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBox:false,
    navBar: [],//底部导航条
    color: '',
    showReleaseBox: false
  },
  created: function () {
    let navBarKey = this.properties.navBarKey;
    let barItems = getApp().globalData[navBarKey];
    //生成navId
    barItems.forEach((item, index) => {
      item.nid = index;
    })
    getApp().globalData[navBarKey] = Object.assign(getApp().globalData[navBarKey], barItems)

  },
  ready: function () {
    let navBarKey = this.properties.navBarKey;
    this.setData({
      navBar: getApp().globalData[navBarKey]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转
    selectNav: function ({ currentTarget, detail}) {
      console.log(detail)
      getApp().globalData.userInfo = detail.userInfo;
      let navBarKey = this.properties.navBarKey;
      let navId = currentTarget.id
      let navBarArr = this.data.navBar;
      let path = "";
      navBarArr.forEach((item, index) => {
        if (parseInt(item.nid) == parseInt(navId)) {
          item.selected = true
          if (item.path) {
            path = item.path

          }
        }
        else {
          item.selected = false
        }
      })
      if (this.properties.navType == 'redirectTo') {
        console.log('redirectTo')
        wx.redirectTo({
          url: path,
          success() {
            getApp().globalData[navBarKey] = navBarArr;

          }
        })
      }
      else if (this.properties.navType == 'reLaunch') {
        console.log('reLaunch')
        if (path == '') {

        }
        else {
          wx.reLaunch({
            url: path,
            success() {
              getApp().globalData[navBarKey] = navBarArr;
            }
          })
        }

      }


    },
    //点击发布按钮
    showSelectTab_: function () {
      if (this.data.showReleaseBox) {
        this.setData({
          showReleaseBox: false,
          
        })
       
      }
      else {
        this.setData({
          showReleaseBox: true
        })
   
      }

    },
    //关闭
    closeEvent: function () {
      this.setData({
        showReleaseBox: false
      })
    },
    releaseBtn: function ({ currentTarget }) {
      let { name } = currentTarget.dataset
      var myEventDetail = {
        releaseType: name
      }  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      //选择中介按钮
      if (name == 'middle') {
        this.isMiddUser()
      }
      else //非中介
      {
        this.isExamine(name)
      }

      this.triggerEvent('releaseEvent', myEventDetail, myEventOption)
    },
    showSelectTab: function ({ detail }) {
      console.log(detail)
      if (detail.errMsg != 'getUserInfo:ok') {
        return
      }
        // wx.checkSession({
        //   success:() =>{
        //     console.log('未过期')
        //   },
        //   fail: ()=> {
        //     console.log('过期')
        //     //发送用户信息到后台
        //     getApp().UserToLogin((res) => {
        //       console.log(res)
        //     }, detail, _interface.getUserInfo)
        //   }
        // })
        getApp().globalData.userInfo = detail.userInfo
        //发送用户信息到后台
        getApp().UserToLogin((res) => {
          console.log(res)
        }, detail, _interface.getUserInfo)
        if (this.data.showReleaseBox) {
          this.setData({
            showReleaseBox: false
          })
          setTimeout(() => {
            this.setData({
              showBox: false
            })
          }, 40)
        }
        else {
          this.setData({
            showReleaseBox: true
          })
          setTimeout(() => {
            this.setData({
              showBox: true
            })
          }, 40)
        }
    },
    //检查用户是否是中介
    isMiddUser: function() {
      wx.showLoading({
        title: 'checking',
        mask: true
      })
      let ajax = new Ajax({
        data: { userId: getApp().globalData.userId },
        path: _interface.checkMiddStatus
      })
      ajax.then(res => {
        wx.hideLoading()
        console.log(res)
        if (res.errcode == 0) {
          //中介认证
          if (getApp().globalData.visible != 2 && res.data.status == 0) {
            wx.navigateTo({
              url: '../middleExamine/middleExamine',
            })
          }
          else if (getApp().globalData.visible != 2 && res.data.status == 1) {
            wx.navigateTo({
              url: '../examiningTip/examiningTip?tip=middreleasetip',
            })
          }
          else //跳转中介发布页面 (租房、售房，房源信息)
          {
            wx.navigateTo({
              url: '../middleRelease/middleRelease',
            })
          }
        }
        else {

        }


      }).catch(err => {
        wx.showToast({
          title: '服务器报错...',
          icon: 'none'
        })
      })



    },
    //检查是否是认证用户
    isExamine: function (name) {
      //中介认证
      if (getApp().globalData.visible != 1 && getApp().globalData.visible != 2) {
        wx.navigateTo({
          url: '../personInfo/personInfo?src=release',
        })
      }
      else //跳转中介发布页面
      {
        let url = '';
        if (name == 'person')//个人房源
        {
          url = '../middleRelease/middleRelease?src=personal'
        }
        else if (name == 'infor')//资讯发布
        {
          url = '../middleRelease/middleRelease?src=info'
        }
        else if (name == 'boss') {//Boss招聘
          url = '../jobRelease/jobRelease'
        }
        else if (name == 'self') {//毛遂自荐
          url = '../selfRelease/selfRelease'
        }
        wx.navigateTo({
          url
        })
      }
    }


    //登录
    // login:function(){
    //   console.log(33333333)
    //   var myEventDetail = { }  // detail对象，提供给事件监听函数
    //   var myEventOption = {
    //     bubbles: false,
    //     composed: false,
    //     capturePhase: false
    //   } // 触发事件的选项
    //   this.triggerEvent('userLogin', myEventDetail, myEventOption)
    // }
  }
})
