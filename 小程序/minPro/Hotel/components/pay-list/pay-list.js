// components/job-two/job-two.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    jobdata: {
      type: Array,
      value: [1,2,3,4,5],
      observer: function (newval, oldval) {
        this.initData(newval)
      }
    },
    shows: {
      type: Boolean,
      value: false,
      observer: function (newval, old) {

        console.log(newval)
        // this.setData({
        //   value: [0, 0],
        //   one: [1, 2, 3, 4, 5, 6, 7],
        //   two: [2],
        // })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    shows: false,
    one: [1,2,3,4,5,6,7],
    two: [2],
    value: [0, 0]
  },

  /**
   * 组件的方法列表
   */
  created:function(){
    this.initData();
    this.canMove=true;
  },
  methods: {
    creatPay:function(pay){
      let arr=[];
      let start = pay
      for(let i=0;i<pay;i++)
      {
        arr.push(++start)
      
      }
      this.canMove=true;
      return arr
    },
    initData: function () {
      console.log(this.creatPay(1))
      this.setData({
        two: this.creatPay(1)
      })
      this.selectPay = { pay_start: 1, pay_end:2}
      // console.log(jobdata)
      // if (jobdata.length) {
       
      //   this.selectJob = jobdata[0].subLevelModelList[0]
      // }

    },
    bindChange: function ({ detail }) {
      this.canMove=false;
      let { value } = detail;

      // let list = this.data.one[value[0]].subLevelModelList
      // console.log(list)
      console.log(value)
      let endList = this.creatPay(this.data.one[value[0]]) 
      this.setData({
        two: endList,
        value: value
      })
      this.selectPay = { pay_start: this.data.one[value[0]], pay_end: endList[value[1]] }
      // this.selectJob = list[value[1]]
      // console.log(this.selectJob)
    },
    //确认
    selectCity: function (e) {
      if (!this.canMove) return 
      console.log(this.selectJob)
      var myEventDetail = { selectPay: this.selectPay }  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('selectPay', myEventDetail, myEventOption)
      //关闭piker
      this.setData({
        shows: false
      })
    },
    //隐藏
    hiddenPicker: function () {
      console.log('move',this.canMove)
      if (!this.canMove) return 
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
