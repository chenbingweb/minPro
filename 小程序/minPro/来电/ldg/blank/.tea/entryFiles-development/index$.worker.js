if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }
function success() {
require('../../app');
require('../../components/lease-success/lease-success');
require('../../components/paging/paging');
require('../../components/shop-item/shop-item');
require('../../pages/index/index');
require('../../pages/recharge/recharge');
require('../../pages/transDetail/transDetail');
require('../../pages/doRecharge/doRecharge');
require('../../pages/myCenter/myCenter');
require('../../pages/cash/cash');
require('../../pages/myOrder/myOrder');
require('../../pages/help/help');
require('../../pages/nearShop/nearShop');
require('../../pages/search/search');
require('../../pages/shopDetail/shopDetail');
require('../../pages/detailFee/detailFee');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}