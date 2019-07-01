// dati_comm/components/reduce-coin/reduce-coin.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mp:{
      type:Number,
      value:0
    },
    showPDTip:{
      type:String,
      value:null,
      observer:function(n,o){
       
        if(n)
        {

          setTimeout(() => {
            this.setData({
              hidCoin: true
            })
          }, 500)
        }

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidCoin:false
  },
  ready:function(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
