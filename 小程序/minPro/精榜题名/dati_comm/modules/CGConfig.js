//闯关模板相关配置

//猜明星
var CMX = { 
 subtype_money:4,//猜明星金币子类号
 subtype_jifen:3,//猜明星学分子类号 
 AppId:"wx08fde11d509f653f",
 shopIconArr : [1, 5, 3],
 title: '最强猜明星',
 NavigationBarFG: '#ffffff', //标题文字色
 NavigationBarBG: "#391c56",//标题背景色
 xieyi: 501
}
//猜明星2
var CMX2 = {
  subtype_money: 4,//猜明星金币子类号
  subtype_jifen: 3,//猜明星学分子类号 
  AppId: "wxb6fbdd8c4b3f994a",
  shopIconArr: [1, 5, 3],
  title: '快来猜明星',
  NavigationBarFG: '#ffffff', //标题文字色
  NavigationBarBG: "#391c56",//标题背景色
  xieyi: 501
}
//猜诗词
var CSC = {
  subtype_money: 6,//猜明星金币子类号
  subtype_jifen: 5,//猜明星学分子类号 
  AppId: "wx416773732e443f5e",
  shopIconArr: [1, 5, 3],
  title: '最强猜诗词',
  NavigationBarFG: '#ffffff', //标题文字色
  NavigationBarBG: "#2f7c9a",//标题背景色
  xieyi: 209
} 
 


var CGCfgs = { "CMX2": CMX2,"CMX":CMX, "CSC":CSC}

function BuildConfig(ProjectID, version)
{
  var re = CGCfgs[ProjectID]  
  re.ProjectID = ProjectID
  re.ServerListUrl = `https://list.quwenyx.com/gameweb/${ProjectID}/Config${version}.xml`
  re.PubConfigUrl = `https://list.quwenyx.com/GameWeb/Pub/${ProjectID}_PubConfg.xml`
  return re
}
module.exports = { BuildConfig }
