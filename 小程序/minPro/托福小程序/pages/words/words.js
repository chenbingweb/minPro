// pages/words/words.js
import {User} from "../../model/user.js"
let _interface=require("../../utils/interface.js")
function unique4(arr) {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        ++i;
      }
    }
    hash.push(arr[i]);
  }
  return hash;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFinishXJ:false,
    studyProgress:{},
    wordDetail: {},
    wordObj:{},
    ReviewFn:null,
    studyStatus: 'study', //学习中
    sectionFlag:false,
    //默认显示词义
    isMeanShow:true,
    panelDetail:{}
  },
  
  //设置历史记录
  setHis(){
    
    this.his.data.push(this.data);
    let his=[]
    this.his.data.forEach(item=>{
      his.push(JSON.stringify(item))
    })
    let arr = unique4(his);
    let newArr=[]
    arr.forEach(item => {
      newArr.push(JSON.parse(item))
    })
    
    this.his.data = newArr;
    this.his.index = newArr.length-1
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //历史栈
    this.his={
      index:0,
      data:[]
    }

    this.wordPanel = this.selectComponent('#wordPanel');
    this.id = 0;
    this.setData({
      studyStatus: User.studyInfo.mode
    })
    User.getOneWordEvent.Clear()
    User.studyCompleteWordEvent.Clear()
    User.getOverviewSectionEvent.Clear()
    this.bindEvent()
    //开始学习单词
    if (this.data.studyStatus =='study')
    {
     // User.getOneWord();
     
      /**
      * //423
      //423---
      User.getNextWord('', () => {
        //获取学习情况
        // User.getStudyInfo()
        if (this.data.wordObj.next_word_id) {
          this.showModel = false
          //end
        }
        else//否侧预览上一小结
        {

          //获取小节
          User.getOverviewSection();
          this.showModel = true

        }
      })
      */
    
      User.getWordList(()=>{

        if (this.data.wordObj.next_word_id) {
          //获取小节
          User.getOverviewSection('',()=>{
            this.showModel = false;
           
          });
          
          //end
        }
        else//否侧预览上一小结
        {

          
          this.showModel = true

        }
      }) 
    }
    //复习新学单词
    else if (this.data.studyStatus == 'restudy')
    {
      User.getOverviewSection()
      this.setData({
        isFinishXJ: true,
      })
    }
    //复习旧单词
    else if (this.data.studyStatus =='review')
    {
      this.setData({
        isFinishXJ: true
      })
      this.reviewAll=true;
      //如果没有开始旧词复习，则调用开始复习接口
      if (!User.studyInfo.last_review_section_id)
      {
        User.startView(()=>{
          User.getOverviewSection('', ()=>{
            
          }, _interface.viewOldWords)
        })
      }
      else 
      {
        User.getOverviewSection('', () => {
         
        }, _interface.viewOldWords)
      }
    
      
    }
   
   
    
  },
  bindEvent(){
   
    //获取单词信息
    User.getOneWordEvent.Off(this.getOneWordEvent)
    User.getOneWordEvent.On(this, this.getOneWordEvent);
    //完成单词学习
    User.studyCompleteWordEvent.Off(this.studyCompleteWordEvent)
    User.studyCompleteWordEvent.On(this, this.studyCompleteWordEvent);
    //小结预览
    User.getOverviewSectionEvent.Off(this.getOverviewSectionEvent);
    User.getOverviewSectionEvent.On(this, this.getOverviewSectionEvent);
    //studyCompleteWordEvent
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      ReviewFn:this.ReviewFn
    })
  },
  
  //获取一个单词
  getOneWordEvent(res){
    console.log(res)

    if(!res) return 
    for(let key in res.word){
      if(res.word[key]==null)
      {
        res.word[key]=''
      }
    }
    console.log(res.word)
    let wordDetailObj = this.selectComponent('#wordDetail');
    if (wordDetailObj)
    {
      wordDetailObj.setData({
        isShow: false,
        isCollect: false,
      })
    }
    this.setData({
      studyProgress: res,
      wordDetail: res.word,
      wordObj: res
    })
   
    //设置历史记录
    this.setHis()
  
  },
  //完成小节
  studyCompleteWordEvent(res){
    this.setData({
      isFinishXJ: res
    })
    this.setHis()
  },
  //预览小节
  getOverviewSectionEvent(res){
    //复习新词，且没有下一单词，显示完成 复习按钮
    if (res.mode == 'restudy' && !res.next_section_id)
    {
      this.setData({
        sectionFlag: true
      })
    }
    //如果为false,设置最后一次学习进度
    if(res==false)
    {
      let studyProgress = this.data.studyProgress;
      this.setData({

        studyProgress: studyProgress,

      })
    }
    else
    {
      //设置学习进度
      this.setData({

        studyProgress: res,
      })
    }
    this.setHis()
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.clicktag=0;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    User.getOneWordEvent.Off(this.getOneWordEvent)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {

  },*/
  onBackIndex(){
    wx.navigateBack({
      delta:1
    })
  },
  onPreV(){
    this.his.index-=1;
    if (this.his.index<0)
    {
      this.his.index=0
      wx.showToast({
        title: '没有单词了',
        icon:'none'
      })
      return
    }
    let obj = this.his.data[this.his.index]

    this.setData({
      ...obj
    })


    
  },
  //下一个词 completeSection
  onNextWord_({timeStamp}){
    
    // if (this.his.index!=this.his.data.length-1)
    // {
    //   this.his.index += 1;
    //   let obj = this.his.data[this.his.index]

    //   this.setData({
    //     ...obj
    //   })
    //   return
    // }
    
    if (this.clicktag) {
      wx.showToast({
        title: '您点击太快，歇会吧~',
        icon:'none',
        mask:true
      })
      return
    }
    this.clicktag=1
   
      if (this.showModel)
      {
        //显示当前小结列表
        User.studyCompleteWordEvent.Emit(true);
        this.showModel = false
      }
      else
      {
        //隐藏单词列表
        User.studyCompleteWordEvent.Emit(false)
        User.getNextWord(this.data.wordDetail.id, () => {
          //获取学习情况
          // User.getStudyInfo()
          if (this.data.wordObj.next_word_id) {
            this.showModel = false
            //end
          }
          else//否侧预览上一小结
          {

            //获取小节
            User.getOverviewSection();
            this.showModel = true

          }
        })
      }
      
   

    //423
    // User.getNextWord(this.data.wordDetail.id, () => {
    //   //获取学习情况
    //   // User.getStudyInfo()
    // })

   
    //start
    //完成下一个单词
    // User.studyCompleteWord(this.data.wordDetail.id,()=>{
    //   //获取单词信息
    //   User.getOneWord(this.id);
     

    // },()=>{

    //   // User.studyHis.index += 1
    //   // User.getOneWordEvent.Emit(User.studyHis.words[(User.studyHis.index)])
      
    // })
    //end

    /*
     his = {
        index: 0,
        hisObj: {}
      }
    */
    setTimeout(()=> { 
      this.clicktag = 0 
      
    }, 500);
  },
  onNextWord(){
    if (this.clicktag) {
      wx.showToast({
        title: '请别着急~',
        icon: 'none',
        mask: true
      })
      return
    }
    this.clicktag = 1;
    User.studyCompleteWordNew(this.data.wordDetail.id, () => {

      //this.clicktag = 0
    
  
    })
    if (this.showModel) {

      this.showModel = false
      //获取小节
      User.getOverviewSection('',()=>{

        //显示当前小结列表
        User.studyCompleteWordEvent.Emit(true);
        
       
      });
     
    }
    else {
      //隐藏单词列表
      User.studyCompleteWordEvent.Emit(false)
      User.getNextWordIndex()
      if (this.data.wordObj.next_word_id) {
        this.showModel = false
        //end
      }
      else//否侧预览上一小结
      {
      
       
        //User.getOverviewSectionEvent.Emit(User.wordList)
        this.showModel = true;
        User.currentIndex = 0;
     
      }

    }
   

    

    setTimeout(() => {
      this.clicktag = 0

    }, 330);
  },
  //完成本节/下一节切边
  onCompleteSection({currentTarget:{dataset:{flag}}}){
    if (this.clicktag_1) {
      return
    }
   
  
    this.clicktag_1 = 1
      //单词列表
      let wordList = this.selectComponent('#wordList');
      if (wordList)
      {
        let { id, mode} = wordList.data.sectionDetail;
       
        let path = _interface.completeSection;
        //复习
        let allViewPath = _interface.overviewSection //overviewSection
        if (this.data.studyStatus == 'review')
        {
          path = _interface.finishOldWords;
          allViewPath = _interface.viewOldWords //overviewSection
        }
        //完成小结接口
        User.completeSection(id, mode, (result)=>{
          if (mode == 'study') {
           
            User.getWordList();
            // this.setData({
            //   wordDetail: {},
            // })
          }
          User.getStudyInfo(() => { })
            //完成复习跳转排行 sectionFlag 为true
            if (flag) {
              
             
              wx.navigateTo({
                url: '../rangePage/rangePage',
              })
              return
            }
            let nsid = result.next_section_id;

            console.log(nsid)
            if (this.data.studyStatus == 'restudy' || this.reviewAll ) 
            {
              //预览复习列表
              User.getOverviewSection('', (res) => {
                if (res == 1) {
                  this.setData({
                    sectionFlag: true
                  })
                  if (this.data.studyStatus == 'review')
                  {
                    wx.showModal({
                      title: '提示',
                      content: '已完成旧词的复习',
                      showCancel: false,
                      success: res => {
                        wx.navigateTo({
                          url: '../rangePage/rangePage',
                        })
                      }

                    })
                  }
                
                  return
                }
                let { next_section_id } = res;
                //当天复习完成
                if (!next_section_id && !this.reviewAll ) {
                  this.setData({
                    sectionFlag: true
                  })
                
                }
              }, allViewPath)
              
            }
            else if (this.data.sectionFlag == true)
            {
              wx.showModal({
                title: '提示',
                content: '已完成新词的复习',
                showCancel: false,
                success: res => {
                  wx.navigateTo({
                    url: '../rangePage/rangePage',
                  })
                }

              })
              // wx.navigateTo({
              //   url: '../rangePage/rangePage',
              // })
            }
          
          
        }, path)
      
        
      }
    setTimeout(() => {
      this.clicktag_1 = 0

    }, 300);

    
  },
  //小结预览
  onViewXJ(){
    this.setData({
      isFinishXJ:true
    })
    //获取小节
    User.getOverviewSection()
  },
  //开始复习下一小节
  ReviewFn(){
    User.getOverviewSection()
    this.setData({
      studyStatus: 'restudy'
    })
  },
  //显示词义
  onMeanShow({detail:{value}}){
    
    this.setData({
      isMeanShow:value
    })
  },
  onTS({ changedTouches, timeStamp}){
    if (this.data.isFinishXJ) return
    let { pageX, pageY } = changedTouches[0];
    this.x = pageX;
    this.y = pageY;
    this.t = timeStamp
    
  },
  onTM({ changedTouches, timeStamp}) { 
    if (this.data.isFinishXJ) return
    let { pageX, pageY } = changedTouches[0];
   this.mper= (this.x - pageX) / (timeStamp - this.t) 
    console.log(this.mper,timeStamp, this.t, timeStamp - this.t, this.x - pageX)
  },
  onTE(e) { 
    if (this.data.isFinishXJ) return
    if (this.mper>1)
    {
      this.onNextWord()
      this.x = 0;
      this.y = 0;
      this.t = 0;
      this.mper=0
    }
  },
  onPanelDetail({ detail }) {
    this.wordPanel.openShow()
    if (detail.audio_url && detail.audio_url.indexOf('http') < 0) {
      detail.audio_url = getApp().globalData.imgUrl + detail.audio_url
    }
    console.log(detail.audio_url)
    for(let key in detail){
      if(!detail[key])
      {
        detail[key]=''
      }
    }
    this.setData({
      panelDetail: detail
    })
  }
})