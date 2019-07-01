// pages/listenStory/listenStory.js
import InnerAudio from "../../libs/InnerAudio.js"
let _fn = require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsData: [],
    baseSet: {
      current: 0
    },
    contentInfo: null,
    src: 'bk',
    showMark: false,
    staticUrl: getApp().globalData.staticUrl,
    imgUrl: getApp().globalData.imgUrl,
    focus: false,
    audioPlay: false,
    gold: 0,//学贝
    autoFocus:false,
    PlanningStoryPageTip1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })

    this.setData({
      PlanningStoryPageTip1: getApp().globalData.BECConf.Text.PlanningStoryPageTip1.Value,
      StudyStoryPageTip: getApp().globalData.BECConf.Text.StudyStoryPageTip.Value,
      src: options.src
    })
    this.userid = getApp().globalData.UserId;
    this.uid = options.uid;
    this.lid = options.lid;
    this.reset = false;
    this.class_type ='deep_reading_status';
    this.cid = options.cid;
    this.startTime=0;
    this.canFullClick=true;//可以全屏点击停止播放；
    this.preCurrent=0;//当前
    this.audio = new InnerAudio({
      onEnded: _fn.listenEnd(this),
      onPlay: _fn.playAudio(this),
      onStop: _fn.playStop(this),
      autoplay: options.src == 'sk' ? true : false
    });
    //备课、上课结束回调
    this.callBack = res => {
      console.log(res)
      if (res.gold) {
        this.setData({
          gold: res.gold
        })
      }
      wx.hideLoading()
      this.setData({
        showMark: true
      })
    }
    //|| options.src == 'bk'
    if (options.src == 'sk' ) {
      this.autoPlayFlag = true
      this.interface = "getSKStory";
      this.lesson_type = "end"
      wx.setNavigationBarTitle({
        title: '讲故事',
      })
    }
    else {
      this.lesson_type = "prepare"//prepare/end
      this.interface = 'listenStory'
      wx.setNavigationBarTitle({
        title: '讲故事',
      })
    }
    _fn.getListenStoryList(this)


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
    this.audio.stop();
    this.setData({
      audioPlay: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.audio.stop();
    this.setData({
      audioPlay: false
    })
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
      sharePath: "pages/listenStory/listenStory",
      isBtn: false
    })
  },
  //向左
  leftArrow({ detail }) {
    let { current } = detail
    this.setData({
      ['baseSet.current']: current
    })
    console.log(current)
    if (this.data.src == 'sk') {
      this.autoPlayFlag = false
    }
  },
  //向右
  rightArrow({ detail }) {
    let { current, end } = detail;
    //备课上课结束
    if (end) {
      //备课结束
      if (this.data.src == 'bk') {
        getApp().BKEndOk(this);
        let send = {
          message: 'planning-story',
          ext1: this.cid,
          ext2: this.preCurrent+1,
          ext3: this.noteArr[this.preCurrent].isEdit,
          ext4: this.noteArr[this.preCurrent ].listenTimes,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send)
      }
      else {//上课结束
        getApp().SKEndOk(this)
        let send = {
          message: 'study-story',
          ext1: this.cid,
          ext2: this.preCurrent + 1,//页数
          ext3: this.noteArr[this.preCurrent].listenTimes,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send)
      }
    }
    else {
      this.setData({
        ['baseSet.current']: current
      })
      console.log(current)
      if (this.data.src == 'sk') {
        this.autoPlayFlag = false
      }
    }

  },

  //手动切换
  changeEvent({ detail }) {
    let { current, source } = detail;
    if (this.data.src == 'sk' && source == "touch") {
      this.autoPlayFlag = false
    }
    this.setData({
      contentInfo: {}
    })
    this.setData({
      ['baseSet.current']: current,

    })
    this.audio.stop();

    setTimeout(() => {
      this.setData({
        contentInfo: this.data.imgsData[current]
      })
      if (this.data.src == 'sk' && this.autoPlayFlag) {
        _fn.autoPlay(this)
      }

    }, 300)

    if (current > this.preCurrent) {
      let src = this.data.src;
      if (src == 'sk') {
        let send = {
          message: 'study-story',
          ext1: this.cid,
          ext2: current,//页数
          ext3: this.noteArr[this.preCurrent].listenTimes,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send)
      }
      else {

        let send = {
          message: 'planning-story',
          ext1: this.cid,
          ext2: current,
          ext3: this.noteArr[this.preCurrent].isEdit,
          ext4: this.noteArr[this.preCurrent].listenTimes,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send)

      }
    }
    

    this.preCurrent = current

  },
  //播放故事
  playStory({ currentTarget }) {
    let { url } = currentTarget.dataset;
    if (this.data.audioPlay)
    {
      this.audio.stop()
    }
    else
    {
      this.audio.play(url);
      this.autoPlayFlag = true
    }

   
  },
  //编辑故事
  editContent({ detail, currentTarget }) {
    let { id } = currentTarget.dataset;
    this.sid = id;
    this.teaching_plan = detail.value;
    this.setData({
      focus: false,
      autoFocus:false
    })
    _fn.editStory(this)
  },
  //重置内容
  repeatContent({ currentTarget }) {
    let { id } = currentTarget.dataset;
    wx.showModal({
      title:'  ',
      content: '确认恢复默认文本吗？',
      success:res=>{
        if(res.confirm)
        {
          //当前故事id
          this.sid = id;
          this.reset = true;

          _fn.repeatEdit(this)
        }
      }
    })
   

  },
  //显示编辑器
  doEdit() {
    this.setData({
      focus: true,
      autoFocus:true
    })
  
  },
  //继续备课
  goOnBK() {
    wx.navigateBack({
      delta: 1
    })
  },
  //关闭提示
  closeTip() {
    this.setData({
      showMark: false
    })
  },
  animationend() {
    if (this.data.src == 'sk') {
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 500)

    }
  },
  cancelPlay(){
    if (this.data.src == 'sk' && this.canFullClick)
    {

      this.canFullClick=false;
      this.audio.stop();
      this.autoPlayFlag = false
    }
  },
  goOnBK() {
    wx.navigateBack({
      delta: 1
    })
    // if (this.data.src == "sk") {
    //   wx.setStorageSync('showCJ', true)
    // }
  }
})