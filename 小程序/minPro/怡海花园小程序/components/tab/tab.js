// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnSelect:{
      type:String,
      value:'btn_select'
    },
    midBorder:{
      type:Boolean,
      value:false
    },
    isBorder:{
      type:Boolean,
      value:true
    },
    btWidth:{
      type:String,
      value:'33.333%',
    },
    tabList:{
      type:Array,
      value:[],
      observer:function(newVal,oldVal){
        console.log(newVal)
        if(newVal)
        {
          newVal.forEach((item,index)=>{
            if(index==0)
            {
              item.selected=true
            }
            else
            {
              item.selected = false
            }
          })
          this.setData({
            tabList: newVal
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready:function(){

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSelectTab:function({currentTarget}){
      let { tid } = currentTarget.dataset;
      let list = this.properties.tabList;
      let tidType=""
      list.forEach(item=>{
        if (item.id == tid)
        {
          item.selected=true;
          tidType=item.id
        }
        else
        {
          item.selected = false
        }
      })
      this.setData({
        tabList: list
      })
      var myEventDetail = { tidType: tidType}  // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      this.triggerEvent('selectTab', myEventDetail, myEventOption)
    }
  }
})
