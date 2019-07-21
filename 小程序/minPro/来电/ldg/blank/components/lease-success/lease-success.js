Component({
  mixins: [],
  data: {
    show:false
  },
  props: {
    show:false
  },
  didMount() {
    

   
  },
  deriveDataFromProps(nextProps){
    
    if(this.data.show!==nextProps.show)
    {
      this.setData({
        show:true
      })
      my.setNavigationBar({
      title: '租赁成功',
      })
  
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {},
});
