// pages/myCenter/myCenter.js
import {User} from "../../model/user.js";
import { getBanner, Poster } from "./fn.js";
import Tool from "../../libs/Tool.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:false,
    userInfo:{},
    banner: [
      {
        img_url: 'http://hxcm-admin.5iportal.com/uploads/images/images/15552989306815.png'
      },
      {
        img_url: 'http://hxcm-admin.5iportal.com/uploads/images/images/15553126608801.png'
      }
    ],
    baseSet: {
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#000000',//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
      vertical: false//滑动方向是否为纵向
    },
    showSign:false,
    isSign:false,
    path:'',
    deposit:'0.00',
    balance: '0.00',
    mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(User.deposit)
    User.UserToLogin(()=>{
      this.setData({
        deposit: User.deposit.toFixed(2),
        balance: User.balance.toFixed(2)
      })
    })
    this.setData({
      mobile: User.mobile,
      deposit: User.deposit.toFixed(2),
      balance: User.balance.toFixed(2)
    })
  
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // Poster((res)=>{
    //   this.res=res;
    //   // Tool.Img('firstCanvas', res.img_url, reuslt=>{
    //   //   debugger
    //   //   res.img_url = reuslt;
    //   //   this.setData({
    //   //     template: createPoster.bind(this)(res)
    //   //   })
    //   // })
    //   console.log(res)
      
    // })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected:3
      })
    }
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

  }, */
  //注册
  onOpenSign(){
    this.setData({
      showSign: true
    })
  
  },
  //关闭注册
  onClose(){
    this.setData({
      showSign:false
    })
  },
  //跳转积分列表
  onNaTo(){
    wx.navigateTo({
      url: '../integralList/integralList',
    })
  },
  onCall(){
    wx.makePhoneCall({
      phoneNumber: '13501242216',
    })
  }, 
  onImgOK({ detail: { path } }) {
    // debugger
    this.path = path;
    this.setData({
      path,
      poster: true,
    })
    console.log(this.path)
  },
  //打开海报
  onShowPoster({detail}) {
    if (detail.errMsg == "getUserInfo:fail auth deny") return

    let avatar = detail.userInfo.avatarUrl
    // if (!this.res) return
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    Poster((res) => {
      this.res = res;
      // Tool.Img('firstCanvas', res.img_url, reuslt=>{
      //   debugger
      //   res.img_url = reuslt;
      //   this.setData({
      //     template: createPoster.bind(this)(res)
      //   })
      // })
      console.log(res)
      Tool.Img('firstCanvas', this.res.img_url, reuslt => {

        wx.hideLoading()
        this.res.img_url = reuslt;
        this.setData({
          // poster: true,
          template: createPoster.bind(this)(this.res, avatar)
        })
      })
    })
  
    // this.setData({
    //   poster: true
    // })
  },
  //关闭海报
  onClosePoster() {
    this.setData({
      poster: false
    })
  },
  //保存海报
  onSaveImg() {
    debugger
    wx.saveImageToPhotosAlbum({
      filePath: this.path || '',
      success: () => {
        wx.showToast({
          title: '保存成功',
          mask: true,
          success: () => {
            setTimeout(()=>{
              this.setData({
                poster: false
              })
            },2000)
            
          }
        })
      },
      fail:err=>{
        
        console.log(err)
      }
    })
  },
  //获取微信信息
  onGotUserInfo({detail}){
    if (detail.errMsg=="getUserInfo:fail auth deny")
    {
      return
    }
    this.onOpenSign()
    User.wxUser = detail

  },
  //跳转活动详情 ../activeDetail/activeDetail?cid=2
  onToDetail({ detail: { dataset: { detail, ty } } }) {
    if (ty == 'course') {
      wx.navigateTo({
        url: '../shopDetail/shopDetail?sid=' + detail + '&src=' + ty,
      })
    }
    if (ty == 'active') {
      wx.navigateTo({
        url: '../activeDetail/activeDetail?cid=' + detail,
      })
    }
  }
  
})

function createPoster({ img_url, desc }, avatar) {
  return {
    background: '#fff',
    width: '550rpx',
    height: '900rpx',
    borderRadius: '10rpx',
    views: [
      //图片
      {
        type: 'image',
        mode: 'scaleToFill',
        url: "../../images/hq_logo.png",
        css: {
          width: '237rpx',
          height: '64rpx',
          left: "157rpx",
          top: '55rpx'

        }
      },
      //头像
      {
        type: 'image',
        mode: 'scaleToFill',
        url: avatar,//this.data.userInfo.head_img,
        css: {
          width: '70rpx',
          height: '70rpx',
          borderRadius: '35rpx',
          left: "42rpx",
          top: '770rpx',
          borderWidth: '2rpx',
          borderColor: '#dbdbdb'
        }
      },
      //昵称
      {
        type: 'text',
        text: this.data.userInfo.nickname,
        css: {
          maxLines: 2,
          // fontWeight: 'bold',
          left: '133rpx',//"160rpx",
          align: "left",
          top: '794rpx',
          color: '#cca27e',
          fontSize: "22rpx",
          lineHeight: "40rpx"
        }
      },
      //图片
      {
        type: 'image',
        mode: 'scaleToFill',
        url: img_url,//'http://heqi-admin.c63.top/uploads/tempimages/15581528675023.png',//img_url,
        css: {
          width: '480rpx',
          height: '280rpx',
          borderRadius: '10rpx',
          left: "36rpx",
          top: '168rpx'

        }
      },
     
      {
        type: 'text',
        text: `${desc}`,
        css: {
          textAlign: 'center',
          width: '500rpx',
          maxLines: 3,
          fontWeight: '600',
          left: "34rpx",//"265rpx",//
          align: "left",
          top: '500rpx',
          color: '#a7806f',
          fontSize: "24rpx",
          lineHeight: "50rpx"
        }
      },
      //
      // {
      //   type: 'text',
      //   text: `记叙了平凡而又充满情趣的`,
      //   css: {
      //     textAlign: 'center',
      //     width: '520rpx',
      //     maxLines: 1,
      //     fontWeight: '600',
      //     left: "275rpx",//"160rpx",
      //     align: "center",
      //     top: '550rpx',
      //     color: '#a7806f',
      //     fontSize: "24rpx",
      //     // lineHeight: "50rpx"
      //   }
      // },
      // {
      //   type: 'text',
      //   text: `居家生活的浪游各地的所见所闻`,
      //   css: {
      //     textAlign: 'center',
      //     width: '520rpx',
      //     maxLines: 1,
      //     fontWeight: '600',
      //     left: "270rpx",//"160rpx",
      //     align: "center",
      //     top: '600rpx',
      //     color: '#a7806f',
      //     fontSize: "24rpx",
      //     // lineHeight: "50rpx"
      //   }
      // },
      {
        type: 'image',
        mode: 'scaleToFill',
        url: "../../images/ewm.jpg",
        css: {
          width: '110rpx',
          height: '110rpx',
          borderRadius: '55rpx',
          left: "387rpx",
          top: '745rpx'
        }
      },
      {
        type: 'text',
        text: `扫描或长按小程序码`,
        css: {
          width: '480rpx',
          maxLines: 3,
          fontWeight: '600',
          left: "345rpx",//"160rpx",
          align: "left",
          top: '860rpx',
          color: '#7a7a7a',
          fontSize: "20rpx",
          lineHeight: "30rpx"
        }
      },

    ],
  }
}