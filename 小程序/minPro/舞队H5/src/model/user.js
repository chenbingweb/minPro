import {UIEvent} from "../libs/UIEvent"
class User{
    constructor(){
        this.userInfo={};
        this.setUserInfo();
        this.NavHomeEvent=new UIEvent()
    }
    setUserInfo(){
        let UserInfo=sessionStorage.getItem('userInfo')
        if(UserInfo)
        {
            try{
                UserInfo=JSON.parse(UserInfo)
            }catch(e){
                UserInfo={}
            }
            this.userInfo=UserInfo;
        }
    }
    //更新用户信息
    updataUserInfo(data={}){
        /** 
         * {
            role:'dz',
            Authentication:true
        }
         * 
        */
       this.userInfo=Object.assign(this.userInfo,data)
        sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo));
        this.setUserInfo()
    }
    //获取个人信息
    getUserInfo(){
        return  this.userInfo
    }


}
let user = new User();
export { user as User }