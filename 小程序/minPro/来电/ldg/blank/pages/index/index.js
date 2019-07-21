import { getNearList } from "./fn";
import { User } from "../../model/user"
import Location from "../../model/map"
Page({
  data:{
    longitude: "116.313972",
    latitude: "39.980014",
    markers: [],
    includePoints:[],
    top:600,
    isSign:false,
    loginPhone:false,
     shopInfo:{}
  },
  onLoad(query) {
    this.currentPos={}
    User.getPos(({ longitude, latitude})=>{
      this.setData({
        longitude, latitude
      })
          getNearList({ longitude, latitude},this)
    })
    User.login()
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  //移动到中心
  onMoveCenter(){
    Location.moveCenter()
  },
  //视野发生变化
  onRegionchange({ type}){
   
    if (type=='end')
    {
      
      Location.mapCtx.getCenterLocation({
        success:res=>{
         
            if (JSON.stringify({longitude:res.longitude, latitude:res.latitude}) !== JSON.stringify(this.currentPos))
            {
             
             
              getNearList(res,this)
            }
           
            this.currentPos={ longitude:res.longitude, latitude:res.latitude};
        
        }
      })
    }
    
  },
  //点击marker
  onMarkertap({markerId}){
   

    this.setData({
      top:0,
       shopInfo: this.data.includePoints[markerId]
    })
  },
  //关闭店铺信息
  onTab(){
    this.setData({
      top:600
    })
  },
   //跳转个人中心
  onNavToCenter(){
    my.navigateTo({
      url: '../myCenter/myCenter',
    })
  },
  onNavTo(){
    my.navigateTo({
      url: '../nearShop/nearShop',
    })
  },
  onHelp(){
    my.navigateTo({
      url: '../help/help',
    })
  },
  onConfirm({detail}){
    let { value } = detail;
    my.navigateTo({
      url: '../search/search?content='+value,
    })
  },
  //跳转到店铺详情
  onNavToShop({currentTarget:{dataset:{sid}}}){
  
    my.navigateTo({
      url: '../shopDetail/shopDetail?sid='+sid,
    })
  },
  onGetAuthorize(e){
    
    my.getPhoneNumber({
        success: (res) => {
            let encryptedData = res.response;
            console.log(res)
        },
        fail: (res) => {
            console.log(res);
            console.log('getPhoneNumber_fail');
        },
    });

  },
  onAuthError(err){
    console.log('rtt')
    console.log(err)
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },

});
