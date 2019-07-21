// components/lease-success/lease-success.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  created(){
    wx.setNavigationBarTitle({
      title: '租赁成功',
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
