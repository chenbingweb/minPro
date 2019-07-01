// dati_comm/components/post-view/post-view.js
// import { Player } from "../../../../modules/Player.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showHB:{
      type:Boolean,
      value:false
    },
    //显示继续挑战按钮
    showBtn:{
      type: Boolean,
      value: true
    },
    img:{
      type:Object,
      value:{},
      observer:function(n,o){
        if (n.bg_url)
        {
          this.setData({
            template: poster(n.bg_url, n.qr_url, n.ad_url)
          })
        }
    
       
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    template:{}
  },
  ready:function(){
    // this.setData({
    //   template: poster()
    // })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    OnFight(){
      this.triggerEvent('fight', { bubbles: true, composed: true }) 
    },
    OnBack(){
      this.setData({
        showHB:false
      })
      this.triggerEvent('backData', { showHB: this.properties.showHB }) 
    },
    onImgOK({detail}){
        let {path}=detail;
        this.path=path;
    },
    OnSaveHB(){
      wx.saveImageToPhotosAlbum({
        filePath:this.path,
        success:()=>{
          wx.showToast({
            title: '保存成功',
            mask:true
          })
        }
      })
    }
  }
})
function poster(bg_url,qr_url, ad_url){
  return {

    width: '750rpx',
    height: '1334rpx',
    background:bg_url,
   // background: '#f4f4f4',
    views:[
      {
        type: 'image',
        url: Player.IconUrl(),
        css: {
          bottom: '82rpx',
          left: '77rpx',
          borderWidth: '6rpx',
          borderColor: '#000',
          borderRadius: '50rpx',
          width: '100rpx',
          height: '100rpx',
        },
        
      },
      {
        type: 'image',
        url: qr_url,
        css: {
          bottom: '39rpx',
          left: '270rpx',
          // borderWidth: '6rpx',
          // borderColor: '#000',
          borderRadius: '128rpx',
          width: '256rpx',
          height: '256rpx',
        },

      },
      {
        type: 'image',
        url: ad_url,
        css: {
          bottom: '39rpx',
          left: '574rpx',
          // borderWidth: '6rpx',
          // borderColor: '#000',
          // borderRadius: '50rpx',
          width: '129rpx',
          height: '146rpx',
        },

      },
      {
        type: 'text',
        text: Player.Name(),
        css: {
          // borderWidth: '6rpx',
          // borderColor: '#000',
          fontWeight: 'bold',
          top:"10rpx",
          width:"270rpx",
          left:"130rpx",
          align:"center",
          bottom: '40rpx',
          color: '#423a31',
          fontSize:"30rpx"
        },
      }
    ]
  }
}