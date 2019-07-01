/*
  1，相关全局配置，比如Ajax 请求的url地址，网络图片地址，第三方请求地址等    
  2，navBar字段 自定义导航相关配置说明
    { 
      name: '导航标题',
      selected: true, //默认为第一为选中，其他设置为false
      // nid: 0, ///导航id(以数字从0开始，按照顺序排列，依次加1，建议最多设置5个导航按钮)
      icon: 'search_bh.png',//未选中的导航图标(确保images文件夹里有图片)
      icon_s: 'search_bh_s.png', //选中的导航图标(确保images文件夹里有图片)
      path: '../index/index'//跳转路径（填写相对路径）
   }
   https://api.c63.top/
   wx7b5333c27bc8ddf3
*/
module.exports={
  url: 'https://heqi-api.wooloo.top/',//请求数据地址
 // url:'https://www.easy-mock.com/mock/5b03882a5ea0ad2e082ea7fd/xiongan/',
  imgUrl:'https://heqi-api.wooloo.top/',//图片地址
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
      width:41,
      height:36
    }
    ,
    {
      name: '发布',
      selected: false,
      icon: '../../images/fabu_icon.png',
      icon_s: '../../images/fabu_icon.png',
      path: null,
      width: 41,
      height: 36
    },
    { 
      name: '我的', 
      selected: false, 
      icon: '../../images/my_no.png', 
      icon_s: '../../images/my_yes.png', 
      path: '../myCenter/myCenter',
      width: 47,
      height: 50
    }
    ]
}
