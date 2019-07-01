let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取听故事列表
function getListenStoryList(that) {
  wx.showLoading({
    title: that.reset ? '重置中...' : '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    courseid: that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface[that.interface]//getSKStory listenStory
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.startTime = new Date().getTime()
      let data = res.data;
      that.noteArr=[];
      for (let i = 0; i < data.length;i++){
        //上课
        if (that.data.src =='sk')
        {
          that.noteArr.push({
            listenTimes: 0
          })
        }
        else
        {
          that.noteArr.push({
            isEdit: false,
            listenTimes: 0
          })
        }
        
      }
      //重置story
      if (that.reset) {
        resetStory(data, that)
      }
      else {
        if (Array.isArray(data) && data.length) {
          let contentInfo = data[0];
          that.setData({
            imgsData: data,
            contentInfo
          })
          //自动播放
         // autoPlay(that)
        }
      }

    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'icon'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//编辑故事
function editStory(that) {
  // wx.showLoading({
  //   title: '加载中...',
  //   mask: true
  // })
  var data = {
    userid: that.userid,
    id: that.sid,
    teaching_plan: that.teaching_plan
  }
  var ajax = new Ajax({
    data,
    path: _interface.editContent
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      let data = res.data;
      //返回编辑后的内容
      that.setData({
        ['contentInfo.teaching_plan']: data.teaching_plan
      })
      that.noteArr[that.preCurrent].isEdit = true
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
//重置
function resetStory(data, that) {
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      if (that.sid == item.id) {
        //回复默认 重置 设置
        that.reset = false;
        that.setData({
          ['contentInfo.teaching_plan']: item.teaching_plan
        })
        that.noteArr[that.preCurrent].isEdit=false
        return
      }
    })
  }
}
//删除编辑记录
function repeatEdit(that){
  wx.showLoading({
    title: that.reset ? '重置中...' : '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    courseid: that.cid,
    id:  that.sid 
  }
  var ajax = new Ajax({
    data,
    path: _interface.repeateContent//getSKStory listenStory
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      let data = res.data;
      if (data.is_repeat)
      {
        getListenStoryList(that)
      }
      
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'icon'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//听故事备课完成
function listenEnd(that) {
 // that.class_type = 'deep_reading_status';
  that.callBack = res => {
    that.setData({
      showMark: true
    })
  }
  //class_type: that.class_type//read阅读，cartoon卡通,story 听故事, practice 选择练习
  return () => {
    let len = that.data.imgsData.length;
    let current = that.data.baseSet.current;
    that.setData({
      audioPlay: false
    })
    // if (current == len - 1) {
    //   if (that.data.src == 'bk') {
    //     getApp().BKEndOk(that);
    //   }
    //   else {
    //     getApp().SKEndOk(that)
    //   }

    // }
    if (that.data.src == 'sk' && that.autoPlayFlag) {

      current += 1;
      if (current > len - 1) {
        current = len - 1
        return
      }
      let currentStory = that.data.imgsData[current];
      let url = currentStory.dub_url;
      //是否有url
      if (url != '') {
        that.setData({
          ['baseSet.current']: current
        })
        autoPlay(that)
      }
    }


  }
}
//开始播放音频
function playAudio(that) {
  return () => {
    that.setData({
      audioPlay: true
    })
    that.noteArr[that.preCurrent].listenTimes += 1
  }
}
//停止
function playStop(that) {
  return () => {
    that.setData({
      audioPlay: false
    })
  }
}
//自动播放
function autoPlay(that) {
  if (that.data.src == 'sk') {
    let current = that.data.baseSet.current;
    let currentStory = that.data.imgsData[current];
    let url = that.data.imgUrl+ currentStory.dub_url;

    that.audio.play(url)
  }
}
module.exports = {
  getListenStoryList,
  editStory,
  listenEnd,
  playAudio,
  playStop,
  autoPlay,
  repeatEdit
}