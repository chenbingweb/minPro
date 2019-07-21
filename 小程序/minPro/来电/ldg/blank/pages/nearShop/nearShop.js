import _interface from "../../interface"
import { User } from "../../model/user.js"
Page({
  data: {
     dataObj:{},
     list:[]
  },
  onLoad() {
     this.setData({
      list:User.posArr,
      dataObj: {
        url: _interface.page || '',
        outData: {
          userId: '232',
          // village_id: getApp().globalData.village_id,
          // key: '',
          // collect: ''//
        }
      }
    })
  },
  onPage(ref) {
	 if(ref)
    {
      // 存储自定义组件实例，方便以后调用
      this.paging = ref;
      this.paging.callBack=this.pageData.bind(this)
    }
  },
  pageData(res){
   let { list } = this.data;
   list.push(...res);
   this.setData({
     list
   })
  }

});
