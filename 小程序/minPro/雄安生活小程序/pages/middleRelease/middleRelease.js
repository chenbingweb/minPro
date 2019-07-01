// pages/middleRelease/middleRelease.js
let _interface = require('../../utils/interface.js')
let _fn=require("./fn.js")
import Check from "../../libs/check.js";

let Arr=[
  {
    img:'../../images/tv.png',
    selected:false,
    id:'1',
    name:'电视'
  },
  {
    img: '../../images/bx.png',
    selected: false,
    id: '2',
    name:'冰箱'
  },
  {
    img: '../../images/xyj.png',
    selected: false,
    id: '3',
    name:'洗衣机'
  },
  {
    img: '../../images/bed.png',
    selected: false,
    id: '4',
    name: '床'
  },
  {
    img: '../../images/kt.png',
    selected: false,
    id: '5',
    name: '空调'
  },
  {
    img: '../../images/pc.png',
    selected: false,
    id: '6',
    name: '电脑'
  },
  {
    img: '../../images/yyj.png',
    selected: false,
    id: '7',
    name: '抽烟机'
  },
  {
    img: '../../images/shafa.png',
    selected: false,
    id: '8',
    name: '沙发'
  },
  {
    img: '../../images/wife.png',
    selected: false,
    id: '9',
    name: '无线'
  }
  
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRead:false,
    isPersonal:false,
    personFlag:false,
    isInfo:false,
    isTop:0,
    categoryArr:[
      { name: '请选择', value:''},
      {name:'出租',value:'lease'},
      {name:'出售',value:'sell'}
    ],
    categoryIndex:0,
    areaList:[{
      name:'请选择',
      id:''
    }],
    areaListIndex:0,
    lableList:[],//可选标签列表,
    buildImg:[],
    showUpdateBtn:true,//显示上传照片按钮
    infoList:[],//资讯分类列表
    infoClassIndex:0,
    price:0,
    houseTypeList:[{name:'请选择'}],
    doorIndex:0,
    selectArr: Arr
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let areaList = this.data.areaList;
    areaList.push(...getApp().globalData.areaList) ;
    let houseTypeList = this.data.houseTypeList;
    houseTypeList.push(...getApp().globalData.houseTypeList)
    this.setData({
      houseTypeList: houseTypeList,
      areaList: areaList,
      price:getApp().globalData.price,
     
    })
    //发布类型 company 公司','person' 个人
    this.type = "company"//'company','person'
    
    if (options.src == 'personal')
    {
      wx.setNavigationBarTitle({
        title: '个人房源发布',
      })
      this.setData({
        isPersonal:true
        // personFlag: true,
      })
      this.type = "person"
      this.path = _interface.personBulidRelease
    }
    //资讯信息发布
    else if (options.src == 'info')
    {
      wx.setNavigationBarTitle({
        title: '资讯发布',
      })
      this.setData({
        isInfo: true
      })
      this.path = _interface.infoRelease;
      this.type = false;
      _fn.getInfoClass(this)
    }
    else
    {
      wx.setNavigationBarTitle({
        title: '房产中介发布',
      })
      this.path = _interface.middleBulidRelease
      this.label = "house"
    }
    this.userId=getApp().globalData.userId;
    this.tempFilePaths=[];
    //租房条件
    this.cof=[]
    //获取标签列表
    _fn.getLabel(this)
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
  //发布
  formSubmit({detail}){
    let { value, formId}=detail;

    getApp().setFormId(getApp().globalData.userId, formId)
    //判断是否上传图片
    if (this.tempFilePaths.length==0)
    {
      wx.showToast({
        title:'请添加图片',
        icon:"none"
      })
      return 
    }
    for(let key in value){
      if(value[key]=='')
      {
        let tip=''
   
        switch(key)
        {
          case 'title':
            tip = "请输入标题";
            break;
          case 'name':
            tip ="请输入名称";
            break;
          case 'area':
            tip = "请选择区域";
            break;
          case 'address':
            tip = "请输入地址";
            break;
          case 'amount':
            tip = "请输入价格";
            break;
          case 'floor':
            tip = "请输入楼层";
            break;
          case 'total_floor':
            tip = "请输入总楼层";
            break;
          case 'door':
            tip = "请输入户型";
            break;
          case 'acreage':
            tip = "请输入面积";
            break;
          case 'direction':
            tip = "请输入朝向";
            break;
          // case 'parking':
          //   tip = "请输入车位数量";
          //   break;
          // case 'water':
          //   tip = "请输入水费单价";
          //   break;
          // case 'electric':
          //   tip = "请输入电费单价";
          //   break;
          case 'lookat':
            tip = "请输入看房时间";
            break;
          // case 'village':
          //   tip = "请输入小区";
          //   break;
          case 'category':
            tip = "请选择类型";
            break;
          case 'username':
            tip = "请输入联系人";
            break;
          case 'userphone':
            tip = "请输入手机号码";
            break;
     
          case 'detail':
            if (this.data.isInfo)
            {
              tip = "请输入内容";
            }
            else
            {
              tip = "请输入房屋介绍";
            }
            
            break;

          case 'tag':
            tip="请选择标签";
            break;
        }
        wx.showToast({
          title:tip,
          icon:'none'
        })
        return
        
      }
      //判断是否是租房 this.data.categoryArr[this.data.categoryIndex].value=='lease'
      if (this.data.categoryArr[this.data.categoryIndex].value == 'lease')
      {
        if (this.cof.length==0)
        {
          wx.showToast({
            title: '请选择租房环境',
            icon: 'none'
          })
          return 
        }
      }
      if (key == 'category_id' && value[key]==-1)
      {
        wx.showToast({
          title: '请选择分类',
          icon: 'none'
        })
        return 
      }
      //验证手机号码
      if (key =='userphone'&&!Check.checkPhoneNum(value[key])) {
          return
        }
      
      
      console.log(key, value[key])
    }
    if (!this.data.isRead) {
      wx.showToast({
        title: '请阅读并同意《免责声明》',
        icon: "none"
      })
      return
    }
    //跳转到商城
    if (this.data.isTop)
    { 
      if (getApp().globalData.amount<this.data.price)
      {
        

        wx.showModal({
          title: '提示',
          content: '雄心币不足，到商城购买？',
          success: res=>{
            if (res.confirm) {
             wx.navigateTo({
               url:'../myWealth/myWealth'
             })
  

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return 
      }
    }
    this.value=value;
    if (this.type)
    {
      this.value.type = this.type;
    }
    //租房时环境
    if (this.data.categoryArr[this.data.categoryIndex].value == 'lease')
    {
      this.value.cof = this.cof;
    }
    
     wx.showModal({
       title:'提示',
       content:'确认提交？',
       success:res=>{
        if(res.confirm)
        {
            _fn.submitEvent(this)
        }
       }
     })

   // _fn.submitEvent(this)
    console.log(value)

  },
  //是否置顶
  switchEvent({ detail}){
    let {value}= detail;
    this.setData({
      isTop: value?1:0
    })

    console.log(value)
  },
  switchMZEvent({ detail }){
    console.log(detail)
    this.setData({
      isRead: detail.value
    })
  },
  //选择（出租、出售）类型
  categoryChange({detail}){
    let {value}=detail;
    this.setData({
      categoryIndex: value
    })
    console.log(value)
  },
  //选择区域
  areaChange({ detail }){
    let { value } = detail;
    this.setData({
      areaListIndex:value
    })
  },
  //选择可选标签
  labelChange({ detail}){
    let { value } = detail;
    let list = this.data.lableList;
    for (let i = 0; i < list.length;i++){
      if (value.includes(list[i].id))
      {
        list[i].selected=true;
         this.setData({
           ['lableList['+i+'].selected']: true
         })
      }
      else
      {
        this.setData({
          ['lableList[' + i + '].selected']: false
        })
      }
      
    }
    console.log(value)
  },
  //添加图片
  selectPhoto(){
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res=>{
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
       
        this.tempFilePaths.push(...res.tempFilePaths)
        this.setData({
          buildImg: this.tempFilePaths,
          showUpdateBtn: this.tempFilePaths.length==6?false:true
        })
        
      }
    })
    //getApp().UpdatePhoto(this)
  },
  //删除照片
  delPhoto({ currentTarget }){
    let {index } = currentTarget.dataset;
    this.tempFilePaths.splice(index, 1);
    this.setData({
      buildImg: this.tempFilePaths,
      showUpdateBtn: this.tempFilePaths.length == 6 ? false : true
    })
  },
  //选择资讯
  infoClassEvent({detail}){
    let { value } = detail;
    this.setData({
      infoClassIndex: value
    })
  },
  changeHouseDoor({detail}){
    let { value } = detail;
    this.setData({
      doorIndex: value
    })
  },
  //
  checkboxChange({detail}){
    let { value } = detail;
    this.data.selectArr.forEach((item,index)=>{
      if (value.includes(item.id))
      {
        this.setData({
          [`selectArr[${index}].selected`]:true
        })
      }
      else
      {
        this.setData({
          [`selectArr[${index}].selected`]: false
        })
      }
    })
    this.cof=value;
    console.log(value)
  }
})