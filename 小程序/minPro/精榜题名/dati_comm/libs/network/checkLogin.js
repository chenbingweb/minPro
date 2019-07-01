import {wxAccount} from "./wxAccount";
import {loginLoading} from "./loginLoading";
import {txt} from "../../sdata/SDataID2"

wxAccount.checkSessionFailedEvent.On(this, () => {
    console.log('lost conenection with weixin.');
    autoRelogin();
});

function autoRelogin ()  {
    wxAccount.autoLoginToWxSucceededEvent.On(this, (res) => {
        loginLoading.hide();
    });
    wxAccount.autoLoginToWxFailedEvent.On(this, () => {
        loginLoading.hide();
    });
    loginLoading.show(txt(1019), false);
    wxAccount.autoLogin();
}
/*
setInterval(wxAccount.checkSession, 30000);
*/