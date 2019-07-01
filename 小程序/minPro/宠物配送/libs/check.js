export default class Check{
  //手机号码原则
  static checkPhoneNum(num){
    let reg =/^1\d{10}$/g;
    if(!reg.test(num))
    {
      wx.showToast({
        title: '手机号码不正确',
        icon:'none'
      })
      return false
    }
    return true
  }
  static checkEmail(email){
    let reg =/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g
    if (!reg.test(email)) {
      wx.showToast({
        title: '邮箱地址不正确',
        icon: 'none'
      })
      return false
    }
    return true
  }
}