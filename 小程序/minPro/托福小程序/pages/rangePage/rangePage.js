// pages/rangePage/rangePage.js
import * as echarts from '../../components/ec-canvas/echarts.js';
import { User } from "../../model/user.js"
import Tool from "../../libs/Tool.js"
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      top: '4%',
      bottom: '2%',
      left:'6%',
      right:'1%',
      containLabel: true
    },
    legend: {
      height: 600,
      top: 'bottom',

    },
    xAxis: {
      splitNumber: 10,
      type: 'category',
      data: days
    },
    yAxis: {
      splitNumber: 8,
      type: 'value'
    },
    series: [
      {
        data: hour,
        type: 'line'
      },
      {
        lineStyle: { color: 'yellow' },
        data: average,
        type: 'line'
      }]
  };
  chart.setOption(option);
  return chart;
}

function CreatFn(data){
  // let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  // let average = [4, 4, 4, 4, 4, 4];
  // let hour = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4]
  let { days, average, hour}=data;
  console.log(data)
  return function (canvas, width, height){
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var option = {
      grid: {
        top: '4%',
        bottom: '2%',
        left: '6%',
        right: '1%',
        containLabel: true
      },
      legend: {
        height: 600,
        top: 'bottom',

      },
      xAxis: {
        splitNumber: 10,
        type: 'category',
        data: days
      },
      yAxis: {
        splitNumber: 8,
        type: 'value'
      },
      series: [
        {
          lineStyle: { color: '#009688' },
          data: hour,
          type: 'line'
        },
        {
          lineStyle: { color: '#ff9701' },
          data: average,
          type: 'line'
        }]
    };
    chart.setOption(option);
    return chart;
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecCanvas:false,
    ec: {},
    rangeInfo:{},
    show:false,
    mode:'study'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    User.getRangeEvent.Off(this.getRangeEvent)
    User.getRangeEvent.On(this,this.getRangeEvent)
    User.getRange();
   // User.getStudyInfo() 
    this.setData({
      mode: User.studyInfo.mode
    })
    
  },
  getRangeEvent(res){
    if (res == false) return 
    console.log(res.avg_time)
    res.day=[];
    for (let key in res.avg_time)
    {
      res.day.push(key.slice(1))
    }
    //显示日期
    // res.day = Object.keys(res.avg_time).map(item=>{
    //   console.log(item)
    //   return item
    // })
    res.studyTime = Object.values(res.my_time)
    let average = Object.values(res.avg_time);
    let studyTime = Tool.timeChange(res.total_time_long*1000)
    res.totoalTime = studyTime;
    res.nickname = User.userInfo.nickname;
    
    let data={
      days: res.day, 
      average,
      hour: res.studyTime
    }
    res.rank.forEach(item=>{
      item.nickname = item.nickname.slice(0,1)+'~~';
     
    })
    this.setData({
      rangeInfo:res,
      ecCanvas:true,
      show: true,
      ec: {
        onInit: CreatFn(data)
      }
    })
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },
  onDK(){
    wx.navigateTo({
      url: '../postImg/postImg',
    })
  },
  //复习旧词
  onReviewOld(){
    //是否开始复习
    if (!User.studyInfo.last_review_section_id && User.studyInfo.mode != 'study' && User.studyInfo.mode != 'restudy') {
      User.startView((res) => {
        if (res.errcode == 1) {
          return
        }
        else {
          wx.navigateTo({
            url: '../words/words',
          })
        }
      })
    }
    else {
      wx.navigateTo({
        url: '../words/words',
      })
    }


  },
  //返回首页
  onNavIndex(){
    wx.reLaunch({
      url: '../index/index',
    })
  }
})