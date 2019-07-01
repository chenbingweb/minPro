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
  url:'https://api.bcdp.com.cn/Program/',
  //url:'https://api.jeemoo.com/bdl/Program/',//请求数据地址
  imgUrl:'http://r.bcdp.com.cn',//http://bdl-r.jeemoo.com',//图片地址
 
  debug:false,//如果为真，则使用假数据
  //自定义导航（参考案例，根据实际项目来配置相关属性）
  pageSize:10,
  navBar:[
    { 
      name: '首页',
      selected: true, 
      icon: '../../images/home.png',
      icon_s: '../../images/home_s.png', 
      path: '../index/index' ,
      width:34,
      height:34
    },
    { 
      name: '品牌', 
      selected: false,
      icon: '../../images/king.png', 
      icon_s: '../../images/king_s.png', 
      path: '../brand/brand',
      width: 39,
      height: 29
    },
    { 
      name: '发现', 
      selected: false, 
      icon: '../../images/find.png', 
      icon_s: '../../images/find_s.png', 
      path: '../find/find',
      width: 38,
      height:38 
    },
    { 
      name: '我的', 
      selected: false, 
      icon: '../../images/my.png', 
      icon_s: '../../images/my_s.png', 
      path: '../centerPage/centerPage',
      width: 33,
      height: 34
    }
    ]
}
