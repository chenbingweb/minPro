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
*/
module.exports={
 // url: 'http://tf.5iportal.com/api/',//请求数据地址 wxe6ada8044d893fbf
  url: 'https://vol.51beat.cn/api', //wx3cf2a5daea6bfbfa
  //url:'https://www.easy-mock.com/mock/5c73491533c514218a00508c/tuofu',//请求数据地址
  //imgUrl:'http://tf.5iportal.com',//图片地址
  imgUrl:"https://vol.51beat.cn",
  staticUrl:'',
  debug:false,//如果为真，则使用假数据
  //自定义导航（参考案例，根据实际项目来配置相关属性）
  navBar:[
    { 
      name: '首页',
      selected: true, 
      icon: '../../images/home_no.png',
      icon_s: '../../images/home_yes.png', 
      path: '../index/index' ,
      width:57,
      height:52
    },
    
    { 
      name: '我的', 
      selected: false, 
      icon: '../../images/my_no.png', 
      icon_s: '../../images/my_yes.png', 
      path: '../myCenter/myCenter',
      width: 46,
      height: 48
    }
    ]
}
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