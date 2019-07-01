// components/job-two/job-two.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    jobdata:{
      type: Array,
      value: [],
      observer: function(newval,oldval){
        this.initData(newval)
      }
    },
    shows: {
      type: Boolean,
      value: false,
      observer: function (newval, old) {

        console.log(newval)
        this.setData({
          value: [0, 0]
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    shows:false,
    one:[],
    two:[],
    value:[0,0]
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    initData: function (jobdata){
      console.log(jobdata)
      if (jobdata.length)
      {
        this.setData({
          one: jobdata,
          two: jobdata[0].subLevelModelList
        })
        this.selectJob = jobdata[0].subLevelModelList[0]
      }
      
    },
    bindChange:function({detail}){
      let {value}=detail;

      let list = this.data.one[value[0]].subLevelModelList
      console.log(list)
      this.setData({
        two:list,
        value: value
      })
      this.selectJob = list[value[1]]
      console.log(this.selectJob)
    },
    //确认
    selectCity: function (e) {
      console.log(this.selectJob)
      var myEventDetail = { selectJob: this.selectJob }  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('selectJob', myEventDetail, myEventOption)
      //关闭piker
      this.setData({
        shows: false
      })
    },
    //隐藏
    hiddenPicker: function () {
      console.log('close')
      this.setData({
        shows: false
      })
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('cancelCity', {}, myEventOption)
    },
  }
})
