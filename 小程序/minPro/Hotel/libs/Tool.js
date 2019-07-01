import Error from "./Error.js"
let disabled = false
export default class Tool {
  constructor() {

    return this
  }
  //获取小程序打开过的某个页面
  static getPageObj(url){
    let pages = getCurrentPages();
    let indexPage = null
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].route == url) {
        indexPage = pages[i];
        break
      }
    }
    return indexPage
  }
  //时间戳格式
  static formatTime(date, str, showTime,monthFlag) {

    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    //转换成yyyy-m-d
    if (monthFlag)
    {
      var format = [year, month].map(Tool.formatNumber).join(str);
    }
    else
    {
      var format = [year, month, day].map(Tool.formatNumber).join(str);
    }
   
    if (showTime) {
      //转换成yyyy-m-d h:m
      format = [year, month, day].map(Tool.formatNumber).join(str) + ' ' + [hour, minute].map(Tool.formatNumber).join(':');
    }
    return format
  }
  //时间补位
  static formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  //处理富文本相关样式
  /*
    reg：正则
    string:替换的标签名
    replaceString:标签名
  */
  static richTextImg(reg, strings, replaceString) {
    var arr = null;
    while (arr = reg.exec(strings) != null) {
      strings = strings.replace(reg, replaceString);
    }
    return strings
  }
  //获取手机信息
  static getPhoneInfor(options) {
    if (typeof options != 'object') {
      Error.printErr("请传入Object对象,其中的参数succ函数方法必传，格式：{succ(res){},fail(err){}}")
      return
    }
    let obj = {};
    obj = Object.assign(obj, options)
    let promise = new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          if (res.errMsg == 'getSystemInfo:ok') {
            resolve(res);
          }
          else {
            reject({ err: 'fail' })
          }

        }
      })
    })
    promise.then(res => {
      obj.succ(res)
    }).catch(err => {
      obj.fail(err)
    })
  }

  //获取地理坐标
  static getLocation(param) {
    if (typeof param != 'object') {
      Error.printErr(`请传入Object对象,格式：{
        type:undefined//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
      }`)
      return
    }
    let option = {};
    option = Object.assign(option, param)
    let promise = new Promise((resolve, reject) => {
      wx.getLocation({
        type: option.type || 'wgs84',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          resolve({
            latitude,
            longitude
          })
        },
        fail: reject
      })
    })
    return promise

  }
  //微信支付
  static WXpay(payInfo) {
    if (typeof payInfo != 'object') {
      Error.printErr(`请传入Object对象,格式：{
        timeStamp:'',//string
        nonceStr:'',//string
        package:'',//string
        signType:'',//string
        paySign:''//string
      }`)
      return
    }
    let promise = new Promise((resolve, reject) => {
      wx.requestPayment({
        'timeStamp': payInfo.timeStamp + '',
        'nonceStr': payInfo.nonceStr,
        'package': payInfo.package,
        'signType': payInfo.signType,
        'paySign': payInfo.paySign,
        'success': res => {
          //成功支付
          if (res.errMsg == 'requestPayment:ok') {
            resolve(res)
          }
        },
        'fail': err => {
          reject(err)
        }
      })
    })
    return promise
  }
  //添加卡券
  static addCard(cardList) {
    if (!Array.isArray(cardList)) {
      Error.printErr(`请传入数组,格式：[
          {
            cardId: '',
            cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
          }, {
            cardId: '',
            cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
          }
        ]`)
      return
    }

    let promise = new Promise((resolve, reject) => {
      wx.addCard({
        cardList: cardList,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })

    return promise
  }
  // 查看微信卡包中的卡券。
  static openCard(cardList) {
    if (!Array.isArray(cardList)) {
      Error.printErr(`请传入数组,格式：[
              {
                cardId: '',
                code: ''
              }, {
                cardId: '',
                code: ''
              }
            ]`
      )
      return
    }
    let promise = new Promise((resolve, reject) => {
      wx.openCard({
        cardList: cardList,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })

    return promise
  }
  //会员卡组件
  static memberComponent(extraData) {
    if (typeof extraData != 'object') {
      Error.printErr(`请传入正确格式：{
        encrypt_card_id, outer_str, biz
      }`
      )
      return
    }
    let promise = new Promise((resolve, reject) => {
      wx.navigateToMiniProgram({
        appId: 'wxeb490c6f9b154ef9', //固定为此 appid，不可改动
        extraData: {
          encrypt_card_id: decodeURIComponent(extraData.encrypt_card_id), outer_str: decodeURIComponent(extraData.outer_str + ''), biz: decodeURIComponent(extraData.biz)
        }, // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数
        success: resolve,
        fail: reject,
        complete: function () {
        }
      })
    })

    return promise
  }
  //放置连续点击
  static canClick(time = 600) {

    return function () {
      if (!disabled) {
        disabled = true;
        setTimeout(() => {
          disabled = false;
        }, time);
        return true;
      }
      else {
        return false;
      }

    }
  }
  //跳转小程序
  static toMiniPro({ appid, path }) {
    let promise = new Promise((resolve, reject) => {
      wx.navigateToMiniProgram({
        appId: appid,
        path: path,
        envVersion: 'release',
        success: resolve,
        fail: reject
      })
    })
    return promise
  }
  //富文本
  //处理富文本相关样式
  /*
    reg：正则
    string:替换的标签名
    replaceString:标签名
  */
  static richTextImg(reg, strings, replaceString) {
    var arr = null;
    while (arr = reg.exec(strings) != null) {
      strings = strings.replace(reg, replaceString);
    }
    return strings
  }
  //手机号码验证
  static checkPhoneNumber(phoneNumber){
    let reg = /^1[0-9]\d{9}$/;
    if (phoneNumber=='')
    {
      wx.showToast({
        title: '请输入手机号',
        icon:'none'
      })
      return false
    }
    if (reg.test(phoneNumber))
    {
      return phoneNumber
    }
    else
    {
      wx.showToast({
        title: '手机号输入不正确',
        icon: 'none'
      })
      return false
    }
  }
  //手机验证码倒计时
  static countDown(callback){
    if (typeof callback !='function'){
      console.error('请传入function对象')
      return 
    }
    let time=arguments[1]||60;
    let timmer=null;
    return ()=>{
      timmer=setInterval(()=>{
       
        if (time<0)
        {
          callback(time)
          clearInterval(timmer)
          return 
        }
        callback(time)
        time--
      },1000)
    }
  }
  //毫秒转时分秒
  static timeChange(mss){
    let days = parseInt(mss / (1000 * 60 * 60 * 24));
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hours = Tool.formatNumber(hours)
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    minutes = Tool.formatNumber(minutes)
    let seconds = parseInt((mss % (1000 * 60)) / 1000);
    seconds = Tool.formatNumber(seconds)
    return {
      days,
      hours,
      minutes,
      seconds
    }
  }
  static ShareFn(param){
    /*
    {
       imageUrl:'',
      title: '自定义转发标题',
      path: "pages/index/index",
     
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
    
    */
    let obj = {
      title: '首页',
      path: "pages/index/index",
      success: function (res) {
        // 转发成功
   
      },
      fail: function (res) {
        // 转发失败
      }
    }
    if(typeof param=='object')
    {
      obj = Object.assign(obj, param)
    }
    
    return obj
  }
  //获取本地数据
  static getStorage(...param){
    let proArr=[]
    if(param.length)
    {
      param.forEach(item=>{
        let pro=new Promise((resolve,reject)=>{
          wx.getStorage({
            key: item,
            success:res=> {
              if(res.data)
              {
                resolve(res.data)
              }
              else
              {
                reject(false)
              }
            },
            fail:()=>{
              reject(false)
            }
          })
        })
        proArr.push(pro)
      })
      return proArr
    }
    else
    {
      return false
    }
  }
  //自动更新小程序
  static Version() {
    if (!wx.getUpdateManager) return
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  }
  //获取某一个节点高度
  static getElementInfo(ele, fn) {
    wx.createSelectorQuery().select(ele).boundingClientRect(function(rect) {
      fn(rect)
    }).exec()
  }

  //手机号加密
    static formatter(value) {
      if(!value) return
      var len = value.length;
      var xx = value.substring(3, len - 4);
      var values = value.replace(xx, "****");
      return values;
    }
}


