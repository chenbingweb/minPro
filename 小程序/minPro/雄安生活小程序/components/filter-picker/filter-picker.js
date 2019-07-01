// components/filter-picker/filter-picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showFilter:{
      type:Boolean,
      value:false
    },
    //区域
    areaList:{
      type:Array,
      value: [],
      observer: function (nVal, oldVal){
       
      } 
      
    },
    doorList:{
      type: Array,
      value: [],
      observer: function (nVal, oldVal) {
       
      } 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    areaList:[],
    doorList:[],
    selectName:''
  },
  created:function(){
  
    console.log('++++++++++++++++', getApp().globalData.areaList)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //区域选择
    radioChange:function({detail}){
      let {value}=detail;
      this.data.areaList.forEach((item,index)=>{
        if(item.id==value)
        {
          this.setData({
            ['areaList['+index+'].checked']:true
          })
        }
        else
        {
          this.setData({
            ['areaList[' + index + '].checked']: false
          })
        }
      })
      console.log(detail)
    },
    //房型选择
    radioDoorChange: function ({ detail }){
      let { value } = detail;
      this.data.doorList.forEach((item, index) => {
        if (item.name == value) {
          this.setData({
            ['doorList[' + index + '].checked']: true,
            selectName: item.name
          })
        }
        else {
          this.setData({
            ['doorList[' + index + '].checked']: false
          })
        }
      })
    },
    //提交
    formSubmit:function({detail}){
      console.log(detail)
      var myEventDetail = { value: detail.value }  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
    
      this.triggerEvent('filterEvent', myEventDetail, myEventOption)
      this.setData({
        showFilter: false
      })
    },
    //重置
    formReset:function({detail}){
      console.log(detail)
      this.setData({
        selectName:'',
        showFilter: false
      })
      this.data.doorList.forEach((item, index) => {
        this.setData({
          ['doorList[' + index + '].checked']: false
        })
      })
      this.data.areaList.forEach((item, index) => {
        this.setData({
          ['areaList[' + index + '].checked']: false
        })
      })
      var myEventDetail = { value: {area:'',door:''} }  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('resetEvent', myEventDetail, myEventOption)
    },
    //动画结束
    animationEnd(){
      if (!this.data.showFilter)
      {
        
      }
      
    }
  }
})
