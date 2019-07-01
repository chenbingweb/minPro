// pages/postImg/postImg.js
import {Index} from "../../model/index.js";
import {User} from "../../model/user.js";
import Tool from "../../libs/Tool.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:'1113rpx',
    template: {},
    mode: 'study',
    bottom:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.sys= wx.getSystemInfoSync();
    this.path=''
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.setData({
      bottom: Tool.isLongP()
    })
    Tool.getElementInfo('.btns_1',(result)=>{
      let { height, bottom } = result;
   
     let ph= getApp().globalData.screenHeight-height;
     //苹果X
      if (Tool.isLongP())
      {
        ph = getApp().globalData.screenHeight - height - (getApp().globalData.screenHeight - bottom);
      }
      Index.getPosterInfo((res) => {
       
        res.qr_code_url = getApp().globalData.imgUrl + res.qr_code_url;
        //getApp().globalData.screenHeight>800
        if (Tool.isLongP())
        {
          res.img_url = getApp().globalData.imgUrl + res.img_url2;
          
        }
        else
        {
          res.img_url = getApp().globalData.imgUrl + res.img_url;
        }
       
        res.height = ph;
       
        console.log(res)
        //height: getApp().globalData.screenHeight + 'px',
        wx.getImageInfo({
          src: res.img_url,
          success:({width,height})=>{
            let per = width/height;
            let h = getApp().globalData.screenWidth/per;
            res.h=h;
            debugger
            this.setData({
              mode: User.studyInfo.mode,
              template: poster.bind(this)(res)
            })
          }
        })
       
      }) 
    }) 
    this.setData({
      is_review_complete: User.studyInfo.is_review_complete
    })
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

  },
  onImgOK({ detail: { path}}){
    this.path = path
  },
  onSave(){
    wx.saveImageToPhotosAlbum({
      filePath: this.path,
      success:()=>{
        wx.showToast({
          title: '保存成功',
          mask:true
        })
      }
    })
  },
  //复习旧词
  onReviewOld() {
    //是否开始复习
    if (!User.studyInfo.last_review_section_id && User.studyInfo.mode != 'study' && User.studyInfo.mode != 'restudy') {
      User.startView((res) => {
        if (res.errcode == 1) {
          return
        }
        else {
          wx.navigateTo({
            url: '../words/words',
          })
        }
      })
    }
    else {
      wx.navigateTo({
        url: '../words/words',
      })
    }


  },
  //返回首页
  onNavIndex() {
    wx.reLaunch({
      url: '../index/index',
    })
  }
})
function poster({ img_url, qr_code_url, study_words, total_days, review_words, height, thesaurus,h}) {
  console.log(this.sys)
  let bottom = '43rpx';
  var reg = /iOS/ig;
  if (reg.test(this.sys.system))
  {
    bottom = '13rpx'// '43rpx';
  }
  else
  {
    bottom = '13rpx';
  }
  return {

    width: '750rpx',
    height: height+'px',
    //背景图
    // background: img_url,
    // background: '#f4f4f4',
    views: [
      {
        type: 'image',
        url: img_url,
        css: {
          // bottom: '25rpx',
          // width: '140rpx',
          // height: '140rpx',
          // left: '25rpx',
          top: "0",
          left: '0',

          width: '750rpx',
           height: h + 'px',
        },
      },
      {
        type:'rect',
        css:{
          width: '750rpx',
          height: '114rpx',
          color:'#009688',
          bottom: '0rpx',
          left: '0rpx',
        }
      },
      // {
      //   type: 'rect',
      //   css: {
      //     // width: '165rpx',
      //     // height: '180rpx',
      //     width: '100rpx',
      //     height: '100rpx',
      //     color: '#fff',
      //     // bottom: '10rpx',
      //     bottom:"7rpx",
      //     left: '12rpx',
      //   }
      // },
      // {
      //   type: 'rect',
      //   css: {
      //     width: '155rpx',
      //     height: '170rpx',
      //     color: '#fff',
      //     bottom: '10rpx',
      //     left: '16rpx',
      //   }
      // },
      //二维码
      // {
      //   type: 'image',
      //   url: qr_code_url,
      //   css: {
      //     // bottom: '25rpx',
      //      // width: '140rpx',
      //     // height: '140rpx',
      //    // left: '25rpx',
      //     bottom:"12rpx",
      //     left: '17rpx',
         
      //     width: '90rpx',
      //     height: '90rpx',
      //   },

      // },
      // {
      //   type: 'image',
      //   url: qr_url,
      //   css: {
      //     bottom: '39rpx',
      //     left: '270rpx',
      //     // borderWidth: '6rpx',
      //     // borderColor: '#000',
      //     borderRadius: '112rpx',
      //     width: '224rpx',
      //     height: '224rpx',
      //   },

      // },
    //  \n\t
    //BEAT单词神器】李~~同学，正在学习“GRE救你命2000”词库；学习第7天，已经学习了44个新单词，巩固了34个旧单词
    /*
    
     `【BEAT单词神器】${User.userInfo.nickname.slice(0, 1) + '~~'}：学习第${total_days + 1}天,${'  '}学习了${study_words}个新单词,${'  '}复习了${review_words}个旧单词。`

     `
     【BEAT单词神器】陪伴李~~学习“GRE救你命2000”第7天，已学X个新单词，巩固X个旧单词。
     `
     【BEAT单词神器】陪伴R~第4天，学习“BEAT GRE 2000”词库：已学68个新单词，巩固68个旧单词。

     【BEAT单词】已陪伴李~~8天。正在学习“BEAT GRE 2000”第1天，已学34个新单词，巩固0个就单词。
     

      text: `【BEAT单词神器】陪伴${User.userInfo.nickname.slice(0, 1) + '~~'}第${total_days + 1}天。正在学习“${thesaurus}”词库，${'  '}已学${study_words}个新单词,${'  '}巩固${review_words}个旧单词。`,
      【BEAT单词神器】陪伴李~~学习“BEAT GRE 2000”第1天：已学34个新单词，巩固0个旧单词。

      【BEAT单词神器】陪伴R~~学习”BEAT GRE 2000”词库第60天
      已学2000个新词，巩固8000个旧词。扫码相伴成为单词王^_^
      \n 已学${study_words}个新单词,${'  '}巩固${review_words}个旧单词。

      BEAT单词神器，陪伴J~~学习“托福进阶1000”第60天；
      BEAT单词神器，陪伴J~~学习“托福进阶1000”第60天；
      已学900个新词，巩固2000个旧词。扫码收获单词神器！
    */
      {
        type: 'text',
        text: `【BEAT单词神器】陪伴${'  '}${User.userInfo.nickname.slice(0, 1) + '~~'}学习“${thesaurus}”第${total_days +1}天；`,
        css: {
          // borderWidth: '6rpx',
          // borderColor: '#000',
          maxLines:1,
          fontWeight: 'bold',
          width: '700rpx',//'558rpx',
          // left: "178rpx",
          left: '360rpx',//"160rpx",
          bottom: bottom,
          color: '#ffffff',
          fontSize: "24rpx",
          lineHeight:"40rpx",
          align:"center",
          bottom:"50rpx"
        },
      },
      {
        type: 'text',
        text: `已学${study_words}个新词,${'  '}巩固${review_words}个旧词。扫码获神器：刷词更省力！`,
        css: {
          // borderWidth: '6rpx',
          // borderColor: '#000',
          maxLines: 1,
          fontWeight: 'bold',
          width: '700rpx',//'558rpx',
          // left: "178rpx",
          left: '370rpx',//"160rpx",
          bottom: bottom,
          color: '#ffffff',
          fontSize: "24rpx",
          lineHeight: "40rpx",
          align: "center",
          bottom: "10rpx"
        },
      }
    ]
  }
}