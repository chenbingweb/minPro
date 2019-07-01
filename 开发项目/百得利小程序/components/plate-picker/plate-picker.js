// components/plate-picker/plate-picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //显示地址选择
    showBoxFlag:{
      type: false,
      value: Boolean,
      observer: function (newVal, oldVal) {
        console.log(newVal)
      this.setData({
        showBoxFlag: newVal
      })

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBoxFlag:false,
    pro:[
      {
        id:0,
        name:'京',
        select:false
      },
      {
        id: 1,
        name: '津',
        select: false
      },
      {
        id: 2,
        name: '沪',
        select: false
      },
      {
        id: 3,
        name: '渝',
        select: false
      },
      {
        id: 4,
        name: '冀',
        select: false
      },
      {
        id: 5,
        name: '豫',
        select: false
      },
      {
        id: 6,
        name: '云',
        select: false
      },
      {
        id: 7,
        name: '辽',
        select: false
      },
      {
        id: 8,
        name: '黑',
        select: false
      },
      {
        id: 9,
        name: '湘',
        select: false
      },
      {
        id: 10,
        name: '皖',
        select: false
      },
      {
        id: 11,
        name: '鲁',
        select: false
      },
      {
        id: 12,
        name: '新',
        select: false
      },
      {
        id: 13,
        name: '苏',
        select: false
      },
      {
        id: 14,
        name: '浙',
        select: false
      },
      {
        id: 15,
        name: '赣',
        select: false
      },
      {
        id: 16,
        name: '鄂',
        select: false
      },
      {
        id: 17,
        name: '桂',
        select: false
      },
      {
        id: 18,
        name: '甘',
        select: false
      },
      {
        id: 19,
        name: '晋',
        select: false
      },
      {
        id: 20,
        name: '蒙',
        select: false
      },
      {
        id: 21,
        name: '陕',
        select: false
      },
      {
        id: 22,
        name: '吉',
        select: false
      },
      {
        id: 23,
        name: '闽',
        select: false
      },
      {
        id: 24,
        name: '贵',
        select: false
      },
      {
        id: 25,
        name: '粤',
        select: false
      },
      {
        id: 26,
        name: '青',
        select: false
      },
      {
        id: 27,
        name: '藏',
        select: false
      },
      {
        id: 28,
        name: '川',
        select: false
      },
      {
        id: 29,
        name: '宁',
        select: false
      },
      {
        id: 30,
        name: '琼',
        select: false
      },
      {
        id: 31,
        name: '使',
        select: false
      },
      {
        id: 32,
        name: '领',
        select: false
      }
    ]
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //关闭
    cancelBox:function(){
      this.setData({
        cancelBox:false
      })
    },
    selectBtn:function({currentTarget}){
      let { id, plate } = currentTarget.dataset;
      
      let pro = this.data.pro
      pro.forEach((item)=>{
        if(item.id==id)
        {
          //item.select=true
        }
        else
        {
         // item.select = false
        }
      })
      //渲染页面
      this.setData({
        pro
      })
      this.setData({
        showBoxFlag:false
      })
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('selectOk', {plate}, myEventOption)
  
    }
  }
})
