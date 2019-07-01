// components/job-two/job-two.js
let jobData=require("../../utils/job.js").data
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Array,
      value: [0, 0, 0],
      observer: function (newval, oldval) {
         console.log(newval)
        // this.setData({
        //   value: newval
        // })
      }
    },
    shows: {
      type: Boolean,
      value: false,
      observer: function (newval, old) {

        console.log(newval)
        // this.setData({
        //   value: [0, 0,0]
        // })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    shows: false,
    one: jobData,
    two: jobData[0].subLevelModelList,
    three: jobData[0].subLevelModelList[0].subLevelModelList,
    value: [0, 0,0]
  },
  created:function(){
    this.selectJob = this.data.three[0];
    this.valueArr = [0, 0, 0]
  },
  /**
   * 组件的方法列表
   */
  methods: {
  
    bindChange: function ({ detail }) {
      let { value } = detail;
      console.log(value)
      let two = this.data.one[value[0]].subLevelModelList;
      console.log('two-->', two[value[1]].subLevelModelList)
      let three = two[value[1]].subLevelModelList

      this.setData({
        two: two,
        three: three,
        value: value
      })
      this.selectJob = three[value[2]];
      this.valueArr = value
      console.log(this.selectJob)
    },
    //确认
    selectCity: function (e) {

      var myEventDetail = { selectJob: this.selectJob, valueArr: this.valueArr }  // detail对象，提供给事件监听函数
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
      console.log(this.selectJob)
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
