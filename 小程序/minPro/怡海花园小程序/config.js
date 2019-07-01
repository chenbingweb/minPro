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
  url:'http://xa-api.jeemoo.com/',//请求数据地址
  url:'https://www.easy-mock.com/mock/5b476eb84d015152622aec3e/flower/',
  imgUrl:'http://xa-admin.jeemoo.com',//图片地址
  staticUrl:'',
  debug:false,//如果为真，则使用假数据
  //自定义导航（参考案例，根据实际项目来配置相关属性）
  navBar:[
    { 
      name: `首页`,
      selected: true, 
      icon: '../../images/home_n.png',
      icon_s: '../../images/home_s.png', 
      path: '../index/index' ,
      width:32,
      height:32
    }
    ,
    {
      name: '社区',
      selected: false,
      icon: '../../images/community_n.png',
      icon_s: '../../images/community_s.png',
     // path: '../community/community',
      path: '../moreTemp/moreTemp',
      width: 47,
      height: 34,
      navType: 'navigateTo'
    },
    { 
      name: '活动', 
      selected: false, 
      icon: '../../images/theme_n.png', 
      icon_s: '../../images/theme_y.png', 
      path: '../theme/theme',
      width: 40,
      height: 35
    },
    {
      name: '商户',
      selected: false,
      icon: '../../images/shop_n.png',
      icon_s: '../../images/shop_s.png',
      path: '../shops/shops',
      width: 37,
      height: 34,
      navType: 'navigateTo'
    },
    {
      name: '我的',
      selected: false,
      icon: '../../images/my_n.png',
      icon_s: '../../images/my_y.png',
      path: '../myCenter/myCenter',
      width: 36,
      height: 34
    }
    ]
}
