// pages/post/post.js
import Poster from "../../libs/poster.js"
let _fn=require("./fn.js")
import Power from "../../libs/getUserPower.js"
Page({

  data: {
    shareid:'',
    cid:'',
    posterImg:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.save=false;
  this.power = new Power();
  this.setData({
    shareid: options.shareid,
    cid: options.cid
  })
  this.shareid = options.shareid||'27';
  this.cid = options.cid||'1';
  console.log(options)
  let callBack=res=>{
    console.log(res)
    this.setData({
      posterImg:res
    })
  }
  
  this.getPosterInf=res=>{
    console.log(res)
    wx.showToast({
      title: '点击屏幕，保存海报',
      mask:true,
      icon:'none',
      duration:4000
    })
    this.wxCanvas = new Poster({ cid: 'first', callBack: callBack,data:res })
  }
  _fn.getPoster(this)

  
  },
  saveImg({currentTarget}){
    if (this.save) return 
    let self = this
    let obj = {
      auth: 'scope.writePhotosAlbum',
      succ(res) {//成功
        innerFn.bind(self)()
      },
      fail(err) {//失败
        console.log(err)
       wx.showToast({
         title: '保存成绩失败',
         icon:'none'
       })
      }
    }
    
    let { src } = currentTarget.dataset;
    this.power.resolveEvent({
      auth: 'scope.writePhotosAlbum',
      succ(res) {//成功
        innerFn.bind(self)()
      },
      fail(err) {//失败
        wx.showModal({
          title: '提示',
          content: '是否前往设置列表',
          success:res=>{
            if(res.confirm)
            {
              self.power.openSetting(obj)
            }
            
          }
        })
       
      }
    })
    function innerFn(){
      wx.saveImageToPhotosAlbum({
        filePath: src,
        success(res) {
          wx.showToast({
            title: '成功保存海报',
          })
          self.save=true
        }
      })
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
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },


  /**
   * 用户点击右上角分享
  
  onShareAppMessage: function () {
  
  } */
})