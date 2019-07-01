// components/city-piker/city-piker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
    shows: {
      type: Boolean,
      value: false,
      observer: function (newval, old) {
        this.setData({
          show: true
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    hour:[],
    minit:[],
    show: false
  },
  create: function () {
    this.stop = true
  },
  ready: function () {
    let hour=[]
    for(let i=0;i<24;i++){
      if(i<10)
      {
        i='0'+i
      }
      hour.push(i)
    }
    let minit = []
    for (let k = 0; k < 60; k++) {
      if (k < 10) {
        k = '0' + k
      }
      minit.push(k)
    }
    this.setData({
      hour,
      minit
    })
    this.myEventDetail = {
      week:'星期日' ,
      hour:'00',
      minit:'00',
      str: '星期日 - 00 - 00'
    } 

  },
  /**
   * 组件的方法列表
   */
  methods: {
 
    //pikerchange事件
    bindChange: function (e) {
      let value = e.detail.value;
      this.stop=false
      console.log(value)
      this.myEventDetail={
        week:this.data.week[value[0]],
        hour: this.data.hour[value[1]],
        minit: this.data.minit[value[2]],
        str: `${this.data.week[value[0]]} - ${this.data.hour[value[1]]} - ${this.data.minit[value[2]]}`
      }


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
    //确认
    selectCity: function (e) {
      


      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      
      this.triggerEvent('citySelect', this.myEventDetail, myEventOption)
      //关闭piker
      this.setData({
        shows: false
      })
    }

  }
})
