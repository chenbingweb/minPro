// components/review-tip/review-tip.js
import { User } from "../../model/user.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ReviewFn: {
      type: Function,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showToFX:false
  },
  created(){
   
  },
  ready:function(){
    User.getOverviewSectionEvent.Off(this.getOverviewSectionEvent);
    User.getOverviewSectionEvent.On(this, this.getOverviewSectionEvent);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getOverviewSectionEvent(res){
      if (!res.id) {
        this.setData({
          showToFX: true
        })
      }
     
    },
    onStartReview() {
      this.setData({
        showToFX: false
      })
      this.properties.ReviewFn()
    }
  }
})
