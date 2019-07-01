// pages/wantWork/wantWork.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:'',//公司名称
    detail:'',//工作描述
    major:'',
    src:'wantjob',
    school:'',//学校名称
    payList: [{ id: 0, name: '请选择' }],
    payIndex:0,
    areaList:[],
    areaIndex:0,
    cityInde:[],
    startTime:'',
    endTime:"",
    workNature: ['全职', '兼职', '实习'],
    workNatureIndex:0,
    areaList: [{
      name: '请选择',
      id: ''
    }],
    areaListIndex:0,
    jobTypeList: [''],//职位类型
    jobIndex:0,
    shows: false,//期望薪资,
    selectPay: { pay_start: '', pay_end: '' },
    station:'',//岗位名称
    educationList:['初中','高中','中专','大专','本科','研究生','博士','硕士'],
    eduIndex:0,
    jobShows: false,
    valueArr: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { index, local } = options
    this.src=options.src;
    this.ediFlag=false;
    //要编辑的位置
    if(index)
    {
      this.index=index;
    }
    if (this.src == 'wantjob') {
      wx.setNavigationBarTitle({
        title: '求值意向'
      })
      //区域
      let areaList = this.data.areaList;
      areaList.push(...getApp().globalData.areaList)
      //职位类型
      let jobTypeList = this.data.jobTypeList;
      jobTypeList.push(...getApp().globalData.jobTypeList)
      this.setData({
        areaList: areaList,
        jobTypeList: jobTypeList
      })
      //编辑
      if (index != undefined && local)
      {
        wx.getStorage({
          key: local,
          success: res=>{
            if(res.data)
            {
              this.ediFlag=true
              let data=res.data[parseInt(index)];
              //工作性质
              this.data.workNature.forEach((item,index)=>{
                if (data.type==item)
                {
                  this.setData({
                    workNatureIndex:index
                  })
                  return 
                }
              })
              //工作地点
              areaList.forEach((item,index)=>{
                if (data.areaName == item.name) {
                  this.setData({
                    areaListIndex: index
                  })
                  return
                }
              })
              //职位类型
              this.setData({
                station: data.category 
              })
              // jobTypeList.forEach((item, index)=>{
              //   if (data.category == item) {
              //     this.setData({
              //       jobIndex: index
              //     })
              //     return
              //   }
              // })
              //薪资待遇
              this.setData({
                selectPay: { pay_start: data.pay_start , pay_end: data.pay_end  },
              })
            }
          },
        })
      }
     // getApp().getPayList(this);

  
    }
    else if (this.src == 'experience')
    {
      wx.setNavigationBarTitle({
        title: '工作经历'
      })
      // wx.getStorage({
      //   key: 'category_release',
      //   success: res => {
      //     if (res.data) {
      //       console.log(res.data)
      //       this.setData({
      //         station: res.data['category_' + res.data.index]
      //       })
      //     }
      //   },
      // })
      //编辑
      if (index != undefined && local) {
        wx.getStorage({
          key: local,
          success: res => {
            if (res.data) {
              this.ediFlag = true
              let data = res.data[parseInt(index)];
              
              this.setData({
                company: data.company,//公司名称
                startTime: data.start_time,
                endTime: data.end_time,
                station: data.station,
                detail: data.detail
                })
              
              console.log(data)
            }
          },
        })
      }
    }
    else 
    {
      wx.setNavigationBarTitle({
        title: '教育经历'
      })
      //编辑
      if (index != undefined && local) {
        wx.getStorage({
          key: local,
          success: res => {
            if (res.data) {
              this.ediFlag = true
              let data = res.data[parseInt(index)];
              //  学校名称
              this.setData({
                school: data.school,
                startTime: data.start_time,
                endTime: data.end_time,
                major: data.major
              })
              //学历
              this.data.educationList.forEach((item,index)=>{
                if (item == data.education)
                {
                  this.setData({
                    eduIndex:index
                  })
                  return 
                }
              })  
              console.log(data)
            }
          },
        })
      }
    }
    this.setData({
      src:this.src
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
  //选择
  payChangeEvent({detail}){
    let {value}=detail;
    this.setData({
      payIndex:parseInt(value)
    })
    console.log(this.data.payList[value].name)
  },
  //工作地点
  areaChangeEvent({ detail }){
    let { value } = detail;
    this.setData({
      areaIndex: value
    })
  },
  cityChangeEvent({ detail }){
    let { value } = detail;
    this.setData({
      cityInde: value
    })
    console.log(value)
  },
  //工作开始时间
  startDayEvent({detail}){
    let { value } = detail;
    this.setData({
      startTime:value
    })
  },
  //工作结束时间
  endDayEvent({ detail }) {
    let { value } = detail;
    this.setData({
      endTime: value
    })
  },
  //工作性质
  selectWorkNature({detail}){
    let { value } = detail;
    this.setData({
      workNatureIndex:value
    })
  },
  //选择区域
  areaChange({ detail }) {
    let { value } = detail;
    this.setData({
      areaListIndex: value
    })
  },
  //职位类型
  jobTypeListEvent({ detail }){
    let { value } = detail;
    this.setData({
      jobIndex: value
    })
  },
  //期望薪资
  showPayList(){
    this.setData({
      shows:true
    })
  },
  selectPayEvent({ detail}){
    this.setData({
      selectPay: detail.selectPay
    })
  },
  //学历选择
  educationEvent({ detail}){
    let { value } = detail;
    this.setData({
      eduIndex:value
    })
  },
  //显示岗位选择器
  showJobSpiker(){
    this.setData({
      jobShows: true
    })
  },
  //选择工作
  selectJob({ detail }) {
    let { name } = detail.selectJob;
    let { valueArr } = detail;
    this.valueArr = valueArr
    this.setData({
      station: name
    })
 

    console.log(detail)
  },
  onNavBack(){
    wx.navigateBack({
      delta:1
    })
  },
  //提交
  submitEvent({ detail }){
    let { value } = detail;
    //求值意向
    if (this.src == 'wantjob')
    {
      for (let key in value) {
        if (value[key] == '') {
          let tip = ''

          switch (key) {
            case 'type':
              tip = "请选择工作性质";
              break;
            case 'place':
              tip = "请选择工作地点";
              break;
            case 'category':
              tip = "请选择职位类型";
              break;
            case 'pay_start':
              tip = "请选择期望薪资";
              break;
            case 'pay_end':
              tip = "请选择期望薪资";
              break;
          }
          wx.showToast({
            title: tip,
            icon: 'none'
          })
          return

        }
      }
    }
    //工作经历
    if (this.src == 'experience') {
      for (let key in value) {
        if (value[key] == '') {
          let tip = ''

          switch (key) {
            case 'company':
              tip = "请输入公司名称";
              break;
            case 'start_time':
              tip = "请选择工作开始时间";
              break;
            case 'end_time':
              tip = "请选择工作结束时间";
              break;
            case 'station':
              tip = "请选择岗位名称";
              break;
            case 'detail':
              tip = "请输入工作描述";
              break;
          }
          wx.showToast({
            title: tip,
            icon: 'none'
          })
          return

        }
      }
    }
    //教育经历
    if (this.src == 'education') {
      for (let key in value) {
        if (value[key] == '') {
          let tip = ''

          switch (key) {
            case 'school':
              tip = "请输入学校名称";
              break;
            case 'education':
              tip = "请选择学历";
              break;
            case 'start_time':
              tip = "请选择入学时间";
              break;
            case 'end_time':
              tip = "请选择毕业时间";
              break;
            case 'major':
              tip = "请输入专业名称";
              break;
          }
          wx.showToast({
            title: tip,
            icon: 'none'
          })
          return

        }
      }
    }

    if (this.src == 'wantjob') {
      if (this.ediFlag)//编辑
      {
        innerUpDataFN('wantjobList', value, this.index) 
      }
      else//添加
      {
        innerFN('wantjobList', value)
      }
     
    }
    else if (this.src == 'experience') {
      if (this.ediFlag)//编辑
      {
        innerUpDataFN('experienceList', value, this.index) 
      }
      else
      {
        innerFN('experienceList', value)
      }

     
    }
    else {
      if (this.ediFlag)//编辑
      {
        innerUpDataFN('educationList', value, this.index) 
      }
      else
      {
        innerFN('educationList', value)
      }
    }
    //返回上一页
    wx.navigateBack({
      delta:1
    })
    //缓存数据
    function innerFN(key,value){
      if (!wx.getStorageSync(key)) {
        wx.setStorageSync(key, [])
      }
      let experienceList = wx.getStorageSync(key);

      experienceList.push(value);
      wx.setStorageSync(key, experienceList)
    }
    //修改缓存数据
    function innerUpDataFN(key, value,index) {
      let experienceList = wx.getStorageSync(key);
      experienceList.splice(index, 1, value);
      wx.setStorageSync(key, experienceList)
    }
    console.log(value)
  }
})