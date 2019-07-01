// pages/tongTianTa/component/fight-fail-tip/fight-fail-tip.js
import { Player } from "../../../../modules/Player.js"
import { CGRoom, StopFight } from "../../../../dati_comm/modules/CGRoom"
import { GameConn, WorldConn } from "../../../../dati_comm/libs/network/Conns.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showLock:{
      type:Boolean,
      value:false,
      observer:function(n,o){
        goods.call(this)
      }
    },
    showShop:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ddk:0,
    fhk:0,
    ddkId:'',
    fhkId:''
  },
  ready:function(){
   // goods.call(this)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    OnBack(){
      this.setData({
        showLock:false
      })
      getApp().globalData.wnds.Wnd_FightTT.back()
      //StopFight()
      CGRoom.DoLeaveRoom()
    },
    //使用复活卡 答对卡
    onUse({currentTarget}){
      let {cid,num}=currentTarget.dataset;
      this.triggerEvent('useEvent', {})
      if(num==0)
      {
        getCard.call(this, cid, (icon) => {
          this.setData({
            showShop: true,
            icon: icon
          })
        })
        return 
      }
      GameConn.Request({ n: "use" ,id:cid}, data => {
        if (data.r == 0) {
          this.setData({
            showLock: false
          })
        }
        else
        {
          getCard.call(this,cid, (icon)=>{
            this.setData({
              showShop: true,
              icon:icon
            })
          })
          
        }

      })
      
      console.log(cid)
    },
    //更新道具
    setGoods(){
      goods.call(this)
    },
    //跳转商城
    OnToShop(){
      getApp().globalData.wnds.Wnd_Shopping.jumpMode=1
      getApp().globalData.wnds.Wnd_Shopping.Show({src:'cg'})
      setTimeout(()=>{
        this.setData({
          showShop: false
        })
      },500)
      
    }
  }
})
//获取用户复活卡 和 答对卡
function goods(){
  getApp().getMygoods.call(this, Player.Goods, res => {
    console.log(res)
    res.forEach(item => {
      //复活卡
      if (item.id == '1') {
        this.setData({
         
          fhk: item.num,
          fhkId: item.id,
        })
      }
      //答对卡
      if (item.id == '2') {
        this.setData({
          ddk: item.num,
          ddkId: item.id,
        })
      }
    })
  })
}
//获取指定卡
function getCard(cid,callback){
  let icon="";
  getApp().getMygoods.call(this, Player.Goods, res => {
    console.log(res)
    res.forEach(item => {
      if (item.id == cid) {
        // callback && callback(item.icon)
        //2 答对卡 1 复活卡
        callback && callback(parseInt(cid))
      }
     
    })
  })
}
