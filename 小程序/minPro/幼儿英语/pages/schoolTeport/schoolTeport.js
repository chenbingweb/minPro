// pages/ schoolTeport/ schoolTeport.js

import Power from "../../libs/getUserPower.js"

import InnerAudio from "../../libs/InnerAudio.js"
let _fn=require("./fn.js")
function Fn(){
  this.gift_id = null;
  this.eval = null;
  this.PlayAudio.stop()
  this.saveBtn = '';
  this.setData({
    ['study_result.content']:''

  })
  let gifts = this.data.gifts;
  if (gifts)
  {
    for (let i = 0; i < gifts.length; i++) {

      this.setData({
        ['gifts[' + i + '].flag']: false
      })

    }
  }
  this.setData({
    openType: ''
  })
  
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
     imgUrl: getApp().globalData.imgUrl,//获取图片地址
    staticUrl: getApp().globalData.staticUrl,
    class_info:null,
    imgsData: null,
    userInfo: null,
    gifts: null,
    words: null,
    cartoon: null,
    study_result: null,
    imgsData: null,
    recordArr:[],
    baseSet: {
      current: 0
    },
    gifts: null,
    openType:'',
    src:'',
    playWord:false,
    duration:true,
    showCanvas:false,
    ReportPageText5:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   ReportPageText5: getApp().globalData.BECConf.Text.ReportPageText5.Value

    // })
    wx.hideShareMenu();
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })
    this.power = new Power();
    //生成海报回调
    this.callBack = src => {
      wx.saveImageToPhotosAlbum({
        filePath: src,
        success(res) {
          wx.showToast({
            title: '成功保存海报',
          })

        }
      })
      // let self = this
      // let obj = {
      //   auth: 'scope.writePhotosAlbum',
      //   succ(res) {//成功
      //     innerFn.bind(self)()
      //   },
      //   fail(err) {//失败
      //     console.log(err)
      //     wx.showToast({
      //       title: '保存成绩失败',
      //       icon: 'none'
      //     })
      //   }
      // }
      // this.power.resolveEvent({
      //   auth: 'scope.writePhotosAlbum',
      //   succ(res) {//成功
      //     innerFn.bind(self)()
      //   },
      //   fail(err) {//失败
      //     wx.showModal({
      //       title: '提示',
      //       content: '是否前往设置列表',
      //       success: res => {
      //         if (res.confirm) {
      //           self.power.openSetting(obj)
      //         }
      //         else
      //         {
      //           wx.showToast({
      //             title: '保存成绩失败',
      //             icon: 'none'
      //           })
      //         }

      //       }
      //     })

      //   }
      // })
      function innerFn() {
        wx.saveImageToPhotosAlbum({
          filePath: src,
          success(res) {
            wx.showToast({
              title: '成功保存海报',
            })
      
          }
        })
      }
      console.log(src)
      
    }
    this.shareInfo=null;
    this.uid=options.uid;
    this.lid=options.lid;
    this.userid=getApp().globalData.UserId;
    this.gift_id = null;
    this.eval=null;
    this.saveBtn='';
    this.cid=options.cid;
    this.sharePage = options.shareid;//
    console.log(options.shareid)
    //来自分享页面
    if (options.shareid)
    {
      this.share_userid = options.shareid;

      this.setData({
        src:'sharePage',
        duration: 30
      })
      this.videoContext = wx.createVideoContext('myVideo')
      wx.hideShareMenu()
      getApp().getConfig((res)=>{
        // console.log(res)
        // getApp().globalData.BECConf=res
        _fn.getShareInfo(this)
      })
      
    }
    else
    {
     
      _fn.getUserScore(this)
    }
   
    this.PlayAudio = new InnerAudio({
      onEnded: _fn.readEnd(this),
      onPlay: _fn.playAudio(this),
      onStop: _fn.playStop(this)
    });
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
    wx.onNetworkStatusChange(({ isConnected, networkType }) => {
      if (isConnected) {
        console.log("onNetworkStatusChange")
        _fn.videoExchange(this)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   // Fn.bind(this)()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   // Fn.bind(this)()
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
  onShareAppMessage: function (res) {
    this.saveBtn = ''
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let self = this;
    console.log(getApp().globalData.imgUrl + self.shareInfo.share_img)
  
    return {
      title: self.shareInfo.share_title||'成绩',
      imageUrl: getApp().globalData.imgUrl + self.shareInfo.share_img,
      path: `pages/schoolTeport/schoolTeport?uid=${this.uid}&lid=${this.lid}&shareid=${this.share_userid || this.userid}&cid=${this.courseid || this.cid}`,
      success:res=>{
        if (res.shareTickets) {
          let send = {
            message: 'share',
            ext1:2,
            ext2:this.cid,
            ext3: 1,
            userid: getApp().globalData.UserId
          }
          console.log('share_form', send)
          getApp().sendNote(send)

        }
        else {
          let send = {
            message: 'share',
            ext1: 2,
            ext2: this.cid,
            ext3: 0,
            userid: getApp().globalData.UserId
          }
          console.log('share_form', send)
          getApp().sendNote(send)

        }
      },
      fail:()=>{

      }
    }

  },
  //向左
  leftArrow({ detail }) {
    let { current } = detail
    this.setData({
      ['baseSet.current']: current
    })
    console.log(current)
  },
  //向右
  rightArrow({ detail }) {
    let { current } = detail;
    if (current)
    {
      this.setData({
        ['baseSet.current']: current
      })
    }
   
   
    console.log(current)
  },
  //手动切换
  changeEvent({ detail }) {
    let { current } = detail
    console.log(current)
    this.setData({
      ['baseSet.current']: current
    })
    this.current = current;
    this.PlayAudio.stop();
    _fn.getRecordInfo(this)
  },
  //播放录音音频
  playRecord({currentTarget}){
    console.log(currentTarget)
    let { url,id,types } = currentTarget.dataset;
    //播放类型
    this.types=types
    this.wordId=id;
    this.PlayAudio.stop();
    this.PlayAudio.play(url)
    console.log(url)
  },
  navBack(){
    wx.navigateBack({
      delta:1
    })
  },
  //分享和提交评价
  formSubmit({detail,currentTarget}){
    let { btn } = detail.target.dataset
    this.saveBtn = btn
    if (this.saveBtn =='post')
    {
     
      this.navTo=res=>{
        console.log('../post/post?shareid=' + res.shareid + '&cid=' + res.cid)
        wx.navigateTo({
          url: '../post/post?shareid=' + res.shareid+'&cid='+res.cid,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
      // isPower.bind(this)(() => {
      //   wx.showLoading({
      //     title: '正在生成海报...',
      //     mask: false
      //   })
      //   _fn.getPoster(this)
      // })
    }
    else
    {
      this.navTo = res => {}
    }
    if (!this.eval) {
      wx.showToast({
        title: '没有点评',
        icon:'none'
      })
     
      return
    }
    this.gift_id=''
    // if (!this.gift_id ) {
      
    //   wx.showToast({
    //     title: '没有选择礼品',
    //     icon:'none'
    //   })
    //   return
    // }
    this.detail = detail.value;
    _fn.submit(this)
    this.saveBtn=''
    console.log(detail)
  },
  //评论
  evalueEvent({detail}){
    this.eval=detail.value;
    // if (this.gift_id&&this.eval)
    if ( this.eval)
    {
      this.setData({
        openType: 'share'
      })
    }
    else {
      this.setData({
        openType: ''
      })
    }
  },
  //选择礼品
  radioChange({detail}){
    let value=this.gift_id=detail.value;
    let gifts = this.data.gifts;
    for(let i=0;i<gifts.length;i++){
      if (gifts[i].gift_id==value)
      {
        this.setData({
          ['gifts['+i+'].flag']:true
        })
      }
      else
      {
        this.setData({
          ['gifts[' + i + '].flag']: false
        })
      }
    }
    // if (this.gift_id && this.eval) {
    //   this.setData({
    //     openType: 'share'
    //   })
    // }
    // else
    // {
    //   this.setData({
    //     openType: ''
    //   })
    // }
  },
  //报错成绩单
  saveScore(){
    this.saveBtn ='post'
  },
  //开启课程
  toIndex({currentTarget}){
    getApp().UserLogin((res) => {
        this.userid = res;
        if (res == 'err') {
          this.userid = null;
        }
        _fn.addFreeLesson(this)
      })
  },
  //开始播放
  videoPlay(){
    if (this.data.src=='sharePage') 
    {
     
      setTimeout(()=>{
        this.videoContext.pause()
      },30000)
      let send = {
        message: 'report-movie',
        ext1: this.cid,
        userid: getApp().globalData.UserId
      }
      console.log('share-send',send)
      getApp().sendNote(send)
    }
  
  },
  //播放经度
  timeUpdate({ detail}){
    let { currentTime, duration } = detail;
    console.log(currentTime, duration)
    if (this.data.src == 'sharePage') 
    {
      if (currentTime >= 30) {
        this.videoContext.pause()
      }
    }
   
  }
  
})


function isPower(callBack){
  let self = this
  let obj = {
    auth: 'scope.writePhotosAlbum',
    succ(res) {//成功
      callBack()
    },
    fail(err) {//失败
      console.log(err)
      wx.showToast({
        title: '保存成绩失败',
        icon: 'none'
      })
    }
  }
  this.power.resolveEvent({
    auth: 'scope.writePhotosAlbum',
    succ(res) {//成功
      callBack()
    },
    fail(err) {//失败
      wx.showModal({
        title: '提示',
        content: '是否前往设置列表',
        success: res => {
          if (res.confirm) {
            self.power.openSetting(obj)
          }

        }
      })

    }
  })
}