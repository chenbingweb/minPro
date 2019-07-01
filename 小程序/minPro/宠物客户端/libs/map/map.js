const QQMapWX = require('./qqmap-wx-jssdk.min.js');
const key = "R7VBZ-QNF36-45PSU-MYTLF-N66GE-A7FU3";
class Location {
  constructor() {
    this.mapCtx = null;
    this.QQMap = new QQMapWX({
      key: key
    });

    // this.searchKey('石家庄').then(res => {
    //   console.log(res)
    // }).catch(err => {

    // })

  }
  //初始化
  init(mid) {
    this.mapCtx = wx.createMapContext(mid)
    this.mapCtx.moveToLocation();

  }
  //获取地图中心点位置
  getCenterPos() {
    let pro = new Promise((resolve, reject) => {
      this.mapCtx.getCenterLocation({
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
    return pro;

  }
  //移动到当前位置
  moveCenter() {
    this.mapCtx.moveToLocation();
  }
  //移动到缩放视野展示
  moveInclude(points){
   
    this.mapCtx.includePoints({
      points
    })
  }
  //创建marker
  createMarker(latitude, longitude, id,img) {
    return {
      iconPath: img|| './position.png',
      id: id,
      latitude: latitude,
      longitude: longitude,
      width: 50,
      height: 50,
    }

  }
  //关键词搜索
  searchKey(keyword) {
    let pro = new Promise((resolve, reject) => {
      this.QQMap.getSuggestion({
        keyword: keyword,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
    return pro;
  }
  //路线规划
  driving(startPos, endPos, type = '/ws/direction/v1/bicycling') {
    console.log(startPos, endPos)
    /*
        /ws/direction/v1/driving    路线规划:驾车
        /ws/direction/v1/walking    路线规划:步行
        /ws/direction/v1/transit    路线规划:公交
        /ws/direction/v1/bicycling    路线规划:自行

    */
    let url = `https://apis.map.qq.com${type}/?from=${startPos}&to=${endPos}&key=${key}`;
    let pro = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: res => {
          var ret = res.data
          if (ret.status != 0){
            reject(ret.message)

            return; //服务异常处理
          } 
          var coors = ret.result.routes[0].polyline, pl = [];
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] })
          }
          resolve({
            distance: ret.result.routes[0].distance,
            pl, polyline: [{
              points: pl,
              color: '#FF0000DD',
              width: 3
            }]
          })
          

        },
        fail: err => {
          reject(err)
        }
      })
    })
    return pro

  }
  //计算路程
  countDistance(startPos, endPos) {
    let pro = new Promise((resolve, reject) => {
      this.QQMap.calculateDistance({
        mode: 'walking',
        'from': startPos,
        to: endPos,
        success: res => {
          resolve(res)
        },
        fail: err => {

          reject(err)
        }
      })
    })
    return pro
  }
  //获取输入坐标返回地理位置信息
  getCoder(location){
    let pro=new Promise((resolve,reject)=>{
      this.QQMap.reverseGeocoder({
        location,
        success:res=>{
          console.log(res)
          resolve(res)
        },
         fail:()=>{
           reject(false)
         }
      })
    })
    return pro
  }
  
}
let location = new Location();
export { location as Location }