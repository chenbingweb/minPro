// components/box-tab/box-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    select:[
      {
        name:'删除',
        id:1
      },
      {
        name: '拉黑',
        id: 2
      },
      {
        name: '置顶',
        id:3
      }
    ],
    showTab:false,
    tname:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showTab:function(){
      console.log(0)
      this.setData({
        showTab: true
      })
    },
    onSelectBtn:function({currentTarget}){
      let {id}=currentTarget.dataset;
      let list = this.data.select;
      list.forEach((item,index)=>{
        if (item.id==id)
        {
          this.setData({
            tname: item.name
          })
        }
      })
      console.log(id)
      this.setData({
        showTab: false
      })
    }
  }
})
