let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Audio from "../../libs/InnerAudio.js";
let audio =new Audio();

//获取题目数量
function getPracticeList(that) {
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
    path: _interface.getPractice
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.startTime = new Date().getTime()
      if (Array.isArray(res.data) && res.data.length) {
        let list = res.data;
        if (Array.isArray(list)&&list.length)
        {
          that.practiceList = res.data;
          that.practiceList.forEach(item=>{
            if (!Array.isArray(item)) {
              item.sentence = getApp().splitFn(item.e_name)
              // item.sentence = item.e_name.split('.');
              // item.sentence[0] = item.sentence[0]+'.'
              // if (item.sentence.length == 1) {
              //   item.sentence.unshift('')
              // }
              // if (item.sentence.length == 3) {
              //   item.sentence[1] = item.sentence[1] + '.'
              // }
            }

            item.option.forEach(option=>{
              option.right=false;
              option.err=false;
              option.check=false;
            })
          })
          console.log(that.practiceList)
          //获取题目id
          that.practice_id = that.practiceList[that.index].practice_id
          that.setData({
            practiceItem: that.practiceList[that.index],
            currentQ: 1,
            total: that.practiceList.length
          })
          autoPlay(that.practiceList[that.index], that)
        }
        else
        {
          
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
//用户选择
function userSelect(that) {
  wx.showLoading({
    title: '判断中...',
    mask: true
  })
  // if (that.practiceList.length - 1 == that.index)
  // {
  //   return 
  // }
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    practice_id: that.practice_id,//题id	
    id:that.id,
    courseid:that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.selectAnswer
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {

     console.log(res.data)
     if(res.data.is_right)
     {
       audio.play('/source/right.mp3')
     }
     else
     {
       audio.play('/source/err.mp3')  
     }
     showResult(res.data,that)
      that.setData({
        showStatue: res.data.is_right?1:2
      })
      //当用户答题完成后，提示用户完成上课
      if (that.practiceList.length - 1 ==that.index)
      {
        setTimeout(()=>{
          that.setData({
            showStatue: 0
          })
          getApp().SKEndOk(that)
        },3000)
      }
     if (that.practiceList.length -1> that.index)
     {
       that.index += 1;
       that.practice_id = that.practiceList[that.index].practice_id
       setTimeout(() => {
         //关闭音频
         that.audio.stop()
         that.setData({
           practiceItem: that.practiceList[that.index],
           showEvent: false,
           showStatue: 0,
           currentQ: that.index+1,
         })
         //自动播放
         autoPlay(that.practiceList[that.index], that)
       }, 2000)
     }
    
     
     
     
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'icon'
      })
    }
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//显示用户答案是否正确
function showResult(result,that){
  let list = that.practiceList[that.index];
  let options = list.option;
  options.forEach((item,index)=>{
    if (item.id == result.right_id)
    {
      item.right = result.is_right;
      that.setData({
        ['practiceItem.option[' + index +'].right']: true
      })

    }
    if (that.id == item.id)
    {
      that.setData({
        ['practiceItem.option[' + index + '].err']:!result.is_right
      })
    
    }
  })
}
//音频播放停止
function listenEnd(that){
  return ()=>{
    console.log('end')
    that.setData({
      isplay: false
    })
  }
}
//音频播放
function playAudio(that) {
  return () => {
    that.setData({
      isplay:true
    })
    console.log('play')
  }
}
//音频停止
function playStop(that){
  return () => {
    console.log('stop')
    that.setData({
      isplay: false
    })
  }
}
//自动播放
function autoPlay(item,that){
  if (item.dub_url)
  {
    that.audio.play(that.data.imgUrl + item.dub_url)

  }
  else
  {
    wx.showToast({
      title: '暂无音频',
      icon:none
    })
  }

}
module.exports={
  getPracticeList,
  userSelect,
  listenEnd,
  playAudio,
  playStop
}