// components/header-tip/header-tip.js
import {User} from "../../model/user.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    objData:{
      type:Object,
      value:null,
      observer: function (newVal, oldVal) {
        if (Object.keys(newVal).length)
        {
          newVal.total_time_long = (newVal.total_time_long / (60 * 60)).toFixed(2)
          newVal.show=true
          this.setData({
            studyInfo:newVal
          })
        }

      }
    }
  },
  created(){
    // User.login.Off(this.loginSuccess);
    // User.login.On(this,this.loginSuccess);
  },
  ready(){
    // if (User.studyInfo.studyTime)
    // {
    //   this.setData({
    //     studyInfo: User.studyInfo
    //   })
    // }
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    studyInfo:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loginSuccess(){
    
      this.setData({
        studyInfo: User.studyInfo
      })
    }
  }
})
