// pages/bossSelectJob/bossSelectJob.js
import JobList from "../../libs/Job.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobList:[],
    showSelect:false,
    listData:[],
    keys:[]
  },

  /**
   * 生命周期函数--监听页面加载  this.setData({
      ['keys[' + this.index + '].key_' + this.index]: detail.selectJob.name
    })
   */
  onLoad: function (options) {
    this.src=options.src

    //招聘岗位
    this.selectJob=''
    //获取岗位名称
    this.setData({
      jobList: JobList.getHangYe()
    })
    this.keyList=[]
   let keyList = []
    JobList.getHangYe().forEach((item,index)=>{
      keyList.push({
        ['key_'+index]:''
      })
    })
    this.setData({
      keys: keyList
    })
    //来自毛遂自荐中的
    if (this.src=='selfrelease')
    {
        wx.setNavigationBarTitle({
          title: '岗位名称',
        })
        wx.getStorage({
          key: 'category_release',
          success: res => {
            let data = res.data;
            if (data) {
              this.setData({
                ['keys[' + data.index + '].key_' + data.index]: data['category_' + data.index]
              })
            }

          },
        })
    }else
    {  
      //读取本地缓存，显示在页面上
      wx.getStorage({
        key: 'category',
        success: res => {
          let data = res.data;
          if (data) {
            this.setData({
              ['keys[' + data.index + '].key_' + data.index]: data['category_' + data.index]
            })
          }

        },
      })
    }
 

    this.keyList.push(...keyList)

    console.log(JobList.getHangYe())
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
  selectedEvent({currentTarget}){
    let { list,index}=currentTarget.dataset;
    this.index=index
    this.setData({
      showSelect:true,
      listData: list
    })
  },
  selectJobEvent({detail}){
    //从新渲染
    let keyList=[]
    this.keyList.forEach((item, index) => {
      keyList.push({
        ['key_' + index]: ''
      })
    })
    this.setData({
      keys: keyList
    })
    //招聘岗位
    this.selectJob = detail.selectJob.name
    this.setData({
      ['keys[' + this.index + '].key_' + this.index]: detail.selectJob.name
    })
    
    
    console.log(detail)
  },
  //保存信息
  saveInfoEvent({detail}){
    let {value}=detail;
    //记录下标
    value.index=this.index;
    if (this.src =='selfrelease')
    {
      wx.setStorage({
        key: 'category_release',
        data: value,
        success: () => {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
    else
    {
      wx.setStorage({
        key: 'category',
        data: value,
        success: () => {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  
    
  }
})