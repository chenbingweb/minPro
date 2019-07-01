let _interface=require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js";
// import { Index } from "./index.js";
// import { RestaurantDetail } from "./restaurantDetail.js";
// import { ConfirmOrder } from "./confirmOrder.js"
import UserPower from "../libs/getUserPower.js";


class User{
  constructor(){
   
    // this.power = new UserPower();
    // this.isPower()
    this.isSign=false;//默认未注册
    this.token='';//用户id
    this.userInfo=null;
    this._initEvent();
    this.UserToLogin();
    this.time = 10000;
    //用户选择的词库
    this.thesaurus_id='';
    //学习计划id
    this.plan_id='';
    //用户学习情况
    this.studyInfo={};
    // //学习课程情况
    // this.studyRate={}
    this.timmer=0;
    //词根锁定
    this.isLock=true
    this.studyHis={
      index:0,
      history:[]
    }
    //单词列表
    this.wordList=[];
    this.currentIndex=0;
  }
  _initEvent(){
    //登录
    this.login = new UIEvent();
    //获取单词详情
    this.getOneWordEvent=new UIEvent();
    //设置计划
    this.setPlanEvent=new UIEvent()
    //获取计划列表
    this.getPlanListEvent=new UIEvent();
    //获取学习情况
    this.getStudyInfoEvent=new UIEvent();
    //小结状态
    this.studyCompleteWordEvent=new UIEvent();
    //获取小结列表
    this.getOverviewSectionEvent=new UIEvent()
    // this.isLocationPower=new UIEvent();
    //获取排行信息
    this.getRangeEvent=new UIEvent();
    //设置模式
   
    
  }
  //获取用户地理位置是否授权
  isPower(){
    let that=this;
    this.power.resolveEvent({
      auth: 'scope.userLocation',
      succ(res) {//成功
        console.log(res)
        that.isLocationPower.Emit(true)
      },
      fail(err) {//失败
        console.log(err)
        that.isLocationPower.Emit(false)
      }

    })
  }
  //第一次登录
  UserToLogin(callback) {
    wx.showLoading({
      title: '登录中...',
      mask:true
    })
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        wx.hideLoading()
        if (parseInt(res.errcode) == 0) {
          //用户信息
          that.userInfo=res.data;
          that.CanClick=true;
          //用户id
          that.token = res.data.access_token||'';
          //获取选择的词库
          that.thesaurus_id = res.data.thesaurus_id||'';
          //学习计划id
          that.plan_id = res.data.plan_id;
          that.isLock = res.data.is_locked
         // that.studyInfo = res.data.info||{};
          //获取学习进度
         // that.studyRate = res.data.info.studyRate||{};
          //是否注册
          that.isSign = true;
          //触发事件
          that.login.Emit(true);
          that.getStudyInfo()
          //初始化首页
         // Index._getPageInfo();
         // ConfirmOrder.getMarkList()
         callback && callback(that.token)
         // that.getPos()
         // that.UserToLoginTwo()
          that.reLogin()
        }
        else if (parseInt(res.errcode) == 404){
          //触发事件
          that.login.Emit(false);
          wx.removeStorage({
            key: 'indexInfor',
            success: function(res) {},
          })
        }
        else if (parseInt(res.errcode) == 1){
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
          that.reLogin()
        }
        else 
        {
          if (that.token  == '') {
            wx.showToast({
              title: '系统繁忙',
              icon: "none",
              mask: true
            })
          }

        }

      },
      loginFail(err) { //登录失败(必传)
      //  that.UserToLoginTwo()
        if (that.token  == '') {
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })
        }
        console.log(err)
        callback && callback(err)
        that.reLogin()
      }
    })
  }
  reLogin(){
    this.timmer=setTimeout(()=>{
      this.UserToLogin()
      clearTimeout(this.timmer)
    },90*60*1000)
    
  }
  //第一次登录
  UserToLoginTwo(callback) {
    
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        if (parseInt(res.errcode) == 0) {
          that.CanClick = true;
          //用户id
          that.token = res.data.token || '';
          //是否注册
          that.isSign = res.data.mobile == '' ? false : true;
      
          //是否是vip
          that.is_vip = res.data.is_vip;
          //触发事件
          that.login.Emit(that.isSign);
          //初始化首页
        //  Index._getPageInfo();
          //ConfirmOrder.getMarkList()
          callback && callback(that.token)
        }
        // if (parseInt(res.errcode) == 404) {
        //   //触发事件
        //   that.login.Emit(that.isSign);
        // }
        // else if (parseInt(res.errcode) == 1) {
        //   wx.showToast({
        //     title: res.msg,
        //     icon: "none"
        //   })
        // }
        // else {
        //   if (that.token == '') {
        //     wx.showToast({
        //       title: '系统繁忙',
        //       icon: "none",
        //       mask: true
        //     })
        //   }

        // }

      },
      loginFail(err) { //登录失败(必传)
        if (that.token == '') {
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })

        }
        console.log(err)
        callback && callback(err)

      }
    })
  }
  //获取附近店铺列表
  getPos(){


    Tool.getLocation({}).then(res=>{
      wx.hideLoading()
      this.savePos(res)
    //  this.location=res;
      //this.getLocalSucc.Emit(res)
    }).catch(err=>{
    
     // this.getLocalFail.Emit(false)
      wx.showToast({
        title: err.errMsg,
        icon:'none'
      })
      console.log(err)
     
    })
  }
  //获取订单列表
  getRange(show=true,callBack){
    if (show)
    {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
  
    var data = {
      token: this.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.getRange
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

        this.getRangeEvent.Emit(res.data)

        callBack && callBack(res.data)
       
       
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        this.getRangeEvent.Emit(false)
      }
      else {
        this.getRangeEvent.Emit(false)
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getRangeEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //获取下一个单词
  getOneWord(id,callBack){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    var data = {
      token: this.token,
      id
    }

    var ajax = new Ajax({
      data,
      path: _interface.getOneWord
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
       
       
        //this.studyHis.index = this.studyHis.words.length;
       // this.studyHis.words.push(res.data)

        this.getOneWordEvent.Emit(res.data)

        callBack && callBack(res.data)


      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        this.getOneWordEvent.Emit(false)
      }
      else {
        this.getRangeEvent.Emit(false)
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getOneWordEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //4-23获取下一个单词
  getNextWord(id='', callBack) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    var data = {
      token: this.token,
      id
    }

    var ajax = new Ajax({
      data,
      path: _interface.getNextWord
    })
    ajax.then(res => {
      wx.hideLoading()

      if (res.errcode == 0) {


        this.getOneWordEvent.Emit(res.data)
      
        callBack && callBack(res.data)
        // if (res.data.next_word_id) {
          
        //   //隐藏单词列表
        //   this.studyCompleteWordEvent.Emit(false)
        // }
        // else//否侧预览上一小结
        // {
        //   //获取小节
        //   this.getOverviewSection();
        //   //显示当前小结列表
        //   this.studyCompleteWordEvent.Emit(true);
        // }

      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        this.getOneWordEvent.Emit(false)
      }
      else {
        this.getRangeEvent.Emit(false)
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getOneWordEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //预加载
  getNextWordIndex(callBack){
    if (this.wordList.length)
    {
      
      this.getOneWordEvent.Emit(this.wordList[this.currentIndex])
      
      this.currentIndex++;
      callBack && callBack()
    } 
    else
    {
      this.getOneWordEvent.Emit(false)
    }
   
  }
  //获取单词列表 
  getWordList(callBack){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    var data = {
      token: this.token,
    }

    var ajax = new Ajax({
      data,
      path: _interface.getSection
    })
    ajax.then(res => {
      wx.hideLoading()

      if (res.errcode == 0) {
        res.data.words.forEach((item,index)=>{
          if (item.id == res.data.start_word_id)
          {
            this.currentIndex=index;
          }
        })
        this.wordList = res.data.words;
        this.getNextWordIndex(callBack)
        
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
       
      }
      else {
       // this.getRangeEvent.Emit(false)
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
     
    })
    ajax.catch(err => {
    
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //4-23 完成单词
  studyCompleteWordNew(id, callBack) {
    // wx.showLoading({
    //   title: '设置中...',
    //   mask: true
    // })
    var data = {
      token: this.token,
      id: id
    }

    var ajax = new Ajax({
      data,
      path: _interface.studyCompleteWord
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
       callBack && callBack()
        //如果当前小结，还有下一个单词则继续获取下一个单词
        //  if (res.data.next_word_id) {
        //   //更新学习计划
        //   // this.getStudyInfo()
        //   callBack && callBack()
        //   //隐藏单词列表
        //   this.studyCompleteWordEvent.Emit(false)
        // }
        //  else//否侧预览上一小结
        // {
        //   //获取小节
        //  // this.getOverviewSection();
        //   //显示当前小结列表
        //   this.studyCompleteWordEvent.Emit(true);
        // }


      }
      else if (res.errcode == 1) {
        // wx.showToast({
        //   title: res.msg,
        //   icon: "none"
        // })
      //  failBack && failBack()

      }
      else {

        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getOneWordEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //获取时间计划表 
  getPlanList(callBack){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    var data = {
      token: this.token,
      id: this.thesaurus_id
    }

    var ajax = new Ajax({
      data,
      path: _interface.getPlant
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

        this.getPlanListEvent.Emit(res.data)

        callBack && callBack(res.data)


      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        this.getPlanListEvent.Emit(false)
      }
      else {
        this.getPlanListEvent.Emit(false)
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getPlanListEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //获取计划详情
  getStudyInfo(callBack) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    var data = {
      token: this.token
    }

    var ajax = new Ajax({
      data,
      path: _interface.todaySchedule
    })
    ajax.then(res => {
      wx.hideLoading()
      this.studyInfo = {}
      if (res.errcode == 0 || res.errcode==200) {
        this.studyInfo = res.data;
     
        this.getStudyInfoEvent.Emit(res.data)

        callBack && callBack(res.data)


      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        this.getStudyInfoEvent.Emit({})
      }
      else {
        this.getStudyInfoEvent.Emit({})
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getStudyInfoEvent.Emit({})
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //设置选择的词库
  setThesaurus(id, callBack){
    wx.showLoading({
      title: '设置中...',
      mask: true
    })
    var data = {
      token: this.token,
      id
    }

    var ajax = new Ajax({
      data,
      path: _interface.setThesaurus
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        this.plan_id = '';
        //重新获取学习信息
        this.getStudyInfo()
        callBack && callBack(res.data)


      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
       
      }
      else {
        
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getOneWordEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //设置计划
  setPlan(id,callBack){
    wx.showLoading({
      title: '设置中...',
      mask: true
    })
    var data = {
      token: this.token,
      id:id|| this.thesaurus_id
    }

    var ajax = new Ajax({
      data,
      path: _interface.setPlan
    })
    ajax.then(res => {
     // wx.hideLoading()
      if (res.errcode == 0) {
        //重新获取学习信息
        this.plan_id = id;
        this.setPlanEvent.Emit(true)
        callBack && callBack(res.data)


      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {

        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getOneWordEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //完成当前单词study/complete-word
  studyCompleteWord(id,callBack,failBack){
    // wx.showLoading({
    //   title: '设置中...',
    //   mask: true
    // })
    var data = {
      token: this.token,
      id: id 
    }

    var ajax = new Ajax({
      data,
      path: _interface.studyCompleteWord
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        //如果当前小结，还有下一个单词则继续获取下一个单词
        if (res.data.next_word_id)
        {
          //更新学习计划
         // this.getStudyInfo()
          callBack && callBack(res.data)
          //隐藏单词列表
          this.studyCompleteWordEvent.Emit(false)
        }
        else//否侧预览上一小结
        {
          //获取小节
          this.getOverviewSection();
          //显示当前小结列表
          this.studyCompleteWordEvent.Emit(true);
        }
        

      }
      else if (res.errcode == 1) {
        // wx.showToast({
        //   title: res.msg,
        //   icon: "none"
        // })
        failBack && failBack()

      }
      else {

        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getOneWordEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  
  //获取小结列表
  getOverviewSection(id, callBack, path = _interface.overviewSection){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var data = {
      token: this.token,
      id: id
    }

    var ajax = new Ajax({
      data,
      path: path
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

        // this.studyHis.index = this.studyHis.words.length;
        // this.studyHis.words.push(res.data)

        this.getOverviewSectionEvent.Emit(res.data)
        callBack && callBack(res.data)


      }
      else if (res.errcode == 1) {
        //完成复习
        callBack && callBack(res.errcode)
        // wx.showToast({
        //   title: res.msg,
        //   icon: "none"
        // })

      }
      else {

        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      this.getOneWordEvent.Emit(false)
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //完成本小结
  completeSection(id, mode, callBack, path ){
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })
    var data = {
      token: this.token,
      id: id
    }

    var ajax = new Ajax({
      data,
      path: path
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        //如果next_section_id不为空，则继续学习单词
        if (res.data.next_section_id )
        {
          //学习模式
          if (mode == 'study')
          {
            //423
           // this.getOneWord();
          // this.getNextWord()
            
            this.studyCompleteWordEvent.Emit(false)
          }
          else //今日复习
          {

          }
          
         
          callBack && callBack(res.data)
        }
        else //否侧当天单词已经学习完成
        {
          //学习模式
          if (mode == 'study') 
          {
             this.getOverviewSectionEvent.Emit(false);
           // callBack && callBack(res.data)
          } 
          if (mode == 'restudy')   
          {
            callBack && callBack(res.data)
          }
          if(mode=='review')
          {
            callBack && callBack(res.data)
          }
        }
       


      }
      else if (res.errcode == 1) {
        // wx.showToast({
        //   title: res.msg,
        //   icon: "none"
        // })
        

        // wx.navigateTo({
        //   url: '../rangePage/rangePage',
        // })
        console.log("+++++++++数据错误++++++++++")
      }
      else {

        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
    
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //开始复习
  startView(callBack) {
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })
    var data = {
      token: this.token
    }

    var ajax = new Ajax({
      data,
      path: _interface.startView
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
          callBack && callBack(res)
      }
      else if (res.errcode == 1) {
        callBack && callBack(res)
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {

        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
  
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
}
let user=new User();
export { user as User }