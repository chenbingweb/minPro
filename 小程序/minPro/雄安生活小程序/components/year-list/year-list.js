// components/job-two/job-two.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    jobdata: {
      type: Array,
      value: [1, 2, 3, 4, 5],
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
    one: ['不限',1, 2, 3, 4, 5, 6, 7],
    two: ['不限'],
    value: [0, 0]
  },

  /**
   * 组件的方法列表
   */
  created: function () {
    this.initData()
  },
  methods: {
    creatPay: function (pay) {
      let arr = [];
      let start = pay;
      let len = this.data.one.length
      if (pay == '不限')
      {
        arr.push(pay)
      }
      else
      {
        for (let i = 0; i < len- pay; i++) {
          arr.push(++start)

        }
      }
     
      return arr
    },
    initData: function () {
      console.log(this.creatPay(1))
      this.setData({
        two: this.creatPay(1)
      })
      this.selectYear = { year_start: '不限', year_end: '不限' }


    },
    bindChange: function ({ detail }) {
      let { value } = detail;

      console.log(value)
      let endList = this.creatPay(this.data.one[value[0]])
      this.setData({
        two: endList,
        value: value
      })
      this.selectYear = { year_start: this.data.one[value[0]], year_end: endList[value[1]] }

    },
    //确认
    selectCity: function (e) {
      var myEventDetail = { selectYear: this.selectYear }  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('selectYear', myEventDetail, myEventOption)
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
