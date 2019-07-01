let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
import InnerAudio from "../../libs/InnerAudio.js"
let SKFN=require("./SKfn.js")

//获取绘本内容
function getReadContent(that){
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
    path: _interface.getReadContent
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      // let readInfo = res.data[0];
      // //当前会读id
      // that.itemid = readInfo.id;
      // readInfo.sentence = readInfo.sentence.split(',')
      // if (readInfo.sentence.length == 1) {
      //   readInfo.sentence.unshift('')
      // }
      
      // if (readInfo.self_dub_url&&readInfo.self_dub_url!='')
      // {
      //   that.setData({
      //     recordDetail:{
      //       duration: readInfo.duration, 
      //       self_dub_url: readInfo.self_dub_url
      //     }
      //   })
      // }
      that.noteArr=[];
      for(let k=0;k<res.data.length;k++){
        that.noteArr.push({
          recordTimes: 0,
          listenTimes: 0
        })
      }
      //设置用户历史录音
      for (let index = 0; index < res.data.length; index++){
        console.log(index)
      
        let item = res.data[index]
        
        if (item.self_dub_url == null || item.self_dub_url=='') {

          let i = index - 1 < 0 ? 0 : index - 1;
          let readInfo = res.data[i];
          innerFn(that, readInfo,i)
          // //当前会读id
          // that.itemid = readInfo.id;
          // readInfo.sentence = readInfo.sentence.split(',')
          // if (readInfo.sentence.length == 1) {
          //   readInfo.sentence.unshift('')
          // }

          // if (readInfo.self_dub_url) {
          //   that.setData({
          //     recordDetail: {
          //       duration: readInfo.duration,
          //       self_dub_url: readInfo.self_dub_url,
          //       head_img: readInfo.head_img
          //     }
          //   })
          // }
         
          // console.log(i)
          // that.setData({
          //   ['baseSet.current']: i,
          //   readInfo
          // })
          break
        }
        if (index == res.data.length-1)
        {
          let readInfo = res.data[index];
          innerFn(that, readInfo, index)
        }
       

      }
      function innerFn(that, readInfo,i){
        //当前会读id
        that.itemid = readInfo.id;
        readInfo.sentence = getApp().splitFn(readInfo.sentence)
        console.log(getApp().splitFn(readInfo.sentence))
        // readInfo.sentence = readInfo.sentence.split('.')
        // console.log(readInfo.sentence)
        // readInfo.sentence[0] = readInfo.sentence[0]+'.'
        // if (readInfo.sentence.length == 1) {
        //   readInfo.sentence.unshift('')
        // }
        // if (readInfo.sentence.length == 3) {
        //   readInfo.sentence[1] = readInfo.sentence[1] + '.'
        // }
        let info={};
        if (readInfo.self_dub_url) {
          info = {
            duration: readInfo.duration,
            self_dub_url: readInfo.self_dub_url,
            head_img: readInfo.head_img
          }
          that.setData({
            recordDetail: info
          })
        }
        

        console.log(i)
        that.setData({
          ['baseSet.current']: i,
          readInfo
        })
      }
      that.setData({
        imgsData:res.data,
       
      })
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console
  })
}


//上传录音文件
function uploadRecordFile(that) {
  // wx.showLoading({
  //   title: '上传中...',
  // })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    id: that.itemid,
    uploadType: that.uploadType,
    duration: that.duration
  }
  let upload = new Upload({
    path: _interface.uploadFile,
    filePath: that.tempFilePath,
    formData: data
  })
  upload.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.setData({
        showTip: false,
        status: 'start'
      })
      let record=res.data
     // record.self_dub_url = getApp().globalData.imgUrl + record.self_dub_url;
      if (that.data.src == 'bk')
      {
        that.setData({
          recordDetail: record
        })
        addRecordAudio(that)
      }
      else
      {
        that.setData({
          ['recordDetail.baby_dub_duration']: record.duration,
          ['recordDetail.baby_dub_url']: record.baby_dub_url,
          ['recordDetail.baby_img']: record.head_img
        })
       
        addRecordAudio(that)
      }
      
      console.log(res.data)
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })
    }
    console.log(res)

  }).catch(err => {
    that.setData({
      showTip: false,
      status: 'start'
    })
    wx.showToast({
      title:"网络不给力呦，请检查网络连接并稍后再试！",
      icon: 'none'
    })
    console.log(err)
  })
}

