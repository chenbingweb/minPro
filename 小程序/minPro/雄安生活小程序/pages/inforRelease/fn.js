let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取资讯分类
function getInfoClass(that) {
  let ajax = new Ajax({
    data: {

    },
    path: _interface.getInfoClass
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      let data = res.data;
      res.data.unshift({
        name: '类别',
        id: -1
      })
      res.data.forEach((item,index)=>{
        if(item.id==parseInt(that.idInfo))
        {
          that.setData({
            infoIndex:index
          })
        }

      })
      that.setData({
        infoList: data
      })
    }
    else {

    }

  })
  ajax.catch(err => {
    console.log('err')
  })
}

module.exports={
  getInfoClass
}