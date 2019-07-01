#wxAccount.js 说明

## 使用范例

```js
// 导入 wxAccount 模块
import {wxAccount} from "../modules/wxAccount";

// 侦听用户登录微信成功事件，获取 code
wxAccount.loginToWxSucceededEvent.On(this, (code) => {
    console.log(`user code (arg): ${code}`);
    console.log(`user code (prop): ${wxAccount.code}`);

    wxAccount.checkSession();
});

// 侦听从登录服务器获取用户信息成功事件，获取 userInfo（包含敏感信息）
wxAccount.getUserInfoSucceededEvent.On(this, (info) => {
    console.log('user info:');
    console.log(info);
    console.log(wxAccount.userInfo);
});

// 侦听检查微信登录态未过期事件
wxAccount.checkSessionSucceededEvent.On(this, (res) => {
    console.log('you are still logined.');
});

wxAccount.login();
```
## 接口一览
|名称|类型|说明|
|----|----|----|
|userInfo|{}|用户信息数据，包含 userInfo, rawData 等|
|login()|void|执行登录|
|checkSession()|void|检查微信登录态|
|loginToWxSucceededEvent|UIEvent|登录微信成功事件，转发 code|
|loginToWxFailedEvent|UIEvent|登录微信失败事件|
|getUserInfoSucceededEvent|UIEvent|获取微信用户信息成功事件，转发含敏感数据的用户信息数据|
|getUserInfoFailedEvent|UIEvent|获取微信用户信息失败事件|
|checkSessionSucceededEvent|UIEvent|微信登录态未过期事件|
|checkSessionFailedEvent|UIEvent|微信登录态已过期事件|
