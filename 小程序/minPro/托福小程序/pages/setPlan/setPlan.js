// pages/setPlan/setPlan.js
import {User} from "../../model/user.js"
import Tool from "../../libs/Tool.js";
import { Index } from "../../model/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    selectWordsName:'',
    finishTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    //获取计划列表
    User.getPlanList();
    //获取选项的词库名称
    if (Index.wordsList.length)
    {
      Index.wordsList.forEach(item=>{
        if (item.id == User.thesaurus_id)
        {
          this.setData({
            selectWordsName:item.name
          })
        }
      })
    }
    //选择的计划Id
    this.planId='';

  },
  setEvent(){
    //计划列表
    User.getPlanListEvent.Off(this.getPlanListEvent);
    User.setPlanEvent.Off(this.setPlanEvent)
    User.getPlanListEvent.On(this, this.getPlanListEvent);
    //设置计划
  
    User.setPlanEvent.On(this, this.setPlanEvent);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getPlanListEvent(res){
    res.forEach(item=>{
      if (item.id == User.plan_id)
      {
        item.checked=true
        this.setFinishTime(item.days)
      }
    })
    this.setData({
      list: res
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //绑定事件
    this.setEvent()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //计划列表
    User.getPlanListEvent.Off(this.getPlanListEvent);
    User.setPlanEvent.Off(this.setPlanEvent)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //计划列表
    User.getPlanListEvent.Off(this.getPlanListEvent);
    User.setPlanEvent.Off(this.setPlanEvent)
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
   
  onShareAppMessage: function () {

  },*/
  //选择计划
  onSelectPlan({detail:{value}}){
    let list=this.data.list;
    list.forEach(item=>{
      if (parseInt(item.id) == parseInt(value))
      {
        item.checked=true;
        //已经学习了几天
        let { study_days} = User.studyInfo
        this.setFinishTime(item.days - (study_days || 0))
      }
      else
      {
        item.checked = false
      }
    })

    this.setData({
      list
    })
  },
  //设置预计完成时间
  setFinishTime(day){
    let finishTime = Date.now()+day*24*60*60*1000;
    let time=Tool.formatTime(new Date(finishTime), '-');
    time=time.split('-');
    this.setData({
      finishTime: `${time[0]}年${time[1]}月${time[2]}日`
    })

  },
  //开始计划
  onStartPlan(){
    let list = this.data.list;
    let id = User.thesaurus_id;
    let flag = list.some(item => {
      if (item.checked == true)
      {
        id=item.id
      }
       return item.checked == true
      })
    if (!flag)
    {
      wx.showToast({
        title: '请选择您的学习计划',
        icon:'none'
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '确认修改计划？\r\n修改后将重置学习计划',
      success: res => {
        if (res.confirm) {
          User.setPlan(id)
        }
      }
    })
 

  },
  setPlanEvent(){
   wx.showToast({
     title: '设置成功'
   })
    setTimeout(()=>{
      // User.getStudyInfo(()=>{
      
      // })
      wx.navigateBack({
        delta: 1
      })
      
    },2000)
    
  },
  //取消修好
  onCancel(){
    wx.navigateBack({
      delta:1
    })
  }
})