//删除录音
function deleteRecord(that){
  wx.showLoading({
    title: '删除中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    id: that.itemid
  }
  var ajax = new Ajax({
    data,
    path: that.recordType =="bobyRecord" ? _interface.deleteBabyRecord: _interface.deleteRecord
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      if (that.data.src == 'bk') {
        that.setData({
          recordDetail: {}
        })
      }
      else {
        that.setData({
          ['recordDetail.baby_dub_duration']: null,
          ['recordDetail.baby_dub_url']: null,
          ['recordDetail.baby_img']: null
        })
      }
      // that.setData({
      //   recordDetail:{}
      // })
      addRecordAudio(that)
    } 
    else {
      wx.showToast({
        title: '删除失败',
        icon:'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console
  })
}
//将返回的录音文件添加到当前课程
function addRecordAudio(that){
  let list = that.data.imgsData;
  let recordDetail = that.data.recordDetail
  list.forEach((item,index)=>{
    if (item.id==that.itemid)
    {
      //备课
      if(that.data.src=='bk')
      {
        item.duration = recordDetail.duration;
        item.self_dub_url = recordDetail.self_dub_url;
        item.head_img = recordDetail.head_img
      }
      else
      {
        /*
         ['recordDetail.duration']: readInfo.baby_dub_duration,
        ['recordDetail.baby_dub_url']: readInfo.baby_dub_url,
        ['recordDetail.baby_dub_url']: readInfo.baby_dub_url,
        **/
        item.baby_dub_duration = recordDetail.baby_dub_duration;
        item.baby_dub_url = recordDetail.baby_dub_url;
        item.baby_img = recordDetail.baby_img
      }
     
      return 
    }
  })

}
//完成绘本阅读备课
function readEndOk(that){
 
  var data = {
    courseid:that.cid,
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    class_type:'read'//read阅读，cartoon卡通,story 听故事, practice 选择练习
  }
  var ajax = new Ajax({
    data,
    path: _interface.readEndOk
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      that.setData({
        showMark: true
      })
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console
  })
}
//阅读绘本结束事件
function readEnd(that){
  return ()=>{
    //当用户播放到最后一节时，表示完成本小节备课
    if (that.data.imgsData.length - 1 == that.data.baseSet.current)
    {
     // readEndOk(that)
      // if (that.data.src == 'bk') {
      //   getApp().BKEndOk(that);
      // }
      // else {
      //   getApp().SKEndOk(that)
      // }
    }
    //隐藏播放动画
    if (that.play == "default") {
      that.setData({
        audioPlay: false
      })
    }
    else {
      that.setData({
        numAudioPlay: false
      })
    }
  }
}
//开始播放音频
function playAudio(that){
  return () => {
    if (that.play =="default")
    {
      that.setData({
        audioPlay:true
      })
      that.noteArr[that.current].listenTimes += 1
    }
    else
    {
      that.setData({
        numAudioPlay: true
      })
      that.noteArr[that.current].listenMumTimes += 1
    }
  }
}
//停止
function playStop(that){
  return () => {
    if (that.play == "default") {
      that.setData({
        audioPlay: false
      })
    }
    else {
      that.setData({
        numAudioPlay: false,
       
      })
    }
  }
}
function playEnd(that){
  return ()=>{
    that.setData({
      showRecord:false
    })
    console.log('end')
  }
}
function playIng(that){
  return ()=>{
    that.setData({
      showRecord: true
    })
    console.log('play')
  }
}
module.exports = {
  uploadRecordFile,
  getReadContent,
  readEnd,
  playAudio,
  playStop,
  deleteRecord,
  getSKReadContent: SKFN.getSKReadContent,
  playEnd,
  playIng,
  autoPlay: SKFN.autoPlay
}