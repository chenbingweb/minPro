//游戏登录相关
import {ServerLogin} from "../../modules/ServerLogin.js"

let isJumped = false;//是否已经跳转过了



function   _DoAuthorize()
{
    wx.getSetting({
    success: res => {
            console.log('###############getSetting success...');
    
            var scopeList = [
            'scope.userInfo'//,
            //'scope.userLocation',
            //'scope.address',
            //'scope.invoiceTitle',
            //'scope.werun',
            //'scope.record',
            //'scope.writePhotosAlbum',
            //'scope.camera'
            ]

        
            for (var i = 0; i < scopeList.length; i++) {
            var scope = scopeList[i]
            if (!res.authSetting[scope]) {
                console.log('getSetting 提示授权...');
                //获取当前页对象
               //  let cp= getApp().globalData.wnds.Wnd_Home.GetCurrPage
               // cp.setData({
               //      ['data.authorize']:true
               //  })
                 getApp().globalData.wnds.Wnd_LonginInfo.Show()
                return
            }
            }
            console.log('getSetting 执行登录...');
            ServerLogin.login();
    }
    })
}




function AutoJump(name, options = null) {
//return false
    let gData = getApp().globalData;
    console.log("gDatagDatagDatagDatagDatagData",gData)
    if (gData.isFromShare) {
        gData.isFromShare = false; // 之后进入任何页都不是从分享直接来

        isJumped = true;
        getApp().globalData.IndexPageOptions = options;
        getApp().globalData.ServerLogin = ServerLogin;
        //ServerLogin.login();
        // ServerLogin.EvtLoginSuccess.On(this,()=>{
        //         console.log('登录完成')
        //    options.callBack && options.callBack()
        // })
        _DoAuthorize();
        return true;
    }

    // 直接启动小程序而来
    if (!isJumped || name === 'index') {
        isJumped = true;
        getApp().globalData.IndexPageOptions = options;
        getApp().globalData.ServerLogin = ServerLogin;
        //ServerLogin.login();
        _DoAuthorize();
        return true;
    }

    // 从其他页面来
    return false;
}

export {AutoJump}