let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取题目数量
function getQuestionNum(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    courseid:that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.getQuestionNum
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {

      if (Array.isArray(res.data) && res.data.length) {
        let list = res.data;
        list.forEach((item, index) => {
          //默认选中第一个
          if (index == 0) {
            item.select = true;
            that.setData({
              explain: item.dis
            })
            that.num = item.num_question
          }
          else {
            item.select = false;
          }
          if (!that.totalNum)
          {
            that.totalNum = item.num
          }
          

        })
        that.setData({
          selectNumList: res.data
        })
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
  let list = that.data.selectNumList;
  let explain = '';
  list.forEach((item, index) => {
    if (item.num_question == that.num) {
      if (item.num_question<=item.num)
      {
        item.select = true;
        explain = item.dis;
        return
      }
      else
      {
        return 
      }

      
    }
    else {
      item.select = false;
    }
  })
  that.setData({
    selectNumList: list,
    explain
  })
}
//将用户选择的数量提交后台
function endSelectNum(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    courseid: that.cid,
    num_question: that.num
  }
  var ajax = new Ajax({
    data,
    path: _interface.selectPracticeNum
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.setData({
        showMark:true
      })
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
module.exports = {
  getQuestionNum,
  userSelect,
  endSelectNum
}