let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
import InnerAudio from "../../libs/InnerAudio.js"

//获取绘本内容
function getSKReadContent(that) {
  wx.showLoading({
    title: '加载中...',
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
    path: _interface.getSKLesson
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.noteArr=[];
      that.startTime= new Date().getTime()
      for (let i = 0; i < res.data.length;i++){
        that.noteArr.push({
          recordTimes: 0,
          listenTimes: 0,
          listenMumTimes:0
        })
      }
      // for (let index = 0; index < res.data.length; index++) {
      //   console.log(index)
      //   let item = res.data[index]

      //   if (item.self_dub_url == '') {

      //     let i = index - 1 < 0 ? 0 : index - 1;
      //     let readInfo = res.data[i];
      //     innerFn(that, readInfo, i)
      //     // //当前会读id
      //     // that.itemid = readInfo.id;
      //     // readInfo.sentence = readInfo.sentence.split(',')
      //     // if (readInfo.sentence.length == 1) {
      //     //   readInfo.sentence.unshift('')
      //     // }

      //     // if (readInfo.self_dub_url) {
      //     //   that.setData({
      //     //     recordDetail: {
      //     //       duration: readInfo.duration,
      //     //       self_dub_url: readInfo.self_dub_url,
      //     //       head_img: readInfo.head_img
      //     //     }
      //     //   })
      //     // }

      //     // console.log(i)
      //     // that.setData({
      //     //   ['baseSet.current']: i,
      //     //   readInfo
      //     // })
      //     break
      //   }
      //   if (index == res.data.length - 1) {
      //     let readInfo = res.data[index];
      //     innerFn(that, readInfo, index)
      //   }
      //   //innerFn(that, readInfo, index)

      // }
      innerFn(that, res.data[0], 0)
      function innerFn(that, readInfo, i) {
        //当前会读id
        that.itemid = readInfo.id;
        readInfo.sentence = getApp().splitFn(readInfo.sentence)
        // readInfo.sentence = readInfo.sentence.split('.')
        // readInfo.sentence[0] = readInfo.sentence[0]+'.'
        // if (readInfo.sentence.length == 1) {
        //   readInfo.sentence.unshift('')
        // }
        // if (readInfo.sentence.length == 3) {
        //   readInfo.sentence[1] = readInfo.sentence[1] + '.'
        // }
        let info={};
        if (readInfo.self_dub_url) {
          info={
            duration: readInfo.duration,
            self_dub_url: readInfo.self_dub_url,
            head_img: readInfo.head_img
          }
        }
        if (readInfo.baby_dub_url) {
          info.baby_dub_duration= readInfo.baby_dub_duration;
          info.baby_dub_url =readInfo.baby_dub_url;
          info.baby_img = readInfo.baby_img

        }

        console.log(info,i)
        that.setData({
          readInfo,
          recordDetail: info
        })
        autoPlay(that, res.data[0])
      }
      that.setData({
        imgsData: res.data,
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
    console
  })
}
//自动播放
function autoPlay(that,item){
  //this.PlayAudio 
  that.setData({
    audioPlay: false
  })
  if (item.self_dub_url)
  {
    that.play =undefined
    that.PlayAudio.play(that.data.imgUrl+item.self_dub_url)
  }
  else
  {
    
    that.play ="default"
    that.PlayAudio.play(that.data.imgUrl +item.default_dub_url)
  }
}
module.exports={
  getSKReadContent,
  autoPlay
}