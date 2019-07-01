// pages/jobRelease/jobRelease.js
let _fn=require("./fn.js")
import Tool from "../../libs/Tool.js";
import Check from "../../libs/check.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lableList:[],
    buildImg: [],
    payList:[{id:0,name:'请选择'}],
    payIndex:0,
    showUpdateBtn: true,//显示上传照片按钮,
    detail:'',
    area:'',
    isTop:false,
    selectPay: { pay_start: '', pay_end:''},
    jobShows:false,
    valueArr:[0,0,0],
    category: '',
    isRead:false,
    yearShows:false,
    price:0,
    selectYear:{}//工作经验
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.valueArr=[0,0,0];
    this.setData({
      price:getApp().globalData.price
    })
    this.tempFilePaths = [];
    //获取标签
    _fn.getLabel(this);
    //获取薪资待遇
   // getApp().getPayList(this)
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
    //获取本地地址
    wx.getStorage({
      key: 'address',
      success: res => {
        console.log(res)
        if(res.data)
        {
          this.setData({
            address: res.data.address,
            area: res.data.area
          })
        }
       
      },
    })
    //岗位要求
    wx.getStorage({
      key: 'detail',
      success: res => {
      
        if (res.data) {
          console.log(res.data)
          this.setData({
            detail: res.data.company_detail
          })
        }

      },
    })
    //公司详情
    wx.getStorage({
      key: 'company_detail',
      success: res => {

        if (res.data) {
          console.log(res.data)
          this.setData({
            company_detail: res.data.company_detail
          })
        }

      },
    })
    //招聘岗位
    // wx.getStorage({
    //   key:'category',
    //   success: res => {
    //     if (res.data) {
    //       console.log(res.data)
    //       this.setData({
    //         category: res.data['category_'+res.data.index]
    //       })
    //     }
    //   },
    // })
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
  //添加图片
  selectPhoto() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        this.tempFilePaths.push(...res.tempFilePaths)
        this.setData({
          buildImg: this.tempFilePaths,
          showUpdateBtn: this.tempFilePaths.length == 6 ? false : true
        })

      }
    })
    //getApp().UpdatePhoto(this)
  },
  delPhoto({currentTarget}){
    let {index}=currentTarget.dataset;
    this.tempFilePaths.splice(index, 1);
    this.setData({
      buildImg: this.tempFilePaths,
      showUpdateBtn: this.tempFilePaths.length == 6 ? false : true
    })
  },
  //选择可选标签
  labelChange({ detail }) {
    let { value } = detail;
    let list = this.data.lableList;
    for (let i = 0; i < list.length; i++) {
      if (value.includes(list[i].id)) {
        list[i].selected = true;
        this.setData({
          ['lableList[' + i + '].selected']: true
        })
      }
      else {
        this.setData({
          ['lableList[' + i + '].selected']: false
        })
      }

    }
    console.log(value)
  },
  //发布
  formSubmit({detail}){
    let { value, formId}=detail;
    getApp().setFormId(getApp().globalData.userId, formId)
      for (let key in value) {
        if (value[key] == '') {
          let tip = ''
          switch (key) {
            case 'company':
              tip = "请输入公司名称";
              break;
            case 'area':
              tip = "请选择区域";
              break;
            case 'address':
              tip = "请输入地址";
              break;
            case 'username':
              tip = "请输入联系人";
              break;
            case 'userphone':
              tip = "请输入手机号码";
              break;
            case 'pay_start':
              tip = "请选择薪资待遇";
              break;
            case 'pay_end':
              tip = "请选择薪资待遇";
              break;
            case 'category':
              tip = "请选择招聘岗位";
              break;
            case 'detail':
              tip = "请输入岗位要求";
              break;
            case 'year_start':
              tip = "请选择工作经验";
              break;
            case 'year_end':
              tip = "请选择工作经验";
              break;
            case 'company_detail':
              tip = "请输入公司介绍";
              break;
            case 'industry':
              tip = "请输入所属行业";
              break;
            case 'scale':
              tip = "请输入公司规模";
              break;
            case 'tag':
              tip = "请选择标签";
              break;
          }
          wx.showToast({
            title: tip,
            icon: 'none'
          })
          return

        }

        //验证手机号码
        if (key == 'userphone' && !Check.checkPhoneNum(value[key])) {
          return
        }


        console.log(key, value[key])
      }
      //判断是否上传图片
      if (this.tempFilePaths.length == 0) {
        wx.showToast({
          title: '请添加图片',
          icon: "none"
        })
        return
      }
      if (!this.data.isRead) {
        wx.showToast({
          title: '请阅读并同意《免责声明》',
          icon: "none"
        })
        return
      } 
      this.value = value;
      wx.showModal({
        title: '提示',
        content: '确认提交？',
        success:res=>{
          if(res.confirm)
          {
            _fn.submitEvent(this);
          }
        }
      })
     
    
  },
  //顶置
  switchEvent({detail}){
    let { value } = detail;
    
    this.setData({
      isTop: value?1:0
    })
  },
  showPayEvent(){
    this.setData({
      shows:true
    })
  },
  selectPayEvent({detail}){
    console.log(detail)

    this.setData({
      selectPay: detail.selectPay
    })
  },
  //职位类型
  jobStyleEvent() {
    this.setData({
      jobShows: true,
      valueArr: this.valueArr
    })
  },
  
  //选择工作
  selectJob({ detail }) {
    let { name } = detail.selectJob;
    let { valueArr } = detail;
    this.valueArr = valueArr
    this.setData({
      category: name
    })
 

    console.log(detail)
  },
  //工作经验
  selectYearEvent({detail}){
    let { selectYear } = detail
    this.setData({
      selectYear
    })
    console.log(selectYear)
  },
  //显示工作经验
  showYearEvent(){
    this.setData({
      yearShows:true
    })
  },
  //免责声明
  switchMZEvent({detail}){
    let { value } = detail;
    this.setData({
      isRead:value
    })
  }
})