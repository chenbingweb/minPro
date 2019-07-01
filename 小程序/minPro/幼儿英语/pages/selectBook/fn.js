let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取每个单元下的每节课
function getUnitLessonList(that){
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  var data = {
    userid: that.userid,
    uid:that.uid
  }
  var ajax = new Ajax({
    data,
    path: _interface.getUnitLesson
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode==0)
    {
      let current=0;
      let lessonInfo={};//课本信息
      res.data.forEach((item,index)=>{
        if (item.courseid==that.cid)
        {
          current = index;
          lessonInfo = item;
          //发送日志
          getApp().sendNote({
            message: 'course',
            ext1: that.cid,
            ext2: null,
            ext3: null,
            ext4: null,
            ext5: null,
            userid: that.userid
          })
          console.log(that.cid)
        }
      })
      let lastLesson={
        author:null,
        courseid: null,
        cover_img:"../../images/lastone.jpg",
        key_words: 0,
        lid: 0,
        status: 3,
        uid: 0,
        words:null
      }
      let lesson = res.data;
      lesson.push(lastLesson)
      that.setData({
        current,
        lesson: lesson,
        lessonInfo
      })
    }
    else
    {
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
  getUnitLessonList
}