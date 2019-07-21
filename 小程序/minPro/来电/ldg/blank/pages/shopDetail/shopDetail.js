import { getNearList } from "./fn.js"
import { User } from "../../model/user.js"; 
Page({
  data: {
    detail:{},
    isSign: false,
    loginPhone: false
  },
  onLoad(options) {
     let { sid } = options;
     console.log(sid)
    getNearList(sid,this)
  },
  onDH(){
     let latitude = parseFloat(this.data.detail.latitude);
    let longitude = parseFloat( this.data.detail.longitude);
  
    my.openLocation({
      longitude: longitude,
      latitude: latitude,
      name: this.data.detail.shop_name,
      address: this.data.detail.address,
    });
  }
});
