export default class Tool{
  static getLocation(){
    return new Promise((resolve,reject)=>{
        my.getLocation({
            success(res) {
              resolve(res)
            },
            fail(err) {
              reject(err)
              my.hideLoading();
              my.alert({ title: '定位失败' });
            },
        })
    })
 
  }
}