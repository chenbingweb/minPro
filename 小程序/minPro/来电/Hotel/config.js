/*
  1，相关全局配置，比如Ajax 请求的url地址，网络图片地址，第三方请求地址等    
  2，navBar字段 自定义导航相关配置说明
    { 
      name: '导航标题',
      selected: true, //默认为第一为选中，其他设置为false
      nid: 0, //导航id(以数字从0开始，按照顺序排列，依次加1，建议最多设置5个导航按钮)
      icon: 'search_bh.png',//未选中的导航图标(确保images文件夹里有图片)
      icon_s: 'search_bh_s.png', //选中的导航图标(确保images文件夹里有图片)
      path: '../index/index'//跳转路径（填写相对路径）
   }
   wxded6dc0dd8127455 
*/
module.exports={
  //url:'http://ft.jeemoo.com/api/', Base URL 
  url:"http://test456.kexueduizhang.cn/public/index.php/weiapp/Api",

 // url:'https://www.easy-mock.com/mock/5d2947cd1c8edb1698b4d2c0/chong_dian',  //'https://api.c63.top/',
  //url:'https://www.easy-mock.com/mock/5be5369cb9983d342035d875/futu/',//请求数据地址
  //url: 'https://www.easy-mock.com/mock/5c564c498b11ef4ea290749a/pet_kh',//请求数据地址
  imgUrl:'https://heqi-api.wooloo.top/',//图片地址
  staticUrl:'',
  debug:false,//如果为真，则使用假数据
  //自定义导航（参考案例，根据实际项目来配置相关属性）
  /*
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
  
  */
  navBar:[
    { 
      name: '活动',
      selected: true, 
      icon: '../../images/home_no.png',
      icon_s: '../../images/home_yes.png', 
      path: '../index/index' ,
      width:40,
      height:40
    },
    
    { 
      name: '商城', 
      selected: false, 
      icon: '../../images/shop.png', 
      icon_s: '../../images/shop_yes.png', 
      path: '../shop/shop',
      width: 48,
      height: 45
    },

    {
      name: '积分商城',
      selected: false,
      icon: '../../images/jf_no.png',
      icon_s: '../../images/jf_yes.png',
      path: '../intShop/intShop',
      width: 48,
      height: 43
    },

    {
      name: '我的',
      selected: false,
      icon: '../../images/my_no.png',
      icon_s: '../../images/my_yes.png',
      path: '../myCenter/myCenter',
      width: 51,
      height: 41
    }
    ]
}
/*

"tabBar": {
    "custom": false,
    "color": "#a1a1a1",
    "selectedColor": "#fa334a",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "images/home_no.png",
        "selectedIconPath": "images/home_yes.png",
        "text": "订房"
      },
      {
        "pagePath": "pages/myOrderList/myOrderList",
        "iconPath": "images/shop.png",
        "selectedIconPath": "images/shop_yes.png",
        "text": "商店"
      },
      {
        "pagePath": "pages/myCenter/myCenter",
        "iconPath": "images/my_no.png",
        "selectedIconPath": "images/my_yes.png",
        "text": "我的"
      }
    ]
  },
*/
/*
 "tabBar": {
    "backgroundColor":"white",
    "color": "#999999",
    "selectedColor": "#605858",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "./images/home_no.png",
        "selectedIconPath": "./images/home_yes.png"
      },
      {
        "pagePath": "pages/myCenter/myCenter",
        "text": "我的",
        "iconPath": "./images/my_no.png",
        "selectedIconPath": "./images/my_yes.png"
      }
    ]
  },
*/

/*
"tabBar": {
    "custom": true,
    "color": "#797979",
    "selectedColor": "#a68171",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "images/home_no.png",
        "selectedIconPath": "images/home_yes.png",
        "text": "订房"
      },
      {
        "pagePath": "pages/shop/shop",
        "iconPath": "/images/shop.png",
        "selectedIconPath": "/images/shop_yes.png",
        "text": "商城"
      },
      {
        "pagePath": "pages/intShop/intShop",
        "iconPath": "/images/shop.png",
        "selectedIconPath": "/images/shop_yes.png",
        "text": "积分商城"
      },
      {
        "pagePath": "pages/myCenter/myCenter",
        "iconPath": "images/my_no.png",
        "selectedIconPath": "images/my_yes.png",
        "text": "我的"
      }
    ]
  },

*/