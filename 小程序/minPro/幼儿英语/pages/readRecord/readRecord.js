// pages/readRecord/readRecord.jsgetReadContent
import Audio from "../../libs/Audio.js";
import InnerAudio from "../../libs/InnerAudio.js"
let _fn=require("./fn.js")
function initFn(){
  //当前会读id
  this.itemid = "";
  this.uid ="";
  this.lid = "";
  this.cid = "";
  this.userid  ="";
  this.duration = 0;//录音时长
  this.play = undefined;
  this.class_type = 'reading_book_status';//'read';
  this.lesson_type = "";
  this.startTime=0;
  this.endTime=0;
  this.PlayAudio.stop();
  this.PlayAudio.destroy()
  console.log('clear')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRecord:false,
    staticUrl: getApp().globalData.staticUrl,
    imgsData:[],
    baseSet:{
      current:0
    },
    recordDetail:null,//录音信息
    showMark:false,
    src:'bk',
    readInfo:null,
    audioPlay:false,//播放状态
    numAudioPlay:false,//妈妈录播播放状态
    gold:0,
    imgUrl: getApp().globalData.imgUrl,
    showTip:false,//录音提示
    status:'start',
    scale:1,
    PlanningReadPageTip1:'',
    PlanningReadPageTip2:'',
    StudyReadPageTip:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      PlanningReadPageTip1: getApp().globalData.BECConf.Text.PlanningReadPageTip1,
      PlanningReadPageTip2: getApp().globalData.BECConf.Text.PlanningReadPageTip2,
      StudyReadPageTip: getApp().globalData.BECConf.Text.StudyReadPageTip,
    })
    
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })
    //实例音乐播放控件
    this.PlayAudio = new InnerAudio({
      onEnded: _fn.readEnd(this),
      onPlay:_fn.playAudio(this),
      onStop:_fn.playStop(this)
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
    //实例播放录音音频控件
    this.recordAudio = new InnerAudio({
      onEnded: _fn.playEnd(this),
      onPlay: _fn.playIng(this),
    });
    this.setData({
      ['baseSet.current']:0,
      src:options.src
    })
    //当前会读id
    this.itemid="";
    this.uid=options.uid;
    this.lid = options.lid;
    this.cid=options.cid;
    this.userid=getApp().globalData.UserId;
    this.duration=0;//录音时长
    this.play=undefined;
    this.class_type = 'reading_book_status';//'read';
   
    this.preTime=0;
    this.current=0
    if(options.src=='bk')
    {
      this.lesson_type = 'prepare'
      _fn.getReadContent(this)
     
    }
    else if (options.src == 'sk')
    {
      this.startTime = 0;
      this.endTime = 0;
      this.lesson_type = 'end'//prepare/end
      _fn.getSKReadContent(this)
    }

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
    this.PlayAudio.stop()
    this.recordAudio.stop()
  //  initFn.bind(this)()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.PlayAudio.stop()
    this.recordAudio.stop()
   // initFn.bind(this)()

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
   * 用户点击右上角分享*/
   
  onShareAppMessage: function () {
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/readReacord/readReacord",
      isBtn: false
    })
  },
  //向左
  leftArrow({ detail}){
    let { current } = detail
    this.setData({
      ['baseSet.current']: current
    })
    console.log(current)
  },
  //向右
  rightArrow({ detail }) {
    let { current,end } = detail;
    if(end)
    { 
      if (this.data.src == 'bk') {
        getApp().BKEndOk(this);
        let send = {
          message: 'planning-read',
          ext1: this.cid,
          ext2: this.current + 1,//页面
          ext3: this.noteArr[this.current].recordTimes,
          ext4: this.noteArr[this.current].listenTimes,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send);
      }
      else {
        let send = {
          message: 'study-read',
          ext1: this.cid,
          ext2: this.current+1,//页面
          ext3: this.noteArr[this.current].recordTimes,
          ext4: this.noteArr[this.current].listenMumTimes,
          ext5: this.noteArr[this.current].listenTimes,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send);
        getApp().SKEndOk(this)
      }
    }
    else
    {
      this.setData({
        ['baseSet.current']: current
      })
      console.log(current)
    }
    
   
  },
  //手动切换
  changeEvent({ detail }) {
    let { current } = detail;
    this.current = current
    console.log(current)
    let readInfo = this.data.imgsData[current];
   
    //当前会读id
    this.itemid = readInfo.id;
    if (!Array.isArray(readInfo.sentence))
    {
      readInfo.sentence= getApp().splitFn(readInfo.sentence)
      console.log(getApp().splitFn(readInfo.sentence))
      // readInfo.sentence = readInfo.sentence.split('.')
      // console.log(readInfo.sentence)
      // readInfo.sentence[0] = readInfo.sentence[0]+'.'
      // if (readInfo.sentence.length==1)
      // {
      //   readInfo.sentence.unshift('')
      // }
      // if (readInfo.sentence.length == 3)
      // {
      //   readInfo.sentence[1] = readInfo.sentence[1] + '.'
      // }
    }
    this.setData({
      ['baseSet.current']: current,
      readInfo,
      showRecord: false
    })
    if (this.PlayAudio)
    {
      this.PlayAudio.stop()
    }
    if (this.recordAudio)
    {
      this.recordAudio.stop()
    }
    //备课
    if(this.data.src=='bk')
    {
      this.setData({
        recordDetail: {
          duration: readInfo.duration,
          self_dub_url: readInfo.self_dub_url,
          head_img: readInfo.head_img
        }
      })
      /**
       *  this.listenTimes=0;//播放次数
         this.recordTimes=0;//录音次数
       * 
       */
      if (this.preTime < current)
      {
        let send = {
          message: 'planning-read',
          ext1: this.cid,
          ext2: current,//页面
          ext3: this.noteArr[current - 1].recordTimes,
          ext4: this.noteArr[current - 1].listenTimes,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send);
      }
     
    }
    else  //上课
    {
      
      //自动播放
      _fn.autoPlay(this, readInfo)
      if (this.preTime<current)
      {
        let send = {
          message: 'study-read',
          ext1: this.cid,
          ext2: current,//页面
          ext3: this.noteArr[current - 1].recordTimes,
          ext4: this.noteArr[current - 1].listenMumTimes,
          ext5: this.noteArr[current - 1].listenTimes,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send);
       
      }
     
      /*
      if (readInfo.baby_dub_url) {
          info.baby_dub_duration = readInfo.baby_dub_duration;
          info.baby_dub_url = readInfo.baby_dub_url;
          info.baby_img = readInfo.baby_img
          that.setData({
            recordDetail: info
          })
        }recordDetail: {
          duration:,
          baby_dub_url: readInfo.baby_dub_url,
          baby_img: readInfo.baby_img
        }
      */
      this.setData({
        ['recordDetail.head_img']: readInfo.head_img,
        ['recordDetail.baby_dub_duration']: readInfo.baby_dub_duration,
        ['recordDetail.baby_dub_url']: readInfo.baby_dub_url,
        ['recordDetail.baby_img']: readInfo.baby_img,
      })
    }
    

    this.tempFilePath = '';
    this.preTime = current;
  },
  reStatus({detail}){
    let { status } = detail
    if (status =='stop')
    {
      this.setData({
        showTip:false,
        status: 'start'
      })
    }
    else
    {
      this.setData({
        showTip: true,
        status: status
      })
    }
    
  
    console.log(detail)
  },
  //停止录音
  recordStop({detail}){
    detail.duration = (detail.duration / 1000).toFixed(1);
    this.duration = detail.duration;
    //m
    if(this.data.src=='bk')
    { 
      this.uploadType='mumRecord'
    }
    else if(this.data.src=='sk')
    {
      this.uploadType = 'babyRecord'
    }
    this.tempFilePath = detail.tempFilePath;
    this.noteArr[this.current].recordTimes+=1
    
    //上传录音文件
    _fn.uploadRecordFile(this)
    //测试

    console.log(detail)
  },
  //播放录音音频
  playRecord(e){
    console.log(e)
    let {src}=e.currentTarget.dataset;
   
    console.log(src)
    this.recordAudio.play(src)
  },
  //删除录音文件
  deleteFile({currentTarget}){
    
    this.recordType=undefined;
    if (currentTarget.dataset.retype)
    {
      this.recordType = currentTarget.dataset.retype
    }
   
    this.recordAudio.stop()
    if(this.data.src=='bk')
    {
      this.setData({
        recordDetail: {}
      })
    }
    else
    {
      this.setData({
        ['recordDetail.baby_dub_duration']: null,
        ['recordDetail.baby_dub_url']: null,
        ['recordDetail.baby_img']: null
      })
    }
    
    _fn.deleteRecord(this)
  },
  //继续备课
  goOnBK(){
    wx.navigateBack({
      delta:1
    })
  },
  //关闭提示
  closeTip(){
    this.setData({
      showMark:false
    })
  },
  //播放音频
  playSystem({currentTarget}){
    
    let {url,play}=currentTarget.dataset;
    //如果正在播放，则返回
    if (!this.PlayAudio.innerAudioContext.paused){
      return
    }
    this.play = play;
    console.log(play)
    this.PlayAudio.play(url)
    // this.PlayAudio = new Audio({ src: url })
    // this.PlayAudio.play()
  },
  animationend() {
    if (this.data.src == 'sk') {
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1
        })
      },500)
      
    }
  },
  goOnBK(){
    wx.navigateBack({
      delta:1
    })
    // if (this.data.src == "sk") {
    //   wx.setStorageSync('showCJ', true)
    // }
  }
  
})