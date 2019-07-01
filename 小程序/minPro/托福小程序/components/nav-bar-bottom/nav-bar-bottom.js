// components/nav-bar-bottom/nav-bar-bottom.js
import {User} from "../../model/user.js";
import Tool from "../../libs/Tool.js"
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    default:{
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {
      

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
     
    ],
    islongP:false
  },
  created(){
    User.getStudyInfoEvent.Off(this.getStudyInfoEvent);
    User.getStudyInfoEvent.On(this,this.getStudyInfoEvent);
   
  },
  pageLifetimes:{
    show:()=>{
      if(User.token!='')
      {
        User.getStudyInfo() 
      }
      
    }
  },
  ready(){
    this.setData({
      islongP: Tool.isLongP()
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //学习状态
    getStudyInfoEvent(res){
      
      let Btn_1 = [{
        url: '../rangePage/rangePage',
        id: 0,
        name: '机器人开发中'
      },
      {
        url: '../words/words',
        id: 1,
        name: '继续复习旧词'
      },
      {
        url: '../newWord/newWord',
        id: 2,
        name: '浏览生词本'
      }]
      let Btn_2 = [{
        url: '../rangePage/rangePage',
        id: 0,
        name: '备考机器人'
        },
        {
          url: '../words/words',
          id: 1,
          name: '今日新词复习'
        },
        {
          url: '../newWord/newWord',
          id: 2,
          name: '浏览生词本'
        }
      ]
      let Btn_3 = [{
        url: '../rangePage/rangePage',
        id: 0,
        name: '机器人开发中'
      },
      {
        url: '../words/words',
        id: 1,
        name: '开始背单词'
      },
      {
        url: '../newWord/newWord',
        id: 2,
        name: '浏览生词本'
      }]
     
      if (res.mode =='review')
      {
        // this.setData({
        //   ['list[1]']: {
        //     url: '../words/words?src=reviewold',
        //     id: 1,
        //     name: '继续复习旧词'
        //   }
        // })
        this.setData({
          list: Btn_1
        })
      }
      else if(res.mode=='restudy')
      {
        // this.setData({
        //   ['list[1]']: {
        //     url: '../words/words',
        //     id: 1,
        //     name: '今日新词复习'
        //   }
        // })
        this.setData({
          list: Btn_2
        })
      }
      else
      {
        this.setData({
          list: Btn_3
        })
      }
 
    },
    onNav({currentTarget:{dataset:{nid}}}){
      
      if(nid==2)
      {
        wx.navigateTo({
          url: this.data.list[nid].url,
        })
        return
      }
      if (this.data.list[nid].url == '' || !User.studyInfo.mode)
      {
        return 
      }
      
      //是否开始复习
      if (!User.studyInfo.last_review_section_id && User.studyInfo.mode != 'study' && User.studyInfo.mode != 'restudy' && nid==1)
      {
        User.startView((res) => {
          if(res.errcode==1)
          {
            return
          }
          else
          {
            wx.navigateTo({
              url: this.data.list[nid].url,
            })
          }
        })
      }
      else
      {
        wx.navigateTo({
          url: this.data.list[nid].url,
        })
      }
      
    },
    setNav(nav){
      this.setData({
        list:nav
      })
    }
  }
})
