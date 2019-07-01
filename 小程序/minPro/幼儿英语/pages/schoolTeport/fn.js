let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Poster from "../../libs/poster.js"
//获取成绩单
function getUserScore(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid:that.lid,
    courseid:that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.getUserScore
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      let { hours, minutes, seconds } = Tool.timeChange(res.data.study_result.totalTime);
      res.data.study_result.totalTime = `${hours}:${minutes}:${seconds}`;

      res.data.class_info.unit=res.data.class_info.unit.replace('U','Unit')
      res.data.class_info.lesson=res.data.class_info.lesson.replace('L', 'Lesson')
    
      that.setData({
        class_info: res.data.class_info,
        imgsData: res.data.book_info,
        userInfo: res.data.userInfo,
        gifts: res.data.study_result.gifts||[],
        words: res.data.words,
        study_result: res.data.study_result,
        cartoonData: res.data.cartoon_url,
        
        ReportPageText1: getApp().globalData.BECConf.Text.ReportPageText1.Value.replace('{0}', res.data.userInfo.baby_name||'宝宝'),
        ReportPageText2: getApp().globalData.BECConf.Text.ReportPageText2.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText3: getApp().globalData.BECConf.Text.ReportPageText3.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText4: getApp().globalData.BECConf.Text.ReportPageText4.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText7: getApp().globalData.BECConf.Text.ReportPageText7.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText5: getApp().globalData.BECConf.Text.ReportPageText5.Value

      })
      console.log()
      if (res.data.share_info)
      {
        that.shareInfo = res.data.share_info
      }
      videoExchange(that)
      let list = that.data.imgsData;
      let arr = []
      //显示宝宝录音
      if (list[0].baby_dub_url)
      {
        arr.push({
          img: that.data.userInfo.baby_img,// that.data.userInfo.head_img,
          url: list[0].baby_dub_url,
          reflag: false,
          id:1
        })
      }
       //显示妈妈录音
      if (list[0].self_dub_url)
      {
        arr.push({
          img: that.data.userInfo.head_img, //that.data.userInfo.baby_img,
          url: list[0].self_dub_url,
          reflag: false,
          id: 2
        })
      }
      //渲染页面
      that.setData({
        recordArr: arr
      })
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//获取用户和宝宝录音
function getRecordInfo(that){
  let list = that.data.imgsData;
  
  let arr=[] 
  if (list[that.current].baby_dub_url) {
    arr.push({
      img: that.data.userInfo.baby_img,// that.data.userInfo.head_img,
      url: list[that.current].baby_dub_url,
      reflag: false,
      id: 1
    })
  }
  if (list[that.current].self_dub_url) {
    arr.push({
      img: that.data.userInfo.head_img, //that.data.userInfo.baby_img,
      url: list[that.current].self_dub_url,
      reflag: false,
      id: 2
    })
  }
  that.setData({
    recordArr: arr
  })

}
//获取从分享信息
function getShareInfo(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  //  that.courseid = res.data.courseid;
  //that.share_userid = res.data.share_userid
  var data = {
    share_userid: that.share_userid,
    courseid: that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.getShareInfo
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      let { hours, minutes, seconds } = Tool.timeChange(res.data.study_result.totalTime);
      //处理单词列表
      for (let i = 0; i < res.data.words.length;i++){
        res.data.words[i].playItem=false
      }
      res.data.study_result.totalTime = `${hours}:${minutes}:${seconds}`;
      that.setData({
        // class_info: res.data.class_info,
        // imgsData: res.data.book_info,
        // userInfo: res.data.userInfo,
        // words: res.data.worlds,
        // cartoon: res.data.cartoon_url,
        // study_result: res.data.study_result
        class_info: res.data.class_info,
        imgsData: res.data.book_info,
        userInfo: res.data.userInfo,
        gifts: res.data.study_result.gifts||[],
        words: res.data.words,
        study_result: res.data.study_result,
        cartoonData: res.data.cartoon_url,

        ReportPageText1: getApp().globalData.BECConf.Text.ReportPageText1.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText2: getApp().globalData.BECConf.Text.ReportPageText2.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText3: getApp().globalData.BECConf.Text.ReportPageText3.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText4: getApp().globalData.BECConf.Text.ReportPageText4.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText7: getApp().globalData.BECConf.Text.ReportPageText7.Value.replace('{0}', res.data.userInfo.baby_name || '宝宝'),
        ReportPageText5: getApp().globalData.BECConf.Text.ReportPageText5.Value
      })
      videoExchange(that)
      let list = that.data.imgsData;
      let arr = [
        {
          img: that.data.userInfo.head_img,
          url: list[0].babay_dub_url,
          reflag: false,
          id: 1
        },
        {
          img: that.data.userInfo.baby_img,
          url: list[0].self_dub_url,
          reflag: false,
          id: 2
        }

      ]
      that.setData({
        recordArr: arr
      })
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//提交用户选择的礼品和评价
function submit(that){
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    courseid: that.cid
  }
  data = Object.assign(data, that.detail)
  var ajax = new Ajax({
    data,
    path: _interface.submitEval
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.courseid = res.data.courseid;
      that.share_userid = res.data.share_userid
      if (that.navTo && typeof that.navTo=='function')
      {
        that.navTo({ shareid: that.share_userid, cid: that.courseid})
      }
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}

//录音播放事件
function readEnd(that){

  return ()=>{
    if (that.types == 'userRe') {
      let list = that.data.recordArr;
      for (let i = 0; i < list.length; i++) {
        that.setData({
          ['recordArr[' + i + '].reflag']: false
        })
      }
    }
    else
    {
      let list = that.data.words;
      for (let i = 0; i < list.length; i++) {
        that.setData({
          ['words[' + i + '].playItem']: false
        })
      }
    }
    
  }
}
//录音播放事件
function playAudio(that) {
 
  return () => {
    if (that.types =='userRe')
    {
      let list = that.data.recordArr;
      for (let i = 0; i < list.length; i++) {
        // that.setData({
        //   ['words[' + i + '].playItem']: false
        // })
        if (that.wordId == list[i].id) {
          that.setData({
            ['recordArr[' + i + '].reflag']: true
          })
        }
        else {
          that.setData({
            ['recordArr[' + i + '].reflag']: false
          })
        }
      }
    }
    else//播放单词
    {
      let list = that.data.words;
      let words='';
      for (let i = 0; i < list.length; i++) {
        // that.setData({
        //   ['recordArr[' + i + '].reflag']: false
        // })
        if (that.wordId == list[i].id) {
          that.setData({
            ['words[' + i + '].playItem']: true
          })
          words=list[i].word
        }
        else {
          that.setData({
            ['words[' + i + '].playItem']: false
          })
        }
      }
      if (that.sharePage)
      {
        let send = {
          message: 'report-audio',
          ext1: that.cid,
          ext2: words,
          userid: getApp().globalData.UserId
        }
        getApp().sendNote(send)
      }
    }
    
    
  }
}
//录音播放事件
function playStop(that) {
  return () => {
    if (that.types == 'userRe') {
      let list = that.data.recordArr;
      for (let i = 0; i < list.length; i++) {
        that.setData({
          ['recordArr[' + i + '].reflag']: false
        })
      }
    }
    else {
      let list = that.data.words;
      for (let i = 0; i < list.length; i++) {
        that.setData({
          ['words[' + i + '].playItem']: false
        })
      }
    }
  }
}
//视频
function videoExchange(that) {
  let cartoon = that.data.cartoonData
  wx.getNetworkType({
    success: res => {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      let networkType = res.networkType;
      console.log(networkType)
      //高清视频
      if (networkType == 'wifi' || networkType == '4g') {

        that.setData({
          cartoon: cartoon.video_url_high
        })
      }
      else {
        that.setData({
          cartoon: cartoon.video_url_low
        })
      }
    }
  })
}
//添加免费课程
function addFreeLesson(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    courseid: that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.addFreeLesson
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      if(!res.data.is_ok)
      {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      else
      {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      
      }
      /*
       this.uid = options.uid;
    //获取每节课id
    this.lid=options.lid;
    this.cid = options.cid
      
      */ 
      setTimeout(() => {
        //跳转首页
        wx.reLaunch({
          url: `../selectBook/selectBook?uid=${that.uid}&lid=${that.lid}&cid=${that.cid}`,
        })
      }, 3000)
     
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//获取成绩单
function getPoster(that) {

  var data = {
    courseid: that.cid,
    share_userid: that.userid
  }
  var ajax = new Ajax({
    data,
    path: _interface.getPoster
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      console.log(res)
      //显示canvas
      that.setData({
        showCanvas:true
      })
      //实例海报对象
      that.wxCanvas = new Poster({ cid: 'first', callBack: that.callBack, data: res.data })
      //that.getPosterInf(res.data)
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
module.exports={
  getShareInfo,
  submit,
  getUserScore,
  getRecordInfo,
  readEnd,
  playAudio,
  playStop,
  videoExchange,
  addFreeLesson,
  getPoster
}
