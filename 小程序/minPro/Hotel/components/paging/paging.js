// components/paging/paging.js
import Ajax from "../../libs/Ajax.js";
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表 getSignList
   */
  properties: {
    dataObj: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        console.log(this)
        if (newVal.url) {
          this.setData({
            showMore: false,
            showNoData: false,
            showNoContent: true
          })
          this.page = 1;
          this.sendDataObj.page = this.page
          this.pageFlage = true;
          //接口地址
          this.url = newVal.url;
          //发送数据
          this.outData = newVal.outData;
          this.sendDataObj = Object.assign(this.sendDataObj, this.outData);
          //获取内容
          console.log(this.outData)
          this.getPageContent();
        }

      }
    },
    //请求地址
    url: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {


      }
    },
    //设置每次请求数量
    pageSize: {
      type: Number,
      value: 20,
      observer: function (newVal, oldVal) {

      }
    },
    //发送请求数据
    sendData: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        this.outData = newVal
        console.log(this.outData)
      }
    },
    contentTip: {
      type: String,
      value: '没有相关内容',
      observer: function (newVal, oldVal) {
        this.setData({
          contentTip: newVal
        })
      }
    },
    reload: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        if (newVal) {
          this.page = 1;
          this.pageFlage = true;
          this.sendDataObj.page = this.page
          this.getPageContent()
          this.setData({
            showMore: false,
            showNoData: false,
            showNoContent: true
          })
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMore: false,
    showNoData: false,
    showNoContent: true
  },
  created: function () {
    //初始化相关分页参数
    this.page = 1;
    this.pageSize = this.properties.pageSize;
    this.pageFlage = true;
    this.sendDataObj = {
      page_size: this.pageSize,
      page_num: this.page
    };

  },
  ready: function () {


  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrolltolower: function (e) {
      if (!this.pageFlage) return
      this.setData({
        showMore: true
      })
      this.page += 1;
      this.sendDataObj.page_num = this.page;
      this.getPageContent()
    },
    //获取内容
    getPageContent: function () {
      let myEventOption = {
        bubbles: false,
        composed: false,
        capturePhase: false
      } // 触发事件的选项
      let ajax = new Ajax({
        path: this.url,
        data: this.sendDataObj
      })
      ajax.then(res => {
        //  setTimeout(()=>{
        this.setData({
          showMore: false
        })
        // },2000)

        if (res.errcode == 0) {
          console.log(res.data)
          if (Array.isArray(res.data)) {
            //分页数大于获取的数据，表示可以分页
            if (this.pageSize <= res.data.length) {
              this.pageFlage = true;
            }
            else if (res.data.length!=0 && res.data.length < this.pageSize) {
              if (this.page != 1) {
                this.setData({
                  showNoData: true,
                  showNoContent: false
                })
                this.pageFlage = false;
              }
              else {
                this.pageFlage = false;
              }

            }
            if (res.data.length>0)
            {
              this.setData({
                showNoContent: false
              })
            }

            if (res.data.length == 0 && this.page != 1) {
              this.setData({
                showNoData: true,
                showNoContent: false
              })
              this.pageFlage = false;
            }
            else if (res.data.length == 0 && this.page == 1) {
              this.setData({
                showNoContent: true
              })
            }

            let myEventDetail = res.data
            this.triggerEvent('pageData', myEventDetail, myEventOption)

          }
        }

      })
      ajax.catch(err => {

      })
    }
  }
})
