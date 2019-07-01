// components/cropper/cropper.js
import WeCropper from './we-cropper.js'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = device.screenHeight*0.8
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cropperOpt: {
      id: 'cropper',
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 200) / 2, // 裁剪框x轴起点
        y: (width - 200) / 2, // 裁剪框y轴期起点
        width: 200, // 裁剪框宽度
        height: 200 // 裁剪框高度
      }
    }
  },
  created:function(){
    console.log(this.data)
    const { cropperOpt } = this.data

    // 若同一个页面只有一个裁剪容器，在其它Page方法中可通过this.wecropper访问实例
    this.wecropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context: ${ctx}`)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(ctx)
        console.log(`picture loaded`)
        console.log(`current canvas context: ${ctx}`)
        wx.hideToast()
      })   
  },
  /**
   * 组件的方法列表
   */
  methods: {

    touchStart:function(e) {
      this.wecropper.touchStart(e)
    },
    touchMove: function(e) {
      this.wecropper.touchMove(e)
    },
    touchEnd: function(e) {
      this.wecropper.touchEnd(e)
    },
    uploadTap: function() {
      const self = this

      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const src = res.tempFilePaths[0]
          
          self.wecropper.pushOrign(src)
        }
      })
    },
    getCropperImage: function() {
      this.wecropper.getCropperImage((src) => {
        if (src) {
          wx.previewImage({
            current: '', // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
          })
        } else {
          console.log('获取图片地址失败，请稍后重试')
        }
      })
    },
  }
})
