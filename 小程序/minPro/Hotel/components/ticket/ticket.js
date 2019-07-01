// components/ticket/ticket.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticket:{
      type:Boolean,
      value:true
    },
    cardInfo:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onToShopDetail: function ({ currentTarget}){
      let { shop } = currentTarget.dataset;
      let url = `../shoppingDetail/shoppingDetail?sid=${shop}`
        wx.navigateTo({
          url
        })
    },
    onAddCard: function ({ currentTarget, detail}){
    
      this.visible = getApp().globalData.visible;
      let { cid ,price,status} = currentTarget.dataset;
      if(status=='1')
      {
        wx.showModal({
          title: '提示',
          content: '已领取',
          showCancel:false
        })
        return
      }
      if(parseInt(price)!=0)
      {
        wx.showModal({
          title: '提示',
          content: '确认兑换',
          success:res=>{
            if(res.confirm)
            {
              //手机未认证，跳转至用户基本信息页面
              if (parseInt(this.visible) == 0) {
                //登录
                getApp().UserToLogin(res => {
                  if (res == 'err') {
                    return
                  }

                  wx.navigateTo({
                    url: "../userInfo/userInfo"
                  })
                }, detail)
                return
              }
              // else if (parseInt(this.visible) == 1) {
              //   //_fn.getYZStatus(this)
              //   getApp().getYZStatus(this)
              // }
              else {
                let { cid } = currentTarget.dataset;
                getApp().AddCoupon(cid);
              }
            }
            // else
            // {
            //   inFn.bind(this)()
            // }
          }
        })
      }
      else
      {
        getApp().AddCoupon(cid);
      }
     // getApp().AddCoupon(cid);
   
      function inFn(){
        //手机未认证，跳转至用户基本信息页面
        if (parseInt(this.visible) == 0) {
          //登录
          getApp().UserToLogin(res => {
            if (res == 'err') {
              return
            }

            wx.navigateTo({
              url: "../userInfo/userInfo"
            })
          }, detail)
          return
        }
        else if (parseInt(this.visible) == 1) {
          //_fn.getYZStatus(this)
          getApp().getYZStatus(this)
        }
        else {
          let { cid } = currentTarget.dataset;
          getApp().AddCoupon(cid);
        }
      }
    
      
    }
  }
})
