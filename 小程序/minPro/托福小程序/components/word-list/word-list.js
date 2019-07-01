// components/word-list/word-list.js
import {User} from "../../model/user.js";
import { Index } from "../../model/index.js";

let _interface = require("../../utils/interface.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ReviewFn:{
      type:Function,
      value:null
    },
    isMeanShow:{
      type:Boolean,
      value:true,
      observer: function (newVal, oldVal) {
        this.setIsMeanShow(newVal)
        
      }
    },
    fromSrc:{
      type: Boolean,
      value:true,
      observer: function (newVal, oldVal) {
        //生成本
        if(newVal==false)
        {
          User.getOverviewSectionEvent.Off(this.getOverviewSectionEvent);
          this.createFn()
        }
  
      }
    },
    //生成提示方法
    collectTip:{
      type: Function,
      value: null
    },
    pageObj:{
      type:Object,
      value:{}
    },
    //回退
    backRes:{
      type: Object,
      value: true,
      observer: function (newVal, oldVal) {
        if (!Object.keys(newVal).length)
        {
          return 
        }
        let res=newVal
        if (res.id) {
          this.setData({
            list: res.words||[],
            sectionDetail: res
          })
        }
        else//显示复习提示
        {
          this.setData({
            showToFX: true
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPanel:false,
    showToFX:false,
    list:[],
    panelDetail:{},
    sectionDetail:{},
    dataObj:{},
    imgUrl:''
  },
  created(){
    if (this.properties.fromSrc) {
      User.getOverviewSectionEvent.Off(this.getOverviewSectionEvent);
      User.getOverviewSectionEvent.On(this, this.getOverviewSectionEvent);
    }
    this.page=0;
    this.setData({
      imgUrl: getApp().globalData.imgUrl
    })
    //是否还有下一组
    this.nextFlag=true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取生词列表
    createFn(flag=false){
      

      if (flag) {
          if (this.page ==1) {
          this.page=1
          //设置上一组 隐藏
          if (Object.keys(this.properties.pageObj).length) {
            this.properties.pageObj.setBtn(false)
            wx.showToast({
              title: '没有生词了',
              icon:'none'
            })
            
          }
            return


        }
        this.page--
     
      }
      else {
        this.page++;
          //设置上一组 显示
        if (Object.keys(this.properties.pageObj).length)
        {
          this.properties.pageObj.setBtn(true)
        }

      }
      Index.getCollectList(this.page,(res)=>{
        if(res.items.length==0)
        {
          this.page--;
          wx.showToast({
            title: '没有生词了',
            icon:'none'
          })
          return

        }
        //向父级发送时间
        this.properties.collectTip(res)
        res.items.forEach(item=>{
          item.collection_id=item.id
        })
        this.setData({
          list: res.items,
          dataObj:res
        })
       
        
      });
      
    },
    onPageData({ detail }) {
      console.log(detail)
     },
    //这种是否显示词义
    setIsMeanShow(flag){

      console.log(flag)
    },
    getOverviewSectionEvent(res){
      //console.log(res)
      if (res.id)
      {
        this.setData({
          list: res.words||[],
          sectionDetail: res
        })
      }
      else//显示复习提示
      {
        this.setData({
          showToFX:true
        })
      }
      
      
    },
    onClose(){
      this.setData({
        showPanel:false
      })
    },
    onShowPanel({currentTarget:{dataset:{sid}}}){
      let myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      }
      this.data.list.forEach(item=>{
        if(parseInt(item.id)==parseInt(sid))
        {
          this.setData({
            showPanel: true,
            panelDetail:item
          })

          this.triggerEvent('panelDetail', item, myEventOption)

        }
      })
      
    },
    //开始今天复习
    onStartReview(){
      this.setData({
        showToFX:false
      })
      this.properties.ReviewFn()
    },
    //收藏
    onCollect({ currentTarget:{dataset:{wd}}}){
      let list=this.data.list;
      let index=0;
      let wordDetail=list.filter((item,i)=>{
        if(wd==item.id)
        {
          index=i
        }
        return parseInt(wd)==parseInt(item.id)
      })
      doCollect.bind(this)(wordDetail[0], index)

    }
  }
})

function doCollect(wordDetail,index){
  //取消收藏
  if (wordDetail.collection_id) {

    Index.doCollectOrCancelCollect(wordDetail.collection_id, res => {
      
      //移除
      if(this.properties.fromSrc==false)
      {
        // let list = this.data.list
        // list.splice(index,1)
        // this.setData({
        //   list:list
        // })
        this.setData({
          [`list[${index}].collection_id`]: null
        })
      }
      else
      {
        this.setData({
          [`list[${index}].collection_id`]: null
        })
      }
    }, _interface.removeCollection)

  }
  //收藏
  else {
    Index.doCollectOrCancelCollect(wordDetail.id, res => {
      if (res) {
        this.setData({
          [`list[${index}].collection_id`]: res
        })
      }
    })

  }
}
