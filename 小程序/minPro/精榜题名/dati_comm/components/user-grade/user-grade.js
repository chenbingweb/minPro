// dati_comm/components/user-leve/user-leve.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //星级
    starnum:{
      type:Number,
      value:1,
      observer:function(n,o){
      //  if(n)
        //{
          this.setData({
            star:new Array(n)
          })
       // }
      }
    },
    //等级图片
    gradeImg:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    star:[1]
  },
  ready(){

  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
