Component({
  data: {
    selected: 0,
    "color": "#797979",
    "selectedColor": "#a68171",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "../index/index",
        "iconPath": "/images/home_no.png",
        "selectedIconPath": "/images/home_yes.png",
        "text": "活动",
        width:'40rpx',
        height:'40rpx'
      },
      {
        "pagePath": "../shop/shop",
        "iconPath": "/images/shop.png",
        "selectedIconPath": "/images/shop_yes.png",
        "text": "商城",
        width: '48rpx',
        height: '45rpx'
      },
      {
        "pagePath": "../intShop/intShop",
        "iconPath": "/images/jf_no.png",
        "selectedIconPath": "/images/jf_yes.png",
        "text": "积分商城",
        width: '48rpx',
        height: '43rpx'
      },
      {
        "pagePath": "../myCenter/myCenter",
        "iconPath": "/images/my_no.png",
        "selectedIconPath": "/images/my_yes.png",
        "text": "我的",
        width: '51rpx',
        height: '41rpx'
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path;
      console.log(data.index)
      wx.switchTab({
        url,
        success:res=>{
          this.setData({
            selected: data.index
          })
        }
      })
     
    }
  }
})