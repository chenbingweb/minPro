// pages/loactionPos/loactionPos.js
import { User } from "../../model/user.js"
let _interface = require('../../utils/interface.js');
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"
let flag=true
//获取坐标
function Pos(map){
  let ajax = new Ajax({
    path: _interface.getPosterPos,
    data: { id: this.oid, token: User.token }
  })
  ajax.then(res => {
    wx.hideLoading();
    if (res.errcode == 0) {
      console.log(res.data)
      res.data.send_location.img ="../../images/start.png"
      res.data.receive_location.img = "../../images/end.png";
      res.data.delivery_location.img ="../../images/ps.png";
      this.setData({
        time: Tool.formatTime(new Date(res.data.delivery_location.last_location_time*1000), '-', true) ,
        delivery_location: JSON.stringify(res.data.delivery_location)
      })
      let posArr = [res.data.send_location, res.data.receive_location, res.data.delivery_location];
      createPos(posArr)((res,includes)=>{
        flag = true
        this.setData({
          markers: res
        },()=>{
          map.includePoints({
            padding: [40, 40, 40, 40],
            points: [
              ...includes,
              User.location
            ]
          })

          this.setData({
            markers: res,
            
          })
        })
        
      })
      // return
      // let { lat, lng}=res.data;
     
      // this.setData({
      //   markers:[]
      // },()=>{
      //   this.setData({
      //     markers: [User.createMarker(lat, lng, 9999, width, height, '../../images/ps.png')]
      //   })
      // })
     
    }
    
  })
  ajax.catch(err => {
    wx.hideLoading();
  })
}
//39.384733,115.669041
let textArr=[
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.383141", lng: "115.661316", img: "../../images/ps.png" }
  ],
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.384733", lng: "115.669041", img: "../../images/ps.png" }
  ],
  //39.385795,115.684662
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.385795", lng: "115.684662", img: "../../images/ps.png" }
  ],
  //39.385861,115.686336
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.385861", lng: "115.686336", img: "../../images/ps.png" }
  ],
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.385861", lng: "115.694575", img: "../../images/ps.png" }
  ],
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.385960", lng: "115.702729", img: "../../images/ps.png" }
  ],
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.385960", lng: "115.702729", img: "../../images/ps.png" }
  ],
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.385695", lng: "115.706291", img: "../../images/ps.png" }
  ],
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.385695", lng: "115.706291", img: "../../images/ps.png" }
  ],
  [
    { lat: "39.378630", lng: "115.649986", img: "../../images/start.png" },
    { lat: "39.381283", lng: "115.797958", img: "../../images/end.png" },
    { lat: "39.384501", lng: "115.711699", img: "../../images/ps.png" }
  ]
  //39.385695,115.706291 39.384501,115.711699
  
  
]
let t=false
function text(posArr,map){

  // let posArr = [
  //     { lat: "39.9219", lng: "116.44355",img :"../../images/start.png" }, 
  //     { lat: "39.92828475294", lng: "116.4647930954", img: "../../images/end.png" },
  //     { lat: "38.03599", lng: "114.46979",img :"../../images/ps.png"}
  //   ]
  createPos(posArr)((res, includes) => {
    flag = true
    this.setData({
      markers: res
    }, () => {
      if(t==false)
      {
        map.includePoints({
          padding: [40, 40, 40, 40],
          points: [
            ...includes,
            //  User.location
          ]
        })
        t = true
      }
      

      this.setData({
        markers: res
      })
    })

  })
}
function createPos(pos){
  let num=0;
  let markers=[];
  let includesPos=[]
  let chiild = function (callBack) {
    if (num >= pos.length) {
      callBack && callBack(markers, includesPos)
      return
    }
    wx.getImageInfo({
      src: pos[num].img,
      success: ({ width, height }) => {
        let { lat, lng, img } = pos[num];
        includesPos.push({
          longitude: lng,
          latitude: lat,
        })
        markers.push(User.createMarker(lat, lng, num, width, height, img));
        num++
        chiild(callBack)
      }
    })
  }
  return chiild
}
function Poss(map) {
  let ajax = new Ajax({
    path: _interface.getPosterPos,
    data: { id: this.oid, token: User.token }
  })
  ajax.then(res => {
    wx.hideLoading();
    if (res.errcode == 0) {
      console.log(res.data)
      res.data.send_location.img = "../../images/start.png"
      res.data.receive_location.img = "../../images/end.png";
      res.data.delivery_location.img = "../../images/ps.png"
      let posArr = [res.data.send_location, res.data.receive_location, res.data.delivery_location];
      createPos(posArr)((res, includes) => {
        flag = true
        this.setData({
          markers: res
        }, () => {
          map.includePoints({
            padding: [40, 40, 40, 40],
            points: [
              ...includes,
              User.location
            ]
          })

          this.setData({
            markers: res
          })
        })

      })
      // return
      // let { lat, lng}=res.data;

      // this.setData({
      //   markers:[]
      // },()=>{
      //   this.setData({
      //     markers: [User.createMarker(lat, lng, 9999, width, height, '../../images/ps.png')]
      //   })
      // })

    }

  })
  ajax.catch(err => {
    wx.hideLoading();
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    polyline: [],
    longitude: "116.313972",
    latitude: "39.980014",
    markers: [],
    includePoints:[]
  },

  /**
   * 生命周期函数--监听页面加载 longitude
   */
  onLoad: function (options) {
    wx.setKeepScreenOn({
      keepScreenOn: true,
      success: () => {
        // wx.showToast({
        //   title: '已经开启保持常亮状态',
        //   icon:'none'
        // })
      }
    })
    this.timmer=null
    let {lng,lat,oid}=options;
    this.oid=oid;
    let map = wx.createMapContext('map');
    this.map=map;
    Pos.bind(this)(map)
    if (this.timmer) {
      clearInterval(this.timmer)
    }
    // this.i=0;
  
    this.timmer = setInterval(() => {
      // if (this.i >= textArr.length)
      // {
      //   this.i=0
      // }
      // text.bind(this)(textArr[this.i], this.map)
      // this.i++
       Pos.bind(this)(map)
    }, 6000)
    // wx.getImageInfo({
    //   src: '../../images/ps.png',
    //   success:({ width, height })=>{
    //     console.log(User.location)
    //     this.setData({
    //       longitude: User.location.longitude,
    //       latitude: User.location.latitude,
    //       markers: [User.createMarker(lat, lng, 9999, width, height, '../../images/ps.png')]
    //     },()=>{
         
    //     })
     
    //     map.includePoints({
    //       points: [{
    //         longitude: lng,
    //         latitude: lat
    //       },
    //         User.location
    //       ]
    //     })
    //   }
    // })


  

  },
  onRefresh(){
    if (flag ==true)
    {
      Poss.bind(this)(this.map)
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.timmer)
    this.timmer=null
    wx.setKeepScreenOn({
      keepScreenOn: false,
      success: () => {
        // wx.showToast({
        //   title: '已经开启保持常亮状态',
        //   icon:'none'
        // })
      }
    })
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
   */
  onShareAppMessage: function () {

  }
})