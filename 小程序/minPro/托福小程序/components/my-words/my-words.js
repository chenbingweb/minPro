// components/my-words/my-words.js
import { User } from "../../model/user.js"
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
    height:70,
    studyRate:{}
  },
  created(){
   // User.login.Off(this.loginSuccess);
   // User.login.On(this, this.loginSuccess);
    User.getStudyInfoEvent.Off(this.getStudyInfoEvent)
    User.getStudyInfoEvent.On(this, this.getStudyInfoEvent)
  },
  ready:function(){
    this.setData({
      studyRate: User.studyRate
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loginSuccess(){
      this.setData({
        studyRate: User.studyRate
      }) 
    },
    getStudyInfoEvent(res){
      // if (res == false) return;
      // if (res == null) {
      //   this.setData({
      //     studyRate: {}
      //   })
      // }
      // else {
       
      // }
      this.setData({
        studyRate: res
      })
      User.studyRate = res
    },

    onToMyRang(){
      wx.navigateTo({
        url: '../rangePage/rangePage',
      })
    },
    onToSetPlan(){
      wx.navigateTo({
        url: `../setPlan/setPlan`,
      })
    
     
    },
    onNavTo(){
      wx.navigateTo({
        url: `../words/words`,
      })
    }

  }
})
