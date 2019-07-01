let _interface=require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js";
import UserPower from "../libs/getUserPower.js";
import { Location } from "../libs/map/map.js";

class User{
  constructor(){
    this.userDetail={};
    this.userInfo={};
    this.Map=Location;
    this.power = new UserPower();
    this.isSign=false;//默认未注册
    this.token='';//用户id
    this.markers=[];//当前的marker
    this.includsPoints = [];//显示在可视区域内的坐标点列表
    this.start={
      address: '',
      sendMobile: ''
    }
    this.end={
      address: '',
      receiveMobile: ''
    };
    this.allowArea=[]
    this._initEvent();
   
    this.getAllowArea()
    this.location={};
    this.time =30*60*1000;// 60 * 1000 * 1000;
    this.distance=0;
    this.inintPrice=0;//不打折价格
    this.coupon_id='';//优惠券id
  }
 
  _initEvent(){
    //登录
    this.login = new UIEvent();
    this.getLocalSucc=new UIEvent();
    this.getLocalFail=new UIEvent();
    this.isLocationPower=new UIEvent();
    this.setStart=new UIEvent();
    this.setEnd = new UIEvent();
    this.isFillInfo=new UIEvent();//添加寄送信息事件
  }
  //获取用户地理位置是否授权
  isPower(){
    let that=this;
    this.power.resolveEvent({
      auth: 'scope.userLocation',
      succ(res) {//成功
        console.log(res)
        that.isLocationPower.Emit(true)
        that.getNearPost();
        //that.InitUserInfo()
      },
      fail(err) {//失败
        console.log(err)
        that.isLocationPower.Emit(false)
      }

    })
  }
  //第一次登录
  UserToLogin(callback) {
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        wx.hideLoading()
        if (parseInt(res.errcode) == 0) {
          wx.setStorage({
            key: 'loginInfo',
            data: res,
          })
        
          that.CanClick=true;
          //用户id
          that.token = res.data.token||'';
          //是否注册
          that.isSign = res.data.mobile==''?false:true;
          that.userInfo = res.data.userInfo;
          callback && callback(that.token)
          that.login.Emit(that.isSign);
      //    that.UserToLoginTwo()
        }
        if (parseInt(res.errcode) == 404){
          //触发事件
          that.login.Emit(that.isSign);
          wx.removeStorageSync('loginInfo')
        }
        else if (parseInt(res.errcode) == 1){
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
          wx.removeStorageSync('loginInfo')
        }
        else 
        {
          
          if (that.token  == '') {
            wx.removeStorageSync('loginInfo')
            wx.showToast({
              title: '系统繁忙',
              icon: "none",
              mask: true
            })
          }

        }

      },
      loginFail(err) { //登录失败(必传)
        that.UserToLoginTwo()
        if (that.token  == '') {
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
  //第一次登录
  InitUserInfo(callback) {
   
    let that=this;
    wx.getStorage({
      key: 'loginInfo',
      success:result=>{
        if (result.data)
        {
        
          let res=result.data;
          that.CanClick = true;
          //用户id
          that.token = res.data.token || '';
          //是否注册
          that.isSign = res.data.mobile == '' ? false : true;
          that.userInfo = res.data.userInfo;
          callback && callback(that.token)
          that.login.Emit(that.isSign);
        }
      },
    })

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
          //点餐店铺
          that.restaurant_id = res.data.restaurant_id || "";
          //手机号码
          that.mobile = res.data.mobile || '';
          //生日
          that.birthday = res.data.birthday || '';
          //金额
          that.amount = res.data.amount || 0;
          if (that.amount) {
            that.amountEvent.Emit()
          }
          //是否是vip
          that.is_vip = res.data.is_vip;
          //触发事件
          that.login.Emit(that.isSign);
          //初始化首页
        //  Index._getPageInfo();
          //ConfirmOrder.getMarkList()
          callback && callback(that.token)
          setTimeout(() => {
            that.UserToLoginTwo()
            console.log(0)
          }, that.time)
        }
   

      },
      loginFail(err) { //登录失败(必传)
        if (that.token == '') {
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })

        }
        setTimeout(() => {
          that.UserToLoginTwo()
          console.log(0)
        }, that.time)
        console.log(err)
        callback && callback(err)

      }
    })
  }
  //定位
  getNearPost(){
    wx.showNavigationBarLoading()
    
    Tool.getLocation({}).then(res=>{
      wx.hideLoading()
      this.location=res;
      this.Map.init('map')
      wx.hideNavigationBarLoading()
     // this.isPower()
     
      this.getLocalSucc.Emit(res)
     
    }).catch(err=>{
      wx.hideNavigationBarLoading()
        console.log(err)
      wx.showModal({
        title: '提示',
        content: '获取地理位置失败，暂时无法为您提供服务，请尝试重新打开"融宠宠物"小程序',
        showCancel:false
      })
      this.isPower()
     // this.getLocalFail.Emit(false)
      console.log(err)
     
    })
  }
  //添加附加配送员信息
  getNearPostPos(data,callBack){
    // wx.showLoading({
    //   title: '添加中...',
    //   mask:true
    // })
    let that=this;
   
    this.Map.getCoder(data).then(res => {
      if (res.status == 0) {
        let { ad_info: { adcode } } = res.result;
        console.log(adcode)
        var sendData = {
          ...data,
          adcode
        }
       
        var ajax = new Ajax({
          data:sendData,
          path: _interface.getNearPost
        })
        ajax.then(res => {
          wx.hideLoading()
          if(res.errcode==0)
          {
            let pos=[];
            let that=this;
            wx.getImageInfo({
              src: '../../images/ps.png',
              success({ width, height }) {
                res.data.forEach((item, index) => {
                  let { latitude, longitude } = item;
                  pos.push(that.createMarker(latitude, longitude, index, width*0.7, height*0.7, '../../images/ps.png'));
                })
                that.includsPoints = res.data;
                that.markers = pos;
                that.UserToLogin();
                callBack(pos)
              }
            })
          
          
          } else if (parseInt(res.errcode) == 1) {
            wx.showToast({
              title: res.msg||'您的位置不在服务范围',
              icon: "none"
            })
            callBack(false)
          }
          else {
            wx.showToast({
              title: '系统繁忙',
              icon: "none",
              mask: true
            })
            callBack(false)

          }

          console.log(res)
        })
        ajax.catch(err => {
          callBack()
          wx.showToast({
            title: '系统繁忙',
            icon: "none",
            mask: true
          })
          console.log(err)
        })
      }
    }).catch(err => {

    })
  }
  //创建marker
  createMarker(latitude, longitude, id, width, height, iconPath) {
   
    return {
      iconPath:iconPath,
      id: id,
      latitude: latitude,
      longitude: longitude,
      width:width,
      height:height,
    }

  }
  //设置发货地址信息
  setStartVal(value) {
    let that=this;
    //if(!value) return
    this.start = Object.assign(this.start, value);
    this.selectPos('send','../../images/start.png', this.start.latitude, this.start.longitude, res=>{
      let arr = [{ latitude: that.start.latitude, longitude: that.start.longitude}]
      if (that.end.latitude){
        arr.push({ latitude: that.end.latitude, longitude: that.end.longitude })
      }
      that.Map.moveInclude(arr)

      this.setStart.Emit(this.start,res);
      this.isFillInfoFlag();
    })
    
   
    //console.log(this.start)
  }
  
  //设置发货地址信息
  setEndVal(value) {
    console.log(value)
    //if(!value) return
    this.end = Object.assign(this.end, value);
    this.selectPos('receive', '../../images/end.png', this.end.latitude, this.end.longitude, res => {
      let arr = [{ latitude: this.end.latitude, longitude: this.end.longitude }]
      if (this.start.latitude) {
        arr.push({ latitude: this.start.latitude, longitude: this.start.longitude })
      }
      //改变视图
      this.Map.moveInclude(arr);
      this.setEnd.Emit(this.end,res);
      this.isFillInfoFlag();
    })

   
    //console.log(this.start)
  }
  //判断是否已经完成寄送信息填写
  isFillInfoFlag() {
    if (this.start.latitude && this.end.latitude)
    {
      wx.showLoading({
        title: '计算中...',
      })
      this.getSendPrice((res,price)=>{
        wx.hideLoading()
        this.inintPrice = price.price;
        this.isFillInfo.Emit(true, res, parseFloat(price.price).toFixed(2));
      })
     
     
    }
    else
    {
      this.isFillInfo.Emit(false,[])
    }
    
  }
  //获取配送价格
  getSendPrice(callBack){
    let { latitude: lat_1, longitude:long_1}=this.start;
    let { latitude: lat_2, longitude: long_2 }=this.end;
    let startPos = [lat_1, long_1] + '';
    let endPos = [lat_2, long_2] + '';
    this.Map.driving(startPos, endPos).then(res => {
      let { distance, polyline}=res;
      this.distance=distance;
      let data={
        token:this.token,
        distance
      }

      var ajax = new Ajax({
        data,
        path: _interface.getPrice
      })
      ajax.then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          
          callBack(polyline,res.data)

        } else if (parseInt(res.errcode) == 1) {
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
         
        }
        else {
          wx.showToast({
            title: '系统繁忙',
            icon: "none",
            mask: true
          })
          

        }

        console.log(res)
      })
      ajax.catch(err => {
      
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })
        console.log(err)
      })

       
        }).catch(err => {
            wx.showToast({
              title: err,
              icon:'none'
            })
        })
  }
  //设置当前选择的位置
  selectPos(ty,img,latitude, longitude,callBack){

    let that=this;
    let len = that.markers.length;
    wx.getImageInfo({
      src: img,
      success({ width, height }) {
        for (let i = 0; i < that.markers.length;i++)
        {
          if (that.markers[i].ty==ty)
          {
            len=that.markers.splice(i,1)[0].id;
            break;
          }
        }
      
        let markerObj = that.createMarker(latitude, longitude, len, width, height, img);
        markerObj.ty = ty;
        that.markers.push(markerObj);
        callBack(that.markers);
        console.log(that.markers)
      }
    })
  }
  //注册
  register(data, callBack, path = _interface.signByWX){
    wx.showLoading({
      title: '注册中...',
      mask:true
    })
    let that=this;
    wx.login({
      success: res =>{
        let sendData = {
           ...res
        }
        sendData = Object.assign(sendData, data);
        let ajax = new Ajax({
          data: sendData,
          path: path
        })
        ajax.then(res => {
          wx.hideLoading()
          if (res.errcode == 0) {
            that.token = res.data.token || '';
            //是否注册
            that.isSign = res.data.mobile == '' ? false : true;
            that.userInfo=res.data.userInfo;
            that.login.Emit(true);
            callBack()
          }
          if (res.errcode == 1) {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
        ajax.catch(err => {
          wx.hideLoading();
          console.log(err)
        })
      }
    })
   
  }
  //3-13 不用手机注册
  register2(data, callBack, path = _interface.sign){
    wx.showLoading({
      title: '注册中...',
      mask: true
    })
    let that = this;
    wx.login({
      success: res => {
        let sendData = {
          ...res
        }
        sendData = Object.assign(sendData, data);
        let ajax = new Ajax({
          data: sendData,
          path: path
        })
        ajax.then(res => {
          wx.hideLoading()
          if (res.errcode == 0) {
            that.token = res.data.token || '';
            //是否注册
            that.isSign = true;
            that.userInfo = res.data.userInfo;
            that.login.Emit(true);
            callBack && callBack(res.data)
          }
          if (res.errcode == 1) {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
        ajax.catch(err => {
          wx.hideLoading();
          console.log(err)
        })
      }
    })
  }

  //获取用户信息 getUserInfo1
  getUserInfo(callBack){
    let data = {
      token: this.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.getUserInfo
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        if (res.data.mobile)
        {
          callBack(res.data)
        }
        else
        {
          callBack(false)
        }
        

      } else if (parseInt(res.errcode) == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })


      }

      console.log(res)
    })
    ajax.catch(err => {

      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //保存个人信息
  saveUserInfo(userInfo, callBack){
    let data = {
      token: this.token,
      ...userInfo
    }
    var ajax = new Ajax({
      data,
      path: _interface.saveUserInfo
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack(true)


      } else if (parseInt(res.errcode) == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })


      }

      console.log(res)
    })
    ajax.catch(err => {

      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //删除历史
  delHistory(id,status,callBack){
    let data = {
      token: this.token,
      id:id,
      status: status
    }
    var ajax = new Ajax({
      data,
      path: _interface.delhis
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack(true)
      } 
      console.log(res)
    })
    ajax.catch(err => {
      callBack(false)
      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //获取允许选择范围
  getAllowArea(){
    let data = {
      
    }
    var ajax = new Ajax({
      data,
      path: _interface.getAllowArea
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        this.allowArea=res.data
      }
    })
    ajax.catch(err => {
      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //检查是否有效范围
  isAllowArea(pos,callBack){
    let that=this;
    this.Map.getCoder(pos).then(res => {
      if (res.status == 0) {
        let { ad_info: { adcode } } = res.result;
        if (that.allowArea.includes(parseInt(adcode)))
        {
          callBack(true)
        }
        else
        {
          callBack(false)
        }
      
      }}
      
    ).catch(err=>{
      console.log(err)
    })
  }
  //回去优惠券列表
  getCardList(callBack){
    let data = {
      token:this.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.getCardList
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack && callBack(res.data)
      }
    })
    ajax.catch(err => {
      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //赠送优惠券
  sendCard(callBack){
    let data = {
      token: this.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.sendCard
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack && callBack(res.data)
      }
    })
    ajax.catch(err => {
      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  
}
let user=new User();
export { user as User }