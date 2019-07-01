Component({
  // 外部样式
  externalClasses: [],
  /**
   * 组件的属性列表
   */
  properties: {
    width: {//组件宽度
      type: Number,
      value:750,//默认值
      observer: function (newVal, oldVal) {//属性值发生变化
        this.setData({
          width: newVal
        })
      }
    },
    height: {//组件高度
      type: Number,
      value: 530,
      observer: function (newVal, oldVal) {
        this.setData({
          height: newVal
        })
      }
    },
    imgsData: {//组件宽度
      type: Array,
      value: [],//默认值
      observer: function (newVal, oldVal) {//属性值发生变化
        if (Array.isArray(newVal) && newVal.length == 0) {
          return
        }
        this.setData({
          imgsData: newVal,
          show: true
        })

      }
    },
    mode: {
      type: String,
      value: 'scaleToFill',
      observer: function (newVal, oldVal) {
        this.setData({
          mode: newVal
        })
      }
    },
    baseSet: {//swiper组件设置
      type: Object,
      value: {
        indicatorDots: false,//是否显示面板指示点
        indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
        indicatorActiveColor: '#000000',//当前选中的指示点颜色
        autoplay: false,//是否自动切换
        interval: 5000,//自动切换时间间隔
        duration: 1000,//滑动动画时长
        circular: false,//是否采用衔接滑动
        vertical: false,//滑动方向是否为纵向
        current:0
      },
      observer: function (newVal, oldVal) {
        let baseSet = {};
        for (let key in newVal) {
          baseSet[key] = newVal[key]
        }

        baseSet = Object.assign(oldVal, baseSet)
        console.log(baseSet)
        this.setData(baseSet)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    imgsData: [],
    indicatorDots: false,//是否显示面板指示点
    indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
    indicatorActiveColor: '#000000',//当前选中的指示点颜色
    autoplay: false,//是否自动切换
    interval: 5000,//自动切换时间间隔
    duration: 1000,//滑动动画时长
    circular: false,//是否采用衔接滑动
    vertical: false,//滑动方向是否为纵向
    mode: "scaleToFill",
    imgUrl: getApp().globalData.imgUrl,
    current: 0,
  },
  created: function () {
    // 获取当前课本数量
    
    console.log(this)
  },
  ready: function () {
    //显示轮播图
    if (Array.isArray(this.data.imgsData) && this.data.imgsData.length) {
      this.setData({ show: true })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**切换swiper组件
     *  bubbles	Boolean	否	false	事件是否冒泡
          composed	Boolean	否	false	事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
          capturePhase	Boolean	否	false	事件是否拥有捕获阶段
     * 
     */
    // 轮播图发生改变
    swiperChange: function (e) {
      var myEventDetail = e // detail对象，提供给事件监听函数
      let { current, source} = e.detail;
      this.setData({
        current
      })
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      myEventDetail = Object.assign(myEventDetail, { current, source})
      this.triggerEvent('changeEvent', myEventDetail, myEventOption)
    },
    //向左
    leftArrow:function(e){
      var myEventDetail = e ;
      let current = this.data.current;
      current-=1
      if (current<0)
      {
        current=0
        return 
      }
      this.setData({
        current
      })
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      myEventDetail = Object.assign(myEventDetail, { current })
      this.triggerEvent('leftArrow', myEventDetail, myEventOption)
    },
    //向右
    rightArrow:function(e){
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      var myEventDetail = e;
      let current = this.data.current;
      current += 1;
      if (current > this.data.imgsData.length-1) {
        current = this.data.imgsData.length;
         this.triggerEvent('rightArrow', {end:true}, myEventOption)
        return
      }
      this.setData({
        current
      })
    
      myEventDetail = Object.assign(myEventDetail, { current, end: false})
      this.triggerEvent('rightArrow', myEventDetail, myEventOption)
    },
    // 跳转
    navToDetail: function ({ currentTarget }) {
      console.log(currentTarget)
      var myEventDetail = currentTarget // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('toDetail', myEventDetail, myEventOption)
    },
    //登录
    login: function ({ currentTarget }) {
      var myEventDetail = currentTarget // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('toDlogin', myEventDetail, myEventOption)
    }
  }
})