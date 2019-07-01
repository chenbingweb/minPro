// pages/manageTemp/manageTemp.js
Page({

  /**
   * 页面的初始数据'二手市场','话题贴','活动'
   */
  data: {
    checked:true,
    fbType:[
      {
        id:'used',
        name:'二手市场',
        checked:false
      },
      {
        id: 'ht',
        name: '话题贴',
        checked: false
      },
      {
        id: 'theme',
        name: '活动',
        checked: false
      }
    ],
    xqPower:[
      
      {
        id: 'localshop',
        name: '本商圈',
        checked: true
      },
      {
        id: 'local',
        name: '本小区',
        checked: false
      },
      {
        id: 'all',
        name: '全部',
        checked: false
      }
    ],
    temps:[
      {
        id: 'temp_1',
        name: '添加分类',
        checked: true
      },
      {
        id: 'temp_2',
        name: '板块介绍',
        checked: false
      }
    ],
    showAddClass:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onRadioChange({detail}){
    let {value}=detail;
    let list = this.data.xqPower;
    list.forEach(item=>{
      if(value==item.id)
      {
        item.checked=true;
      }
      else
      {
        item.checked=false
      }
    })
    this.setData({
      xqPower:list
    })

  },
  onRadioChangeTemp({ detail}){
    let { value } = detail;
    let list = this.data.temps;
    list.forEach(item => {
      if (value == item.id) {
        item.checked = true;
      }
      else {
        item.checked = false
      }
    })
    this.setData({
      temps: list
    })
  },
  checkboxChange({ detail}){
    let { value }=detail;
    let list = this.data.fbType
    list.forEach((item,index)=>{
      if (value.includes(item.id))
      {
        item.checked=true
      }
      else
      {
        item.checked = false
      }
    })
    this.setData({
      fbType:list
    })
    console.log(detail)
  },
  //关闭二级分类
  onClose(){
    this.setData({
      showAddClass:false
    })
  },
  onShowAddClass(){
    this.setData({
      showAddClass: true
    })
  }
})