import Ajax from "../../libs/ajax";
/*
paging ref="onPage"  dataObj="{{dataObj}}">
<view slot="list" style="padding-top:25rpx;"></view>
</paging>
  this.setData({
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

  onPage(ref) {
	// 存储自定义组件实例，方便以后调用
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
*/
let page="page";
let pageSize ="size";
Component({
  mixins: [],
  data: {
    pageSize:10,
    showMore: false,
    showNoData: false,
    showNoContent: true,
    url:""
  },
  
  props: {
    dataObj:{ }
  },
  deriveDataFromProps(nextProps){
    if(nextProps.dataObj.url!==this.data.url)
    {
    
      this.setData({
        url:nextProps.dataObj.url
      })
      this.changeDataObj(nextProps);
    }
    


  },
  didMount() {
    //初始化相关分页参数
    this.page = 1;
    this.pageSize = this.data.pageSize;
    this.pageFlage = true;
    this.sendDataObj = {
      [pageSize]: this.pageSize,
      [page]: this.page
    };
    this.url=undefined;
   
  },
  didUpdate() {

  },
  didUnmount() {

  },
  methods: {
    onScrollToLower(){
      if (!this.pageFlage ) return
      this.setData({
        showMore: true
      })
      this.page += 1;
      this.sendDataObj[page] = this.page;
      this.getPageContent()
      
    },
    changeDataObj({ dataObj }){
        
        this.page = 1;
        this.pageSize=10;
        this.pageFlage = true;
         this.url=dataObj.url;
        this.sendDataObj = {
          [pageSize]: this.pageSize,
          [page]: this.page,
          ...dataObj.outData
        };

        this.getPageContent()
        this.setData({
          showMore: false,
          showNoData: false,
          showNoContent: true
        })
    },
    getPageContent(){
     
        let ajax = new Ajax({
          path: this.data.url,
          data: this.sendDataObj
        })
        ajax.then(res=>{
          
        this.setData({
          showMore: false
        })
        if (parseInt(res.errcode) == 0) {
        
          if (Array.isArray(res.data)) {
            //分页数大于获取的数据，表示可以分页
            if (this.pageSize <= res.data.length) {
              this.pageFlage = true;
            }
            else if (res.data.length!=0 && res.data.length < this.data.pageSize) {
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
              this.pageFlage = false;
            }
            console.log(res.data)
            let myEventDetail = res.data;
            // if (myEventDetail.length>10)
            // {
            //   myEventDetail.pop()
            // }
            this.callBack && this.callBack(myEventDetail)

            }
          }
          else if(res.errcode==1)
          {
            my.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
          else
          {
            my.showToast({
              title: '系统繁忙',
              icon: 'none'
            })
          }
          console.log(res)
        })
        ajax.catch(err=>{
            my.showToast({
              title: '系统繁忙',
              icon: 'none'
            })
        })

    }
  },
});
